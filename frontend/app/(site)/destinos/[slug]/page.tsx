import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/site/Cards";
import { ComboCard } from "@/components/site/Cards";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { destinationBySlug, FALLBACK_COMBOS } from "@/lib/catalog";
import { renderBody, renderInline } from "@/lib/format";

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let place = destinationBySlug(slug);
  try {
    place = await api.destination(slug);
  } catch {
    if (!place) notFound();
  }
  if (!place) notFound();

  const combos = place.combos?.length ? place.combos : FALLBACK_COMBOS.filter((combo) => combo.places?.includes(place.slug));

  return (
    <article>
      <div className="relative min-h-[58vh] overflow-hidden bg-ink sm:min-h-[72vh]">
        <Cover
          src={place.cover_url}
          alt=""
          kenburns
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-4xl flex-col justify-end px-4 pb-12 pt-20 sm:min-h-[72vh] sm:pb-16">
          <Link href="/destinos" className="w-fit text-sm text-white/75 hover:text-white">
            ← Destinos
          </Link>
          <p className="mt-8 text-[11px] tracking-[0.22em] text-white/70 uppercase">
            {[place.region, place.country].filter(Boolean).join(" · ")}
          </p>
          <h1 className="display mt-3 text-[clamp(2.8rem,8vw,6rem)] text-cream">{place.name}</h1>
          {place.blurb ? <p className="mt-4 max-w-xl text-lg text-white/80">{place.blurb}</p> : null}
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="space-y-5 text-base leading-7">
          {renderBody(place.description).map((block) =>
            block.startsWith("## ") ? (
              <h2 key={block} className="font-heading pt-2 text-2xl">
                {block.replace(/^## /, "")}
              </h2>
            ) : (
              <p key={block}>{renderInline(block)}</p>
            )
          )}
        </div>
      </div>
      {combos.length > 0 ? (
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="display text-3xl sm:text-4xl">Combos en {place.name}</h2>
          <p className="mt-2 text-muted-foreground">Viajes de días cerrados que pasan por acá.</p>
          <div className="mt-8 grid gap-4">
            {combos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-3xl px-4 pb-16">
          <p className="text-muted-foreground">Todavía no hay un combo cerrado para este destino. Lo armamos a medida.</p>
        </div>
      )}
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <InquiryForm
          defaultType="disenar_viaje"
          title={`Quiero ir a ${place.name}`}
          submitLabel="Pedir este destino"
        />
      </div>
    </article>
  );
}
