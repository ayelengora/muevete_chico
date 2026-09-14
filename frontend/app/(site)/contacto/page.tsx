import { InquiryForm } from "@/components/site/InquiryForm";
import { api } from "@/lib/api";

export const metadata = { title: "Contacto" };

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const settings = await api.settings();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase">Asesorías 1:1</p>
        <h1 className="mt-2 font-heading text-4xl">¿Te querés ir? charlemos :)</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Escribime para una call, para diseñar un viaje o para pedirme la guía de Málaga.
          Respondo por mail o WhatsApp, sin vuelta.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li className="rounded-2xl bg-card px-4 py-3 ring-1 ring-[#ead98a]">
            Asesoría 1:1 — ordenamos destino, fechas y presupuesto
          </li>
          <li className="rounded-2xl bg-card px-4 py-3 ring-1 ring-[#ead98a]">
            Diseñemos tu próximo viaje — itinerario a medida
          </li>
          <li className="rounded-2xl bg-card px-4 py-3 ring-1 ring-[#ead98a]">
            Mail: {settings.email}
          </li>
        </ul>
      </div>
      <InquiryForm defaultType={tipo || "asesoria_1a1"} />
    </div>
  );
}
