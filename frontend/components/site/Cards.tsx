import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Combo, Post } from "@/lib/types";

export function Cover({
  src,
  alt,
  className = "h-48 w-full object-cover",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return <div className={`bg-[#efe8d3] ${className}`} />;
  }
  return <img src={src} alt={alt} className={className} />;
}

export function DestinationCard({
  combo,
  featured = false,
}: {
  combo: Combo;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/combos/${combo.slug}`}
      className={`group relative block overflow-hidden rounded-[1.6rem] bg-ink text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        featured ? "min-h-[320px] md:col-span-2 md:min-h-[420px]" : "min-h-[280px]"
      }`}
    >
      <Cover
        src={combo.cover_url}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="text-[11px] tracking-[0.18em] text-white/70 uppercase">
          {combo.destination}
          {combo.duration ? ` · ${combo.duration}` : ""}
        </p>
        <h3
          className={`mt-1.5 font-heading leading-[1.05] ${
            featured ? "text-3xl sm:text-[2.6rem]" : "text-[1.65rem]"
          }`}
        >
          {combo.title}
        </h3>
        <p className="mt-3 inline-block rounded-full bg-white/12 px-3 py-1 text-sm text-white/95 backdrop-blur-sm">
          desde {formatPrice(combo.price_from, combo.currency)}
        </p>
      </div>
    </Link>
  );
}

export function ComboCard({ combo }: { combo: Combo }) {
  return <DestinationCard combo={combo} />;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.6rem] bg-card shadow-[0_1px_0_rgba(28,22,18,0.06)] ring-1 ring-black/6 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div className="overflow-hidden">
        <Cover
          src={post.cover_url}
          alt=""
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] tracking-[0.18em] text-terracotta uppercase">
          {post.destination || "Viajes"}
        </p>
        <h3 className="font-heading text-[1.35rem] leading-tight">{post.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-gold" aria-label={`${rating} de 5`}>
      {"★".repeat(rating)}
      <span className="text-black/15">{"★".repeat(5 - rating)}</span>
    </span>
  );
}
