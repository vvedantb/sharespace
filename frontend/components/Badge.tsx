import { IconCheck, IconSchool, IconStar } from "@tabler/icons-react";

type BadgeVariant = "mentor" | "verified" | "recommended" | "new" | "sold";

interface BadgeProps {
  variant: BadgeVariant;
  size?: "sm" | "md";
}

export function Badge({ variant, size = "md" }: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  const variants = {
    mentor: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-400",
      icon: <IconSchool className={iconSize} stroke={2} />,
      label: "Mentor",
    },
    verified: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      icon: <IconCheck className={iconSize} stroke={2} />,
      label: "Verified",
    },
    recommended: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-400",
      icon: <IconStar className={iconSize} stroke={2} />,
      label: "Mentor Pick",
    },
    new: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      icon: null,
      label: "New",
    },
    sold: {
      bg: "bg-gray-100 dark:bg-neutral-800",
      text: "text-gray-600 dark:text-gray-400",
      icon: null,
      label: "Sold",
    },
  };

  const v = variants[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${v.bg} ${v.text}`}
    >
      {v.icon}
      {v.label}
    </span>
  );
}
