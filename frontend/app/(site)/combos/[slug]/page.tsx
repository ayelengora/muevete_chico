import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/site/Cards";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { formatPrice, renderBody, renderInline } from "@/lib/format";

export default async function ComboDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let combo;
  try {
    combo = await api.combo(slug);
  } catch {
    notFound();
  }

  return (
    <article>
      <div className="relative min-h-[58vh] overflow-hidden bg-ink sm:min-h-[72vh]">
        <Cover
          src={combo.cover_url}
          alt=""
          kenburns
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-4xl flex-col justify-end px-4 pb-12 pt-20 sm:min-h-[72vh] sm:pb-16">
          <Link href="/combos" className="w-fit text-sm text-white/75 hover:text-white">
            ← Destinos
          </Link>
          <p className="mt-8 text-[11px] tracking-[0.22em] text-white/70 uppercase">
            {combo.destination} · {combo.duration}
          </p>
          <h1 className="display mt-3 text-[clamp(2.8rem,8vw,6rem)] text-cream">{combo.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">{combo.excerpt}</p>
          <p className="mt-5 text-sm font-medium">desde {formatPrice(combo.price_from, combo.currency)}</p>
        </Reveal>
        <div className="mt-10 space-y-5 text-base leading-7">
          {renderBody(combo.description).map((block) =>
            block.startsWith("## ") ? (
              <h2 key={block} className="font-heading pt-2 text-2xl">
                {block.replace(/^## /, "")}
              </h2>
            ) : (
              <p key={block}>{renderInline(block)}</p>
            )
          )}
        </div>
        {combo.includes && combo.includes.length > 0 ? (
          <ul className="mt-12 grid gap-2 sm:grid-cols-2">
            {combo.includes.map((item) => (
              <li key={item} className="surface px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-16">
          <InquiryForm
            defaultType="disenar_viaje"
            title="Quiero este viaje"
            submitLabel="Pedir este destino"
          />
        </div>
      </div>
    </article>
  );
}
