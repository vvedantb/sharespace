interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  showOnline?: boolean;
}

export function Avatar({ name, size = "md", showOnline }: AvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
  };

  const dotSizes = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-3.5 w-3.5",
  };

  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 ${sizeClasses[size]}`}
      >
        <span className="font-semibold text-red-800 dark:text-red-400">
          {initial}
        </span>
      </div>
      {showOnline && (
        <span
          className={`absolute bottom-0 right-0 rounded-full bg-green-500 ring-2 ring-white dark:ring-black ${dotSizes[size]}`}
        />
      )}
    </div>
  );
}
