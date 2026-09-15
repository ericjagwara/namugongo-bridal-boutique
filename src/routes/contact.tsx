import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarHeart, MapPin, MessageCircle, Phone } from "lucide-react";

import { business, whatsappLink } from "../lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visits | OZ Fashion House, Namugongo, Wakiso" },
      {
        name: "description",
        content: `Contact OZ Fashion House on WhatsApp (${business.phoneDisplay}) for bridal gowns, groom tuxedos, bridesmaid dresses and accessories. Visit us in Namugongo, Wakiso.`,
      },
      { property: "og:title", content: "Contact OZ Fashion House" },
      { property: "og:description", content: "Plan your visit or chat with us on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const quickMessages = [
  {
    label: "Book a bridal consultation",
    text: "Hello OZ Fashion House, I'd like to book a bridal consultation. My wedding date is: ",
  },
  {
    label: "Groom & groomsmen suits",
    text: "Hello OZ Fashion House, I'm looking for suits for the groom and groomsmen. We are ___ people and the wedding is on: ",
  },
  {
    label: "Bridesmaid dresses",
    text: "Hello OZ Fashion House, I'd like to order bridesmaid dresses for ___ bridesmaids. Our colours are: ",
  },
  { label: "Accessories", text: "Hello OZ Fashion House, I'm looking for wedding accessories: " },
  {
    label: "Arrange a visit",
    text: "Hello OZ Fashion House, I'd like to visit you in Namugongo. Which days are available?",
  },
];

const faqs = [
  {
    q: "How do I place an order?",
    a: "Choose pieces in the shop, pick sizes and colours, and tap “Order on WhatsApp”, or add several pieces to your bag and send them in one message. We reply to confirm everything before any work begins.",
  },
  {
    q: "Why is the price “on request”?",
    a: "Many pieces are made to measure, so the price depends on the design, fabric and quantity. We confirm the exact price with you on WhatsApp.",
  },
  {
    q: "Can I order for my whole bridal party?",
    a: "Yes. Use the group order options for bridesmaids and groomsmen, set the quantity, and send us each person’s size or measurements.",
  },
  {
    q: "What if I don’t know my size?",
    a: "Choose “Custom measurements”. We can take your measurements when you visit, or guide you on WhatsApp.",
  },
  {
    q: "Can I visit before ordering?",
    a: "Of course. Message us on WhatsApp to arrange a time to visit us in Namugongo.",
  },
];

function ContactPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="page-intro-inner">
          <p className="kicker">Contact & visits</p>
          <h1 className="page-title">Let’s plan your wedding look.</h1>
          <p className="page-lead">
            WhatsApp is the quickest way to reach us. Tell us your wedding date and what you’re
            looking for, and we’ll take it from there.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="on-ink bg-ink p-7 text-ivory sm:p-12">
            <h2 className="text-4xl sm:text-5xl">Chat with us on WhatsApp</h2>
            <p className="mt-4 max-w-lg leading-7 text-hero-muted">
              Pick a topic to start a message, then add your details before sending.
            </p>
            <div className="mt-8 grid gap-2">
              {quickMessages.map((m) => (
                <a
                  key={m.label}
                  href={whatsappLink(m.text)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-14 items-center justify-between border border-hero-line px-5 transition-colors hover:border-gold"
                >
                  <span className="font-display text-2xl group-hover:text-gold">{m.label}</span>
                  <MessageCircle className="size-5 text-gold" />
                </a>
              ))}
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp mt-8 w-full sm:w-auto"
            >
              <MessageCircle className="size-5" /> WhatsApp {business.phoneDisplay}
            </a>
          </div>

          <div className="border border-border p-7 sm:p-12">
            <h2 className="text-4xl">Visit & contact</h2>
            <ul className="mt-8 space-y-7">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-gilt" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="mt-1 text-muted-foreground">{business.location}</p>
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link mt-2 text-sm"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-gilt" />
                <div>
                  <p className="font-medium">Call or WhatsApp</p>
                  <a
                    href={business.phoneHref}
                    className="mt-1 block text-muted-foreground hover:text-gilt"
                  >
                    {business.phoneIntl}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <CalendarHeart className="mt-1 size-5 shrink-0 text-gilt" />
                <div>
                  <p className="font-medium">Visits and fittings</p>
                  <p className="mt-1 text-muted-foreground">
                    By appointment. Message us on WhatsApp to arrange a time.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Planning around 3 June? Martyrs Day brings large crowds to Namugongo, so book
                    fittings on other days.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-sand section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="kicker">Good to know</p>
            <h2 className="section-title">Questions about ordering</h2>
            <Link to="/collections" className="text-link mt-8">
              Browse the shop <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="border-t border-input">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-input">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-2xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-3xl text-gilt transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-7 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
