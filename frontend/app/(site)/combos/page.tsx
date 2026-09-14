import { DestinationCard } from "@/components/site/Cards";
import { api } from "@/lib/api";
import Link from "next/link";

export const metadata = { title: "Destinos" };

export default async function CombosPage() {
  const combos = await api.combos();
  const destinations = combos.filter((combo) => combo.destination !== "A donde quieras ir");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
      <p className="kicker">Elegí un lugar</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] sm:text-5xl">Destinos</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Lugares que ya recorrí o que diseño con vos. Ritmo y presupuesto a medida.
      </p>
      {destinations.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Todavía no hay destinos publicados.</p>
      ) : (
        <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((combo, index) => (
            <DestinationCard key={combo.id} combo={combo} featured={index === 0} />
          ))}
        </div>
      )}
      <Link
        href="/contacto?tipo=disenar_viaje"
        className="mt-12 flex flex-col gap-3 rounded-[1.7rem] bg-ink px-6 py-7 text-cream sm:flex-row sm:items-center sm:justify-between sm:px-8"
      >
        <div>
          <h2 className="font-heading text-2xl">Otro destino</h2>
          <p className="mt-1 text-sm text-white/70">Si no está en la lista, lo armamos.</p>
        </div>
        <span className="w-fit rounded-full bg-cream px-4 py-2 text-sm text-ink">Charlemos</span>
      </Link>
    </div>
  );
}
