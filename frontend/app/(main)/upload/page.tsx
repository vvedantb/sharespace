"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCloudUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { categories, conditions } from "@/lib/mock-data";

export default function UploadPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = () => {
    if (images.length < 5) {
      setImages([...images, `image-${images.length + 1}`]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/marketplace");
    }, 1000);
  };

  const isFormValid = title && category && condition && price && description;

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Upload Item
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          List your item for other students to discover
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Item Images (up to 5)
          </label>
          <div className="grid grid-cols-5 gap-3">
            {images.map((_, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-900 overflow-hidden"
              >
                <div className="flex h-full items-center justify-center">
                  <IconPhoto className="h-8 w-8 text-gray-300 dark:text-neutral-600" stroke={1.5} />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                >
                  <IconX className="h-3 w-3" stroke={2} />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button
                type="button"
                onClick={handleImageUpload}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 flex items-center justify-center transition-colors hover:border-red-800 hover:bg-red-50 dark:hover:border-red-600 dark:hover:bg-red-900/20"
              >
                <IconCloudUpload className="h-6 w-6 text-gray-400 dark:text-gray-500" stroke={1.5} />
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            PNG, JPG up to 10MB each. First image will be the cover.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Calculus Textbook - 3rd Edition"
            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            >
              <option value="">Select category</option>
              {categories.filter(c => c.value !== "all").map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Condition *
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            >
              <option value="">Select condition</option>
              {conditions.filter(c => c.value !== "all").map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Price (£) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Course Code (optional)
            </label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g., COMP101"
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe your item, its condition, and any other details..."
            className="w-full resize-none rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-6 py-3 font-semibold text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex-1 rounded-xl bg-red-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Listing..." : "List Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
