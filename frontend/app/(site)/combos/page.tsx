import { DestinationCard, mosaicClass } from "@/components/site/Cards";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/lib/api";
import Link from "next/link";

export const metadata = { title: "Destinos" };

export default async function CombosPage() {
  const combos = await api.combos();
  const destinations = combos.filter((combo) => combo.destination !== "A donde quieras ir");

  return (
    <div className="pb-16 sm:pb-20">
      <PageIntro kicker="Elegí un lugar" title="Destinos">
        Lugares que ya recorrí o que diseño con vos. Ritmo y presupuesto a medida.
      </PageIntro>
      {destinations.length === 0 ? (
        <p className="mx-auto max-w-[1400px] px-4 pt-10 text-muted-foreground sm:px-6">
          Todavía no hay destinos publicados.
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-[1400px] gap-3 px-4 sm:px-6 md:grid-cols-12">
          {destinations.map((combo, index) => (
            <Reveal key={combo.id} delay={index * 70} className={`${mosaicClass(index)} h-full`}>
              <DestinationCard
                combo={combo}
                index={index + 1}
                kenburns={index === 0}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      )}
      <Reveal className="mx-auto mt-12 max-w-[1400px] px-4 sm:px-6">
        <Link
          href="/contacto?tipo=disenar_viaje"
          className="group block overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-cream sm:px-12"
        >
          <h2 className="display text-[clamp(2rem,5vw,3.8rem)]">Otro destino</h2>
          <p className="mt-3 max-w-md text-white/70">Si no está en la lista, lo armamos.</p>
          <span className="cta-pill is-light mt-6">
            Charlemos <span className="arrow">→</span>
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
