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
import type { Category, HeroConfig, Testimonial, TrustItem } from "@/types";
import { allProducts } from "@/config/products";

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

export const bestSellers = allProducts.filter((product) => product.isBestSeller);

export const newArrivals = allProducts.filter((product) => product.isNewArrival);

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
