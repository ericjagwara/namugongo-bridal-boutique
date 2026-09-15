import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import brideImage from "../assets/oz-bride-editorial.jpg";
import groomImage from "../assets/oz-groom-editorial.jpg";
import bridesmaidsImage from "../assets/oz-bridesmaids-editorial.jpg";
import accessoriesImage from "../assets/oz-accessories-editorial.jpg";
import { ProductCard } from "../components/product-card";
import { products, whatsappNumber } from "../lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "OZ Fashion House | Bridal Wear in Namugongo" },
    { name: "description", content: "Shop wedding clothing and accessories for brides, grooms and bridesmaids from OZ Fashion House in Namugongo, Wakiso." },
    { property: "og:title", content: "OZ Fashion House | Bridal Wear in Namugongo" },
    { property: "og:description", content: "Complete wedding fashion for brides, grooms, bridesmaids and every finishing detail." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: HomePage,
});

const categories = [
  { title: "Bride", copy: "Gowns & bridal finishing", image: brideImage },
  { title: "Groom", copy: "Tailoring & formalwear", image: groomImage },
  { title: "Bridesmaids", copy: "Beautifully coordinated", image: bridesmaidsImage },
  { title: "Accessories", copy: "Details for women & men", image: accessoriesImage },
];

function HomePage() {
  return <main>
    <section className="relative min-h-[94svh] bg-hero">
      <img src={brideImage} alt="Bride wearing an elegant sculpted ivory wedding gown" width={1200} height={1504} className="absolute inset-0 h-full w-full object-cover object-[57%_center] sm:object-center" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative z-10 mx-auto flex min-h-[94svh] max-w-screen-2xl items-end px-5 pb-14 pt-36 sm:px-8 sm:pb-20 lg:px-12">
        <div className="max-w-4xl text-hero-foreground"><p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-primary">Namugongo · Wakiso · Uganda</p><h1 className="font-display text-5xl leading-[0.96] sm:text-7xl lg:text-8xl xl:text-9xl">Made for your<br/>forever moment.</h1><p className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-hero-muted sm:text-3xl">Wedding fashion for the bride, groom and everyone standing beside them.</p><div className="mt-9 flex flex-wrap gap-3"><Link to="/collections" className="inline-flex min-h-14 items-center gap-3 bg-primary px-6 font-sans text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary-strong">Shop collections <ArrowRight className="size-4" /></Link><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center gap-3 border border-hero-line px-6 font-sans text-xs font-bold uppercase tracking-[0.16em] hover:border-primary hover:text-primary"><MessageCircle className="size-4" /> Talk to a stylist</a></div></div>
      </div>
    </section>

    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto max-w-screen-2xl"><div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end"><div><p className="eyebrow">Shop by category</p><h2 className="section-title">One celebration.<br/>Every beautiful look.</h2></div><Link to="/collections" className="text-link">View the full collection <ArrowUpRight className="size-4" /></Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <Link key={category.title} to="/collections" search={{ category: category.title }} className="group relative aspect-[3/4] overflow-hidden bg-muted"><img src={category.image} alt={`${category.title} collection`} loading="lazy" width={1200} height={1504} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"/><div className="absolute inset-0 bg-card-overlay"/><div className="absolute inset-x-0 bottom-0 p-6 text-hero-foreground"><p className="font-sans text-[0.65rem] uppercase tracking-[0.17em] text-hero-muted">{category.copy}</p><h3 className="mt-2 font-display text-4xl">{category.title}</h3></div></Link>)}</div></div></section>

    <section className="bg-secondary px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto max-w-screen-2xl"><div className="mb-12 flex items-end justify-between gap-6"><div><p className="eyebrow">The OZ edit</p><h2 className="section-title">Featured pieces</h2></div><Link to="/collections" className="hidden text-link sm:inline-flex">Shop all <ArrowUpRight className="size-4" /></Link></div><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0,4).map((product) => <ProductCard key={product.id} product={product}/>)}</div></div></section>

    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20"><img src={accessoriesImage} alt="Wedding jewelry, shoes, bow tie and cufflinks" loading="lazy" width={1200} height={1504} className="aspect-[4/3] h-full w-full object-cover"/><div><p className="eyebrow">More than an outfit</p><h2 className="section-title">A personal styling experience.</h2><p className="mt-6 max-w-xl font-sans text-base leading-8 text-muted-foreground">From your first idea to the finishing detail, we help bring every wedding look together with care. Discover coordinated options for the full wedding party, all in one place.</p><Link to="/about" className="mt-8 text-link">Discover our approach <ArrowUpRight className="size-4" /></Link></div></div></section>

    <section className="bg-foreground px-5 py-20 text-background sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="eyebrow">Visit OZ Fashion House</p><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.04] sm:text-7xl">Your wedding wardrobe starts here.</h2><p className="mt-7 flex items-center gap-3 font-sans text-sm text-footer-muted"><MapPin className="size-5 text-primary"/> Namugongo, Wakiso, Uganda</p></div><Link to="/contact" className="inline-flex min-h-14 items-center justify-between gap-8 bg-primary px-6 font-sans text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground">Plan your visit <ArrowRight className="size-5"/></Link></div></section>
  </main>;
}