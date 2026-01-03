"use client";

import { useState, Key } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, Tab, Chip, Button, Card, CardBody } from "@heroui/react";
import {
  IconPhoto,
  IconEdit,
  IconTrash,
  IconEye,
  IconHeart,
  IconArrowLeft,
  IconStar,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Item } from "@/lib/types";
import { deleteItem } from "@/lib/actions/items";

interface ListingsManagerProps {
  initialListings: Item[];
}

export function ListingsManager({ initialListings }: ListingsManagerProps) {
  const router = useRouter();
  const [listings, setListings] = useState(initialListings);
  const [activeTab, setActiveTab] = useState("active");

  const activeListings = listings.filter((item) => item.status === "ACTIVE");
  const soldListings = listings.filter((item) => item.status === "SOLD");

  const displayedListings =
    activeTab === "active" ? activeListings : soldListings;

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (_, id) => {
      setListings(listings.filter((item) => item.id !== id));
    },
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);

  return (
    <div className="px-4 py-8">
      <Button
        variant="light"
        startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
        onPress={() => router.back()}
        className="mb-4 text-default-500"
      >
        Back
      </Button>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            My Listings
          </h1>
          <p className="mt-2 text-default-500">
            Manage your items for sale
          </p>
        </div>
        <Button
          as={Link}
          href="/upload"
          color="danger"
          radius="lg"
        >
          + New Listing
        </Button>
      </div>

      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key: Key) => setActiveTab(key.toString())}
        color="danger"
        variant="solid"
        classNames={{ tabList: "bg-default-100" }}
      >
        <Tab key="active" title={`Active (${activeListings.length})`} />
        <Tab key="sold" title={`Sold (${soldListings.length})`} />
      </Tabs>

      <div className="mt-6 space-y-4">
        {displayedListings.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-default-500">
              No {activeTab} listings
            </p>
          </div>
        ) : (
          displayedListings.map((item) => (
            <Card key={item.id} className="border border-default-200">
              <CardBody className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-default-100">
                    {item.images && item.images.length > 0 ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        className="h-full w-full object-cover rounded-xl"
                        width={80}
                        height={80}
                      />
                    ) : (
                      <IconPhoto
                        className="h-10 w-10 text-default-300"
                        stroke={1.5}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground truncate">
                        {item.title}
                      </h3>
                      {item.isMentorRecommended && (
                        <Chip
                          color="warning"
                          size="sm"
                          variant="flat"
                          startContent={<IconStar className="h-3 w-3" stroke={2} />}
                        >
                          Mentor Pick
                        </Chip>
                      )}
                    </div>
                    <p className="text-lg font-bold text-danger">
                      £{item.price.toFixed(2)}
                    </p>
                    <div className="mt-1 flex items-center gap-4 text-sm text-default-400">
                      <span className="flex items-center gap-1">
                        <IconEye className="h-4 w-4" stroke={1.5} />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconHeart className="h-4 w-4" stroke={1.5} />
                        {item.saves}
                      </span>
                      <span>Listed {item.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      as={Link}
                      href={`/marketplace/${item.id}`}
                      variant="bordered"
                      isIconOnly
                      radius="lg"
                    >
                      <IconEye className="h-5 w-5" stroke={1.5} />
                    </Button>
                    <Button
                      variant="bordered"
                      isIconOnly
                      radius="lg"
                    >
                      <IconEdit className="h-5 w-5" stroke={1.5} />
                    </Button>
                    <Button
                      variant="bordered"
                      isIconOnly
                      radius="lg"
                      color="danger"
                      onPress={() => handleDelete(item.id)}
                    >
                      <IconTrash className="h-5 w-5" stroke={1.5} />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
