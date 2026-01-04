"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Textarea, Card, CardBody } from "@heroui/react";
import { IconArrowLeft, IconShoppingBag } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { becomeSeller } from "@/lib/actions/sellers";

export default function SellerApplicationPage() {
  const router = useRouter();
  const [bio, setBio] = useState("");

  const becomeSellerMutation = useMutation({
    mutationFn: becomeSeller,
    onSuccess: () => router.push("/marketplace"),
  });

  const isSubmitting = becomeSellerMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    becomeSellerMutation.mutate({ bio });
  };

  const isFormValid = bio.length >= 30;

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

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-danger-100 p-3">
            <IconShoppingBag className="h-6 w-6 text-danger" stroke={2} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Become a Seller
            </h1>
            <p className="mt-1 text-default-500">
              Start listing your items on the marketplace
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card className="mb-8 border border-danger-200 bg-danger-50">
          <CardBody className="p-6">
            <h2 className="font-semibold text-danger">
              What You Can Sell
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-danger-600">
              <li>• Textbooks and course materials</li>
              <li>• Lecture notes and revision packs</li>
              <li>• Electronics and gadgets</li>
              <li>• Furniture and dorm essentials</li>
              <li>• Clothing and accessories</li>
            </ul>
          </CardBody>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            label="Seller Bio"
            value={bio}
            onValueChange={setBio}
            minRows={4}
            placeholder="Tell buyers about yourself and what you'll be selling..."
            variant="bordered"
            radius="lg"
            isRequired
            description={`${bio.length}/300 characters (minimum 30)`}
            classNames={{
              inputWrapper: "focus-within:border-danger focus-within:ring-danger/20",
            }}
          />

          <Card className="border border-default-200 bg-default-50">
            <CardBody className="p-4">
              <h3 className="font-medium text-foreground">Seller Guidelines</h3>
              <ul className="mt-2 space-y-1 text-sm text-default-600">
                <li className={bio.length >= 30 ? "text-success" : ""}>
                  ✓ Bio with at least 30 characters
                </li>
                <li className="text-success">
                  ✓ Verified university email
                </li>
                <li>• List items honestly with accurate descriptions</li>
                <li>• Respond to buyer messages promptly</li>
                <li>• Arrange safe pickup locations on campus</li>
              </ul>
            </CardBody>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="bordered"
              radius="lg"
              fullWidth
              onPress={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="danger"
              radius="lg"
              fullWidth
              isDisabled={!isFormValid}
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Start Selling"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
