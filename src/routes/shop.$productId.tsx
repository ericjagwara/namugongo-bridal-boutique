import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState, type MouseEvent } from "react";

import { ProductCard } from "../components/product-card";
import { useShop } from "../components/site-shell";
import { getCategory, getProduct, relatedProducts } from "../lib/catalog";
import { formatPrice, useOrigin, whatsappLink } from "../lib/site";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) return { meta: [{ title: "Product not found | OZ Fashion House" }] };
    const title = `${product.name} | OZ Fashion House`;
    return {
      meta: [
        { title },
        { name: "description", content: product.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: product.summary },
        { property: "og:image", content: product.image },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <main className="container-site section-pad text-center">
      <h1 className="page-title">We couldn’t find that piece</h1>
      <p className="page-lead mx-auto">
        It may have been renamed or sold out. Browse the shop or ask us on WhatsApp.
      </p>
      <Link to="/collections" className="btn btn-ink mt-8">
        Browse the shop
      </Link>
    </main>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category);
  const { addToBag } = useShop();
  const origin = useOrigin();

  const images = [product.image, ...(product.gallery ?? [])];
  const [activeImage, setActiveImage] = useState(0);
  const singleSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | undefined>(singleSize ? product.sizes[0] : undefined);
  const [colour, setColour] = useState<string | undefined>(product.colours?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [showSizeError, setShowSizeError] = useState(false);

  const message = [
    `Hello OZ Fashion House, I would like to order: ${product.name}`,
    "",
    [size && `Size: ${size}`, colour && `Colour: ${colour}`, `Qty: ${quantity}`]
      .filter(Boolean)
      .join(" | "),
    ...(note.trim() ? [`Notes: ${note.trim()}`] : []),
    ...(origin ? [`${origin}/shop/${product.id}`] : []),
    "",
    "Please confirm availability, price and fitting dates.",
  ].join("\n");

  const requireSize = (event?: MouseEvent) => {
    if (size) return true;
    event?.preventDefault();
    setShowSizeError(true);
    document
      .getElementById("size-options")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  };

  return (
    <main>
      <div className="container-site pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link to="/collections" className="hover:text-gilt">
            Shop
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link
            to="/collections"
            search={{ category: product.category }}
            className="hover:text-gilt"
          >
            {category?.label}
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-ink">
            {product.name}
          </span>
        </nav>
      </div>

      <section className="container-site grid gap-10 pb-20 pt-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={images[activeImage]}
              alt={product.name}
              width={800}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show photo ${index + 1} of ${images.length}`}
                  aria-pressed={activeImage === index}
                  className="aspect-[4/5] overflow-hidden border-2 border-transparent aria-pressed:border-gilt"
                >
                  <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details and ordering */}
        <div>
          <p className="kicker">{product.group}</p>
          <h1 className="mt-1 text-5xl leading-[1.02] sm:text-6xl">{product.name}</h1>
          <p className="mt-4 text-xl">{formatPrice(product.price)}</p>
          <p className="mt-5 text-[1.0625rem] leading-8 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 space-y-7 border-t border-border pt-7">
            {product.colours && product.colours.length > 0 && (
              <fieldset>
                <legend className="text-sm font-medium">
                  Colour
                  {colour && <span className="font-normal text-muted-foreground">: {colour}</span>}
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colours.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="chip"
                      aria-pressed={colour === option}
                      onClick={() => setColour(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset id="size-options">
              <legend className="text-sm font-medium">
                Size{size && <span className="font-normal text-muted-foreground">: {size}</span>}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="chip"
                    aria-pressed={size === option}
                    onClick={() => {
                      setSize(option);
                      setShowSizeError(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {showSizeError && (
                <p className="mt-2 text-sm text-destructive" role="alert">
                  Choose a size first. Not sure? Pick “Custom measurements”.
                </p>
              )}
              {size === "Custom measurements" && (
                <p className="mt-2 text-sm text-muted-foreground">
                  We will ask for your measurements on WhatsApp, or take them when you visit.
                </p>
              )}
            </fieldset>

            <div className="flex flex-wrap items-end gap-6">
              <div>
                <span className="text-sm font-medium" id="qty-label">
                  Quantity
                </span>
                <div
                  className="mt-3 flex items-center border border-input"
                  role="group"
                  aria-labelledby="qty-label"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="grid size-11 place-items-center hover:text-gilt"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="grid size-11 place-items-center hover:text-gilt"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              {product.group === "Groomsmen" || product.group === "Party orders" ? (
                <p className="pb-3 text-sm text-muted-foreground">
                  Set this to the number of people in your party.
                </p>
              ) : null}
            </div>

            <label className="block">
              <span className="text-sm font-medium">Notes for our team (optional)</span>
              <textarea
                className="field mt-2 min-h-24"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Your wedding date, measurements, or anything you would like to change"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={size ? whatsappLink(message) : undefined}
                onClick={(event) => requireSize(event)}
                target="_blank"
                rel="noreferrer"
                role="button"
                className="btn btn-whatsapp cursor-pointer"
              >
                <MessageCircle className="size-5" /> Order on WhatsApp
              </a>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  if (requireSize()) addToBag(product, { size, colour }, quantity);
                }}
              >
                <ShoppingBag className="size-4" /> Add to bag
              </button>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Ordering several pieces? Add them to your bag and send one WhatsApp message. We reply
              to confirm price, availability and fittings.
            </p>
          </div>

          <div className="mt-10 border-t border-border pt-7">
            <h2 className="text-3xl">Details</h2>
            <ul className="prose-oz mt-4 pl-5 !text-base">
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10 bg-sand p-6">
            <h2 className="text-2xl">How ordering works</h2>
            <ol className="mt-4 space-y-3">
              {[
                "Choose your size and colour, then send the order on WhatsApp.",
                "We confirm the price, availability and any measurements we need.",
                "Come for your fitting in Namugongo, then collect or arrange delivery.",
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-gilt font-display text-lg text-gilt">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 leading-6">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-sand section-pad">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6">
            <h2 className="section-title">You may also like</h2>
            <Link
              to="/collections"
              search={{ category: product.category }}
              className="text-link hidden sm:inline-flex"
            >
              More {category?.label.toLowerCase()}
            </Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts(product).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
