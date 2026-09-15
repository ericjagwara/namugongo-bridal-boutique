import brideImage from "../assets/oz-bride-editorial.jpg";
import brideBodice from "../assets/oz-bride-bodice.jpg";
import brideTrain from "../assets/oz-bride-train.jpg";
import groomImage from "../assets/oz-groom-editorial.jpg";
import groomJacket from "../assets/oz-groom-jacket.jpg";
import groomBowtie from "../assets/oz-groom-bowtie.jpg";
import bridesmaidsImage from "../assets/oz-bridesmaids-editorial.jpg";
import bmChampagne from "../assets/oz-bm-champagne.jpg";
import bmRose from "../assets/oz-bm-rose.jpg";
import bmBlush from "../assets/oz-bm-blush.jpg";
import accessoriesImage from "../assets/oz-accessories-editorial.jpg";
import accBowtie from "../assets/oz-acc-bowtie.jpg";
import accHairvine from "../assets/oz-acc-hairvine.jpg";
import accHeels from "../assets/oz-acc-heels.jpg";
import accCufflinks from "../assets/oz-acc-cufflinks.jpg";
import accEarrings from "../assets/oz-acc-earrings.jpg";

/*
 * HOW TO UPDATE THE SHOP
 * ----------------------
 * - Add a product: copy any entry in `products`, give it a new unique `id`
 *   (lowercase-with-dashes, it becomes the page address /shop/<id>).
 * - Add a photo: put the .jpg in src/assets, import it above, use it as `image`.
 * - Prices: set `price` in Uganda shillings (e.g. price: 850000).
 *   Leave it out and the site shows "Price on request".
 * - Sizes/colours: customers pick these before ordering on WhatsApp.
 */

export type CategorySlug = "bride" | "groom" | "bridesmaids" | "accessories";

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  /** Finer grouping inside a category, used as a filter (e.g. "For her"). */
  group: string;
  summary: string;
  description: string;
  details: string[];
  image: string;
  gallery?: string[];
  sizes: string[];
  colours?: string[];
  price?: number;
  tag?: string;
  featured?: boolean;
};

export type Category = {
  slug: CategorySlug;
  label: string;
  title: string;
  blurb: string;
  image: string;
  groups: string[];
};

export const categories: Category[] = [
  {
    slug: "bride",
    label: "Bride",
    title: "For the bride",
    blurb: "Wedding gowns, custom bridal design and the pieces that finish your look.",
    image: brideImage,
    groups: ["Gowns", "Bridal finishing"],
  },
  {
    slug: "groom",
    label: "Groom",
    title: "For the groom & groomsmen",
    blurb: "Tuxedos and suits for the groom, with matching sets for his groomsmen.",
    image: groomImage,
    groups: ["Groom", "Groomsmen"],
  },
  {
    slug: "bridesmaids",
    label: "Bridesmaids",
    title: "For the bridesmaids",
    blurb: "Gowns in coordinated tones, ordered one at a time or for the whole party.",
    image: bridesmaidsImage,
    groups: ["Gowns", "Party orders"],
  },
  {
    slug: "accessories",
    label: "Accessories",
    title: "Accessories for her & him",
    blurb: "Jewellery, hairpieces, shoes, bow ties and cufflinks.",
    image: accessoriesImage,
    groups: ["For her", "For him", "Sets"],
  },
];

const dressSizes = [
  "UK 6",
  "UK 8",
  "UK 10",
  "UK 12",
  "UK 14",
  "UK 16",
  "UK 18",
  "UK 20",
  "Custom measurements",
];
const suitSizes = ["36", "38", "40", "42", "44", "46", "48", "Custom measurements"];
const oneSize = ["One size"];

