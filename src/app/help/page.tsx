import type { Metadata } from "next";
import { InfoPage } from "@/components/ui/InfoPage";
import { contactInfo } from "@/config/site";

export const metadata: Metadata = {
  title: "Help Center",
};

const faqs = [
  {
    q: "How do I place an order?",
    a: "Add items to your cart from any product page, then head to your cart to review quantities. Full checkout is launching soon — for now, reach out to us directly and we'll help you complete a purchase.",
  },
  {
    q: "What are your delivery times?",
    a: "Most orders ship within 2-3 business days. See our Shipping Info page for details.",
  },
  {
    q: "Can I change or cancel my order?",
    a: `Contact us as soon as possible at ${contactInfo.email} or ${contactInfo.phone} and we'll do our best to help before it ships.`,
  },
  {
    q: "Do you ship across India?",
    a: "Yes, we ship nationwide. Delivery times vary slightly by location.",
  },
];

export default function HelpPage() {
  return (
    <InfoPage
      title="Help Center"
      description="Answers to common questions. Can't find what you need? Reach out any time."
    >
      {faqs.map((item) => (
        <div key={item.q}>
          <h2>{item.q}</h2>
          <p className="mt-1.5">{item.a}</p>
        </div>
      ))}
    </InfoPage>
  );
}
