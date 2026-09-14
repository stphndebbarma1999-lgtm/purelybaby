import type { Metadata } from "next";
import { Search } from "lucide-react";
import { InfoPage } from "@/components/ui/InfoPage";
import { contactInfo } from "@/config/site";

export const metadata: Metadata = {
  title: "Track Your Order",
};

export default function TrackOrderPage() {
  return (
    <InfoPage
      title="Track Your Order"
      description="Online order tracking is launching soon, alongside accounts and checkout."
    >
      <form className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          disabled
          placeholder="Order number"
          className="w-full rounded-full border border-border bg-cream px-5 py-3 text-sm text-muted outline-none"
        />
        <button
          type="submit"
          disabled
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-primary/40 px-6 py-3 text-sm font-bold text-white"
        >
          <Search size={16} />
          Track
        </button>
      </form>
      <p>
        In the meantime, email {contactInfo.email} or call {contactInfo.phone} with your order
        details and we&apos;ll share the latest status.
      </p>
    </InfoPage>
  );
}
