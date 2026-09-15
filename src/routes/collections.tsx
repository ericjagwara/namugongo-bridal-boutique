import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MessageCircle, Search, X } from "lucide-react";

import { ProductCard } from "../components/product-card";
import { categories, getCategory, products, type CategorySlug } from "../lib/catalog";
import { whatsappLink } from "../lib/site";

type ShopSearch = {
  category?: CategorySlug | undefined;
  group?: string | undefined;
  q?: string | undefined;
};

const slugs = categories.map((c) => c.slug) as string[];

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const category = typeof search["category"] === "string" ? search["category"].toLowerCase() : "";
    const group = search["group"];
    const q = search["q"];
    return {
      category: slugs.includes(category) ? (category as CategorySlug) : undefined,
      group: typeof group === "string" && group ? group : undefined,
      q: typeof q === "string" && q ? q : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop Wedding Collections | OZ Fashion House, Namugongo" },
      {
        name: "description",
        content:
          "Shop bridal gowns, groom and groomsmen tuxedos, bridesmaid dresses and wedding accessories for women and men. Order on WhatsApp from OZ Fashion House, Namugongo.",
      },
      { property: "og:title", content: "Shop Wedding Collections | OZ Fashion House" },
      {
        property: "og:description",
        content: "Bride, groom, bridesmaids and accessories. Order on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { category, group, q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const active = category ? getCategory(category) : undefined;
  const query = (q ?? "").trim().toLowerCase();

  const shown = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (group && p.group !== group) return false;
    if (query && !`${p.name} ${p.summary} ${p.group} ${p.category}`.toLowerCase().includes(query))
      return false;
    return true;
  });

  const setSearch = (next: ShopSearch) =>
    navigate({ search: next, replace: true, resetScroll: false });

  return (
    <main>
      <section className="page-intro">
        <div className="page-intro-inner grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="kicker">{active ? "Collection" : "The wedding wardrobe"}</p>
            <h1 className="page-title">{active ? active.title : "Shop the collections"}</h1>
            <p className="page-lead">
              {active
                ? active.blurb
                : "Choose your pieces, pick sizes and colours, then send your order to us on WhatsApp. We confirm price, availability and fittings personally."}
            </p>
          </div>
          <div className="border-l-2 border-gold pl-5 lg:justify-self-end">
            <p className="font-display text-2xl leading-snug">
              Looking for something you don’t see?
            </p>
            <a
              href={whatsappLink(
                "Hello OZ Fashion House, I'm looking for something specific. Can you help?",
              )}
              target="_blank"
              rel="noreferrer"
              className="text-link mt-3"
            >
              <MessageCircle className="size-4" /> Send us a photo on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[116px] z-30 border-b border-border bg-ivory/95 backdrop-blur">
        <div className="container-site flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:pb-0"
            role="group"
            aria-label="Category"
          >
            <button
              type="button"
              className="chip"
              aria-pressed={!category}
              onClick={() => setSearch({ q })}
            >
              All <span className="opacity-60">{products.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                className="chip"
                aria-pressed={category === c.slug}
                onClick={() => setSearch({ category: c.slug, q })}
              >
                {c.label}{" "}
                <span className="opacity-60">
                  {products.filter((p) => p.category === c.slug).length}
                </span>
              </button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Search the shop</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q ?? ""}
              onChange={(e) => setSearch({ category, group, q: e.target.value || undefined })}
              placeholder="Search gowns, tuxedos, pearls…"
              className="field min-h-11 pl-9"
            />
          </label>
        </div>
      </div>

      <section className="container-site pb-24 pt-8">
        {active && (
          <div
            className="mb-8 flex flex-wrap items-center gap-2"
            role="group"
            aria-label={`${active.label} type`}
          >
            <span className="mr-2 text-sm text-muted-foreground">Show:</span>
            <button
              type="button"
              className="chip min-h-9"
              aria-pressed={!group}
              onClick={() => setSearch({ category, q })}
            >
              Everything
            </button>
            {active.groups.map((g) => (
              <button
                key={g}
                type="button"
                className="chip min-h-9"
                aria-pressed={group === g}
                onClick={() => setSearch({ category, group: g, q })}
              >
                {g}
              </button>
            ))}
          </div>
        )}

        <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
          {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          {query && <> matching “{q}”</>}
        </p>

        {shown.length > 0 ? (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((product, index) => (
              <ProductCard key={product.id} product={product} eager={index < 4} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-input px-6 py-16 text-center">
            <p className="font-display text-3xl">Nothing matches that search yet</p>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Try another word, or clear the filters. We also make pieces to order, so ask us on
              WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" className="btn btn-outline" onClick={() => setSearch({})}>
                <X className="size-4" /> Clear filters
              </button>
              <a
                href={whatsappLink(`Hello OZ Fashion House, do you have ${q ?? "this"}?`)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle className="size-4" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        )}

        {!active && (
          <div className="mt-24 grid gap-6 border-t border-border pt-12 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/collections"
                search={{ category: c.slug }}
                className="group flex items-center gap-4"
              >
                <img src={c.image} alt="" loading="lazy" className="arch h-24 w-20 object-cover" />
                <span>
                  <span className="block font-display text-2xl group-hover:text-gilt">
                    {c.label}
                  </span>
                  <span className="block text-sm leading-5 text-muted-foreground">
                    {c.groups.join(", ")}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
