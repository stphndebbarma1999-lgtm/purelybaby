import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Anonymous, cookie-free client for public reads (categories, products,
 * testimonials, banners, content blocks). Safe to call from anywhere,
 * including generateStaticParams/build time, unlike the cookie-bound
 * client in server.ts which requires an active request context.
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
