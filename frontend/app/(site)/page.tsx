import Link from "next/link";
import { BrandLogo } from "@/components/brand/Logo";
import { DestinationCard, PostCard, Stars } from "@/components/site/Cards";
import { api } from "@/lib/api";

export default async function HomePage() {
  let data;
  let combos;
  try {
    [data, combos] = await Promise.all([api.home(), api.combos()]);
  } catch {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <BrandLogo className="mx-auto h-20 w-20" />
        <h1 className="mt-6 font-heading text-4xl">Estamos levantando la web</h1>
        <p className="mt-3 text-muted-foreground">
          El API de Rails todavía no responde. Arrancá el backend y recargá.
        </p>
      </div>
    );
  }

  const s = data.settings;
  const destinations = combos
    .filter((combo) => combo.destination !== "A donde quieras ir")
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title, "es"));
  const highlight =
    destinations.find((combo) => combo.slug === "malaga-con-style") || destinations[0];
  const rest = destinations.filter((combo) => combo.id !== highlight?.id);
  const stories = data.featured_posts.length ? data.featured_posts : data.latest_posts;

  return (
    <div>
      <section className="px-4 pb-2 pt-4">
        <div className="mx-auto max-w-3xl text-center">
          <BrandLogo src={s.logo_url} className="mx-auto h-16 w-16 shadow-sm ring-2 ring-[#f4e04d] sm:h-20 sm:w-20" />
          <p className="mt-2 text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
            {s.tagline}
          </p>
          <h1 className="mt-1 font-heading text-3xl sm:text-4xl">{s.hero_title}</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">{s.hero_subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase">Elegí un lugar</p>
            <h2 className="mt-1 font-heading text-3xl sm:text-4xl">Destinos</h2>
          </div>
          <Link href="/combos" className="text-sm underline">
            Ver todos
          </Link>
        </div>
        {destinations.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay destinos publicados.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlight ? <DestinationCard combo={highlight} featured /> : null}
            {rest.map((combo) => (
              <DestinationCard key={combo.id} combo={combo} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <Link
          href="/contacto?tipo=disenar_viaje"
          className="flex flex-col items-start justify-between gap-4 rounded-[1.6rem] bg-card px-6 py-8 ring-1 ring-[#ead98a] sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-xs tracking-[0.22em] uppercase">A medida</p>
            <h2 className="mt-1 font-heading text-3xl">¿No está tu destino?</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Lo diseñamos juntos: fechas, ritmo y presupuesto. Sin paquete cerrado.
            </p>
          </div>
          <span className="rounded-full bg-ink px-5 py-2.5 text-sm text-cream">Diseñemos tu viaje</span>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-3xl">Ideas para irse</h2>
          <Link href="/blog" className="text-sm underline">
            Leer el blog
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {data.reviews.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-heading text-3xl">Lo que dicen</h2>
            <Link href="/reviews" className="text-sm underline">
              Ver reviews
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {data.reviews.slice(0, 4).map((review) => (
              <blockquote key={review.id} className="rounded-3xl bg-card p-5 ring-1 ring-[#ead98a]">
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm">{review.body}</p>
                <footer className="mt-3 text-sm text-muted-foreground">
                  {review.author_name}
                  {review.author_location ? ` · ${review.author_location}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
