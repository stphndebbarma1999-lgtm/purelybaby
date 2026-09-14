import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { categoryIcons } from "@/lib/category-icons";
import type { Category } from "@/types";

export function ShopByCategory({ categories }: { categories: Category[] }) {
  return (
    <section id="categories" className="py-14 lg:py-20">
      <Container>
        <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-extrabold sm:text-3xl">
          Shop by Category
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 text-center transition-shadow hover:shadow-md"
            >
              <MediaPlaceholder
                src={category.imageUrl}
                alt={category.name}
                icon={categoryIcons[category.id] ?? ImageIcon}
                tint={category.bg}
                fill={false}
                className="aspect-square w-full rounded-xl"
              />
              <div>
                <p className="text-sm font-bold text-charcoal">{category.name}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Shop Now
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
