import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";

import brideImage from "../assets/oz-bride-editorial.jpg";
import bridesmaidsImage from "../assets/oz-bridesmaids-editorial.jpg";
import accessoriesImage from "../assets/oz-accessories-editorial.jpg";
import { Monogram } from "../components/logo";
import { ProductCard } from "../components/product-card";
import { categories, products } from "../lib/catalog";
import { formatPostDate, posts } from "../lib/journal";
import { business, whatsappLink } from "../lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OZ Fashion House | Bridal Wear & Wedding Accessories in Namugongo, Wakiso" },
      {
        name: "description",
        content:
          "Wedding gowns, groom and groomsmen tuxedos, bridesmaid dresses and accessories for women and men. Shop online and order on WhatsApp from OZ Fashion House in Namugongo, Wakiso.",
      },
      { property: "og:title", content: "OZ Fashion House | Bridal Wear in Namugongo" },
      {
        property: "og:description",
        content: "Wedding fashion for the bride, groom and bridal party. Order on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const orderSteps = [
  {
    title: "Choose your pieces",
    copy: "Browse the shop and pick sizes and colours, or add several pieces to your bag.",
  },
  {
    title: "Send the order on WhatsApp",
    copy: "Your selection arrives in one message. We reply to confirm price and availability.",
  },
  {
    title: "Fit, collect, celebrate",
    copy: "Come for your fitting in Namugongo, then collect or arrange delivery.",
  },
];

function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="on-ink relative overflow-hidden bg-ink text-ivory">
        <Monogram className="pointer-events-none absolute -left-24 top-10 hidden h-[34rem] w-auto opacity-[0.05] lg:block" />
        <div className="container-site relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-24 lg:pt-16">
          <div className="hero-copy order-2 lg:order-1">
            <p className="kicker !text-gold">Bridal house in Namugongo, Wakiso</p>
            <h1 className="mt-4 text-[clamp(3.25rem,8vw,7.25rem)] leading-[0.92] tracking-[-0.025em]">
              Made for your forever moment.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-hero-muted">
              Wedding gowns, groom and groomsmen tuxedos, bridesmaid dresses and accessories for her
              and him. Choose online, order on WhatsApp, fit with us in person.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collections" className="btn btn-gold">
                Shop the collections <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappLink(
                  "Hello OZ Fashion House, I'd like to speak to a stylist about my wedding.",
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light"
              >
                <MessageCircle className="size-4" /> Talk to a stylist
              </a>
            </div>
            <nav
              aria-label="Categories"
              className="mt-12 flex flex-wrap gap-x-7 gap-y-2 border-t border-hero-line pt-6"
            >
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/collections"
                  search={{ category: c.slug }}
                  className="font-display text-2xl text-hero-muted transition-colors hover:text-gold"
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[17rem] sm:max-w-[24rem] lg:order-2 lg:max-w-[30rem]">
            <div
              aria-hidden="true"
              className="arch absolute -inset-3 border border-gold/40 sm:-inset-4"
            />
            <img
              src={brideImage}
              alt="A bride in the Amara Gown, an ivory gown with a draped bodice and sculpted satin train"
              width={1200}
              height={1504}
              fetchPriority="high"
              className="hero-arch arch relative aspect-[4/5] w-full object-cover object-top"
            />
            <Link
              to="/shop/$productId"
              params={{ productId: "amara-gown" }}
              className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 border border-gold/50 bg-ink px-5 py-3 text-sm text-hero-muted hover:text-gold"
            >
              Wearing <span className="font-display text-lg text-ivory">The Amara Gown</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories: a colonnade of arches */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kicker">Shop by category</p>
              <h2 className="section-title max-w-2xl">
                Everyone in the wedding party, dressed in one place.
              </h2>
            </div>
            <Link to="/collections" className="text-link justify-self-start">
              View all collections <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/collections"
                search={{ category: c.slug }}
                className="group block"
              >
                <div className="arch overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={1504}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-4 text-3xl group-hover:text-gilt sm:text-4xl">{c.label}</h3>
                <p className="mt-1 text-[0.95rem] leading-6 text-muted-foreground">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-sand section-pad">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">The OZ edit</p>
              <h2 className="section-title">Featured pieces</h2>
            </div>
            <Link to="/collections" className="text-link hidden sm:inline-flex">
              Shop everything <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Link to="/collections" className="btn btn-ink mt-12 w-full sm:hidden">
            Shop everything
          </Link>
        </div>
      </section>

      {/* How ordering works: a real sequence, so it is numbered */}
      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="kicker">Ordering is simple</p>
            <h2 className="section-title">Shop online. Order on WhatsApp.</h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-8 text-muted-foreground">
              No card payments or accounts. Your bag becomes a WhatsApp message to our team, and we
              take it from there together.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp mt-8"
            >
              <MessageCircle className="size-5" /> WhatsApp {business.phoneDisplay}
            </a>
          </div>
          <ol className="grid gap-px self-start bg-border">
            {orderSteps.map((step, index) => (
              <li key={step.title} className="flex gap-6 bg-ivory py-7 sm:gap-8">
                <span className="font-display text-6xl leading-none text-gold">{index + 1}</span>
                <div>
                  <h3 className="text-3xl">{step.title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bridal party */}
      <section className="on-ink bg-ink text-ivory">
        <div className="grid lg:grid-cols-2">
          <img
            src={bridesmaidsImage}
            alt="Three bridesmaids in champagne, rose and blush satin gowns"
            loading="lazy"
            className="h-full max-h-[44rem] w-full object-cover"
          />
          <div className="container-site flex flex-col justify-center py-16 lg:max-w-2xl lg:px-16">
            <p className="kicker !text-gold">For the whole party</p>
            <h2 className="section-title">Coordinated, not identical.</h2>
            <p className="mt-6 text-[1.0625rem] leading-8 text-hero-muted">
              Order bridesmaid gowns in harmonising tones and matching groomsmen tuxedos in one go.
              Send us everyone’s sizes on WhatsApp and we will plan the fittings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop/$productId"
                params={{ productId: "bridesmaids-party-order" }}
                className="btn btn-gold"
              >
                Bridesmaids party order
              </Link>
              <Link
                to="/shop/$productId"
                params={{ productId: "groomsmen-tuxedo-set" }}
                className="btn btn-outline-light"
              >
                Groomsmen tuxedos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="section-pad">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">From the journal</p>
              <h2 className="section-title">Wedding style advice</h2>
            </div>
            <Link to="/journal" className="text-link hidden sm:inline-flex">
              Read the journal <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article key={post.slug} className="group relative">
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <p className="mt-5 text-sm text-gilt">
                  {post.topic}, {formatPostDate(post.date)}
                </p>
                <h3 className="mt-2 text-[1.75rem] leading-tight">
                  <Link
                    to="/journal/$slug"
                    params={{ slug: post.slug }}
                    className="after:absolute after:inset-0 group-hover:text-gilt"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="bg-sand">
        <div className="container-site grid items-center gap-10 py-16 md:grid-cols-[auto_1fr_auto] md:gap-14">
          <img
            src={accessoriesImage}
            alt=""
            loading="lazy"
            className="arch hidden h-56 w-44 object-cover md:block"
          />
          <div>
            <h2 className="section-title">Your wedding wardrobe starts here.</h2>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-muted-foreground hover:text-gilt"
            >
              <MapPin className="size-5 text-gilt" /> {business.location}. Visits by appointment.
            </a>
          </div>
          <Link to="/contact" className="btn btn-ink justify-self-start">
            Plan your visit <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
