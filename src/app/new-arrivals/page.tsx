import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { getNewArrivals } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "New Arrivals",
};

export default async function NewArrivalsPage() {
  const newArrivals = await getNewArrivals();

  return (
    <>
      <PageHero title="New Arrivals" description="Just landed at PurelyBaby." />
      <Container className="py-10 lg:py-14">
        <ProductGrid products={newArrivals} />
      </Container>
    </>
  );
}
