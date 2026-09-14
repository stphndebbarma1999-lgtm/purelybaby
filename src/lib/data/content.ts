import { createClient } from "@/lib/supabase/public";

export interface SiteContent {
  logoUrl: string;
  name: string;
  description: string;
}

export interface AnnouncementBarContent {
  enabled: boolean;
  message: string;
}

export interface HeroContent {
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
}

export interface NewsletterContent {
  heading: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
}

const defaults = {
  site: { logoUrl: "", name: "PurelyBaby", description: "" } satisfies SiteContent,
  announcement_bar: { enabled: false, message: "" } satisfies AnnouncementBarContent,
  hero: {
    titleLine1: "Little Things,",
    titleLine2: "Big Happiness",
    description: "",
    primaryButtonLabel: "Shop Now",
    primaryButtonHref: "/shop",
    secondaryButtonLabel: "Explore Categories",
    secondaryButtonHref: "/#categories",
  } satisfies HeroContent,
  newsletter: {
    heading: "Let's Stay in Touch!",
    description: "",
    placeholder: "Enter your email address",
    buttonLabel: "Subscribe",
  } satisfies NewsletterContent,
};

export async function getContentBlock<K extends keyof typeof defaults>(
  key: K
): Promise<(typeof defaults)[K]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("content_blocks")
    .select("data")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) return defaults[key];
  return { ...defaults[key], ...(data.data as object) };
}
