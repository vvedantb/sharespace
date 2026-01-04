"use server";

import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Item } from "@/lib/types";
import { calculateMoneySaved, calculateCO2Saved } from "@/lib/sustainability";

export async function getItems(params?: {
  search?: string;
  category?: string;
}): Promise<Item[]> {
  const items = await prisma.item.findMany({
    where: {
      status: "ACTIVE",
      ...(params?.category && { category: params.category as never }),
      ...(params?.search && {
        OR: [
          { title: { contains: params.search, mode: "insensitive" } },
          { description: { contains: params.search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      seller: {
        include: {
          reviewsReceived: { select: { rating: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return items.map((item) => {
    const reviews = item.seller.reviewsReceived;
    const sellerRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    return {
      id: item.id,
      sellerId: item.sellerId,
      sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
      sellerRating,
      title: item.title,
      description: item.description,
      price: Number(item.price),
      category: item.category,
      condition: item.condition,
      status: item.status,
      images: item.images,
      courseCode: item.courseCode,
      university: item.university,
      views: item.views,
      saves: item.saves,
      isMentorRecommended: item.isMentorRecommended,
      createdAt: dayjs(item.createdAt).toISOString(),
    };
  });
}

export async function getMyItems(): Promise<Item[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const items = await prisma.item.findMany({
    where: { sellerId: user.id },
    include: {
      seller: {
        include: {
          reviewsReceived: { select: { rating: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return items.map((item) => {
    const reviews = item.seller.reviewsReceived;
    const sellerRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    return {
      id: item.id,
      sellerId: item.sellerId,
      sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
      sellerRating,
      title: item.title,
      description: item.description,
      price: Number(item.price),
      category: item.category,
      condition: item.condition,
      status: item.status,
      images: item.images,
      courseCode: item.courseCode,
      university: item.university,
      views: item.views,
      saves: item.saves,
      isMentorRecommended: item.isMentorRecommended,
      createdAt: dayjs(item.createdAt).toISOString(),
    };
  });
}

export async function createItem(data: {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  courseCode?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const item = await prisma.item.create({
    data: {
      sellerId: user.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category as never,
      condition: data.condition as never,
      images: data.images,
      courseCode: data.courseCode,
      university: user.university,
    },
  });

  return {
    ...item,
    price: Number(item.price),
    createdAt: dayjs(item.createdAt).toISOString(),
  };
}

export async function deleteItem(id: string) {
  await prisma.item.delete({ where: { id } });
}

export async function saveItem(id: string) {
  await prisma.item.update({
    where: { id },
    data: { saves: { increment: 1 } },
  });
}

export async function unsaveItem(id: string) {
  await prisma.item.update({
    where: { id },
    data: { saves: { decrement: 1 } },
  });
}

export async function recommendItem(itemId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const mentorProfile = await prisma.mentorProfile.findUnique({
    where: { userId: user.id },
  });

  if (!mentorProfile) throw new Error("Only mentors can recommend items");

  return prisma.item.update({
    where: { id: itemId },
    data: { isMentorRecommended: true },
  });
}

export async function incrementItemViews(itemId: string) {
  await prisma.item.update({
    where: { id: itemId },
    data: { views: { increment: 1 } },
  });
}

export async function getSellerAnalytics() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const items = await prisma.item.findMany({
    where: { sellerId: user.id },
    include: {
      _count: { select: { conversations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const itemsWithStats = items.map((item) => ({
    id: item.id,
    title: item.title,
    status: item.status,
    views: item.views,
    saves: item.saves,
    inquiries: item._count.conversations,
    createdAt: dayjs(item.createdAt).toISOString(),
  }));

  const totals = {
    views: items.reduce((sum, item) => sum + item.views, 0),
    saves: items.reduce((sum, item) => sum + item.saves, 0),
    inquiries: items.reduce((sum, item) => sum + item._count.conversations, 0),
    items: items.length,
  };

  const soldItems = items.filter((item) => item.status === "SOLD");
  const sustainability = {
    itemsReused: soldItems.length,
    moneySaved: soldItems.reduce(
      (sum, item) => sum + calculateMoneySaved(Number(item.price), item.condition),
      0
    ),
    co2Saved: soldItems.reduce(
      (sum, item) => sum + calculateCO2Saved(item.category),
      0
    ),
  };

  return { items: itemsWithStats, totals, sustainability };
}

export async function getPlatformSustainability() {
  const soldItems = await prisma.item.findMany({
    where: { status: "SOLD" },
    select: { price: true, condition: true, category: true },
  });

  return {
    itemsReused: soldItems.length,
    moneySaved: soldItems.reduce(
      (sum, item) => sum + calculateMoneySaved(Number(item.price), item.condition),
      0
    ),
    co2Saved: soldItems.reduce(
      (sum, item) => sum + calculateCO2Saved(item.category),
      0
    ),
  };
}

export async function getItemBuyers(itemId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const conversations = await prisma.conversation.findMany({
    where: {
      itemId,
      OR: [{ participant1Id: user.id }, { participant2Id: user.id }],
    },
    include: {
      participant1: { select: { id: true, firstName: true, lastName: true } },
      participant2: { select: { id: true, firstName: true, lastName: true } },
    },
  });

  const buyers = conversations.map((conv) => {
    const buyer = conv.participant1Id === user.id ? conv.participant2 : conv.participant1;
    return { id: buyer.id, name: `${buyer.firstName} ${buyer.lastName}` };
  });

  return buyers;
}

export async function markAsSold(itemId: string, buyerId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item || item.sellerId !== user.id) throw new Error("Unauthorized");

  await prisma.item.update({
    where: { id: itemId },
    data: { status: "SOLD", buyerId, soldAt: new Date() },
  });

  await prisma.notification.create({
    data: {
      userId: buyerId,
      type: "SALE",
      title: "Purchase Complete",
      description: `Your purchase of "${item.title}" has been confirmed.`,
      link: `/marketplace/${itemId}`,
    },
  });
}

export async function getSavedItems(): Promise<Item[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const savedItems = await prisma.savedItem.findMany({
    where: { userId: user.id },
    include: {
      item: {
        include: {
          seller: {
            include: { reviewsReceived: { select: { rating: true } } },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return savedItems.map(({ item }) => {
    const reviews = item.seller.reviewsReceived;
    const sellerRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    return {
      id: item.id,
      sellerId: item.sellerId,
      sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
      sellerRating,
      title: item.title,
      description: item.description,
      price: Number(item.price),
      category: item.category,
      condition: item.condition,
      status: item.status,
      images: item.images,
      courseCode: item.courseCode,
      university: item.university,
      views: item.views,
      saves: item.saves,
      isMentorRecommended: item.isMentorRecommended,
      createdAt: dayjs(item.createdAt).toISOString(),
    };
  });
}

export async function toggleSaveItem(itemId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const existing = await prisma.savedItem.findUnique({
    where: { userId_itemId: { userId: user.id, itemId } },
  });

  if (existing) {
    await prisma.savedItem.delete({ where: { id: existing.id } });
    await prisma.item.update({ where: { id: itemId }, data: { saves: { decrement: 1 } } });
    return false;
  } else {
    await prisma.savedItem.create({ data: { userId: user.id, itemId } });
    await prisma.item.update({ where: { id: itemId }, data: { saves: { increment: 1 } } });
    return true;
  }
}

export async function isItemSaved(itemId: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const saved = await prisma.savedItem.findUnique({
    where: { userId_itemId: { userId: user.id, itemId } },
  });

  return !!saved;
}

export async function updateItem(
  itemId: string,
  data: {
    title: string;
    description: string;
    price: number;
    condition: string;
  }
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item || item.sellerId !== user.id) throw new Error("Unauthorized");

  return prisma.item.update({
    where: { id: itemId },
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      condition: data.condition as never,
    },
  });
}

export async function isVerifiedSeller(userId: string): Promise<boolean> {
  const soldCount = await prisma.item.count({
    where: { sellerId: userId, status: "SOLD" },
  });
  return soldCount >= 3;
}
