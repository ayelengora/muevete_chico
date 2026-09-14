import { InquiryForm } from "@/components/site/InquiryForm";
import { InstagramIcon } from "@/components/brand/Marks";
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
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <p className="kicker">Asesorías 1:1</p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.08] sm:text-5xl">
          ¿Te querés ir? charlemos
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Una call para ordenar destino, fechas y presupuesto. Respondo por mail o WhatsApp.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          <li className="surface px-4 py-3">Asesoría 1:1</li>
          <li className="surface px-4 py-3">Viaje a medida</li>
          <li className="surface px-4 py-3">
            <a href={`mailto:${settings.email}`} className="hover:underline">
              {settings.email}
            </a>
          </li>
          <li className="surface px-4 py-3">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              @muevetechico
            </a>
          </li>
        </ul>
      </div>
      <InquiryForm defaultType={tipo || "asesoria_1a1"} />
    </div>
  );
}
