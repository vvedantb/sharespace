"use client";

import { Avatar, Button, Card, CardBody, Switch, useDisclosure } from "@heroui/react";
import { IconEdit, IconLogout, IconMoon, IconSun, IconStar } from "@tabler/icons-react";
import { signOut } from "@/lib/cognito";
import { useThemeContext } from "@/components/contexts/ThemeContext";
import { User, Review } from "@/lib/types";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileContentProps {
  user: User;
  stats: {
    itemsListed: number;
    itemsSold: number;
    rating: number;
  };
  reviews: Review[];
}

export function ProfileContent({ user, stats, reviews }: ProfileContentProps) {
  const { theme, toggleTheme, mounted } = useThemeContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      <div className="mt-6 flex items-center gap-4">
        <Avatar
          src={user.avatarUrl ?? undefined}
          name={fullName}
          size="lg"
          color="danger"
          showFallback
          className="h-16 w-16 text-xl"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground">{fullName}</h2>
          <p className="text-sm text-default-500">
            {user.course || "No course"} · Year {user.yearOfStudy || "-"}
          </p>
        </div>
        <Button isIconOnly variant="light" radius="lg" onPress={onOpen}>
          <IconEdit className="h-5 w-5" stroke={1.5} />
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Card className="bg-default-50">
          <CardBody className="p-4 text-center">
            <p className="text-xl font-bold text-foreground">{stats.itemsListed}</p>
            <p className="text-xs text-default-500">Listed</p>
          </CardBody>
        </Card>
        <Card className="bg-default-50">
          <CardBody className="p-4 text-center">
            <p className="text-xl font-bold text-foreground">{stats.itemsSold}</p>
            <p className="text-xs text-default-500">Sold</p>
          </CardBody>
        </Card>
        <Card className="bg-default-50">
          <CardBody className="p-4 text-center">
            <p className="text-xl font-bold text-foreground">
              {stats.rating > 0 ? stats.rating.toFixed(1) : "-"}
            </p>
            <p className="text-xs text-default-500">Rating</p>
          </CardBody>
        </Card>
      </div>

      {reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Reviews</h2>
          <div className="space-y-3">
            {reviews.map((review) => (
              <Card key={review.id} className="border border-default-200">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{review.reviewerName}</p>
                    <div className="flex items-center gap-1 text-warning">
                      <IconStar className="h-4 w-4" fill="currentColor" />
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm text-default-500">{review.comment}</p>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card className="mt-8 border border-default-200">
        <CardBody className="flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <IconMoon className="h-5 w-5 text-default-500" stroke={1.5} />
            ) : (
              <IconSun className="h-5 w-5 text-default-500" stroke={1.5} />
            )}
            <span className="font-medium text-foreground">Dark Mode</span>
          </div>
          {mounted && (
            <Switch isSelected={theme === "dark"} onValueChange={toggleTheme} color="danger" />
          )}
        </CardBody>
      </Card>

      <Button
        variant="bordered"
        color="danger"
        radius="lg"
        fullWidth
        startContent={<IconLogout className="h-5 w-5" stroke={1.5} />}
        onPress={signOut}
        className="mt-4"
      >
        Log Out
      </Button>

      <EditProfileModal user={user} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
