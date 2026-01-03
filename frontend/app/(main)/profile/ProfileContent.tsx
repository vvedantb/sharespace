"use client";

import Link from "next/link";
import { Avatar, Button, Card, CardBody, Image } from "@heroui/react";
import { IconSettings, IconPhoto, IconChevronRight, IconLogout } from "@tabler/icons-react";
import { signOut } from "@/lib/cognito";

interface ProfileContentProps {
  user: {
    firstName: string;
    lastName: string;
    course: string | null;
    yearOfStudy: number | null;
  };
  listings: {
    id: string;
    title: string;
    price: number;
    status: string;
    images: string[];
  }[];
}

export function ProfileContent({ user, listings }: ProfileContentProps) {
  const itemsListed = listings.length;
  const itemsSold = listings.filter((i) => i.status === "SOLD").length;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <Button as={Link} href="/settings" variant="light" isIconOnly radius="lg">
          <IconSettings className="h-5 w-5" stroke={1.5} />
        </Button>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Avatar name={fullName} size="lg" color="danger" showFallback className="h-16 w-16 text-xl" />
        <div>
          <h2 className="text-lg font-bold text-foreground">{fullName}</h2>
          <p className="text-sm text-default-500">
            {user.course || "No course"} · Year {user.yearOfStudy || "-"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Card className="bg-default-50">
          <CardBody className="p-4 text-center">
            <p className="text-xl font-bold text-foreground">{itemsListed}</p>
            <p className="text-xs text-default-500">Listed</p>
          </CardBody>
        </Card>
        <Card className="bg-default-50">
          <CardBody className="p-4 text-center">
            <p className="text-xl font-bold text-foreground">{itemsSold}</p>
            <p className="text-xs text-default-500">Sold</p>
          </CardBody>
        </Card>
        <Card className="bg-default-50">
          <CardBody className="p-4 text-center">
            <p className="text-xl font-bold text-foreground">-</p>
            <p className="text-xs text-default-500">Rating</p>
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 space-y-2">
        <Card as={Link} href="/profile/edit" isPressable className="border border-default-200">
          <CardBody className="flex-row items-center justify-between p-4">
            <span className="font-medium text-foreground">Edit Profile</span>
            <IconChevronRight className="h-5 w-5 text-default-400" stroke={1.5} />
          </CardBody>
        </Card>
        <Card as={Link} href="/profile/listings" isPressable className="border border-default-200">
          <CardBody className="flex-row items-center justify-between p-4">
            <span className="font-medium text-foreground">My Listings</span>
            <IconChevronRight className="h-5 w-5 text-default-400" stroke={1.5} />
          </CardBody>
        </Card>
      </div>

      <Button
        variant="bordered"
        color="danger"
        radius="lg"
        fullWidth
        startContent={<IconLogout className="h-5 w-5" stroke={1.5} />}
        onPress={signOut}
        className="mt-8"
      >
        Log Out
      </Button>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Recent Listings</h3>
          <Link href="/profile/listings" className="text-sm text-danger">
            View all
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {listings.slice(0, 4).map((item) => (
            <Card key={item.id} as={Link} href={`/marketplace/${item.id}`} isPressable className="border border-default-200">
              <CardBody className="p-0 overflow-hidden">
                <div className="aspect-square bg-default-100 flex items-center justify-center">
                  {item.images && item.images.length > 0 ? (
                    <Image src={item.images[0]} alt={item.title} className="h-full w-full object-cover" radius="none" />
                  ) : (
                    <IconPhoto className="h-8 w-8 text-default-300" stroke={1.5} />
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                  <p className="text-sm font-bold text-danger">£{Number(item.price).toFixed(2)}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
