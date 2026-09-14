import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { allProducts } from "@/config/products";

export const metadata: Metadata = {
  title: "Deals",
};

export default function DealsPage() {
  const deals = allProducts.filter(
    (product) => product.originalPrice && product.originalPrice > product.price
  );

  return (
    <>
      <PageHero title="Deals" description="Current markdowns across PurelyBaby essentials." />
      <Container className="py-10 lg:py-14">
        <ProductGrid products={deals} />
      </Container>
    </>
  );
}
