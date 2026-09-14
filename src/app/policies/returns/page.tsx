import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/ui/InfoPage";

export const metadata: Metadata = {
  title: "Return Policy",
};

export default function ReturnPolicyPage() {
  return (
    <InfoPage title="Return Policy" description={`Last updated: ${new Date().getFullYear()}`}>
      <div>
        <h2>Eligibility</h2>
        <p className="mt-1.5">
          Items can be returned within 7 days of delivery if unused, unopened, and in their
          original packaging with tags intact.
        </p>
      </div>
      <div>
        <h2>Exceptions</h2>
        <p className="mt-1.5">
          Opened feeding, bath and skincare items can&apos;t be returned unless they arrived
          damaged or defective, for hygiene reasons.
        </p>
      </div>
      <div>
        <h2>Refunds</h2>
        <p className="mt-1.5">
          Approved returns are refunded to the original payment method within 5-7 business days
          of us receiving and inspecting the item.
        </p>
      </div>
      <div>
        <h2>How to Return an Item</h2>
        <p className="mt-1.5">
          See our{" "}
          <Link href="/returns" className="text-primary underline">
            Returns &amp; Exchanges
          </Link>{" "}
          page to get started.
        </p>
      </div>
    </InfoPage>
  );
}
