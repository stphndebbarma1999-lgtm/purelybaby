import type { Metadata } from "next";
import { WishlistView } from "@/components/account/WishlistView";
import { getAllProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "My Wishlist",
};

export default async function WishlistPage() {
  const allProducts = await getAllProducts();
  return <WishlistView allProducts={allProducts} />;
}
