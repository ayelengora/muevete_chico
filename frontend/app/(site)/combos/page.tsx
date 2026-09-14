import { ComboCard } from "@/components/site/Cards";
import { api } from "@/lib/api";

export const metadata = { title: "Combos" };

export default async function CombosPage() {
  const combos = await api.combos();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs tracking-[0.25em] uppercase">Armá la valija</p>
      <h1 className="mt-2 font-heading text-4xl">Combos y viajes</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Itinerarios que ya recorrí o que diseño con vos. Nada de paquetes genéricos:
        destinos, ritmo y presupuesto a medida.
      </p>
      {combos.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Todavía no hay combos publicados.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      )}
    </div>
  );
}
