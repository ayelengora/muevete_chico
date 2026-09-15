import Link from "next/link";
import type { Destination } from "@/lib/types";

export function DestinationMarquee({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  if (names.length === 0) return null;
  const loop = [...names, ...names, ...names];

  return (
    <div className="marquee border-y border-black/8 py-5">
      <div className={`marquee-track ${reverse ? "is-names-reverse" : ""}`}>
        {loop.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="flex items-center gap-8 px-8 font-heading text-2xl italic tracking-tight text-ink/80 sm:text-3xl"
          >
            {name}
            <span className="text-base not-italic text-butter">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PhotoMarquee({
  places,
  reverse = false,
}: {
  places: Destination[];
  reverse?: boolean;
}) {
  if (places.length === 0) return null;
  const loop = [...places, ...places, ...places];

  return (
    <div className={`marquee photo-reel py-2 ${reverse ? "is-tilted-rev" : "is-tilted"}`}>
      <div className={`marquee-track gap-3 px-2 ${reverse ? "is-reverse" : "is-photos"}`}>
        {loop.map((place, index) => (
          <Link
            key={`${place.slug}-${index}`}
            href={`/destinos/${place.slug}`}
            className="relative block h-48 w-[300px] shrink-0 overflow-hidden rounded-[1.4rem] sm:h-60 sm:w-[380px]"
          >
            {place.cover_url ? (
              <img src={place.cover_url} alt="" className="kenburns h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-[#efe8d3]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-4 left-4 font-heading text-2xl text-cream">{place.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
