"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Item } from "@/lib/types";

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
      createdAt: item.createdAt.toISOString(),
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

  return prisma.item.create({
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
}

export async function deleteItem(id: string) {
  return prisma.item.delete({ where: { id } });
}

export async function saveItem(id: string) {
  return prisma.item.update({
    where: { id },
    data: { saves: { increment: 1 } },
  });
}

export async function unsaveItem(id: string) {
  return prisma.item.update({
    where: { id },
    data: { saves: { decrement: 1 } },
  });
}
