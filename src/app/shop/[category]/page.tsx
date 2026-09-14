import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { getProductsByCategory } from "@/lib/data/products";
import { getCategories, getCategoryBySlug } from "@/lib/data/categories";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  return { title: category ? category.name : "Category" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.id);

  return (
    <>
      <PageHero title={category.name} description={`Shop all ${category.name} essentials.`} />
      <Container className="py-10 lg:py-14">
        <ProductGrid products={products} />
      </Container>
    </>
  );
}
