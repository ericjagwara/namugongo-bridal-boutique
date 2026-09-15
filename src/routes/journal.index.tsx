import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { formatPostDate, posts, type Post } from "../lib/journal";

const topics = ["Bride", "Groom", "Bridal party", "Accessories", "Planning"] as const;
type Topic = (typeof topics)[number];

export const Route = createFileRoute("/journal/")({
  validateSearch: (search: Record<string, unknown>): { topic?: Topic | undefined } => ({
    topic: topics.includes(search["topic"] as Topic) ? (search["topic"] as Topic) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Wedding Style Journal | OZ Fashion House" },
      {
        name: "description",
        content:
          "Wedding fashion advice from OZ Fashion House in Namugongo: bridal silhouettes, groom tailoring, bridesmaid colours, kwanjula planning and accessories.",
      },
      { property: "og:title", content: "The OZ Journal: wedding style advice" },
      {
        property: "og:description",
        content: "Practical guidance for bringing your wedding wardrobe together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const { topic } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const list = topic ? posts.filter((p) => p.topic === topic) : posts;
  const [lead, ...rest] = list;

  return (
    <main>
      <section className="page-intro">
        <div className="page-intro-inner">
          <p className="kicker">The OZ Journal</p>
          <h1 className="page-title">Wedding style, considered.</h1>
          <p className="page-lead">
            Advice for bringing your wedding wardrobe together, from the first gown consultation to
            the final accessory.
          </p>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            <button
              type="button"
              className="chip"
              aria-pressed={!topic}
              onClick={() => navigate({ search: {}, replace: true, resetScroll: false })}
            >
              All stories
            </button>
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={topic === t}
                onClick={() =>
                  navigate({ search: { topic: t }, replace: true, resetScroll: false })
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site section-pad">
        {lead ? (
          <>
            <article className="group relative grid gap-8 border-b border-border pb-16 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-14">
              <img src={lead.image} alt="" className="aspect-[16/11] w-full object-cover" />
              <div>
                <PostMeta post={lead} />
                <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">
                  <Link
                    to="/journal/$slug"
                    params={{ slug: lead.slug }}
                    className="after:absolute after:inset-0 group-hover:text-gilt"
                  >
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-8 text-muted-foreground">
                  {lead.excerpt}
                </p>
                <span className="text-link mt-7">
                  Read the story <ArrowRight className="size-4" />
                </span>
              </div>
            </article>
            <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <article key={post.slug} className="group relative">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="mt-5">
                    <PostMeta post={post} />
                    <h2 className="mt-2 text-3xl leading-tight">
                      <Link
                        to="/journal/$slug"
                        params={{ slug: post.slug }}
                        className="after:absolute after:inset-0 group-hover:text-gilt"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center font-display text-3xl">No stories in this topic yet.</p>
        )}

        <div className="on-ink mt-24 bg-ink px-8 py-14 text-center text-ivory sm:px-14">
          <h2 className="section-title mx-auto max-w-2xl">
            Turn inspiration into your wedding look.
          </h2>
          <Link to="/collections" className="btn btn-gold mt-8">
            Shop the collections <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-sm text-gilt">
      {post.topic} <span aria-hidden="true">/</span>{" "}
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>{" "}
      <span aria-hidden="true">/</span> {post.readMinutes} min read
    </p>
  );
}
