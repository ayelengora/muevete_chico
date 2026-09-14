import { DestinationCard } from "@/components/site/Cards";
import { api } from "@/lib/api";
import Link from "next/link";

export const metadata = { title: "Destinos" };

export default async function CombosPage() {
  const combos = await api.combos();
  const destinations = combos.filter((combo) => combo.destination !== "A donde quieras ir");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs tracking-[0.25em] uppercase">Armá la valija</p>
      <h1 className="mt-2 font-heading text-4xl">Destinos</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Lugares que ya recorrí o que diseño con vos. Nada de paquetes genéricos:
        destino, ritmo y presupuesto a medida.
      </p>
      {destinations.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Todavía no hay destinos publicados.</p>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((combo, index) => (
            <DestinationCard key={combo.id} combo={combo} featured={index === 0} />
          ))}
        </div>
      )}
      <Link
        href="/contacto?tipo=disenar_viaje"
        className="mt-12 flex items-center justify-between gap-4 rounded-[1.6rem] bg-card px-6 py-6 ring-1 ring-[#ead98a]"
      >
        <div>
          <h2 className="font-heading text-2xl">Otro destino</h2>
          <p className="text-sm text-muted-foreground">Si no está en la lista, lo armamos.</p>
        </div>
        <span className="rounded-full bg-ink px-4 py-2 text-sm text-cream">Charlemos</span>
      </Link>
    </div>
  );
}
