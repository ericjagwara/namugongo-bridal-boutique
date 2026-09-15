import brideImage from "../assets/oz-bride-editorial.jpg";
import brideTrain from "../assets/oz-bride-train.jpg";
import groomImage from "../assets/oz-groom-editorial.jpg";
import bridesmaidsImage from "../assets/oz-bridesmaids-editorial.jpg";
import accessoriesImage from "../assets/oz-accessories-editorial.jpg";
import bmRose from "../assets/oz-bm-rose.jpg";

/*
 * HOW TO ADD A JOURNAL POST
 * -------------------------
 * Copy one of the posts below and place it at the TOP of the list (newest first).
 * `slug` becomes the address: /journal/<slug>. Body blocks can be:
 *   { type: "p", text }        a paragraph
 *   { type: "h2", text }       a sub-heading
 *   { type: "list", items }    a bulleted list
 *   { type: "quote", text }    a highlighted pull quote
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  topic: "Bride" | "Groom" | "Bridal party" | "Planning" | "Accessories";
  excerpt: string;
  image: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  shopCategory?: "bride" | "groom" | "bridesmaids" | "accessories";
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "kwanjula-and-white-wedding-two-looks",
    title: "Kwanjula and the white wedding: planning two looks",
    topic: "Planning",
    excerpt:
      "Many couples celebrate an introduction and a church or garden wedding within months of each other. Here is how to plan both wardrobes without the stress.",
    image: bridesmaidsImage,
    date: "2026-09-08",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "For many couples in Buganda and across Uganda, the wedding season really means two celebrations: the kwanjula, where families are formally introduced, and the white wedding that follows. Each has its own dress code, its own guests and its own photographs, so it helps to plan the outfits as one wardrobe rather than two separate projects.",
      },
      { type: "h2", text: "Start with the dates, then work backwards" },
      {
        type: "p",
        text: "Write down both dates and count back from each. Made-to-measure pieces need time for a consultation, measurements and at least one fitting, so the earlier event usually sets your first deadline. If the two events are close together, order the pieces for both at the same visit so fittings can be combined.",
      },
      { type: "h2", text: "Let the two looks talk to each other" },
      {
        type: "p",
        text: "The kwanjula belongs to tradition — gomesi for the women and kanzu with a jacket for the men — while the white wedding gives you more freedom. A thread of colour that runs through both days makes the photographs feel like one story. A champagne or gold accent in the introduction palette, for example, can return in bridesmaid gowns and the groom’s pocket square.",
      },
      {
        type: "list",
        items: [
          "Choose one accent colour that works for both events.",
          "Reuse jewellery and hairpieces where it feels natural.",
          "Keep the groom’s white wedding accessories in the same metal tone as his introduction look.",
        ],
      },
      { type: "h2", text: "Think about the whole party early" },
      {
        type: "p",
        text: "Aunties, bridesmaids, groomsmen and the family committee all need outfits, often for both days. Share your colours with everyone as early as possible and collect sizes in one list. When you send us that list on WhatsApp, we can plan group orders in one go.",
      },
      {
        type: "quote",
        text: "One wardrobe, two celebrations: plan them together and both days feel easier.",
      },
      {
        type: "p",
        text: "If you are planning around Namugongo, remember that Martyrs Day on 3 June brings very large crowds to the area. Avoid booking fittings or collections in the days around it.",
      },
    ],
  },
  {
    slug: "choosing-a-bridal-silhouette",
    title: "How to choose a bridal silhouette that feels like you",
    topic: "Bride",
    excerpt:
      "Start with how you want to feel, then think about your venue, how much you want to move and the details you keep coming back to.",
    image: brideImage,
    date: "2026-08-21",
    readMinutes: 5,
    shopCategory: "bride",
    body: [
      {
        type: "p",
        text: "The silhouette is the overall shape of a gown, and it shapes everything else: how you walk, how you sit, how you dance and how you look in photographs. Before you think about lace or beading, decide on the shape.",
      },
      { type: "h2", text: "The main silhouettes" },
      {
        type: "list",
        items: [
          "Ball gown: a fitted bodice and a full skirt. Grand and romantic, ideal for church and large venues.",
          "A-line: fitted at the waist and gently widening to the floor. Flattering on almost everyone and easy to move in.",
          "Mermaid or trumpet: fitted through the hips and flaring near the knee. Dramatic, but plan how you will dance.",
          "Column or sheath: a straight, slim line. Modern and light, lovely for garden and evening receptions.",
        ],
      },
      { type: "h2", text: "Think about the day, not only the aisle" },
      {
        type: "p",
        text: "Uganda’s weddings are long and full of movement, from the processional to the dancing. If you love a fitted mermaid shape, consider a detachable overskirt or train like the one on our Amara Gown: dramatic for the ceremony, lighter for the reception.",
      },
      { type: "h2", text: "Bring references to your consultation" },
      {
        type: "p",
        text: "Save pictures of gowns you love, and note what you love about each one. Is it the neckline, the fabric, the back? Patterns in those notes usually reveal the silhouette you are drawn to.",
      },
      {
        type: "quote",
        text: "Choose the shape first. The details are easier once the shape feels right.",
      },
    ],
  },
  {
    slug: "grooms-guide-to-tailoring",
    title: "A groom’s guide to wedding-day tailoring",
    topic: "Groom",
    excerpt: "Proportion, fabric and finishing details are what make formalwear look made for you.",
    image: groomImage,
    date: "2026-08-02",
    readMinutes: 4,
    shopCategory: "groom",
    body: [
      {
        type: "p",
        text: "A well-fitted suit changes how a groom stands, moves and photographs. Tailoring is less about following trends and more about getting three things right: fit, fabric and finish.",
      },
      { type: "h2", text: "Fit: the checks that matter" },
      {
        type: "list",
        items: [
          "Shoulders: the seam should end where your shoulder ends, with no dent or overhang.",
          "Jacket length: it should cover your seat when you stand straight.",
          "Sleeves: show a little shirt cuff, about 1 cm, when your arms are relaxed.",
          "Trousers: a clean line with a slight break, or none, over the shoe.",
        ],
      },
      { type: "h2", text: "Fabric for our climate" },
      {
        type: "p",
        text: "Afternoon ceremonies in Wakiso can be warm. Lighter-weight fabrics and a breathable lining keep you comfortable through photographs and speeches, while a waistcoat means you can remove the jacket later and still look complete.",
      },
      { type: "h2", text: "Finish" },
      {
        type: "p",
        text: "A bow tie or tie, a pocket square and cufflinks pull the look together. Keep the metal tones consistent, and coordinate one accent with the bride’s palette.",
      },
      { type: "quote", text: "Fit first, then fabric, then finish." },
    ],
  },
  {
    slug: "dressing-your-bridesmaids",
    title: "Coordinated, not identical: dressing your bridesmaids",
    topic: "Bridal party",
    excerpt:
      "Build a colour story that holds together while every bridesmaid feels comfortable and confident.",
    image: bmRose,
    date: "2026-07-15",
    readMinutes: 5,
    shopCategory: "bridesmaids",
    body: [
      {
        type: "p",
        text: "Matching dresses look neat, but they rarely flatter every body in the same way. A mix-and-match party keeps the group looking planned while letting each bridesmaid choose what suits her.",
      },
      { type: "h2", text: "Pick a tight colour story" },
      {
        type: "p",
        text: "Choose two or three tones from the same family, such as champagne, rose and blush. Close tones look deliberate; very different colours can look accidental in photos.",
      },
      { type: "h2", text: "Keep one thing constant" },
      {
        type: "list",
        items: [
          "The same fabric, such as satin, across all gowns.",
          "The same length, usually floor length for formal weddings.",
          "Matching bouquets or matching earrings.",
        ],
      },
      { type: "h2", text: "Collect sizes early" },
      {
        type: "p",
        text: "Ask each bridesmaid for her size or measurements and her preferred neckline, and keep it in one list. Send that list to us on WhatsApp and we can plan the whole order together.",
      },
      { type: "quote", text: "Same palette, same fabric, different shapes: that is the balance." },
    ],
  },
  {
    slug: "wedding-wardrobe-timeline",
    title: "Your wedding wardrobe timeline, month by month",
    topic: "Planning",
    excerpt: "A simple countdown so gowns, suits and accessories are ready well before the day.",
    image: brideTrain,
    date: "2026-06-24",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Every order is different, so always confirm timings with us. As a general guide, this countdown keeps the wardrobe calm.",
      },
      { type: "h2", text: "6 to 9 months before" },
      {
        type: "list",
        items: [
          "Book a bridal consultation.",
          "Decide on your colour story.",
          "Share the plan with your bridal party.",
        ],
      },
      { type: "h2", text: "4 to 6 months before" },
      {
        type: "list",
        items: [
          "Confirm the gown design and take measurements.",
          "Order the groom’s and groomsmen’s suits.",
          "Collect bridesmaid sizes.",
        ],
      },
      { type: "h2", text: "2 to 3 months before" },
      {
        type: "list",
        items: [
          "First fittings.",
          "Choose shoes, so hems can be measured with them.",
          "Choose jewellery, hairpieces, bow ties and cufflinks.",
        ],
      },
      { type: "h2", text: "The final month" },
      {
        type: "list",
        items: [
          "Final fittings for everyone.",
          "Collect outfits and try each one on at home.",
          "Pack a small kit: safety pins, fashion tape and a steamer.",
        ],
      },
      { type: "quote", text: "Wear your wedding shoes around the house before the day." },
    ],
  },
  {
    slug: "finishing-details-for-her-and-him",
    title: "Finishing details: accessories for her and him",
    topic: "Accessories",
    excerpt:
      "Small pieces make a big difference. How to choose jewellery, hairpieces, bow ties and cufflinks that work together.",
    image: accessoriesImage,
    date: "2026-06-05",
    readMinutes: 3,
    shopCategory: "accessories",
    body: [
      {
        type: "p",
        text: "Accessories connect the bride, the groom and the wedding party. Chosen together, they make the whole celebration look considered.",
      },
      { type: "h2", text: "For her" },
      {
        type: "list",
        items: [
          "Match your jewellery to your neckline: drop earrings suit strapless and sweetheart gowns.",
          "Choose a hairpiece after you decide on your hairstyle.",
          "Wear your shoes to your final fitting so the hem is right.",
        ],
      },
      { type: "h2", text: "For him" },
      {
        type: "list",
        items: [
          "Keep cufflinks, tie bar and watch in the same metal tone.",
          "A pre-tied bow tie saves time on a busy morning.",
          "A plain white pocket square is always correct.",
        ],
      },
      { type: "h2", text: "Tie the two together" },
      {
        type: "p",
        text: "If the bride wears gold-tone pieces, give the groom gold-tone cufflinks. The link is subtle, but it shows in every photograph of the two of you.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
