import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/site/Cards";
import { InquiryForm } from "@/components/site/InquiryForm";
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
      <div className="relative min-h-[42vh] overflow-hidden bg-ink sm:min-h-[52vh]">
        <Cover src={combo.cover_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-3xl flex-col justify-end px-4 pb-10 pt-16 sm:min-h-[52vh] sm:pb-14">
          <Link href="/combos" className="text-sm text-white/75 hover:text-white hover:underline">
            ← Destinos
          </Link>
          <p className="mt-6 text-[11px] tracking-[0.2em] text-white/70 uppercase">
            {combo.destination} · {combo.duration}
          </p>
          <h1 className="mt-2 font-heading text-4xl leading-[1.08] text-cream sm:text-5xl">
            {combo.title}
          </h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <p className="text-lg leading-relaxed text-muted-foreground">{combo.excerpt}</p>
        <p className="mt-4 text-sm font-medium">desde {formatPrice(combo.price_from, combo.currency)}</p>
        <div className="mt-8 space-y-4 text-base leading-7">
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
          <ul className="mt-10 grid gap-2 sm:grid-cols-2">
            {combo.includes.map((item) => (
              <li key={item} className="surface px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-14">
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
