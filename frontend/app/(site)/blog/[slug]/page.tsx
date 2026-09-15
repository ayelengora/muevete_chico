import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/site/Cards";
import { api } from "@/lib/api";
import { formatDate, renderBody, renderInline } from "@/lib/format";

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
      <Link href="/blog" className="w-fit text-sm text-muted-foreground hover:text-ink">
        ← Blog
      </Link>
      <p className="mt-8 text-[11px] tracking-[0.2em] text-terracotta uppercase">
        {post.destination} · {formatDate(post.published_at || post.created_at)}
      </p>
      <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.6rem)]">{post.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <div className="mt-8 overflow-hidden rounded-[1.75rem]">
        <Cover src={post.cover_url} alt="" className="h-72 w-full object-cover sm:h-[26rem]" />
      </div>
      <div className="mt-8 space-y-4 text-base leading-7">
        {renderBody(post.body).map((block) =>
          block.startsWith("## ") ? (
            <h2 key={block} className="font-heading pt-2 text-2xl">
              {block.replace(/^## /, "")}
            </h2>
          ) : (
            <p key={block}>{renderInline(block)}</p>
          )
        )}
      </div>
    </article>
  );
}
