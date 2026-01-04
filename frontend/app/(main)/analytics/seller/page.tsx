import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import {
  IconEye,
  IconHeart,
  IconMessage,
  IconPercentage,
  IconRecycle,
  IconCoin,
  IconLeaf,
} from "@tabler/icons-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSellerAnalytics } from "@/lib/actions/items";
import { formatMoney, formatCO2 } from "@/lib/sustainability";

export default async function SellerAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isSeller: true },
  });

  if (!dbUser?.isSeller) redirect("/analytics/profile");

  const analytics = await getSellerAnalytics();
  const { items, totals, sustainability } = analytics;
  const conversionRate =
    totals.views > 0
      ? ((totals.inquiries / totals.views) * 100).toFixed(1)
      : "0";

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-default-50" shadow="none">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary-100 p-2">
                <IconEye className="h-5 w-5 text-primary-600" stroke={1.5} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {totals.views}
                </p>
                <p className="text-xs text-default-500">Total Views</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50" shadow="none">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-danger-100 p-2">
                <IconHeart className="h-5 w-5 text-danger-600" stroke={1.5} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {totals.saves}
                </p>
                <p className="text-xs text-default-500">Total Saves</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50" shadow="none">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success-100 p-2">
                <IconMessage
                  className="h-5 w-5 text-success-600"
                  stroke={1.5}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {totals.inquiries}
                </p>
                <p className="text-xs text-default-500">Inquiries</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50" shadow="none">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning-100 p-2">
                <IconPercentage
                  className="h-5 w-5 text-warning-600"
                  stroke={1.5}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {conversionRate}%
                </p>
                <p className="text-xs text-default-500">Conversion</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {sustainability.itemsReused > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Your Sustainability Impact
          </h2>
          <Card
            className="bg-gradient-to-r from-success-50 to-success-100 dark:from-success-950 dark:to-success-900"
            shadow="none"
          >
            <CardBody className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex justify-center mb-2">
                    <div className="rounded-full bg-success-200 dark:bg-success-800 p-3">
                      <IconRecycle
                        className="h-6 w-6 text-success-700 dark:text-success-300"
                        stroke={1.5}
                      />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-success-700 dark:text-success-300">
                    {sustainability.itemsReused}
                  </p>
                  <p className="text-xs text-success-600 dark:text-success-400">
                    Items Reused
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <div className="rounded-full bg-success-200 dark:bg-success-800 p-3">
                      <IconCoin
                        className="h-6 w-6 text-success-700 dark:text-success-300"
                        stroke={1.5}
                      />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-success-700 dark:text-success-300">
                    {formatMoney(sustainability.moneySaved)}
                  </p>
                  <p className="text-xs text-success-600 dark:text-success-400">
                    Saved for Buyers
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <div className="rounded-full bg-success-200 dark:bg-success-800 p-3">
                      <IconLeaf
                        className="h-6 w-6 text-success-700 dark:text-success-300"
                        stroke={1.5}
                      />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-success-700 dark:text-success-300">
                    {formatCO2(sustainability.co2Saved)}
                  </p>
                  <p className="text-xs text-success-600 dark:text-success-400">
                    CO₂ Prevented
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Item Performance
        </h2>
        {items.length === 0 ? (
          <Card className="border border-default-200" shadow="none">
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
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Card
                key={item.id}
                className="border border-default-200"
                shadow="none"
              >
                <CardBody className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/marketplace/${item.id}`}
                        className="font-medium text-foreground hover:text-danger truncate block"
                      >
                        {item.title}
                      </Link>
                      <span
                        className={`text-xs ${
                          item.status === "SOLD"
                            ? "text-success-500"
                            : "text-default-400"
                        }`}
                      >
                        {item.status === "SOLD" ? "Sold" : "Active"}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1 text-default-500">
                        <IconEye className="h-4 w-4" stroke={1.5} />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-default-500">
                        <IconHeart className="h-4 w-4" stroke={1.5} />
                        <span>{item.saves}</span>
                      </div>
                      <div className="flex items-center gap-1 text-default-500">
                        <IconMessage className="h-4 w-4" stroke={1.5} />
                        <span>{item.inquiries}</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
