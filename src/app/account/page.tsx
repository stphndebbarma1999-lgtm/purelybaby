import type { Metadata } from "next";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/account/LogoutButton";

export const metadata: Metadata = {
  title: "My Account",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();
    isAdmin = profile?.is_admin ?? false;
  }

  if (!user) {
    return (
      <>
        <PageHero title="My Account" />
        <Container className="flex flex-col items-center gap-4 py-16 text-center">
          <UserCircle className="h-12 w-12 text-muted" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-charcoal">You&apos;re not logged in</p>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              Sign Up
            </Link>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHero title="My Account" />
      <Container className="max-w-sm py-10 text-center lg:py-14">
        <UserCircle className="mx-auto h-12 w-12 text-primary" strokeWidth={1.5} />
        <p className="mt-3 text-sm font-semibold text-charcoal">{user.email}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/account/orders"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary"
          >
            My Orders
          </Link>
          <Link
            href="/account/wishlist"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary"
          >
            My Wishlist
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-full bg-primary-light px-6 py-3 text-sm font-bold text-primary-dark hover:bg-primary/20"
            >
              Admin Dashboard
            </Link>
          )}
          <LogoutButton />
        </div>
      </Container>
    </>
  );
}
