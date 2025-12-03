import { IconCloudUpload } from "@tabler/icons-react";

export default function UploadPage() {
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

      <form className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Item Image
          </label>
          <div className="flex aspect-video cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 transition-colors hover:border-red-800 hover:bg-red-50 dark:hover:border-red-600 dark:hover:bg-red-900/20">
            <div className="text-center">
              <IconCloudUpload
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                stroke={1.5}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g., Calculus Textbook - 3rd Edition"
            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Category
            </label>
            <select className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20">
              <option value="">Select category</option>
              <option value="textbooks">Textbooks</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Condition
            </label>
            <select className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20">
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Price (£)
          </label>
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe your item, its condition, and any other details..."
            className="w-full resize-none rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-red-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-800"
        >
          List Item
        </button>
      </form>
    </div>
  );
}
