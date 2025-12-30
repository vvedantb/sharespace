import { IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function RatingStars({ rating, size = "md", showValue = true }: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <IconStarFilled
          key={i}
          className={`${sizeClasses[size]} text-yellow-500`}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <IconStarHalfFilled
          key={i}
          className={`${sizeClasses[size]} text-yellow-500`}
        />
      );
    } else {
      stars.push(
        <IconStar
          key={i}
          className={`${sizeClasses[size]} text-gray-300 dark:text-neutral-600`}
          stroke={1.5}
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
