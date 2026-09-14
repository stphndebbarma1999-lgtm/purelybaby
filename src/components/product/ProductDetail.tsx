"use client";

import { useState } from "react";
import { Check, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { StarRating } from "@/components/ui/StarRating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : null;

  function handleAddToCart() {
    addItem(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <MediaPlaceholder
        src={product.imageUrl}
        alt={product.title}
        tint="mint"
        fill={false}
        className="aspect-square w-full rounded-2xl border border-border"
      />

      <div>
        {product.badge && (
          <span className="mb-3 inline-block rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-white">
            {product.badge}
          </span>
        )}
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-extrabold sm:text-3xl">
          {product.title}
        </h1>
        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size={16} />
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-extrabold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-base text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm font-bold text-secondary">-{discountPct}%</span>
            </>
          )}
        </div>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{product.description}</p>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="p-2.5 text-charcoal hover:text-primary"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-bold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="p-2.5 text-charcoal hover:text-primary"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-charcoal/70 transition-colors hover:text-secondary"
          >
            <Heart size={18} className={wishlisted ? "fill-secondary text-secondary" : undefined} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark sm:w-auto"
        >
          {justAdded ? (
            <>
              <Check size={16} /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
