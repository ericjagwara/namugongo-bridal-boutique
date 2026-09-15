import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

import brideImage from "../assets/oz-bride-editorial.jpg";
import groomBowtie from "../assets/oz-groom-bowtie.jpg";
import bridesmaidsImage from "../assets/oz-bridesmaids-editorial.jpg";
import { Monogram } from "../components/logo";
import { categories } from "../lib/catalog";
import { whatsappLink } from "../lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About OZ Fashion House | Bridal House in Namugongo, Wakiso" },
      {
        name: "description",
        content:
          "OZ Fashion House makes and sells wedding clothing and accessories for the bride, groom, bridesmaids and groomsmen in Namugongo, Wakiso, Uganda.",
      },
      { property: "og:title", content: "About OZ Fashion House" },
      {
        property: "og:description",
        content: "The whole wedding wardrobe, made and styled in Namugongo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "Your vision leads",
    copy: "We start with how you want to look and feel, then recommend pieces that fit your plans and your budget.",
  },
  {
    title: "The whole party, together",
    copy: "Bride, groom, bridesmaids and groomsmen are dressed as one look, so the celebration photographs beautifully.",
  },
  {
    title: "Details finish the look",
    copy: "Jewellery, hairpieces, bow ties and cufflinks are chosen to complete each outfit, not added as an afterthought.",
  },
];

function AboutPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="page-intro-inner grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="kicker">About OZ Fashion House</p>
            <h1 className="page-title">Beautifully dressed. Thoughtfully remembered.</h1>
          </div>
          <p className="page-lead lg:mt-0">
            We make and sell wedding clothing and accessories in Namugongo, Wakiso, for the bride,
            the groom and everyone standing beside them.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div className="relative mx-auto w-full max-w-lg">
            <div aria-hidden="true" className="arch absolute -inset-4 border border-gilt/30" />
            <img
              src={brideImage}
              alt="A bride wearing the Amara Gown"
              width={1200}
              height={1504}
              className="arch relative aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div>
            <p className="kicker">Our point of view</p>
            <h2 className="section-title">The day is yours. The details are ours.</h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-8 text-muted-foreground">
              <p>
                OZ Fashion House exists to make wedding dressing feel considered, coordinated and
                personal. We help couples and their wedding parties find outfits and accessories
                that feel right for the celebration they are creating.
              </p>
              <p>
                From our home in Namugongo, we bring together bridal gowns, groom and groomsmen
                tailoring, bridesmaid dresses in harmonising tones, and finishing pieces for women
                and men. Many pieces are made to measure, so they fit the person wearing them.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/collections" className="btn btn-ink">
                Shop the collections <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappLink("Hello OZ Fashion House, I'd like to book a consultation.")}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle className="size-4" /> Book a consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="on-ink relative overflow-hidden bg-ink text-ivory section-pad">
        <Monogram className="pointer-events-none absolute -right-16 -top-10 h-96 w-auto opacity-[0.06]" />
        <div className="container-site relative">
          <h2 className="section-title max-w-xl">How we work with you</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="border-t border-gold/50 pt-6">
                <h3 className="text-3xl text-gold">{item.title}</h3>
                <p className="mt-3 leading-7 text-hero-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <p className="kicker">What we make</p>
          <h2 className="section-title">Four collections, one celebration</h2>
          <ul className="mt-10 border-t border-border">
            {categories.map((c) => (
              <li key={c.slug} className="border-b border-border">
                <Link
                  to="/collections"
                  search={{ category: c.slug }}
                  className="group grid items-center gap-2 py-6 sm:grid-cols-[14rem_1fr_auto] sm:gap-8"
                >
                  <span className="font-display text-4xl group-hover:text-gilt">{c.label}</span>
                  <span className="leading-7 text-muted-foreground">{c.blurb}</span>
                  <ArrowRight className="hidden size-5 text-gilt transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand">
        <div className="grid lg:grid-cols-2">
          <div className="container-site flex flex-col justify-center py-16 lg:max-w-2xl lg:px-16">
            <h2 className="section-title">A celebration looks best when it feels connected.</h2>
            <p className="mt-5 max-w-md leading-8 text-muted-foreground">
              Bring your bridal party to us, or send their sizes on WhatsApp, and we’ll plan every
              look together.
            </p>
            <Link
              to="/collections"
              search={{ category: "bridesmaids" }}
              className="btn btn-gold mt-8 self-start"
            >
              Dress your bridal party <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr]">
            <img
              src={bridesmaidsImage}
              alt="Bridesmaids in coordinated satin gowns"
              loading="lazy"
              className="h-full max-h-[36rem] w-full object-cover"
            />
            <img
              src={groomBowtie}
              alt="A groom in a black tuxedo and bow tie"
              loading="lazy"
              className="h-full max-h-[36rem] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
