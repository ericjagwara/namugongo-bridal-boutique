import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";

import logoAsset from "../assets/oz-fashion-house-logo.png.asset.json";
import brideImage from "../assets/oz-bride-editorial.jpg";
import groomImage from "../assets/oz-groom-editorial.jpg";
import bridesmaidsImage from "../assets/oz-bridesmaids-editorial.jpg";
import accessoriesImage from "../assets/oz-accessories-editorial.jpg";

const whatsappUrl =
  "https://wa.me/256701090109?text=Hello%20OZ%20Fashion%20House%2C%20I%27d%20like%20to%20enquire%20about%20your%20wedding%20collection.";

const collections = [
  {
    title: "The Bride",
    subtitle: "Gowns & bridal finishing",
    image: brideImage,
    position: "md:col-span-7",
  },
  {
    title: "The Groom",
    subtitle: "Tailoring & formalwear",
    image: groomImage,
    position: "md:col-span-5",
  },
  {
    title: "Bridesmaids",
    subtitle: "A beautifully coordinated party",
    image: bridesmaidsImage,
    position: "md:col-span-5",
  },
  {
    title: "The Finishing Touch",
    subtitle: "Accessories for women & men",
    image: accessoriesImage,
    position: "md:col-span-7",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OZ Fashion House | Bridal Wear in Namugongo" },
      {
        name: "description",
        content:
          "Wedding clothing and accessories for brides, grooms and bridesmaids from OZ Fashion House in Namugongo, Wakiso, Uganda.",
      },
      { property: "og:title", content: "OZ Fashion House | Bridal Wear in Namugongo" },
      {
        property: "og:description",
        content: "Elegant wedding clothing and accessories for your entire wedding party.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-hero-line">
        <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="OZ Fashion House home" className="shrink-0">
            <img src={logoAsset.url} alt="OZ Fashion House" className="h-16 w-auto object-contain sm:h-20" />
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-10 font-sans text-xs uppercase tracking-[0.18em] text-hero-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#collections">Collections</a>
            <a className="transition-colors hover:text-primary" href="#experience">Our craft</a>
            <a className="transition-colors hover:text-primary" href="#visit">Visit us</a>
          </nav>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary-strong sm:px-6"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">WhatsApp us</span>
            <span className="sm:hidden">Chat</span>
          </a>
        </div>
      </header>

      <section id="top" className="relative min-h-[92svh] bg-hero sm:min-h-[94svh]">
        <img
          src={brideImage}
          alt="Bride wearing an elegant sculpted ivory wedding gown"
          width={1200}
          height={1504}
          className="absolute inset-0 h-full w-full object-cover object-[57%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-screen-2xl items-end px-5 pb-14 pt-36 sm:min-h-[94svh] sm:px-8 sm:pb-20 lg:px-12">
          <div className="max-w-4xl text-hero-foreground">
            <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">
              Namugongo · Wakiso · Uganda
            </p>
            <h1 className="font-display text-5xl leading-[0.96] sm:text-7xl lg:text-8xl xl:text-9xl">
              OZ Fashion House
            </h1>
            <p className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-hero-muted sm:text-3xl">
              For every beautiful moment before “I do.”
            </p>
            <a
              href="#collections"
              className="mt-9 inline-flex min-h-12 items-center gap-3 border-b border-primary pb-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-hero-foreground transition-colors hover:text-primary"
            >
              Explore the collections <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="collections" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex flex-col justify-between gap-5 border-b border-border pb-8 sm:mb-16 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">Dressed for the day</p>
              <h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-6xl">The complete wedding wardrobe.</h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-7 text-muted-foreground">
              Thoughtfully selected clothing and finishing pieces for every member of your wedding party.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {collections.map((collection, index) => (
              <article key={collection.title} className={`group relative min-h-[32rem] overflow-hidden bg-muted ${collection.position} ${index > 1 ? "md:min-h-[38rem]" : "md:min-h-[44rem]"}`}>
                <img
                  src={collection.image}
                  alt={`${collection.title} wedding collection`}
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-card-overlay" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-hero-foreground sm:p-8">
                  <div>
                    <p className="mb-2 font-sans text-[0.7rem] uppercase tracking-[0.18em] text-hero-muted">{collection.subtitle}</p>
                    <h3 className="font-display text-4xl sm:text-5xl">{collection.title}</h3>
                  </div>
                  <ArrowUpRight className="mb-2 size-6 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="border-y border-border bg-secondary px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-screen-2xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
          <div>
            <span className="font-display text-8xl leading-none text-primary/30">OZ</span>
            <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">The OZ experience</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">Every detail, beautifully considered.</h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              ["01", "Discover", "Explore silhouettes, fabrics and details that feel true to you."],
              ["02", "Refine", "Bring the wedding party together with a coordinated, elegant look."],
              ["03", "Complete", "Choose the accessories that make every outfit feel finished."],
            ].map(([number, title, body]) => (
              <div key={number} className="border-t border-border pt-5">
                <span className="font-sans text-xs tracking-[0.18em] text-primary">{number}</span>
                <h3 className="mt-6 font-display text-3xl">{title}</h3>
                <p className="mt-4 font-sans text-sm leading-7 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="bg-foreground px-5 py-20 text-background sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your look begins here</p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] sm:text-7xl">Let’s dress your celebration.</h2>
            <div className="mt-8 flex items-start gap-3 font-sans text-sm text-footer-muted">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>Namugongo, Wakiso, Uganda</span>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-14 w-full items-center justify-between gap-6 border border-primary bg-primary px-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary-strong sm:w-auto sm:min-w-72"
          >
            Chat on WhatsApp <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="border-t border-footer-line bg-foreground px-5 py-10 text-background sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <img src={logoAsset.url} alt="OZ Fashion House" loading="lazy" className="h-16 w-fit object-contain" />
          <div className="font-sans text-xs uppercase tracking-[0.14em] text-footer-muted">
            <a className="transition-colors hover:text-primary" href="tel:+256701090109">+256 701 090 109</a>
          </div>
          <p className="font-sans text-xs text-footer-muted">© {new Date().getFullYear()} OZ Fashion House</p>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with OZ Fashion House on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float transition-transform hover:scale-105 md:hidden"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
    </main>
  );
}