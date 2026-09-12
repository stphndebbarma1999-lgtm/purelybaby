import type { SVGProps } from "react";

/**
 * lucide-react no longer ships brand/logo icons, so these are small
 * original glyphs representing each platform (not a trace of any
 * trademarked logo) for use in the footer's social row.
 */

export function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M13.5 20v-6.5h2l.4-2.5h-2.4V9.3c0-.75.25-1.3 1.35-1.3h1.2V5.8c-.2 0-1-.1-1.9-.1-1.9 0-3.15 1.15-3.15 3.25v1.9H9v2.5h2v6.5" />
    </svg>
  );
}

export function YoutubeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
