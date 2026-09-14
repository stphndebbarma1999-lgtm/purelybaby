"use client";

import { useState } from "react";
import { contactInfo } from "@/config/site";

export function ContactForm() {
  const [tried, setTried] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTried(true);
      }}
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
    >
      <input
        type="text"
        required
        placeholder="Your name"
        className="w-full rounded-full border border-border bg-cream px-5 py-3 text-sm outline-none placeholder:text-muted"
      />
      <input
        type="email"
        required
        placeholder="Your email"
        className="w-full rounded-full border border-border bg-cream px-5 py-3 text-sm outline-none placeholder:text-muted"
      />
      <textarea
        required
        rows={4}
        placeholder="How can we help?"
        className="w-full rounded-2xl border border-border bg-cream px-5 py-3 text-sm outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
      >
        Send Message
      </button>
      {tried && (
        <p className="text-xs text-muted">
          This form isn&apos;t wired up to send messages yet — please email us directly at{" "}
          {contactInfo.email} in the meantime.
        </p>
      )}
    </form>
  );
}
