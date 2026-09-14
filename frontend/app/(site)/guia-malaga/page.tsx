import { InquiryForm } from "@/components/site/InquiryForm";
import { api } from "@/lib/api";

export const metadata = { title: "Guía de Málaga" };

export default async function GuiaPage() {
  const settings = await api.settings();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <p className="kicker">Guía</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] sm:text-5xl">
        {settings.malaga_guide_title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {settings.malaga_guide_blurb}
      </p>
      <div className="mt-10">
        <InquiryForm
          defaultType="guia_malaga"
          title="Pedime la guía"
          submitLabel="Quiero la guía"
        />
      </div>
    </div>
  );
}
