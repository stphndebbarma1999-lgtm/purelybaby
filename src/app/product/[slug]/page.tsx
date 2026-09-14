import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/home/ProductGrid";
import { allProducts, getProductBySlug, getRelatedProducts } from "@/config/products";

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? product.title : "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <Container className="py-10 lg:py-14">
      <ProductDetail product={product} />

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold">
            You might also like
          </h2>
          <ProductGrid products={related} />
        </div>
      )}
    </Container>
  );
}
