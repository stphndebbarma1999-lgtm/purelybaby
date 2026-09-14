import {
  Blocks,
  CarFront,
  Droplet,
  HeartHandshake,
  Layers,
  Moon,
  Shirt,
  Utensils,
  type LucideIcon,
} from "lucide-react";

// Presentation-only fallback glyph shown until a category has a real
// icon_url uploaded — not stored in the database.
export const categoryIcons: Record<string, LucideIcon> = {
  feeding: Utensils,
  diapering: Layers,
  "bath-skincare": Droplet,
  "baby-clothing": Shirt,
  nursery: Moon,
  "toys-learning": Blocks,
  "baby-gear": CarFront,
  "mom-care": HeartHandshake,
};
