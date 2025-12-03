import { IconPhoto } from "@tabler/icons-react";

interface ItemCardProps {
  title: string;
  price: string;
}

export function ItemCard({ title, price }: ItemCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
        <IconPhoto className="h-16 w-16 text-gray-300 dark:text-neutral-700" stroke={1.5} />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-black dark:text-white truncate">
          {title}
        </h3>
        <p className="mt-1 text-lg font-bold text-red-800 dark:text-red-500">
          {price}
        </p>
      </div>
    </div>
  );
}
