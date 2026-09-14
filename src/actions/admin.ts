"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ProductColor } from "@/types";

async function requireAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not authenticated");
  return supabase;
}

function revalidateStorefront() {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/new-arrivals");
  revalidatePath("/deals");
}

// --- Categories --------------------------------------------------------

export async function updateCategory(id: string, fields: { name: string; icon_url: string }) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("categories").update(fields).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

// --- Products ------------------------------------------------------------

export interface ProductInput {
  slug: string;
  title: string;
  description: string;
  image_url: string;
  images: string[];
  colors: ProductColor[];
  price: number;
  original_price: number | null;
  badge: string | null;
  category_id: string | null;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_active: boolean;
}

export async function createProduct(input: ProductInput) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").insert(input);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

export async function updateProduct(id: string, input: ProductInput) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
  revalidatePath(`/product/${input.slug}`);
}

export async function deleteProduct(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

// --- Testimonials --------------------------------------------------------

export interface TestimonialInput {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar_url: string;
  is_published: boolean;
}

export async function createTestimonial(input: TestimonialInput) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("testimonials").insert(input);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

export async function updateTestimonial(id: string, input: TestimonialInput) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("testimonials").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

export async function deleteTestimonial(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

// --- Banners ---------------------------------------------------------------

export interface BannerInput {
  title: string;
  subtitle: string;
  cta_label: string;
  href: string;
  desktop_image_url: string;
  mobile_image_url: string;
  is_active: boolean;
  sort_order: number;
}

export async function createBanner(input: BannerInput) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("banners").insert(input);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

export async function updateBanner(id: string, input: BannerInput) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("banners").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

export async function deleteBanner(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

// --- Site content ------------------------------------------------------

export async function updateContentBlock(key: string, data: object) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("content_blocks")
    .update({ data, updated_at: new Date().toISOString() })
    .eq("key", key);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}
