import { Plus } from "lucide-react";
import type { Product } from "../lib/catalog";
import { useShop } from "./site-shell";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" width={1200} height={1504} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
        <span className="absolute left-4 top-4 bg-background px-3 py-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em]">{product.tag}</span>
        <button type="button" onClick={() => addToCart(product)} className="absolute bottom-4 right-4 grid size-12 place-items-center bg-primary text-primary-foreground shadow-float transition-transform hover:scale-105" aria-label={`Add ${product.name} to bag`}><Plus className="size-5" /></button>
      </div>
      <div className="border-b border-border py-5"><p className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-primary">{product.category}</p><div className="mt-2 flex items-start justify-between gap-3"><h3 className="font-display text-2xl">{product.name}</h3><span className="shrink-0 font-sans text-xs text-muted-foreground">Price on request</span></div><p className="mt-3 font-sans text-sm leading-6 text-muted-foreground">{product.description}</p></div>
    </article>
  );
}