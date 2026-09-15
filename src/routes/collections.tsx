import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "../components/product-card";
import { products, categoryDescriptions, type Category } from "../lib/catalog";

const categories = ["All", "Bride", "Groom", "Bridesmaids", "Accessories"] as const;

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>) => ({ category: typeof search.category === "string" ? search.category : "All" }),
  head: () => ({ meta: [
    { title: "Wedding Collections | OZ Fashion House" }, { name: "description", content: "Browse bridal gowns, groom suits, bridesmaid dresses and wedding accessories at OZ Fashion House." },
    { property: "og:title", content: "Wedding Collections | OZ Fashion House" }, { property: "og:description", content: "Shop the complete OZ Fashion House wedding collection in Namugongo." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: CollectionsPage,
});

function CollectionsPage() {
  const search = Route.useSearch();
  const initial = categories.includes(search.category as typeof categories[number]) ? search.category as typeof categories[number] : "All";
  const [active, setActive] = useState<typeof categories[number]>(initial);
  const shown = active === "All" ? products : products.filter((product) => product.category === active);
  return <main><section className="page-intro"><div className="page-intro-inner"><p className="eyebrow">The wedding wardrobe</p><h1 className="page-title">Shop the collections</h1><p className="page-lead">Discover considered looks for the bride, groom and bridal party, plus the final details that bring everything together.</p></div></section><section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12"><div className="mx-auto max-w-screen-2xl"><div className="flex gap-2 overflow-x-auto border-b border-border pb-5">{categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`shrink-0 border px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.13em] transition-colors ${active === category ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{category}</button>)}</div>{active !== "All" && <div className="my-10 max-w-2xl"><h2 className="font-display text-4xl">For the {active.toLowerCase()}</h2><p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{categoryDescriptions[active as Category]}</p></div>}<div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{shown.map((product) => <ProductCard key={product.id} product={product}/>)}</div></div></section></main>;
}