# Namugongo Bridal Boutique

Attached ia a logo for our company website, a bridal business making and selling clothing and accessories for weddings, based in Namugongo, Wakiso, uganda, whatsapp number: 0701090109. catergories being bride, groom, groomsmaids, accesserories for men and ladies

This project was built with [Lovable](https://lovable.dev).


## Updating the website

| To change… | Edit this file |
| --- | --- |
| Phone / WhatsApp number, location, map link | `src/lib/site.ts` |
| Products, prices, sizes, colours, photos | `src/lib/catalog.ts` (instructions at the top) |
| Journal (blog) posts | `src/lib/journal.ts` (instructions at the top) |
| Colours and fonts | `src/styles.css` |
| Logo | `src/components/logo.tsx` |

**Ordering:** customers choose size, colour and quantity on a product page and tap
*Order on WhatsApp*, or add several pieces to the bag and send one message. Messages go to
+256 701 090 109 and include product links, the customer's name, wedding date and
collection or delivery preference. No payments are taken on the site.

**Prices:** add `price: 850000` (Uganda shillings) to a product. Products without a
price show "Price on request".

**Photos:** put new `.jpg` files in `src/assets`, import them at the top of
`catalog.ts`, and set `image` (and optionally `gallery`) on the product. Portrait photos
(4:5) work best.

**Link previews:** the WhatsApp/Facebook preview image is `public/og-image.jpg`. Some apps
need a full address, so once the site has its own domain, change `"/og-image.jpg"` in
`src/routes/__root.tsx` to `"https://your-domain/og-image.jpg"`.

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4f38b187-7291-4736-9012-2ac4baa903ad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
