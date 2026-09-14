import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/site/Cards";
import { api } from "@/lib/api";
import { formatDate, renderBody } from "@/lib/format";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await api.post(slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-ink hover:underline">
        ← Blog
      </Link>
      <p className="mt-6 text-[11px] tracking-[0.2em] text-terracotta uppercase">
        {post.destination} · {formatDate(post.published_at || post.created_at)}
      </p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] sm:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <div className="mt-8 overflow-hidden rounded-[1.6rem]">
        <Cover src={post.cover_url} alt="" className="h-64 w-full object-cover sm:h-80" />
      </div>
      <div className="mt-8 space-y-4 text-base leading-7">
        {renderBody(post.body).map((block) =>
          block.startsWith("## ") ? (
            <h2 key={block} className="font-heading pt-2 text-2xl">
              {block.replace(/^## /, "")}
            </h2>
          ) : (
            <p key={block}>{block}</p>
          )
        )}
      </div>
    </article>
  );
}
