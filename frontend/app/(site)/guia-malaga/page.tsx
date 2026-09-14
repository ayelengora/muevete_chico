import { SunMark } from "@/components/brand/Marks";
import { InquiryForm } from "@/components/site/InquiryForm";
import { api } from "@/lib/api";

export const metadata = { title: "Guía de Málaga" };

export default async function GuiaPage() {
  const settings = await api.settings();

  return (
    <div className="mx-auto grid max-w-4xl gap-8 px-4 py-12">
      <div className="rounded-3xl bg-card p-8 text-center ring-1 ring-[#ead98a]">
        <div className="mx-auto grid h-24 w-32 place-items-center rounded-2xl bg-[#f7d56a]">
          <SunMark className="h-16 w-16" />
        </div>
        <h1 className="mt-6 font-heading text-4xl">{settings.malaga_guide_title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {settings.malaga_guide_blurb}
        </p>
      </div>
      <InquiryForm
        defaultType="guia_malaga"
        title="Pedime la guía"
        submitLabel="Quiero la guía"
      />
    </div>
  );
}
