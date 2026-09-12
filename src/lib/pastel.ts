import type { PastelBg } from "@/types";

// Tailwind's scanner needs literal class strings, so dynamic
// `bg-pastel-${bg}` interpolation must be avoided in components — use
// this lookup instead wherever a category's pastel tone picks a class.
export const pastelBgClass: Record<PastelBg, string> = {
  yellow: "bg-pastel-yellow",
  mint: "bg-pastel-mint",
  pink: "bg-pastel-pink",
  blue: "bg-pastel-blue",
  peach: "bg-pastel-peach",
};
