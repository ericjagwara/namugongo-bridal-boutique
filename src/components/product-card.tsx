import { Link } from "@tanstack/react-router";
import type { Product } from "../lib/catalog";
import { getCategory } from "../lib/catalog";
import { formatPrice } from "../lib/site";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const category = getCategory(product.category);
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading={eager ? "eager" : "lazy"}
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 bg-ivory/95 px-2.5 py-1 text-xs font-medium text-ink">
            {product.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-sm text-gilt">
          {category?.label === product.group
            ? product.group
            : `${category?.label} / ${product.group}`}
        </p>
        <h3 className="mt-1 text-[1.65rem] leading-tight">
          <Link
            to="/shop/$productId"
            params={{ productId: product.id }}
            className="after:absolute after:inset-0 hover:text-gilt"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-[0.95rem] leading-6 text-muted-foreground">{product.summary}</p>
        <div className="mt-auto flex items-center justify-between border-b border-border pb-4 pt-4">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          <span className="text-sm text-gilt underline-offset-4 group-hover:underline">
            Choose & order
          </span>
        </div>
      </div>
    </article>
  );
}
