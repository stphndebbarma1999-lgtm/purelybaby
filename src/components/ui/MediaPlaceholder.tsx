import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { pastelBgClass } from "@/lib/pastel";
import type { PastelBg } from "@/types";

/**
 * Renders a remote image when `src` is provided, otherwise a soft themed
 * placeholder. Lets every image slot (hero, category, product, avatar) stay
 * wired to a config field that starts empty and later takes a Sirv URL.
 */
export function MediaPlaceholder({
  src,
  alt,
  icon: Icon = ImageIcon,
  tint = "mint",
  className = "",
  sizes,
  fill = true,
}: {
  src?: string;
  alt: string;
  icon?: LucideIcon;
  tint?: PastelBg;
  className?: string;
  sizes?: string;
  fill?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${pastelBgClass[tint]} ${className}`}
    >
      <Icon className="h-1/3 w-1/3 text-charcoal/25" strokeWidth={1.5} />
    </div>
  );
}
