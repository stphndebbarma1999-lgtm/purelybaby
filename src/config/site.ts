import type { LinkGroup, NavLink } from "@/types";

/**
 * Site-wide configuration. Intended to eventually be editable from an
 * admin panel without touching code — every field here is a candidate
 * for a future CMS/admin form.
 */
export const siteConfig = {
  name: "PURELYBABY",
  domain: "purelybaby.shop",
  description:
    "Thoughtfully selected baby essentials for feeding, play, sleep, travel and everyday care.",
  logo: {
    // Centralized so a Sirv-hosted logo URL can be dropped in later.
    imageUrl: "",
    text: "PurelyBaby",
  },
  announcementBar: {
    enabled: true,
    message: "Free Shipping on Orders Over ₹999  |  10% Off Your First Order — Code: PURELY10",
  },
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "#categories" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Deals", href: "/deals" },
];

export const footerLinkGroups: LinkGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "Feeding", href: "/shop/feeding" },
      { label: "Diapering", href: "/shop/diapering" },
      { label: "Bath & Skincare", href: "/shop/bath-skincare" },
      { label: "Baby Clothing", href: "/shop/baby-clothing" },
      { label: "Nursery", href: "/shop/nursery" },
      { label: "Toys & Learning", href: "/shop/toys-learning" },
      { label: "Baby Gear", href: "/shop/baby-gear" },
      { label: "Mom Care", href: "/shop/mom-care" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping-info" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Track Your Order", href: "/track-order" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Orders", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
      { label: "Cart", href: "/cart" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms & Conditions", href: "/policies/terms" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "Return Policy", href: "/policies/returns" },
    ],
  },
];

export const contactInfo = {
  email: "hello@purelybaby.shop",
  phone: "+91 98765 43210",
  address: "Bengaluru, Karnataka, India",
};

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

// Only list methods that are actually wired up to a payment gateway.
export const paymentMethods = ["UPI", "Cards", "Net Banking", "COD"];
