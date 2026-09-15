import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Combo, Post } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Cover({
  src,
  alt,
  className = "h-48 w-full object-cover",
  kenburns = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  kenburns?: boolean;
}) {
  if (!src) {
    return <div className={cn("bg-[#efe8d3]", className)} />;
  }
  return <img src={src} alt={alt} className={cn(className, kenburns && "kenburns")} />;
}

export function DestinationCard({
  combo,
  className,
  index,
  bleed = false,
  kenburns = false,
}: {
  combo: Combo;
  className?: string;
  index?: number;
  bleed?: boolean;
  kenburns?: boolean;
}) {
  const label = [combo.destination, combo.duration].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/combos/${combo.slug}`}
      className={cn(
        "group relative block min-h-[280px] overflow-hidden bg-ink text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        bleed ? "rounded-none" : "rounded-[1.75rem]",
        className
      )}
    >
      <Cover
        src={combo.cover_url}
        alt=""
        kenburns={kenburns}
        className={
          kenburns
            ? "absolute inset-0 h-full w-full object-cover"
            : "absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.07]"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition duration-700 group-hover:from-black/88" />
      {index != null ? (
        <span className="absolute left-5 top-5 font-heading text-sm italic text-white/70">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase">{label}</p>
        <h3 className="mt-2 font-heading text-[1.7rem] leading-[1.02] sm:text-[2rem]">{combo.title}</h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-white/90">desde {formatPrice(combo.price_from, combo.currency)}</p>
          <span className="arrow-link text-sm text-butter opacity-0 transition duration-500 group-hover:opacity-100">
            Ver viaje <span className="arrow">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ComboCard({ combo }: { combo: Combo }) {
  return <DestinationCard combo={combo} />;
}

export function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-black/6 md:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="overflow-hidden">
          <Cover
            src={post.cover_url}
            alt=""
            className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.05] md:h-full"
          />
        </div>
        <div className="flex flex-col justify-end p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.18em] text-terracotta uppercase">
            {post.destination || "Viajes"}
          </p>
          <h3 className="mt-3 font-heading text-3xl leading-[1.05] sm:text-4xl">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <span className="arrow-link mt-6 text-sm">
            Leer <span className="arrow">→</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-black/6 transition duration-500 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div className="overflow-hidden">
        <Cover
          src={post.cover_url}
          alt=""
          className="h-52 w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] tracking-[0.18em] text-terracotta uppercase">
          {post.destination || "Viajes"}
        </p>
        <h3 className="font-heading text-[1.4rem] leading-tight">{post.title}</h3>
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

export function mosaicClass(index: number) {
  const map = [
    "md:col-span-6 md:row-span-2 min-h-[340px] md:min-h-[640px]",
    "md:col-span-6 min-h-[280px] md:min-h-[310px]",
    "md:col-span-6 min-h-[280px] md:min-h-[310px]",
    "md:col-span-8 min-h-[280px] md:min-h-[340px]",
    "md:col-span-4 min-h-[280px] md:min-h-[340px]",
  ];
  return map[index] || "md:col-span-6 min-h-[280px] md:min-h-[320px]";
}
