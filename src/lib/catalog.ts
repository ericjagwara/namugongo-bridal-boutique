import brideImage from "../assets/oz-bride-editorial.jpg";
import groomImage from "../assets/oz-groom-editorial.jpg";
import bridesmaidsImage from "../assets/oz-bridesmaids-editorial.jpg";
import accessoriesImage from "../assets/oz-accessories-editorial.jpg";

export type Category = "Bride" | "Groom" | "Bridesmaids" | "Accessories";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  tag: string;
};

export const products: Product[] = [
  { id: "br-01", name: "The Amara Gown", category: "Bride", description: "A sculpted bridal silhouette with an asymmetric neckline, fitted lace bodice and sweeping satin train.", image: brideImage, tag: "Signature" },
  { id: "br-02", name: "Pearl Veil Set", category: "Bride", description: "A refined bridal veil and hairpiece pairing designed to complete a timeless ceremony look.", image: accessoriesImage, tag: "Bridal finish" },
  { id: "gr-01", name: "The Classic Tuxedo", category: "Groom", description: "Sharp black formal tailoring with a satin lapel, crisp waistcoat and considered finishing details.", image: groomImage, tag: "Made to measure" },
  { id: "gr-02", name: "Groom's Detail Set", category: "Groom", description: "A coordinated bow tie and cufflink set for a polished wedding-day finish.", image: accessoriesImage, tag: "Finishing set" },
  { id: "bm-01", name: "The Champagne Edit", category: "Bridesmaids", description: "Graceful floor-length gowns in complementary champagne tones for an elegant bridal party.", image: bridesmaidsImage, tag: "Party collection" },
  { id: "bm-02", name: "The Rose Edit", category: "Bridesmaids", description: "Soft rose occasion dresses with flattering silhouettes, designed for a beautifully coordinated group.", image: bridesmaidsImage, tag: "Party collection" },
  { id: "ac-01", name: "Golden Pearl Hairvine", category: "Accessories", description: "Delicate gold-toned leaves, pearls and crystals shaped into a flexible bridal hairpiece.", image: accessoriesImage, tag: "For her" },
  { id: "ac-02", name: "Ceremony Accessories", category: "Accessories", description: "An elegant edit of shoes, jewelry, bow ties and cufflinks for women and men.", image: accessoriesImage, tag: "For both" },
];

export const categoryDescriptions: Record<Category, string> = {
  Bride: "Wedding gowns and finishing pieces created for an unforgettable entrance.",
  Groom: "Confident formalwear and considered details for the modern groom.",
  Bridesmaids: "Coordinated occasion looks made to celebrate beautifully together.",
  Accessories: "The final details for women and men, from jewelry to cufflinks.",
};

export const whatsappNumber = "256701090109";