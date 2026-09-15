import { Link, useRouterState } from "@tanstack/react-router";
import {
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Logo } from "./logo";
import { categories, products, type Product } from "../lib/catalog";
import { business, formatPrice, useOrigin, whatsappLink } from "../lib/site";

/* ------------------------------------------------------------------ */
/* Shopping bag state                                                  */
/* ------------------------------------------------------------------ */

export type BagOptions = { size?: string | undefined; colour?: string | undefined };
type BagItem = BagOptions & { key: string; productId: string; quantity: number };

type ShopContextValue = {
  items: BagItem[];
  itemCount: number;
  addToBag: (product: Product, options?: BagOptions, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearBag: () => void;
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);
const STORAGE_KEY = "oz-bag-v2";

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside SiteShell");
  return value;
}

const itemKey = (productId: string, o: BagOptions) =>
  [productId, o.size ?? "", o.colour ?? ""].join("|");

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/collections", label: "Shop", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/journal", label: "Journal", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BagItem[];
        setItems(parsed.filter((item) => products.some((p) => p.id === item.productId)));
      }
    } catch {
      /* ignore a damaged saved bag */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock page scroll and allow Escape to close while a panel is open.
  useEffect(() => {
    const open = menuOpen || bagOpen;
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setBagOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, bagOpen]);

  const addToBag = useCallback((product: Product, options: BagOptions = {}, quantity = 1) => {
    const key = itemKey(product.id, options);
    setItems((current) => {
      const found = current.find((item) => item.key === key);
      return found
        ? current.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
          )
        : [...current, { key, productId: product.id, quantity, ...options }];
    });
    setBagOpen(true);
  }, []);

  const value = useMemo<ShopContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addToBag,
      updateQuantity: (key, quantity) =>
        setItems((current) =>
          quantity < 1
            ? current.filter((item) => item.key !== key)
            : current.map((item) => (item.key === key ? { ...item, quantity } : item)),
        ),
      clearBag: () => setItems([]),
      bagOpen,
      setBagOpen,
    }),
    [items, bagOpen, addToBag],
  );

  return (
    <ShopContext.Provider value={value}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader onOpenMenu={() => setMenuOpen(true)} />
      <div id="main">{children}</div>
      <SiteFooter />
      <WhatsAppFloat hidden={bagOpen || menuOpen} />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      <BagDrawer />
    </ShopContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function SiteHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { itemCount, setBagOpen } = useShop();
  return (
    <header className="on-ink sticky top-0 z-50 bg-ink text-ivory">
      <div className="border-b border-footer-line">
        <div className="container-site flex h-9 items-center justify-between text-[0.8rem] text-hero-muted">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-gold"
          >
            <MessageCircle className="size-3.5 text-gold" />
            <span>
              Order on WhatsApp <span className="text-ivory">{business.phoneDisplay}</span>
            </span>
          </a>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 hover:text-gold sm:inline-flex"
          >
            <MapPin className="size-3.5 text-gold" /> {business.location}
          </a>
        </div>
      </div>
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link to="/" aria-label="OZ Fashion House, home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="relative py-2 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-hero-muted transition-colors hover:text-ivory"
              activeProps={{
                className:
                  "!text-gold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light hidden min-h-11 px-4 md:inline-flex"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setBagOpen(true)}
            aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            className="relative grid size-11 place-items-center border border-hero-line transition-colors hover:border-gold hover:text-gold"
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-gold text-[0.68rem] font-semibold text-ink">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="grid size-11 place-items-center border border-hero-line lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="on-ink fixed inset-0 z-[70] overflow-y-auto bg-ink text-ivory lg:hidden"
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Logo size="sm" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="grid size-11 place-items-center border border-hero-line"
        >
          <X className="size-5" />
        </button>
      </div>
      <nav aria-label="Main" className="container-site mt-6 flex flex-col">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact }}
            className="border-b border-footer-line py-4 font-display text-4xl"
            activeProps={{ className: "text-gold" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="container-site mt-8">
        <p className="kicker !text-gold">Shop by category</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/collections"
              search={{ category: c.slug }}
              className="chip border-hero-line text-hero-muted"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp mt-10 w-full"
        >
          <MessageCircle className="size-5" /> Chat on WhatsApp
        </a>
        <a href={business.phoneHref} className="btn btn-outline-light mb-10 mt-3 w-full">
          <Phone className="size-4" /> Call {business.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

function WhatsAppFloat({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <a
      href={whatsappLink(
        "Hello OZ Fashion House, I have a question about your wedding collection.",
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with OZ Fashion House on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.62l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.34 0-3.03-1.18-5.88-3.33-8.03" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Shopping bag + WhatsApp checkout                                    */
/* ------------------------------------------------------------------ */

const handoverOptions = ["Collect in Namugongo", "Delivery (I'll share my location)"] as const;

function BagDrawer() {
  const { items, bagOpen, setBagOpen, updateQuantity, clearBag } = useShop();
  const origin = useOrigin();
  const [name, setName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [handover, setHandover] = useState<(typeof handoverOptions)[number]>(handoverOptions[0]);
  const [notes, setNotes] = useState("");
  const [showError, setShowError] = useState(false);

  const lines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const allPriced = lines.length > 0 && lines.every((line) => line.product.price !== undefined);
  const total = allPriced
    ? lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.quantity, 0)
    : undefined;

  const message = [
    "Hello OZ Fashion House, I would like to place an order:",
    "",
    ...lines.flatMap((line, index) => {
      const specs = [
        line.size && `Size: ${line.size}`,
        line.colour && `Colour: ${line.colour}`,
        `Qty: ${line.quantity}`,
      ]
        .filter(Boolean)
        .join(" | ");
      return [
        `${index + 1}. ${line.product.name}${line.product.price !== undefined ? ` (${formatPrice(line.product.price)} each)` : ""}`,
        `   ${specs}`,
        ...(origin ? [`   ${origin}/shop/${line.product.id}`] : []),
      ];
    }),
    ...(total !== undefined ? ["", `Estimated total: ${formatPrice(total)}`] : []),
    "",
    `Name: ${name.trim()}`,
    ...(weddingDate
      ? [
          `Wedding date: ${new Date(`${weddingDate}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
        ]
      : []),
    `Collection: ${handover}`,
    ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
    "",
    "Please confirm availability, price and fitting dates. Thank you!",
  ].join("\n");

  const nameMissing = name.trim().length === 0;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setBagOpen(false)}
        className={`fixed inset-0 z-[75] bg-ink/60 transition-opacity duration-300 ${bagOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!bagOpen}
        inert={!bagOpen}
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-ivory transition-[transform,visibility] duration-300 ${bagOpen ? "translate-x-0 shadow-2xl" : "invisible translate-x-full"}`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-6">
          <h2 className="text-3xl">Your bag</h2>
          <button
            type="button"
            aria-label="Close shopping bag"
            onClick={() => setBagOpen(false)}
            className="grid size-11 place-items-center border border-border hover:border-gilt"
          >
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <ShoppingBag className="mx-auto size-9 text-gilt" />
              <p className="mt-5 font-display text-3xl">Your bag is empty</p>
              <p className="mt-2 text-muted-foreground">
                Add pieces from the shop, then send your order to us on WhatsApp.
              </p>
              <Link
                to="/collections"
                onClick={() => setBagOpen(false)}
                className="btn btn-ink mt-7"
              >
                Browse the shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <ul className="px-6">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 border-b border-border py-5">
                  <Link
                    to="/shop/$productId"
                    params={{ productId: line.product.id }}
                    onClick={() => setBagOpen(false)}
                    className="shrink-0"
                  >
                    <img src={line.product.image} alt="" className="h-28 w-[5.5rem] object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div>
                      <h3 className="text-xl leading-tight">{line.product.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {[line.size, line.colour].filter(Boolean).join(", ")}
                      </p>
                      <p className="mt-0.5 text-sm">{formatPrice(line.product.price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-input">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          className="grid size-9 place-items-center hover:text-gilt"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.product.name}`}
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          className="grid size-9 place-items-center hover:text-gilt"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => updateQuantity(line.key, 0)}
                        className="grid size-9 place-items-center text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 bg-sand px-6 py-6">
              <p className="font-display text-2xl">Your details</p>
              <label className="block">
                <span className="text-sm font-medium">Your name</span>
                <input
                  id="bag-name"
                  className="field mt-1.5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  aria-invalid={showError && nameMissing}
                  aria-describedby="bag-name-error"
                />
                {showError && nameMissing && (
                  <span id="bag-name-error" className="mt-1.5 block text-sm text-destructive">
                    Enter your name so we know who the order is from.
                  </span>
                )}
              </label>
              <label className="block">
                <span className="text-sm font-medium">Wedding date (optional)</span>
                <input
                  type="date"
                  className="field mt-1.5"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
              </label>
              <fieldset>
                <legend className="text-sm font-medium">
                  How would you like to receive your order?
                </legend>
                <div className="mt-2 grid gap-2">
                  {handoverOptions.map((option) => (
                    <label
                      key={option}
                      className="flex min-h-11 cursor-pointer items-center gap-3 border border-input bg-[#fffdf9] px-3 has-[:checked]:border-gilt"
                    >
                      <input
                        type="radio"
                        name="handover"
                        checked={handover === option}
                        onChange={() => setHandover(option)}
                        className="accent-[#86652b]"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="text-sm font-medium">Notes (optional)</span>
                <textarea
                  className="field mt-1.5 min-h-20"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Measurements, colours, questions…"
                />
              </label>
              <button
                type="button"
                onClick={clearBag}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-destructive"
              >
                Empty bag
              </button>
            </div>
          </div>
        )}

        {lines.length > 0 && (
          <div className="shrink-0 border-t border-border bg-ivory p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl">
                {total !== undefined ? formatPrice(total) : "Confirmed on WhatsApp"}
              </span>
            </div>
            <a
              href={nameMissing ? undefined : whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              role="button"
              onClick={(event) => {
                if (nameMissing) {
                  event.preventDefault();
                  setShowError(true);
                  document.getElementById("bag-name")?.focus();
                }
              }}
              className="btn btn-whatsapp w-full cursor-pointer"
            >
              <MessageCircle className="size-5" /> Send order on WhatsApp
            </a>
            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
              Nothing is charged here. We reply on WhatsApp to confirm your order.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-ivory">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Logo size="lg" />
          <p className="mt-6 max-w-xs font-display text-2xl italic leading-snug text-hero-muted">
            Dressing every beautiful moment before “I do.”
          </p>
        </div>
        <div>
          <p className="font-display text-xl text-gold">Shop</p>
          <ul className="mt-4 space-y-2.5 text-footer-muted">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/collections" search={{ category: c.slug }} className="hover:text-ivory">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/collections" className="hover:text-ivory">
                All collections
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-xl text-gold">OZ Fashion House</p>
          <ul className="mt-4 space-y-2.5 text-footer-muted">
            <li>
              <Link to="/about" className="hover:text-ivory">
                About us
              </Link>
            </li>
            <li>
              <Link to="/journal" className="hover:text-ivory">
                Journal
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-ivory">
                Contact & visits
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-xl text-gold">Visit & contact</p>
          <ul className="mt-4 space-y-3 text-footer-muted">
            <li>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-2.5 hover:text-ivory"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {business.location}
              </a>
            </li>
            <li>
              <a href={business.phoneHref} className="inline-flex gap-2.5 hover:text-ivory">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" /> {business.phoneIntl}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-2.5 hover:text-ivory"
              >
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" /> WhatsApp{" "}
                {business.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-footer-line">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-footer-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} OZ Fashion House. Namugongo, Wakiso.</p>
          <p>Wedding clothing and accessories for the bride, groom and bridal party</p>
        </div>
      </div>
    </footer>
  );
}
