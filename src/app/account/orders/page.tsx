import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "My Orders",
};

export default function OrdersPage() {
  return (
    <>
      <PageHero title="My Orders" />
      <Container className="flex flex-col items-center gap-4 py-16 text-center">
        <PackageSearch className="h-12 w-12 text-muted" strokeWidth={1.5} />
        <p className="text-sm font-semibold text-charcoal">Order history is coming soon</p>
        <p className="max-w-sm text-sm text-muted">
          Once accounts and checkout launch, your past orders will show up here.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </Container>
    </>
  );
}
