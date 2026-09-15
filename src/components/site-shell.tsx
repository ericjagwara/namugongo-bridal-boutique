import { Link, useRouterState } from "@tanstack/react-router";
import { Minus, Plus, Menu, MessageCircle, ShoppingBag, Trash2, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import logoAsset from "../assets/oz-fashion-house-logo.png.asset.json";
import { products, whatsappNumber, type Product } from "../lib/catalog";

type CartItem = { productId: string; quantity: number };
type ShopContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside SiteShell");
  return value;
}

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/collections", label: "Shop", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/journal", label: "Journal", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const stored = window.localStorage.getItem("oz-shopping-bag");
    if (!stored) return;
    try { setItems(JSON.parse(stored) as CartItem[]); } catch { setItems([]); }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("oz-shopping-bag", JSON.stringify(items));
  }, [items]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const value = useMemo<ShopContextValue>(() => ({
    items,
    addToCart: (product) => {
      setItems((current) => {
        const found = current.find((item) => item.productId === product.id);
        return found
          ? current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
          : [...current, { productId: product.id, quantity: 1 }];
      });
      setCartOpen(true);
    },
    updateQuantity: (productId, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.productId !== productId) : current.map((item) => item.productId === productId ? { ...item, quantity } : item)),
    cartOpen,
    setCartOpen,
  }), [items, cartOpen]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isHome = pathname === "/";

  return (
    <ShopContext.Provider value={value}>
      <header className={`z-50 w-full border-b ${isHome ? "absolute border-hero-line text-hero-foreground" : "sticky top-0 border-border bg-background/95 text-foreground backdrop-blur"}`}>
        <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" aria-label="OZ Fashion House home" className={`flex h-20 w-32 items-center justify-center ${isHome ? "bg-hero/55" : ""}`}>
            <img src={logoAsset.url} alt="OZ Fashion House" className="h-[4.5rem] w-auto object-contain" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 font-sans text-xs font-semibold uppercase tracking-[0.16em] lg:flex">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} activeOptions={{ exact: item.exact }} className="border-b border-transparent py-3 transition-colors hover:text-primary" activeProps={{ className: "text-primary border-primary" }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="hidden min-h-11 items-center gap-2 border border-primary px-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex">
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <button type="button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag with ${itemCount} items`} className="relative grid size-11 place-items-center border border-current/20 transition-colors hover:border-primary hover:text-primary">
              <ShoppingBag className="size-5" />
              {itemCount > 0 && <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-primary font-sans text-[0.65rem] font-bold text-primary-foreground">{itemCount}</span>}
            </button>
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="grid size-11 place-items-center border border-current/20 lg:hidden"><Menu className="size-5" /></button>
          </div>
        </div>
      </header>

      {children}
      <SiteFooter />

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-foreground p-6 text-background lg:hidden">
          <div className="flex items-center justify-between">
            <img src={logoAsset.url} alt="OZ Fashion House" className="h-20 w-auto" />
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="grid size-12 place-items-center border border-footer-line"><X /></button>
          </div>
          <nav className="mt-16 flex flex-col">
            {navItems.map((item, index) => <Link key={item.to} to={item.to} className="border-b border-footer-line py-5 font-display text-4xl"><span className="mr-5 font-sans text-xs text-primary">0{index + 1}</span>{item.label}</Link>)}
          </nav>
        </div>
      )}
      <CartDrawer />
    </ShopContext.Provider>
  );
}

function CartDrawer() {
  const { items, cartOpen, setCartOpen, updateQuantity } = useShop();
  const lines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const message = ["Hello OZ Fashion House, I would like to order:", ...lines.map((line) => `• ${line.product.name} — Qty ${line.quantity}`), "", "Please share availability, pricing and fitting details."].join("\n");
  const orderUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {cartOpen && <button aria-label="Close shopping bag" className="fixed inset-0 z-[75] cursor-default bg-foreground/55" onClick={() => setCartOpen(false)} />}
      <aside aria-label="Shopping bag" className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-24 items-center justify-between border-b border-border px-6">
          <div><p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-primary">Your selection</p><h2 className="font-display text-3xl">Shopping bag</h2></div>
          <button type="button" aria-label="Close shopping bag" onClick={() => setCartOpen(false)} className="grid size-11 place-items-center border border-border"><X className="size-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center"><div><ShoppingBag className="mx-auto size-9 text-primary" /><p className="mt-5 font-display text-3xl">Your bag is waiting.</p><p className="mt-2 font-sans text-sm text-muted-foreground">Add your favourite pieces from our collections.</p><Link to="/collections" onClick={() => setCartOpen(false)} className="mt-7 inline-block border-b border-primary pb-2 font-sans text-xs font-semibold uppercase tracking-[0.15em]">Explore the shop</Link></div></div>
          ) : lines.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 border-b border-border py-5 first:pt-0">
              <img src={product.image} alt="" className="h-28 w-20 object-cover" />
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div><p className="font-sans text-[0.65rem] uppercase tracking-[0.15em] text-primary">{product.category}</p><h3 className="mt-1 font-display text-xl">{product.name}</h3></div>
                <div className="flex items-center justify-between"><div className="flex items-center border border-border"><button aria-label="Decrease quantity" onClick={() => updateQuantity(product.id, quantity - 1)} className="grid size-8 place-items-center"><Minus className="size-3" /></button><span className="w-8 text-center font-sans text-xs">{quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(product.id, quantity + 1)} className="grid size-8 place-items-center"><Plus className="size-3" /></button></div><button aria-label={`Remove ${product.name}`} onClick={() => updateQuantity(product.id, 0)} className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button></div>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && <div className="border-t border-border p-6"><p className="mb-4 font-sans text-xs leading-5 text-muted-foreground">Pricing and availability will be confirmed personally on WhatsApp.</p><a href={orderUrl} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-center gap-3 bg-primary px-5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary-strong"><MessageCircle className="size-5" /> Send order on WhatsApp</a></div>}
      </aside>
    </>
  );
}

function SiteFooter() {
  return <footer className="bg-foreground px-5 py-14 text-background sm:px-8 lg:px-12"><div className="mx-auto grid max-w-screen-2xl gap-10 border-b border-footer-line pb-12 md:grid-cols-[1.4fr_1fr_1fr]"><div><img src={logoAsset.url} alt="OZ Fashion House" className="h-20 w-auto" /><p className="mt-5 max-w-sm font-display text-2xl italic text-footer-muted">Dressing every beautiful moment before “I do.”</p></div><div><p className="font-sans text-xs uppercase tracking-[0.18em] text-primary">Explore</p><div className="mt-5 flex flex-col gap-3 font-sans text-sm text-footer-muted"><Link to="/collections">Shop collections</Link><Link to="/about">About us</Link><Link to="/journal">Journal</Link></div></div><div><p className="font-sans text-xs uppercase tracking-[0.18em] text-primary">Visit & contact</p><p className="mt-5 font-sans text-sm leading-7 text-footer-muted">Namugongo, Wakiso, Uganda<br/><a href="tel:+256701090109">+256 701 090 109</a></p></div></div><div className="mx-auto flex max-w-screen-2xl flex-col gap-3 pt-7 font-sans text-xs text-footer-muted sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} OZ Fashion House</p><p>Bridal clothing & accessories</p></div></footer>;
}