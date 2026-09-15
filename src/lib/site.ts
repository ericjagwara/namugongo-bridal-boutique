import { useEffect, useState } from "react";

/**
 * One place for the business details used across the site.
 * Change a number or address here and every page updates.
 */
export const business = {
  name: "OZ Fashion House",
  whatsapp: "256701090109", // international format, no "+" or spaces
  phoneDisplay: "0701 090 109",
  phoneIntl: "+256 701 090 109",
  phoneHref: "tel:+256701090109",
  location: "Namugongo, Wakiso, Uganda",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Namugongo%2C+Wakiso%2C+Uganda",
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats a Uganda shilling amount, e.g. 1500000 -> "UGX 1,500,000". */
export function formatPrice(price?: number) {
  if (price === undefined) return "Price on request";
  return `UGX ${price.toLocaleString("en-UG")}`;
}

/** The site's own address, available after the page loads in the browser. */
export function useOrigin() {
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  return origin;
}
