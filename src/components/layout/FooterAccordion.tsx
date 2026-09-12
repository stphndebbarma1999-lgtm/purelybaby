import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Native <details>/<summary> accordion for the footer's mobile layout.
 * Defaults to open so desktop always shows full content regardless of
 * viewport-resize edge cases; on mobile the summary can still be tapped
 * to collapse a section (lg:pointer-events-none keeps it static on desktop).
 */
export function FooterAccordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="group border-b border-border/70 py-3 lg:border-0 lg:py-0">
      <summary className="flex cursor-pointer list-none items-center justify-between font-[family-name:var(--font-heading)] text-sm font-bold text-charcoal marker:content-none lg:pointer-events-none lg:cursor-default [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          size={16}
          className="text-muted transition-transform group-open:rotate-180 lg:hidden"
        />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
