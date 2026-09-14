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
    return <div className={`bg-butter ${className}`} />;
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
      className={`group relative block overflow-hidden rounded-[1.6rem] bg-ink text-cream ${
        featured ? "md:col-span-2 md:min-h-[420px]" : "min-h-[280px]"
      }`}
    >
      <Cover
        src={combo.cover_url}
        alt={combo.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 space-y-2 p-6">
        <p className="text-[11px] tracking-[0.22em] text-white/80 uppercase">
          {combo.destination}
          {combo.duration ? ` · ${combo.duration}` : ""}
        </p>
        <h3 className={`font-heading leading-tight ${featured ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
          {combo.title}
        </h3>
        {combo.excerpt ? (
          <p className={`max-w-xl text-sm text-white/85 ${featured ? "" : "line-clamp-2"}`}>
            {combo.excerpt}
          </p>
        ) : null}
        <p className="pt-1 text-sm font-medium">
          desde {formatPrice(combo.price_from, combo.currency)}
        </p>
      </div>
    </Link>
  );
}

export function ComboCard({ combo }: { combo: Combo }) {
  return (
    <Link
      href={`/combos/${combo.slug}`}
      className="group overflow-hidden rounded-3xl bg-card ring-1 ring-[#ead98a] transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Cover src={combo.cover_url} alt={combo.title} />
      <div className="space-y-2 p-5">
        <p className="text-xs tracking-[0.18em] text-gold uppercase">
          {combo.destination} · {combo.duration}
        </p>
        <h3 className="font-heading text-2xl leading-tight">{combo.title}</h3>
        <p className="text-sm text-muted-foreground">{combo.excerpt}</p>
        <p className="pt-2 text-sm font-medium">
          desde {formatPrice(combo.price_from, combo.currency)}
        </p>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-3xl bg-card ring-1 ring-[#ead98a] transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Cover src={post.cover_url} alt={post.title} />
      <div className="space-y-2 p-5">
        <p className="text-xs tracking-[0.18em] text-terracotta uppercase">
          {post.destination || "Viajes"}
        </p>
        <h3 className="font-heading text-2xl leading-tight">{post.title}</h3>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-gold" aria-label={`${rating} de 5`}>
      {"★".repeat(rating)}
      <span className="text-border">{"★".repeat(5 - rating)}</span>
    </span>
  );
}
