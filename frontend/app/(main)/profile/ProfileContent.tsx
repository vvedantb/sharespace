"use client";

import Link from "next/link";
import { Avatar, Button, Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Switch, Tooltip, useDisclosure } from "@heroui/react";
import { IconEdit, IconLogout, IconMoon, IconSun, IconStar, IconSparkles, IconShoppingBag } from "@tabler/icons-react";
import { signOut } from "@/lib/cognito";
import { useThemeContext } from "@/components/contexts/ThemeContext";
import { User, Review, UserBadge } from "@/lib/types";
import { EditProfileModal } from "./EditProfileModal";
import { BecomeMentorModal } from "@/components/BecomeMentorModal";
import { BecomeSellerModal } from "@/components/BecomeSellerModal";
import { BadgeDisplay } from "@/components/BadgeDisplay";

interface ProfileContentProps {
  user: User;
  rating: number;
  reviews: Review[];
  isMentor?: boolean;
  mentorProfileId?: string;
  mentorStatus?: "PENDING" | "APPROVED" | "REJECTED" | null;
  isSeller?: boolean;
  badges: UserBadge[];
  points: number;
}

export function ProfileContent({ user, rating, reviews, isMentor, mentorProfileId, mentorStatus, isSeller, badges, points }: ProfileContentProps) {
  const { theme, toggleTheme, mounted } = useThemeContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isMentorModalOpen, onOpen: onMentorModalOpen, onOpenChange: onMentorModalOpenChange } = useDisclosure();
  const { isOpen: isSellerModalOpen, onOpen: onSellerModalOpen, onOpenChange: onSellerModalOpenChange } = useDisclosure();
  const { isOpen: isLogoutModalOpen, onOpen: onLogoutModalOpen, onOpenChange: onLogoutModalOpenChange } = useDisclosure();
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
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">{fullName}</h2>
            {rating > 0 && (
              <div className="flex items-center gap-1 text-warning">
                <IconStar className="h-4 w-4" fill="currentColor" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-default-500">
            {user.course || "No course"} · Year {user.yearOfStudy || "-"}
          </p>
        </div>
        <Tooltip content="Edit Profile">
          <Button isIconOnly variant="light" radius="lg" onPress={onOpen}>
            <IconEdit className="h-5 w-5" stroke={1.5} />
          </Button>
        </Tooltip>
        <Tooltip content="Log Out">
          <Button isIconOnly variant="light" radius="lg" color="danger" onPress={onLogoutModalOpen}>
            <IconLogout className="h-5 w-5" stroke={1.5} />
          </Button>
        </Tooltip>
      </div>


      <div className="mt-6 grid grid-cols-2 gap-4">
        {isMentor ? (
          <Card className="border border-success-200 bg-success-50" shadow="none">
            <CardBody className="p-4 flex flex-row items-center gap-3">
              <IconSparkles className="h-6 w-6 text-success-600" />
              <div className="flex-1">
                <p className="font-medium text-success-700">Mentor</p>
                <Link href={`/mentors/${mentorProfileId}`} className="text-xs text-success-600 hover:underline">
                  View Profile
                </Link>
              </div>
            </CardBody>
          </Card>
        ) : mentorStatus === "PENDING" ? (
          <Card className="border border-warning-200 bg-warning-50" shadow="none">
            <CardBody className="p-4 flex flex-row items-center gap-3">
              <IconSparkles className="h-6 w-6 text-warning-600" />
              <div className="flex-1">
                <p className="font-medium text-warning-700">Mentor Application</p>
                <p className="text-xs text-warning-600">Pending Review</p>
              </div>
            </CardBody>
          </Card>
        ) : mentorStatus === "REJECTED" ? (
          <Card className="border border-danger-200 bg-danger-50" shadow="none">
            <CardBody className="p-4 flex flex-row items-center gap-3">
              <IconSparkles className="h-6 w-6 text-danger-600" />
              <div className="flex-1">
                <p className="font-medium text-danger-700">Application Rejected</p>
                <p className="text-xs text-danger-600">You can reapply</p>
              </div>
              <Button size="sm" color="danger" variant="flat" onPress={onMentorModalOpen}>
                Reapply
              </Button>
            </CardBody>
          </Card>
        ) : (
          <Card className="border border-default-200" shadow="none">
            <CardBody className="p-4 flex flex-row items-center gap-3">
              <IconSparkles className="h-6 w-6 text-default-400" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Become a Mentor</p>
                <p className="text-xs text-default-500">Help other students</p>
              </div>
              <Button size="sm" color="danger" variant="flat" onPress={onMentorModalOpen}>
                Apply
              </Button>
            </CardBody>
          </Card>
        )}
        {isSeller ? (
          <Card className="border border-success-200 bg-success-50" shadow="none">
            <CardBody className="p-4 flex flex-row items-center gap-3">
              <IconShoppingBag className="h-6 w-6 text-success-600" />
              <div className="flex-1">
                <p className="font-medium text-success-700">Seller</p>
                <Link href="/marketplace" className="text-xs text-success-600 hover:underline">
                  View Listings
                </Link>
              </div>
            </CardBody>
          </Card>
        ) : (
          <Card className="border border-default-200" shadow="none">
            <CardBody className="p-4 flex flex-row items-center gap-3">
              <IconShoppingBag className="h-6 w-6 text-default-400" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Become a Seller</p>
                <p className="text-xs text-default-500">List your items</p>
              </div>
              <Button size="sm" color="danger" variant="flat" onPress={onSellerModalOpen}>
                Apply
              </Button>
            </CardBody>
          </Card>
        )}
      </div>

      <div className="mt-6">
        <BadgeDisplay badges={badges} points={points} />
      </div>

      {reviews.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Reviews</h2>
          <div className="space-y-3">
            {reviews.map((review) => (
              <Card key={review.id} className="border border-default-200" shadow="none">
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

      <Card className="mt-8 border border-default-200" shadow="none">
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

      <EditProfileModal user={user} isOpen={isOpen} onOpenChange={onOpenChange} />
      {!isMentor && mentorStatus !== "PENDING" && (
        <BecomeMentorModal
          isOpen={isMentorModalOpen}
          onOpenChange={onMentorModalOpenChange}
          userYearOfStudy={user.yearOfStudy}
        />
      )}
      {!isSeller && <BecomeSellerModal isOpen={isSellerModalOpen} onOpenChange={onSellerModalOpenChange} />}
      <Modal isOpen={isLogoutModalOpen} onOpenChange={onLogoutModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Log Out</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to log out?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>Cancel</Button>
                <Button color="danger" onPress={signOut}>Log Out</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
