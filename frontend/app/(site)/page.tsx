import Link from "next/link";
import { DestinationCard, PostCard, Stars } from "@/components/site/Cards";
import { api } from "@/lib/api";

export default async function HomePage() {
  let data;
  let combos;
  try {
    [data, combos] = await Promise.all([api.home(), api.combos()]);
  } catch {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <h1 className="font-heading text-4xl">Estamos levantando la web</h1>
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
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:pt-16 sm:pb-10">
        <p className="kicker">{s.tagline}</p>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="max-w-2xl font-heading text-[2.35rem] leading-[1.08] sm:text-[3.35rem]">
            {s.hero_title}
          </h1>
          <Link
            href="/combos"
            className="shrink-0 text-sm text-ink/70 underline underline-offset-4 hover:text-ink"
          >
            Ver destinos
          </Link>
        </div>
        {s.hero_subtitle ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {s.hero_subtitle}
          </p>
        ) : null}
      </section>

      <section className="mx-auto max-w-6xl px-4">
        {destinations.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay destinos publicados.</p>
        ) : (
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlight ? <DestinationCard combo={highlight} featured /> : null}
            {rest.map((combo) => (
              <DestinationCard key={combo.id} combo={combo} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Link
          href="/contacto?tipo=disenar_viaje"
          className="group flex flex-col gap-4 rounded-[1.7rem] bg-ink px-6 py-8 text-cream sm:flex-row sm:items-center sm:justify-between sm:px-9"
        >
          <div>
            <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase">A medida</p>
            <h2 className="mt-1 font-heading text-2xl sm:text-3xl">¿No está tu destino?</h2>
            <p className="mt-1 max-w-lg text-sm text-white/70">
              Lo diseñamos juntos: fechas, ritmo y presupuesto.
            </p>
          </div>
          <span className="w-fit rounded-full bg-cream px-4 py-2 text-sm text-ink group-hover:bg-white">
            Diseñemos tu viaje
          </span>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl sm:text-3xl">Ideas para irse</h2>
          <Link href="/blog" className="text-sm underline underline-offset-4">
            Blog
          </Link>
        </div>
        {stories.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay notas publicadas.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {stories.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {data.reviews.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl sm:text-3xl">Lo que dicen</h2>
            <Link href="/reviews" className="text-sm underline underline-offset-4">
              Reviews
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {data.reviews.slice(0, 4).map((review) => (
              <blockquote key={review.id} className="surface p-6">
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm leading-relaxed">{review.body}</p>
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
