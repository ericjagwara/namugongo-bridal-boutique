import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

import { ProductCard } from "../components/product-card";
import { getCategory, products } from "../lib/catalog";
import { formatPostDate, getPost, posts, type Block } from "../lib/journal";
import { useOrigin, whatsappLink } from "../lib/site";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Story not found | OZ Fashion House" }] };
    return {
      meta: [
        { title: `${post.title} | OZ Journal` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.image },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <main className="container-site section-pad text-center">
      <h1 className="page-title">We couldn’t find that story</h1>
      <Link to="/journal" className="btn btn-ink mt-8">
        Back to the journal
      </Link>
    </main>
  ),
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const origin = useOrigin();
  const category = post.shopCategory ? getCategory(post.shopCategory) : undefined;
  const shopPicks = post.shopCategory
    ? products.filter((p) => p.category === post.shopCategory).slice(0, 3)
    : products.filter((p) => p.featured).slice(0, 3);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const shareText = `${post.title}${origin ? ` ${origin}/journal/${post.slug}` : ""}`;

  return (
    <main>
      <article>
        <header className="mx-auto max-w-4xl px-5 pt-10 text-center sm:px-8 sm:pt-14">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gilt"
          >
            <ArrowLeft className="size-4" /> All stories
          </Link>
          <p className="kicker mt-8">{post.topic}</p>
          <h1 className="mt-2 text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.02em] [text-wrap:balance]">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {post.excerpt}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>{" "}
            <span aria-hidden="true">/</span> {post.readMinutes} min read
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-8">
          <img src={post.image} alt="" className="aspect-[16/9] w-full object-cover" />
        </div>

        <div className="mx-auto max-w-[42rem] px-5 py-14 sm:px-8">
          <div className="prose-oz">
            {post.body.map((block, index) => (
              <BodyBlock key={index} block={block} />
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-border pt-8">
            <span className="mr-2 text-sm text-muted-foreground">Share this story</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline min-h-10 px-4"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </div>
        </div>
      </article>

      <section className="bg-sand section-pad">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">Shop the story</p>
              <h2 className="section-title">{category ? category.title : "Featured pieces"}</h2>
            </div>
            <a
              href={whatsappLink(
                `Hello OZ Fashion House, I just read "${post.title}" and would like some advice.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              <MessageCircle className="size-4" /> Ask a stylist about this
            </a>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shopPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site section-pad">
        <h2 className="section-title">Keep reading</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {more.map((item) => (
            <article key={item.slug} className="group relative">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="mt-4 text-sm text-gilt">{item.topic}</p>
              <h3 className="mt-1 text-2xl leading-tight">
                <Link
                  to="/journal/$slug"
                  params={{ slug: item.slug }}
                  className="after:absolute after:inset-0 group-hover:text-gilt"
                >
                  {item.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
        <Link to="/journal" className="text-link mt-12">
          All stories <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}

function BodyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
}
