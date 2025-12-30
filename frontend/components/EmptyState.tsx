import { IconMoodEmpty } from "@tabler/icons-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-gray-300 dark:text-neutral-700">
        {icon || <IconMoodEmpty className="h-16 w-16" stroke={1.5} />}
      </div>
      <h3 className="text-lg font-semibold text-black dark:text-white">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
