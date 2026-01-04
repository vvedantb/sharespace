import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { incrementItemViews, isItemSaved, isVerifiedSeller } from "@/lib/actions/items";
import { ItemDetail } from "./ItemDetail";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      seller: {
        include: {
          reviewsReceived: { select: { rating: true } },
        },
      },
    },
  });

  const isMentor = currentUser
    ? !!(await prisma.mentorProfile.findUnique({ where: { userId: currentUser.id } }))
    : false;

  if (!item) {
    return (
      <div className="px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-foreground">Item not found</h1>
        <Link href="/marketplace" className="mt-4 inline-block text-danger">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  if (!currentUser || currentUser.id !== item.sellerId) {
    incrementItemViews(id);
  }

  const reviews = item.seller.reviewsReceived;
  const sellerRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const [saved, sellerVerified] = await Promise.all([
    isItemSaved(id),
    isVerifiedSeller(item.sellerId),
  ]);

  return (
    <ItemDetail
      item={{
        id: item.id,
        title: item.title,
        description: item.description,
        price: Number(item.price),
        condition: item.condition,
        status: item.status,
        university: item.university,
        images: item.images,
        sellerId: item.sellerId,
        sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
        sellerRating,
        isMentorRecommended: item.isMentorRecommended,
        isVerifiedSeller: sellerVerified,
      }}
      isMentor={isMentor}
      currentUserId={currentUser?.id}
      initialSaved={saved}
    />
  );
}
