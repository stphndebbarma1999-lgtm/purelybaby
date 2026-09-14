import { HeartHandshake, Lock, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type { TrustItem } from "@/types";

/**
 * Trust strip content. Kept as static code (not database-managed) since
 * these are fixed presentational claims tied to Lucide icons, not
 * editable marketing copy.
 */
export const trustItems: TrustItem[] = [
  { icon: ShieldCheck, title: "Quality Checked", description: "Baby-friendly materials" },
  { icon: Truck, title: "Free Shipping", description: "On qualifying orders" },
  { icon: RotateCcw, title: "Easy Returns", description: "Hassle-free returns" },
  { icon: Lock, title: "Secure Payments", description: "Protected checkout" },
  { icon: HeartHandshake, title: "Quality You Can Trust", description: "Thoughtfully selected products" },
];
