import type { LucideIcon } from "lucide-react";

export type PastelBg = "yellow" | "mint" | "pink" | "blue" | "peach";

export interface NavLink {
  label: string;
  href: string;
}

export interface LinkGroup {
  title: string;
  links: NavLink[];
}

export interface Category {
  id: string;
  name: string;
  href: string;
  imageUrl: string;
  bg: PastelBg;
  icon: LucideIcon;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  categorySlug: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroConfig {
  eyebrow?: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
  imageUrl: string;
}
