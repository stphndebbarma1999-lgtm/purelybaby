import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { FacebookGlyph, InstagramGlyph, YoutubeGlyph } from "@/components/ui/SocialIcons";
import { FooterAccordion } from "@/components/layout/FooterAccordion";
import {
  contactInfo,
  footerLinkGroups,
  paymentMethods,
  siteConfig,
  socialLinks,
} from "@/config/site";

const socialIcons: Record<string, typeof InstagramGlyph> = {
  Instagram: InstagramGlyph,
  Facebook: FacebookGlyph,
  YouTube: YoutubeGlyph,
};

export function Footer({
  logoUrl,
  siteName,
  siteDescription,
}: {
  logoUrl?: string;
  siteName?: string;
  siteDescription?: string;
}) {
  return (
    <footer className="border-t border-border bg-cream-dark">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.1fr_0.8fr_0.8fr_0.9fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo logoUrl={logoUrl} siteName={siteName} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteDescription || siteConfig.description}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-charcoal transition-colors hover:bg-primary hover:text-white"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </a>
              );
            })}
          </div>
        </div>

        {footerLinkGroups.map((group) => (
          <FooterAccordion key={group.title} title={group.title}>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>
        ))}

        <FooterAccordion title="Contact">
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>{contactInfo.email}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>{contactInfo.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>{contactInfo.address}</span>
            </li>
          </ul>
        </FooterAccordion>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteName || siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md border border-border bg-card px-2.5 py-1 font-semibold text-charcoal/70"
              >
                {method}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
