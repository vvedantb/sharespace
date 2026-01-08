"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { UserBadge } from "@/lib/types";

const BADGE_DEFINITIONS = [
  { name: "First Sale", description: "Made your first sale", icon: "trophy", category: "SELLER" as const, threshold: 1 },
  { name: "Top Seller", description: "Sold 10+ items", icon: "star", category: "SELLER" as const, threshold: 10 },
  { name: "First Purchase", description: "Made your first purchase", icon: "shopping-cart", category: "BUYER" as const, threshold: 1 },
  { name: "Helpful Mentor", description: "5+ answers marked helpful", icon: "heart", category: "MENTOR" as const, threshold: 5 },
  { name: "Rising Mentor", description: "Answered 10+ questions", icon: "message-circle", category: "MENTOR" as const, threshold: 10 },
  { name: "First Question", description: "Asked your first question", icon: "help-circle", category: "COMMUNITY" as const, threshold: 1 },
];

const POINTS = {
  itemListed: 5,
  itemSold: 20,
  purchaseMade: 10,
  questionAsked: 5,
  answerGiven: 10,
  answerMarkedHelpful: 15,
};

export async function ensureBadgesExist() {
  for (const badge of BADGE_DEFINITIONS) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }
}

export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { earnedAt: "desc" },
  });

  return userBadges.map((ub) => ({
    id: ub.id,
    badge: {
      id: ub.badge.id,
      name: ub.badge.name,
      description: ub.badge.description,
      icon: ub.badge.icon,
      category: ub.badge.category,
    },
    earnedAt: ub.earnedAt.toISOString(),
  }));
}

export async function getUserPoints(userId: string): Promise<number> {
  const userPoints = await prisma.userPoints.findUnique({
    where: { userId },
  });
  return userPoints?.points ?? 0;
}

export async function addPoints(userId: string, points: number) {
  await prisma.userPoints.upsert({
    where: { userId },
    update: { points: { increment: points } },
    create: { userId, points },
  });
}

async function awardBadge(userId: string, badgeName: string) {
  const badge = await prisma.badge.findUnique({ where: { name: badgeName } });
  if (!badge) return;

  const existing = await prisma.userBadge.findUnique({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
  });

  if (!existing) {
    await prisma.userBadge.create({
      data: { userId, badgeId: badge.id },
    });

    await prisma.notification.create({
      data: {
        userId,
        type: "ENDORSEMENT",
        title: "New Badge Earned!",
        description: `You earned the "${badge.name}" badge: ${badge.description}`,
        link: "/profile",
      },
    });
  }
}

export async function checkAndAwardBadges(userId: string) {
  await ensureBadgesExist();

  const soldCount = await prisma.item.count({
    where: { sellerId: userId, status: "SOLD" },
  });
  if (soldCount >= 1) await awardBadge(userId, "First Sale");
  if (soldCount >= 10) await awardBadge(userId, "Top Seller");

  const purchaseCount = await prisma.item.count({
    where: { buyerId: userId, status: "SOLD" },
  });
  if (purchaseCount >= 1) await awardBadge(userId, "First Purchase");

  const questionCount = await prisma.question.count({
    where: { askerId: userId },
  });
  if (questionCount >= 1) await awardBadge(userId, "First Question");

  const mentorProfile = await prisma.mentorProfile.findUnique({
    where: { userId },
  });

  if (mentorProfile) {
    if (mentorProfile.totalAnswers >= 10) await awardBadge(userId, "Rising Mentor");
    if (mentorProfile.helpfulAnswers >= 5) await awardBadge(userId, "Helpful Mentor");
  }
}

export async function onItemListed(userId: string) {
  await addPoints(userId, POINTS.itemListed);
}

export async function onItemSold(sellerId: string, buyerId: string) {
  await addPoints(sellerId, POINTS.itemSold);
  await addPoints(buyerId, POINTS.purchaseMade);
  await checkAndAwardBadges(sellerId);
  await checkAndAwardBadges(buyerId);
}

export async function onQuestionAsked(userId: string) {
  await addPoints(userId, POINTS.questionAsked);
  await checkAndAwardBadges(userId);
}

export async function onAnswerGiven(mentorUserId: string) {
  await addPoints(mentorUserId, POINTS.answerGiven);
  await checkAndAwardBadges(mentorUserId);
}

export async function onAnswerMarkedHelpful(mentorUserId: string) {
  await addPoints(mentorUserId, POINTS.answerMarkedHelpful);
  await checkAndAwardBadges(mentorUserId);
}
