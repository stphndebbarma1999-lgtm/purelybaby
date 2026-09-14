"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types";

export function WishlistView({ allProducts }: { allProducts: Product[] }) {
  const { productIds } = useWishlist();
  const products = allProducts.filter((product) => productIds.includes(product.id));

  if (products.length === 0) {
    return (
      <>
        <PageHero title="Your Wishlist" />
        <Container className="flex flex-col items-center gap-4 py-16 text-center">
          <Heart className="h-12 w-12 text-muted" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-charcoal">Your wishlist is empty</p>
          <p className="max-w-xs text-sm text-muted">
            Tap the heart on any product to save it here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Start Shopping
          </Link>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHero title="Your Wishlist" />
      <Container className="py-10 lg:py-14">
        <ProductGrid products={products} />
      </Container>
    </>
  );
}
