import { createClient } from "@/lib/supabase/public";
import type { Banner } from "@/types";

interface BannerRow {
  id: string;
  title: string;
  subtitle: string;
  cta_label: string;
  href: string;
  desktop_image_url: string;
  mobile_image_url: string;
}

export async function getBanners(): Promise<Banner[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("banners")
    .select("id, title, subtitle, cta_label, href, desktop_image_url, mobile_image_url")
    .eq("is_active", true)
    .order("sort_order");

  if (error || !data) return [];

  return (data as BannerRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    ctaLabel: row.cta_label,
    href: row.href,
    desktopImageUrl: row.desktop_image_url,
    mobileImageUrl: row.mobile_image_url,
  }));
}
