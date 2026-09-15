import Link from "next/link";
import { DestinationCard, mosaicClass } from "@/components/site/Cards";
import { DestinationMarquee, PhotoMarquee } from "@/components/site/Marquee";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { FALLBACK_DESTINATIONS, listed } from "@/lib/catalog";

export const metadata = { title: "Destinos" };
export const dynamic = "force-dynamic";

export default async function DestinosPage() {
  let destinations = FALLBACK_DESTINATIONS;
  try {
    destinations = listed(await api.destinations(), FALLBACK_DESTINATIONS);
  } catch {
    destinations = FALLBACK_DESTINATIONS;
  }

  return (
    <div className="pb-16 sm:pb-20">
      <PageIntro kicker="Lugares" title="Destinos">
        Dónde se puede ir. El lugar, la onda, cómo se siente. Los viajes de días cerrados están en Combos.
      </PageIntro>
      <div className="mt-8">
        <DestinationMarquee names={destinations.map((place) => place.name)} />
        <PhotoMarquee places={destinations} />
        <DestinationMarquee names={destinations.map((place) => place.country || place.region || place.name)} reverse />
        <PhotoMarquee places={[...destinations].reverse()} reverse />
      </div>
      {destinations.length === 0 ? (
        <p className="mx-auto max-w-[1400px] px-4 pt-10 text-muted-foreground sm:px-6">
          Todavía no hay destinos publicados.
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-[1400px] gap-3 px-4 sm:px-6 md:grid-cols-12">
          {destinations.map((place, index) => (
            <Reveal key={place.id} delay={index * 70} className={mosaicClass(index)}>
              <DestinationCard place={place} index={index + 1} kenburns={index === 0} className="h-full min-h-[280px]" />
            </Reveal>
          ))}
        </div>
      )}
      <Reveal className="mx-auto mt-12 max-w-[1400px] px-4 sm:px-6">
        <Link
          href="/combos"
          className="group block overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-cream sm:px-12"
        >
          <p className="text-[11px] tracking-[0.2em] text-white/45 uppercase">Días cerrados</p>
          <h2 className="display mt-3 text-[clamp(2rem,5vw,3.8rem)]">Ver combos</h2>
          <p className="mt-3 max-w-md text-white/70">
            Viajes armados: duración, combinación de destinos y un cronograma posible.
          </p>
          <span className="cta-pill is-light mt-6">
            Ir a combos <span className="arrow">→</span>
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
