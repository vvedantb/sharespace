"use client";

import { useState, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Card,
  CardBody,
} from "@heroui/react";
import { IconCloudUpload, IconX } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categories, conditions } from "@/lib/constants";
import { createItem } from "@/lib/actions/items";
import { uploadMultipleToS3 } from "@/lib/upload";

const itemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  courseCode: z.string().optional(),
});

type ItemFormData = z.infer<typeof itemSchema>;

interface CreateItemModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateItemModal({ isOpen, onOpenChange }: CreateItemModalProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      category: "",
      condition: "",
      price: "",
      description: "",
      courseCode: "",
    },
  });

  const uploadImagesMutation = useMutation({
    mutationFn: (files: File[]) => uploadMultipleToS3(files, "items"),
  });

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      resetForm();
      onOpenChange(false);
    },
  });

  const isSubmitting = uploadImagesMutation.isPending || createItemMutation.isPending;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    for (let i = 0; i < files.length && imageFiles.length + newFiles.length < 5; i++) {
      newFiles.push(files[i]);
      newPreviews.push(URL.createObjectURL(files[i]));
    }

    setImageFiles([...imageFiles, ...newFiles]);
    setImagePreviews([...imagePreviews, ...newPreviews]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    reset();
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setImageFiles([]);
    setImagePreviews([]);
  };

  const onSubmit = async (data: ItemFormData) => {
    let imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      imageUrls = await uploadImagesMutation.mutateAsync(imageFiles);
    }

    createItemMutation.mutate({
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      condition: data.condition,
      images: imageUrls,
      courseCode: data.courseCode || undefined,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) resetForm();
        onOpenChange(open);
      }}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>List Item</ModalHeader>
          <ModalBody className="gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Item Images (up to 5)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                {imagePreviews.map((preview, index) => (
                  <Card key={index} className="aspect-square overflow-hidden border border-default-200" shadow="none">
                    <CardBody className="p-0 relative">
                      <img src={preview} alt="" className="h-full w-full object-cover" />
                      <Button
                        isIconOnly
                        size="sm"
                        color="default"
                        variant="solid"
                        className="absolute top-1 right-1 min-w-6 w-6 h-6"
                        onPress={() => removeImage(index)}
                      >
                        <IconX className="h-3 w-3" stroke={2} />
                      </Button>
                    </CardBody>
                  </Card>
                ))}
                {imagePreviews.length < 5 && (
                  <Button
                    variant="bordered"
                    className="aspect-square h-auto border-dashed"
                    onPress={() => fileInputRef.current?.click()}
                  >
                    <IconCloudUpload className="h-6 w-6 text-default-400" stroke={1.5} />
                  </Button>
                )}
              </div>
              <p className="mt-2 text-xs text-default-400">
                PNG, JPG up to 10MB each. First image will be the cover.
              </p>
            </div>

            <Input
              {...register("title")}
              label="Title"
              placeholder="e.g., Calculus Textbook - 3rd Edition"
              variant="bordered"
              radius="lg"
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Category"
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      field.onChange(selected?.toString() || "");
                    }}
                    variant="bordered"
                    radius="lg"
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                  >
                    {categories.map((cat) => (
                      <SelectItem key={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Condition"
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      field.onChange(selected?.toString() || "");
                    }}
                    variant="bordered"
                    radius="lg"
                    isInvalid={!!errors.condition}
                    errorMessage={errors.condition?.message}
                  >
                    {conditions.map((cond) => (
                      <SelectItem key={cond.value}>{cond.label}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                {...register("price")}
                type="number"
                label="Price (£)"
                placeholder="0.00"
                min={0}
                step={0.01}
                variant="bordered"
                radius="lg"
                isInvalid={!!errors.price}
                errorMessage={errors.price?.message}
              />

              <Input
                {...register("courseCode")}
                label="Course Code (optional)"
                placeholder="e.g., COMP101"
                variant="bordered"
                radius="lg"
              />
            </div>

            <Textarea
              {...register("description")}
              label="Description"
              minRows={3}
              placeholder="Describe your item, its condition, and any other details..."
              variant="bordered"
              radius="lg"
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="lg" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" color="danger" radius="lg" isLoading={isSubmitting}>
              {isSubmitting ? "Listing..." : "List Item"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
