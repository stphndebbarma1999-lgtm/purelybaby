import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { getDeals } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Deals",
};

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <>
      <PageHero title="Deals" description="Current markdowns across PurelyBaby essentials." />
      <Container className="py-10 lg:py-14">
        <ProductGrid products={deals} />
      </Container>
    </>
  );
}
