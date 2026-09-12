import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviewCount,
  size = 14,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-gold text-gold" : "fill-border text-border"}
            />
          );
        })}
      </div>
      {typeof reviewCount === "number" && (
        <span className="text-xs text-muted">({reviewCount})</span>
      )}
    </div>
  );
}
