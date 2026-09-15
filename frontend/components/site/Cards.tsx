import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Combo, Destination, Post } from "@/lib/types";
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
  place,
  className,
  index,
  kenburns = false,
}: {
  place: Destination;
  className?: string;
  index?: number;
  kenburns?: boolean;
}) {
  const label = [place.region, place.country].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/destinos/${place.slug}`}
      className={cn(
        "group relative block min-h-[280px] overflow-hidden rounded-[1.75rem] bg-ink text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className
      )}
    >
      <Cover
        src={place.cover_url}
        alt=""
        kenburns={kenburns}
        className={
          kenburns
            ? "absolute inset-0 h-full w-full object-cover"
            : "absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.07]"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      {index != null ? (
        <span className="absolute left-5 top-5 font-heading text-sm italic text-white/70">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase">{label}</p>
        <h3 className="mt-2 font-heading text-[1.7rem] leading-[1.02] sm:text-[2rem]">{place.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/80">{place.blurb}</p>
        <span className="arrow-link mt-4 text-sm text-butter opacity-0 transition duration-500 group-hover:opacity-100">
          Ver destino <span className="arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

export function ComboCard({ combo }: { combo: Combo }) {
  const days = combo.itinerary?.length || 0;

  return (
    <Link
      href={`/combos/${combo.slug}`}
      className="group grid overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-black/6 transition duration-500 hover:-translate-y-1 md:grid-cols-[minmax(220px,0.7fr)_1.3fr]"
    >
      <div className="relative min-h-[220px] overflow-hidden">
        <Cover
          src={combo.cover_url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        {combo.duration ? (
          <span className="absolute left-4 top-4 rounded-full bg-butter px-3 py-1 text-xs font-medium text-ink">
            {combo.duration}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col justify-center p-5 sm:p-7">
        <p className="text-[11px] tracking-[0.18em] text-terracotta uppercase">{combo.destination}</p>
        <h3 className="mt-2 font-heading text-2xl leading-tight sm:text-3xl">{combo.title}</h3>
        {combo.destinations && combo.destinations.length > 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Pasa por {combo.destinations.map((place) => place.name).join(" + ")}
          </p>
        ) : null}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{combo.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span>desde {formatPrice(combo.price_from, combo.currency)}</span>
          {days > 0 ? <span className="text-muted-foreground">cronograma de {days} días</span> : null}
          <span className="arrow-link text-ink">
            Ver combo <span className="arrow">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
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
