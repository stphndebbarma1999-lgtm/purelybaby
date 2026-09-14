import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { getProductsByCategory } from "@/config/products";
import { categories } from "@/config/homepage";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.id === slug);
  return { title: category ? category.name : "Category" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.id === slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);

  return (
    <>
      <PageHero title={category.name} description={`Shop all ${category.name} essentials.`} />
      <Container className="py-10 lg:py-14">
        <ProductGrid products={products} />
      </Container>
    </>
  );
}
