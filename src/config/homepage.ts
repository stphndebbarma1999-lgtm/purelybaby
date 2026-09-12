import {
  Blocks,
  CarFront,
  Droplet,
  HeartHandshake,
  Layers,
  Lock,
  Moon,
  RotateCcw,
  Shirt,
  ShieldCheck,
  Truck,
  Utensils,
} from "lucide-react";
import type { Category, HeroConfig, Product, Testimonial, TrustItem } from "@/types";

/**
 * Homepage content configuration. Every section below is written so it can
 * later be swapped for data fetched from an admin-managed source without
 * changing the components that render it. Image URLs are left blank until
 * real Sirv asset URLs are supplied — components fall back to a themed
 * placeholder when a URL is empty.
 */

export const heroConfig: HeroConfig = {
  eyebrow: "",
  titleLine1: "Little Things,",
  titleLine2: "Big Happiness",
  description:
    "Cute, thoughtful & high-quality essentials for your baby's everyday moments.",
  primaryButton: { label: "Shop Now", href: "/shop" },
  secondaryButton: { label: "Explore Categories", href: "#categories" },
  imageUrl: "",
};

export const categories: Category[] = [
  { id: "feeding", name: "Feeding", href: "/shop/feeding", imageUrl: "", bg: "mint", icon: Utensils },
  { id: "diapering", name: "Diapering", href: "/shop/diapering", imageUrl: "", bg: "pink", icon: Layers },
  { id: "bath-skincare", name: "Bath & Skincare", href: "/shop/bath-skincare", imageUrl: "", bg: "blue", icon: Droplet },
  { id: "baby-clothing", name: "Baby Clothing", href: "/shop/baby-clothing", imageUrl: "", bg: "yellow", icon: Shirt },
  { id: "nursery", name: "Nursery", href: "/shop/nursery", imageUrl: "", bg: "peach", icon: Moon },
  { id: "toys-learning", name: "Toys & Learning", href: "/shop/toys-learning", imageUrl: "", bg: "mint", icon: Blocks },
  { id: "baby-gear", name: "Baby Gear", href: "/shop/baby-gear", imageUrl: "", bg: "pink", icon: CarFront },
  { id: "mom-care", name: "Mom Care", href: "/shop/mom-care", imageUrl: "", bg: "blue", icon: HeartHandshake },
];

export const bestSellers: Product[] = [
  { id: "bs-1", slug: "organic-cotton-onesie", title: "Organic Cotton Onesie", imageUrl: "", price: 599, originalPrice: 799, rating: 4.8, reviewCount: 154 },
  { id: "bs-2", slug: "silicone-feeding-set", title: "Silicone Feeding Set", imageUrl: "", price: 899, rating: 4.6, reviewCount: 96 },
  { id: "bs-3", slug: "wooden-stacking-toy", title: "Wooden Stacking Toy", imageUrl: "", price: 749, rating: 4.7, reviewCount: 128 },
  { id: "bs-4", slug: "leak-proof-sippy-cup", title: "Leak-Proof Sippy Cup", imageUrl: "", price: 449, originalPrice: 549, rating: 4.5, reviewCount: 87 },
  { id: "bs-5", slug: "baby-muslin-swaddle", title: "Baby Muslin Swaddle Blanket", imageUrl: "", price: 649, rating: 4.6, reviewCount: 112 },
  { id: "bs-6", slug: "diaper-caddy-organizer", title: "Diaper Caddy Organizer", imageUrl: "", price: 999, rating: 4.4, reviewCount: 79 },
];

export const newArrivals: Product[] = [
  { id: "na-1", slug: "bamboo-baby-comb-set", title: "Bamboo Baby Comb Set", imageUrl: "", price: 349, rating: 4.7, reviewCount: 21, badge: "New" },
  { id: "na-2", slug: "nursery-night-lamp", title: "Nursery Night Lamp", imageUrl: "", price: 1199, rating: 4.9, reviewCount: 14, badge: "New" },
  { id: "na-3", slug: "baby-grooming-kit", title: "Baby Grooming Kit", imageUrl: "", price: 799, rating: 4.6, reviewCount: 33, badge: "New" },
  { id: "na-4", slug: "cotton-muslin-wraps", title: "Cotton Muslin Wraps (Pack of 3)", imageUrl: "", price: 899, rating: 4.8, reviewCount: 19, badge: "New" },
];

export const trustItems: TrustItem[] = [
  { icon: ShieldCheck, title: "Quality Checked", description: "Baby-friendly materials" },
  { icon: Truck, title: "Free Shipping", description: "On qualifying orders" },
  { icon: RotateCcw, title: "Easy Returns", description: "Hassle-free returns" },
  { icon: Lock, title: "Secure Payments", description: "Protected checkout" },
  { icon: HeartHandshake, title: "Quality You Can Trust", description: "Thoughtfully selected products" },
];

// Placeholder/demo content — replace with verified customer testimonials
// before this section goes live.
export const testimonialsAreDemo = true;

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Ananya S.",
    role: "Mom of 1",
    quote:
      "PurelyBaby has become our go-to store. The quality is lovely and my little one loves every toy.",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: "t-2",
    name: "Rahul K.",
    role: "Dad of 2",
    quote:
      "Everything feels well made and safe. Shipping was fast and customer service was genuinely helpful.",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: "t-3",
    name: "Priya M.",
    role: "Mom of 1",
    quote:
      "Finally a store I trust for my little one's everyday essentials. Highly recommend PurelyBaby to other parents.",
    rating: 5,
    avatarUrl: "",
  },
];

export const newsletterConfig = {
  heading: "Let's Stay in Touch!",
  description:
    "Subscribe for special offers, new arrivals and parenting-friendly product updates.",
  placeholder: "Enter your email address",
  buttonLabel: "Subscribe",
};
