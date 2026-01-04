import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import { IconPackage, IconCheck } from "@tabler/icons-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfileAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const listings = await prisma.item.findMany({
    where: { sellerId: user.id },
    select: { status: true },
  });

  const stats = {
    itemsListed: listings.length,
    itemsSold: listings.filter((i) => i.status === "SOLD").length,
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-default-50" shadow="none">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary-100 p-2">
                <IconPackage
                  className="h-5 w-5 text-primary-600"
                  stroke={1.5}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.itemsListed}
                </p>
                <p className="text-xs text-default-500">Items Listed</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50" shadow="none">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success-100 p-2">
                <IconCheck className="h-5 w-5 text-success-600" stroke={1.5} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.itemsSold}
                </p>
                <p className="text-xs text-default-500">Items Sold</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {stats.itemsListed === 0 && (
        <Card className="mt-6 border border-default-200" shadow="none">
          <CardBody className="p-8 text-center">
            <p className="text-default-500">No items listed yet</p>
            <Link
              href="/marketplace/browse"
              className="mt-4 inline-block rounded-xl bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger-600"
            >
              List Your First Item
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
