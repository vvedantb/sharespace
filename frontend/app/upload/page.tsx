export default function UploadPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Upload Item
        </h1>
        <p className="mt-2 text-muted-foreground">
          List your item for other students to discover
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Item Image
          </label>
          <div className="flex aspect-video cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted transition-colors hover:border-red-800 hover:bg-red-50 dark:hover:border-red-600 dark:hover:bg-red-900/20">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g., Calculus Textbook - 3rd Edition"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20">
              <option value="">Select category</option>
              <option value="textbooks">Textbooks</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Condition
            </label>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20">
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
          <label className="mb-2 block text-sm font-medium text-foreground">
            Price (£)
          </label>
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe your item, its condition, and any other details..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 dark:focus:border-red-600 dark:focus:ring-red-600/20"
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

