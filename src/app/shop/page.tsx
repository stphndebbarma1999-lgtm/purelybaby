import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { getAllProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Shop All Products",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  return (
    <>
      <PageHero
        title="Shop All Products"
        description="Every PurelyBaby essential, in one place."
      />
      <Container className="py-10 lg:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <ProductGrid products={products} />
      </Container>
    </>
  );
}
