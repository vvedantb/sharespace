interface ItemCardProps {
  title: string;
  price: string;
}

export function ItemCard({ title, price }: ItemCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square bg-muted flex items-center justify-center">
        <svg
          className="h-16 w-16 text-muted-foreground/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-card-foreground truncate">{title}</h3>
        <p className="mt-1 text-lg font-bold text-red-800 dark:text-red-500">
          {price}
        </p>
      </div>
    </div>
  );
}

