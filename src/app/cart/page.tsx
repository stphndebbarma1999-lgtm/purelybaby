"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, totalPrice, setQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <>
        <PageHero title="Your Cart" />
        <Container className="flex flex-col items-center gap-4 py-16 text-center">
          <ShoppingBag className="h-12 w-12 text-muted" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-charcoal">Your cart is empty</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Start Shopping
          </Link>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHero title="Your Cart" />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
        <div className="flex flex-col gap-4">
          {lines.map((line) => (
            <div
              key={line.productId}
              className="flex gap-4 rounded-xl border border-border bg-card p-3"
            >
              <MediaPlaceholder
                src={line.imageUrl}
                alt={line.title}
                tint="mint"
                fill={false}
                className="h-20 w-20 shrink-0 rounded-lg"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/product/${line.slug}`}
                    className="text-sm font-semibold text-charcoal hover:text-primary"
                  >
                    {line.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId)}
                    aria-label="Remove item"
                    className="text-muted hover:text-secondary"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.productId, line.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="p-2 text-charcoal hover:text-primary"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-xs font-bold">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.productId, line.quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-2 text-charcoal hover:text-primary"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-extrabold text-charcoal">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border border-border bg-card p-5">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
            Order Summary
          </h2>
          <div className="mt-4 flex items-center justify-between text-sm text-muted">
            <span>Subtotal</span>
            <span className="font-bold text-charcoal">{formatPrice(totalPrice)}</span>
          </div>
          <p className="mt-1 text-xs text-muted">Shipping and taxes calculated at checkout.</p>
          <button
            type="button"
            disabled
            title="Checkout isn't wired up yet"
            className="mt-5 w-full cursor-not-allowed rounded-full bg-primary/40 px-6 py-3 text-sm font-bold text-white"
          >
            Proceed to Checkout
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            Checkout &amp; payments are coming soon.
          </p>
        </div>
      </Container>
    </>
  );
}
