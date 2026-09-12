import Link from "next/link";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/types";

export function ProductSection({
  heading,
  products,
  viewAllHref,
  accent = false,
}: {
  heading: string;
  products: Product[];
  viewAllHref?: string;
  accent?: boolean;
}) {
  return (
    <section className="py-10 lg:py-14">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold sm:text-3xl">
            {heading}
            {accent && <Heart size={18} className="fill-secondary text-secondary" />}
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm font-bold text-primary hover:text-primary-dark"
            >
              View All Products →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
