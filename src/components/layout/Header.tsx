"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/config/site";
import { categories } from "@/config/homepage";
import { pastelBgClass } from "@/lib/pastel";

const CART_COUNT = 2;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="-ml-2 rounded-full p-2 text-charcoal hover:bg-cream lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.label === "Categories" ? (
              <div key={item.href} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-cream hover:text-primary"
                >
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                <div className="invisible absolute left-1/2 top-full z-20 w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-4 gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        className="flex flex-col items-center gap-2 rounded-xl p-2 text-center text-xs font-semibold text-charcoal hover:bg-cream"
                      >
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${pastelBgClass[cat.bg]}`}
                        >
                          <cat.icon size={20} className="text-charcoal/70" strokeWidth={1.75} />
                        </span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-cream hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full p-2 text-charcoal transition-colors hover:bg-cream hover:text-primary"
          >
            <Search size={20} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden rounded-full p-2 text-charcoal transition-colors hover:bg-cream hover:text-primary sm:inline-flex"
          >
            <User size={20} />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2 text-charcoal transition-colors hover:bg-cream hover:text-primary"
          >
            <ShoppingCart size={20} />
            {CART_COUNT > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                {CART_COUNT}
              </span>
            )}
          </Link>
        </div>
      </Container>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-charcoal/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col gap-1 overflow-y-auto bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-full p-2 text-charcoal hover:bg-cream"
              >
                <X size={20} />
              </button>
            </div>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-charcoal hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-charcoal hover:bg-cream"
            >
              <User size={18} /> My Account
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-charcoal hover:bg-cream"
            >
              <ShoppingCart size={18} /> Cart ({CART_COUNT})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
