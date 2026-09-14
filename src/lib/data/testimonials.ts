import { createClient } from "@/lib/supabase/public";
import type { Testimonial } from "@/types";

interface TestimonialRow {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  avatar_url: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, role, quote, rating, avatar_url")
    .eq("is_published", true)
    .order("sort_order");

  if (error || !data) return [];

  return (data as TestimonialRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role ?? undefined,
    quote: row.quote,
    rating: row.rating,
    avatarUrl: row.avatar_url,
  }));
}
