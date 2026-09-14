import { PackageOpen } from "lucide-react";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
        <PackageOpen className="h-10 w-10 text-muted" strokeWidth={1.5} />
        <p className="text-sm font-semibold text-charcoal">No products here yet</p>
        <p className="max-w-xs text-sm text-muted">
          We&apos;re still stocking this section — check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
