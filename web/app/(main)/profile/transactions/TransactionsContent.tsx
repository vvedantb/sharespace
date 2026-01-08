"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Avatar, Card, CardBody, Image, Tab, Tabs } from "@heroui/react";
import { IconPhoto, IconShoppingBag, IconCash } from "@tabler/icons-react";

interface Transaction {
  id: string;
  title: string;
  price: number;
  image: string | null;
  otherPartyId: string | null;
  otherPartyName: string;
  soldAt: string | null;
}

interface TransactionsContentProps {
  purchases: Transaction[];
  sales: Transaction[];
}

function TransactionCard({ transaction, type }: { transaction: Transaction; type: "purchase" | "sale" }) {
  return (
    <Link href={`/marketplace/${transaction.id}`}>
      <Card className="border border-default-200 hover:border-default-300 transition-all" shadow="none">
        <CardBody className="p-4">
          <div className="flex gap-4">
            <div className="h-16 w-16 shrink-0 rounded-lg bg-default-100 overflow-hidden flex items-center justify-center">
              {transaction.image ? (
                <Image src={transaction.image} alt={transaction.title} className="h-full w-full object-cover" />
              ) : (
                <IconPhoto className="h-6 w-6 text-default-300" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{transaction.title}</h3>
              <p className="text-lg font-bold text-danger">£{transaction.price.toFixed(2)}</p>
              <p className="text-xs text-default-500 mt-1">
                {type === "purchase" ? "Bought from" : "Sold to"} {transaction.otherPartyName}
              </p>
              {transaction.soldAt && (
                <p className="text-xs text-default-400">{dayjs(transaction.soldAt).format("MMM D, YYYY")}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export function TransactionsContent({ purchases, sales }: TransactionsContentProps) {
  return (
    <div className="mt-6">
      <Tabs color="danger" variant="underlined" classNames={{ tabList: "w-full" }}>
        <Tab
          key="purchases"
          title={
            <div className="flex items-center gap-2">
              <IconShoppingBag className="h-4 w-4" />
              <span>Purchases ({purchases.length})</span>
            </div>
          }
        >
          <div className="mt-4 space-y-3">
            {purchases.length === 0 ? (
              <p className="py-8 text-center text-default-500">No purchases yet</p>
            ) : (
              purchases.map((tx) => <TransactionCard key={tx.id} transaction={tx} type="purchase" />)
            )}
          </div>
        </Tab>
        <Tab
          key="sales"
          title={
            <div className="flex items-center gap-2">
              <IconCash className="h-4 w-4" />
              <span>Sales ({sales.length})</span>
            </div>
          }
        >
          <div className="mt-4 space-y-3">
            {sales.length === 0 ? (
              <p className="py-8 text-center text-default-500">No sales yet</p>
            ) : (
              sales.map((tx) => <TransactionCard key={tx.id} transaction={tx} type="sale" />)
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
