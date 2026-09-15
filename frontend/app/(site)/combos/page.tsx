import { ComboCard } from "@/components/site/Cards";
import { DestinationMarquee } from "@/components/site/Marquee";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { FALLBACK_COMBOS, listed } from "@/lib/catalog";
import Link from "next/link";

export const metadata = { title: "Combos" };
export const dynamic = "force-dynamic";

export default async function CombosPage() {
  let combos = FALLBACK_COMBOS;
  try {
    combos = listed(await api.combos(), FALLBACK_COMBOS);
  } catch {
    combos = FALLBACK_COMBOS;
  }

  return (
    <div className="pb-16 sm:pb-20">
      <PageIntro kicker="Días cerrados" title="Combos">
        Viajes armados: cantidad de días, a veces más de un destino, y un cronograma posible. No es el catálogo de lugares — eso está en Destinos.
      </PageIntro>
      <div className="mt-8">
        <DestinationMarquee
          names={combos.map((combo) =>
            combo.duration ? `${combo.duration} · ${combo.destination}` : combo.destination || combo.title
          )}
        />
      </div>
      {combos.length === 0 ? (
        <p className="mx-auto max-w-[1400px] px-4 pt-10 text-muted-foreground sm:px-6">
          Todavía no hay combos publicados.
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 px-4 sm:px-6">
          {combos.map((combo, index) => (
            <Reveal key={combo.id} delay={index * 60}>
              <ComboCard combo={combo} />
            </Reveal>
          ))}
        </div>
      )}
      <Reveal className="mx-auto mt-12 max-w-[1400px] px-4 sm:px-6">
        <Link
          href="/contacto?tipo=disenar_viaje"
          className="group block overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-cream sm:px-12"
        >
          <h2 className="display text-[clamp(2rem,5vw,3.8rem)]">Otro combo</h2>
          <p className="mt-3 max-w-md text-white/70">Si no está este armado, lo diseñamos con tus fechas.</p>
          <span className="cta-pill is-light mt-6">
            Charlemos <span className="arrow">→</span>
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
