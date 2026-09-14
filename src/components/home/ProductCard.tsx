"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { StarRating } from "@/components/ui/StarRating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : null;

  function handleAddToCart() {
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="relative block">
        <MediaPlaceholder
          src={product.imageUrl}
          alt={product.title}
          tint="mint"
          fill={false}
          className="aspect-square w-full"
        />
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-charcoal/60 shadow-sm transition-colors hover:text-secondary"
        >
          <Heart size={16} className={wishlisted ? "fill-secondary text-secondary" : undefined} />
        </button>
        {(product.badge || discountPct) && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-white">
            {product.badge ?? `-${discountPct}%`}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-charcoal hover:text-primary"
        >
          {product.title}
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="text-base font-extrabold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-primary px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          {justAdded ? (
            <>
              <Check size={14} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
