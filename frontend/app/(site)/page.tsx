import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, LogoBadge, SunMark, TurtleMark, WavesMark } from "@/components/brand/Marks";
import { ComboCard, PostCard, Stars } from "@/components/site/Cards";
import { InquiryForm } from "@/components/site/InquiryForm";
import { api } from "@/lib/api";

export default async function HomePage() {
  let data;
  try {
    data = await api.home();
  } catch {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-heading text-4xl">Estamos levantando la web</h1>
        <p className="mt-3 text-muted-foreground">
          El API de Rails todavía no responde. Arrancá el backend y recargá.
        </p>
      </div>
    );
  }
  const s = data.settings;

  const actions = [
    {
      href: "/contacto?tipo=asesoria_1a1",
      label: "Asesorías 1:1 | ¿Te querés ir? charlemos :)",
    },
    {
      href: "/contacto?tipo=disenar_viaje",
      label: "Diseñemos tu próximo viaje ✈️",
    },
    {
      href: "/guia-malaga",
      label: s.malaga_guide_title || "Guía gratis +4k | Málaga con style",
      thumb: true,
    },
    {
      href: s.esim_url || "#",
      label: s.esim_label || "Descuento eSIM",
      external: true,
    },
    {
      href: "/contacto?tipo=otro",
      label: `🚗 ${s.rental_label || "Renntentials 10% off"} cod "${s.rental_code}"`,
    },
  ];

  return (
    <div>
      <section className="border-b border-[#ead98a]/80 bg-[#fbf6e8]">
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 pb-8 pt-6 text-center">
          <div className="mb-2 flex w-full items-start justify-between px-2">
            <TurtleMark className="h-14 w-16" />
            <SunMark className="h-16 w-16" />
            <WavesMark className="h-14 w-20" />
          </div>
          <div className="-mt-4">
            <LogoBadge className="h-[4.5rem] w-[4.5rem]" />
          </div>
          <h1 className="mt-5 font-heading text-4xl lowercase">{s.brand_name}</h1>
          <p className="mt-2 text-xs tracking-[0.28em] text-muted-foreground uppercase">
            {s.tagline}
          </p>
          <div className="mt-6 h-px w-full bg-[#ead98a]" />
          <div className="mt-6 flex items-center gap-5">
            <a href={s.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${s.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-6 flex w-full flex-col gap-3">
            {actions.map((action) =>
              action.external ? (
                <a key={action.label} href={action.href} target="_blank" rel="noreferrer" className="paper-btn flex min-h-14 items-center justify-center rounded-md px-4 py-3 text-sm">
                  {action.label}
                </a>
              ) : (
                <Link
                  key={action.label}
                  href={action.href}
                  className="paper-btn flex min-h-14 items-center justify-center gap-3 rounded-md px-4 py-3 text-sm"
                >
                  {action.thumb ? (
                    <span className="hidden h-10 w-14 shrink-0 items-center justify-center rounded bg-[#f7d56a] sm:grid">
                      <SunMark className="h-8 w-8" />
                    </span>
                  ) : null}
                  {action.label}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.25em] uppercase">Rutas y experiencias reales</p>
        <h2 className="mt-2 font-heading text-4xl sm:text-5xl">{s.hero_title}</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{s.hero_subtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            [data.stats.combos, "combos al aire"],
            [data.stats.posts, "notas del blog"],
            [data.stats.average_rating ? `${data.stats.average_rating}★` : "—", "promedio de reviews"],
          ].map(([value, label]) => (
            <div key={String(label)} className="rounded-3xl bg-card p-5 ring-1 ring-[#ead98a]">
              <p className="font-heading text-3xl">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-3xl">Combos para irse</h2>
          <Link href="/combos" className="text-sm underline">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {data.featured_combos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-3xl">Del blog</h2>
          <Link href="/blog" className="text-sm underline">
            Leer más
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {(data.featured_posts.length ? data.featured_posts : data.latest_posts).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-3xl">Lo que dicen</h2>
          <Link href="/reviews" className="text-sm underline">
            Dejar review
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data.reviews.map((review) => (
            <blockquote key={review.id} className="rounded-3xl bg-card p-5 ring-1 ring-[#ead98a]">
              <Stars rating={review.rating} />
              <p className="mt-3 text-sm">{review.body}</p>
              <footer className="mt-3 text-sm text-muted-foreground">
                {review.author_name}
                {review.author_location ? ` · ${review.author_location}` : ""}
                {review.trip ? ` · ${review.trip}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl">¿Charlamos tu viaje?</h2>
          <p className="mt-3 text-muted-foreground">{s.about}</p>
        </div>
        <InquiryForm />
      </section>
    </div>
  );
}
