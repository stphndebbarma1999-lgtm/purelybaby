import type { Metadata } from "next";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "My Account",
};

export default function AccountPage() {
  return (
    <>
      <PageHero title="My Account" />
      <Container className="flex flex-col items-center gap-4 py-16 text-center">
        <UserCircle className="h-12 w-12 text-muted" strokeWidth={1.5} />
        <p className="text-sm font-semibold text-charcoal">Accounts are coming soon</p>
        <p className="max-w-sm text-sm text-muted">
          Sign-in, order history and saved addresses will live here once accounts launch. Your
          cart and wishlist already work without one — they&apos;re saved on this device.
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
