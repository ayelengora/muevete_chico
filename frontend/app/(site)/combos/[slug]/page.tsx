import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/site/Cards";
import { InquiryForm } from "@/components/site/InquiryForm";
import { api } from "@/lib/api";
import { formatPrice, renderBody } from "@/lib/format";

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
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/combos" className="text-sm underline">
        ← Combos
      </Link>
      <p className="mt-4 text-xs tracking-[0.2em] text-gold uppercase">
        {combo.destination} · {combo.duration}
      </p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">{combo.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{combo.excerpt}</p>
      <p className="mt-2 font-medium">desde {formatPrice(combo.price_from, combo.currency)}</p>
      <div className="mt-8 overflow-hidden rounded-3xl">
        <Cover src={combo.cover_url} alt={combo.title} className="h-72 w-full object-cover" />
      </div>
      <div className="mt-8 space-y-4 text-base leading-7">
        {renderBody(combo.description).map((block) =>
          block.startsWith("## ") ? (
            <h2 key={block} className="font-heading text-2xl">
              {block.replace(/^## /, "")}
            </h2>
          ) : (
            <p key={block}>{block}</p>
          )
        )}
      </div>
      {combo.includes && combo.includes.length > 0 ? (
        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {combo.includes.map((item) => (
            <li key={item} className="rounded-2xl bg-card px-4 py-3 text-sm ring-1 ring-[#ead98a]">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-12">
        <InquiryForm
          defaultType="disenar_viaje"
          title="Quiero este combo"
          submitLabel="Pedir este viaje"
        />
      </div>
    </article>
  );
}
