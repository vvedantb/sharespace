"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, Select, SelectItem, Card, CardBody } from "@heroui/react";
import { IconCloudUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { categories, conditions } from "@/lib/constants";
import { createItem } from "@/lib/actions/items";
import { uploadImages } from "@/lib/actions/images";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const uploadImagesMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      return uploadImages(formData);
    },
  });

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => router.push("/marketplace"),
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
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      imageUrls = await uploadImagesMutation.mutateAsync(imageFiles);
    }

    createItemMutation.mutate({
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      images: imageUrls,
      courseCode: courseCode || undefined,
    });
  };

  const isFormValid = title && category && condition && price && description;

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Upload Item
        </h1>
        <p className="mt-2 text-default-500">
          List your item for other students to discover
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
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
          <div className="grid grid-cols-5 gap-3">
            {imagePreviews.map((preview, index) => (
              <Card key={index} className="aspect-square overflow-hidden border border-default-200">
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
          label="Title"
          value={title}
          onValueChange={setTitle}
          placeholder="e.g., Calculus Textbook - 3rd Edition"
          variant="bordered"
          radius="lg"
          isRequired
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Category"
            selectedKeys={category ? [category] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected) setCategory(selected.toString());
            }}
            variant="bordered"
            radius="lg"
            isRequired
          >
            {categories.map((cat) => (
              <SelectItem key={cat.value}>{cat.label}</SelectItem>
            ))}
          </Select>

          <Select
            label="Condition"
            selectedKeys={condition ? [condition] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected) setCondition(selected.toString());
            }}
            variant="bordered"
            radius="lg"
            isRequired
          >
            {conditions.map((cond) => (
              <SelectItem key={cond.value}>{cond.label}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="number"
            label="Price (£)"
            value={price}
            onValueChange={setPrice}
            placeholder="0.00"
            min={0}
            step={0.01}
            variant="bordered"
            radius="lg"
            isRequired
          />

          <Input
            label="Course Code (optional)"
            value={courseCode}
            onValueChange={setCourseCode}
            placeholder="e.g., COMP101"
            variant="bordered"
            radius="lg"
          />
        </div>

        <Textarea
          label="Description"
          value={description}
          onValueChange={setDescription}
          minRows={4}
          placeholder="Describe your item, its condition, and any other details..."
          variant="bordered"
          radius="lg"
          isRequired
        />

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
            {isSubmitting ? "Listing..." : "List Item"}
          </Button>
        </div>
      </form>
    </div>
  );
}
