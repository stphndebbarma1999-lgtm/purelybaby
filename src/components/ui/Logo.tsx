import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({
  className = "",
  logoUrl = "",
  siteName = siteConfig.name,
}: {
  className?: string;
  logoUrl?: string;
  siteName?: string;
}) {
  if (logoUrl) {
    return (
      <Link href="/" className={`inline-flex items-center ${className}`}>
        <Image
          src={logoUrl}
          alt={siteName}
          width={160}
          height={40}
          className="h-9 w-auto"
          priority
        />
      </Link>
    );
  }

  // Temporary text wordmark placeholder until a logo image is uploaded.
  return (
    <Link
      href="/"
      className={`font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight ${className}`}
    >
      <span className="text-primary">Purely</span>
      <span className="text-secondary">Baby</span>
    </Link>
  );
}
