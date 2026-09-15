import { InquiryForm } from "@/components/site/InquiryForm";
import { InstagramIcon } from "@/components/brand/Marks";
import { Reveal } from "@/components/site/Reveal";
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
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:items-end">
      <Reveal>
        <p className="kicker">Asesorías 1:1</p>
        <h1 className="display mt-4 max-w-[10ch] text-[clamp(2.8rem,8vw,5.8rem)]">
          ¿Te querés ir? charlemos
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          Una call para ordenar destino, fechas y presupuesto. Respondo por mail o WhatsApp.
        </p>
        <ul className="mt-10 space-y-4 text-sm">
          <li className="border-l-2 border-butter pl-4">Asesoría 1:1</li>
          <li className="border-l-2 border-butter pl-4">Viaje a medida</li>
          <li className="border-l-2 border-butter pl-4">
            <a href={`mailto:${settings.email}`} className="hover:underline">
              {settings.email}
            </a>
          </li>
          <li className="border-l-2 border-butter pl-4">
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
      </Reveal>
      <Reveal delay={120}>
        <InquiryForm defaultType={tipo || "asesoria_1a1"} />
      </Reveal>
    </div>
  );
}