export const products: Product[] = [
  // ——— Bride ———
  {
    id: "amara-gown",
    name: "The Amara Gown",
    category: "bride",
    group: "Gowns",
    tag: "Signature",
    featured: true,
    summary: "Draped sweetheart bodice, beaded lace skirt and a sculpted satin overskirt.",
    description:
      "Our signature gown pairs a softly draped strapless bodice with a fitted, beaded lace skirt. A sculpted satin overskirt opens at the front and falls into a long train, so the gown feels dramatic walking in and elegant on the dance floor.",
    details: [
      "Strapless draped sweetheart neckline",
      "Fitted mermaid skirt in beaded lace",
      "Satin overskirt with sweeping train",
      "Made to your measurements after consultation",
    ],
    image: brideImage,
    gallery: [brideBodice, brideTrain],
    sizes: dressSizes,
    colours: ["Ivory", "Off-white"],
  },
  {
    id: "bespoke-bridal-gown",
    name: "Bespoke Bridal Gown",
    category: "bride",
    group: "Gowns",
    tag: "Made for you",
    summary: "A gown designed with you, from first sketch to final fitting.",
    description:
      "Bring your ideas, pictures or a feeling you want to capture. We design the gown with you, choose fabrics together and take your measurements, then refine the fit across fittings until it is exactly right.",
    details: [
      "Design consultation in Namugongo or on WhatsApp",
      "Choice of satin, crepe, lace and beadwork",
      "Fitted to your measurements",
      "Share your wedding date so we can plan fittings",
    ],
    image: brideTrain,
    gallery: [brideImage, brideBodice],
    sizes: ["Custom measurements"],
  },
  {
    id: "crystal-bridal-tiara",
    name: "Crystal Bridal Tiara",
    category: "bride",
    group: "Bridal finishing",
    summary: "A fine crystal tiara that sits neatly on an updo.",
    description:
      "A delicate band of crystals made to sit comfortably on a bridal updo or with a veil. It catches the light without overpowering your gown.",
    details: [
      "Silver-tone crystal band",
      "Works with or without a veil",
      "Pairs with pearl or crystal earrings",
    ],
    image: brideBodice,
    sizes: oneSize,
    colours: ["Silver"],
  },

  // ——— Groom ———
  {
    id: "classic-tuxedo",
    name: "The Classic Tuxedo",
    category: "groom",
    group: "Groom",
    tag: "Made to measure",
    featured: true,
    summary: "Three-piece black tuxedo with satin lapels and a matching waistcoat.",
    description:
      "Sharp black formal tailoring for the groom: a single-button jacket with satin lapels, a matching waistcoat and tapered trousers. Finished with a crisp white shirt, bow tie and pocket square.",
    details: [
      "Jacket, waistcoat and trousers",
      "Satin lapels and covered buttons",
      "Tailored to your measurements",
      "Bow tie and pocket square can be added",
    ],
    image: groomImage,
    gallery: [groomJacket, groomBowtie],
    sizes: suitSizes,
    colours: ["Black", "Midnight navy", "Ivory jacket"],
  },
  {
    id: "groomsmen-tuxedo-set",
    name: "Groomsmen Tuxedo Set",
    category: "groom",
    group: "Groomsmen",
    tag: "Group order",
    summary: "Matching tuxedos for your groomsmen, ordered together.",
    description:
      "Dress your groomsmen to match the groom or in a complementary shade. Order the whole group at once and send us each person’s size or measurements on WhatsApp.",
    details: [
      "Jacket, waistcoat and trousers per groomsman",
      "Colour can match or complement the groom",
      "Set the quantity to the number of groomsmen",
      "Each person’s measurements confirmed on WhatsApp",
    ],
    image: groomJacket,
    gallery: [groomImage],
    sizes: suitSizes,
    colours: ["Black", "Midnight navy", "Charcoal"],
  },
  {
    id: "grooms-finishing-set",
    name: "Groom’s Finishing Set",
    category: "groom",
    group: "Groom",
    featured: true,
    summary: "Bow tie, white pocket square and cufflinks in one set.",
    description:
      "The last details that make a tuxedo look complete: a black bow tie, a folded white pocket square and a pair of gold-tone cufflinks.",
    details: ["Black bow tie", "White pocket square", "Gold-tone cufflinks"],
    image: groomBowtie,
    gallery: [accBowtie, accCufflinks],
    sizes: oneSize,
  },

  // ——— Bridesmaids ———
  {
    id: "champagne-wrap-gown",
    name: "The Champagne Wrap Gown",
    category: "bridesmaids",
    group: "Gowns",
    featured: true,
    summary: "Satin V-neck gown with a wrapped bodice and a front slit.",
    description:
      "A flowing floor-length gown in soft champagne satin. The wrapped V-neck bodice is flattering on many figures, and the front slit makes walking and dancing easy.",
    details: [
      "V-neck wrap bodice",
      "Floor length with front slit",
      "Soft satin that drapes and moves",
    ],
    image: bmChampagne,
    gallery: [bridesmaidsImage],
    sizes: dressSizes,
    colours: ["Champagne", "Rose", "Blush"],
  },
  {
    id: "rose-sweetheart-gown",
    name: "The Rose Sweetheart Gown",
    category: "bridesmaids",
    group: "Gowns",
    summary: "Strapless sweetheart gown with a pleated bodice.",
    description:
      "A dusty rose gown with a pleated sweetheart bodice and a long skirt with a slit. It pairs beautifully with the champagne and blush styles for a mixed-style bridal party.",
    details: ["Strapless sweetheart neckline", "Pleated bodice", "Floor length with slit"],
    image: bmRose,
    gallery: [bridesmaidsImage],
    sizes: dressSizes,
    colours: ["Rose", "Champagne", "Blush"],
  },
  {
    id: "blush-one-shoulder-gown",
    name: "The Blush One-Shoulder Gown",
    category: "bridesmaids",
    group: "Gowns",
    summary: "Clean one-shoulder satin gown in a soft blush.",
    description:
      "A simple, elegant one-shoulder gown in blush satin. The clean neckline lets jewellery and bouquets stand out.",
    details: ["One-shoulder neckline", "Fitted bodice", "Floor-length satin skirt"],
    image: bmBlush,
    gallery: [bridesmaidsImage],
    sizes: dressSizes,
    colours: ["Blush", "Champagne", "Rose"],
  },
  {
    id: "bridesmaids-party-order",
    name: "Mix & Match Party Order",
    category: "bridesmaids",
    group: "Party orders",
    tag: "Group order",
    summary: "Different styles in coordinated tones for the whole bridal party.",
    description:
      "Let each bridesmaid choose the neckline she loves while the colours stay in harmony. Tell us how many bridesmaids you have and your colour story, and we will help you plan the set.",
    details: [
      "Any mix of wrap, sweetheart and one-shoulder styles",
      "Colours coordinated across the group",
      "Set the quantity to the number of bridesmaids",
      "Sizes confirmed for each person on WhatsApp",
    ],
    image: bridesmaidsImage,
    gallery: [bmChampagne, bmRose, bmBlush],
    sizes: ["Mixed sizes"],
    colours: ["Champagne, rose & blush", "All champagne", "All rose", "Tell us your colours"],
  },

  // ——— Accessories: for her ———
  {
    id: "golden-pearl-hairvine",
    name: "Golden Pearl Hairvine",
    category: "accessories",
    group: "For her",
    featured: true,
    summary: "Flexible gold-tone leaves with pearls and crystals.",
    description:
      "A bendable hairvine of gold-tone leaves, pearls and crystals. Shape it around a bun, across the back of an updo or along a veil comb.",
    details: ["Bendable wire base", "Pearls and clear crystals", "Pins into place"],
    image: accHairvine,
    gallery: [accessoriesImage],
    sizes: oneSize,
    colours: ["Gold"],
  },
  {
    id: "ivory-satin-heels",
    name: "Ivory Satin Heels",
    category: "accessories",
    group: "For her",
    summary: "Pointed satin heels with an ankle strap.",
    description:
      "Classic pointed heels in ivory satin with a slim ankle strap for a secure fit through the ceremony and reception.",
    details: ["Ivory satin upper", "Adjustable ankle strap", "Pointed toe"],
    image: accHeels,
    gallery: [accessoriesImage],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42"],
    colours: ["Ivory", "Champagne"],
  },
  {
    id: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    category: "accessories",
    group: "For her",
    summary: "Crystal leaf studs with a single pearl drop.",
    description:
      "Small crystal leaves holding a single pearl drop. Elegant for the bride and a lovely matching gift for bridesmaids.",
    details: ["Crystal leaf stud", "Pearl drop", "Gold-tone setting"],
    image: accEarrings,
    gallery: [accessoriesImage],
    sizes: oneSize,
    colours: ["Gold", "Silver"],
  },

  // ——— Accessories: for him ———
  {
    id: "black-textured-bow-tie",
    name: "Black Textured Bow Tie",
    category: "accessories",
    group: "For him",
    summary: "Pre-tied black bow tie in a fine textured weave.",
    description:
      "A pre-tied black bow tie with a subtle woven texture, adjustable to fit. Order one for the groom or a set for all the groomsmen.",
    details: ["Pre-tied with adjustable band", "Fine textured weave", "Order in any quantity"],
    image: accBowtie,
    gallery: [accessoriesImage],
    sizes: oneSize,
    colours: ["Black", "Midnight navy", "Champagne"],
  },
  {
    id: "gold-ridged-cufflinks",
    name: "Gold Ridged Cufflinks",
    category: "accessories",
    group: "For him",
    summary: "Round gold-tone cufflinks with a ridged face.",
    description:
      "Round gold-tone cufflinks with a fine ridged face. They sit neatly with a tuxedo shirt and suit any wedding colour.",
    details: ["Gold-tone finish", "Ridged round face", "Bullet-back fastening"],
    image: accCufflinks,
    gallery: [accessoriesImage],
    sizes: oneSize,
  },
  {
    id: "wedding-party-accessory-edit",
    name: "Wedding Party Accessory Edit",
    category: "accessories",
    group: "Sets",
    tag: "For her & him",
    summary: "Matching accessories for the whole party, chosen together.",
    description:
      "Tell us your colours and how many people you are dressing. We will put together matching earrings, hairpieces, bow ties and cufflinks so the whole wedding party looks coordinated.",
    details: [
      "Accessories for women and men",
      "Chosen to match your colours",
      "Quantities confirmed on WhatsApp",
    ],
    image: accessoriesImage,
    gallery: [accHairvine, accBowtie, accCufflinks],
    sizes: ["Mixed"],
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function relatedProducts(product: Product, count = 4) {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const others = products.filter(
    (p) => p.id !== product.id && p.category !== product.category && p.featured,
  );
  return [...same, ...others].slice(0, count);
}

/** @deprecated kept for older imports; use `business.whatsapp` from lib/site. */
export const whatsappNumber = "256701090109";
