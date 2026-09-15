import { InquiryForm } from "@/components/site/InquiryForm";
import { PageIntro } from "@/components/site/PageIntro";
import { api } from "@/lib/api";

export const metadata = { title: "Guía de Málaga" };

export default async function GuiaPage() {
  const settings = await api.settings();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16">
      <PageIntro kicker="Guía" title={settings.malaga_guide_title}>
        {settings.malaga_guide_blurb}
      </PageIntro>
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
