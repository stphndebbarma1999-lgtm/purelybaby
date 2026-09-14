"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/admin";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    await deleteProduct(id);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label="Delete product"
      className="text-secondary hover:underline"
    >
      <Trash2 size={15} className="inline" />
    </button>
  );
}
