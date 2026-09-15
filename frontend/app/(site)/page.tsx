import Link from "next/link";
import { DestinationCard, mosaicClass, PostCard, Stars } from "@/components/site/Cards";
import { DestinationMarquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/format";

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
  const leadStory = stories[0];
  const moreStories = stories.slice(1, 4);
  const leadReview = data.reviews[0];
  const moreReviews = data.reviews.slice(1, 4);

  return (
    <div>
      <section className="lg:grid lg:min-h-[calc(100svh-4.4rem)] lg:grid-cols-[minmax(280px,0.86fr)_1.14fr]">
        <div className="flex flex-col justify-end px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <p className="hero-copy kicker">{s.tagline}</p>
          <h1 className="hero-copy display mt-5 max-w-[11ch] text-[clamp(3rem,8vw,6.4rem)]">
            {s.hero_title}
          </h1>
          {s.hero_subtitle ? (
            <p className="hero-copy-delay mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {s.hero_subtitle}
            </p>
          ) : null}
          <div className="hero-copy-delay mt-8 flex flex-wrap items-center gap-5">
            <Link href="/contacto" className="cta-pill">
              Charlemos <span className="arrow">→</span>
            </Link>
            <Link href="/combos" className="arrow-link">
              Ver destinos <span className="arrow">→</span>
            </Link>
          </div>
        </div>
        {highlight ? (
          <Link
            href={`/combos/${highlight.slug}`}
            className="group relative min-h-[72vh] overflow-hidden bg-ink text-cream lg:min-h-full"
          >
            {highlight.cover_url ? (
              <img
                src={highlight.cover_url}
                alt=""
                className="kenburns absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[#efe8d3]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="text-[11px] tracking-[0.22em] text-white/70 uppercase">
                Destacado · {highlight.destination}
              </p>
              <h2 className="mt-3 font-heading text-4xl leading-[0.95] sm:text-6xl">{highlight.title}</h2>
              <p className="mt-4 text-sm text-white/85">
                desde {formatPrice(highlight.price_from, highlight.currency)}
                <span className="arrow-link ml-4 text-butter">
                  Ver viaje <span className="arrow">→</span>
                </span>
              </p>
            </div>
          </Link>
        ) : null}
      </section>

      <DestinationMarquee names={destinations.map((combo) => combo.destination || combo.title)} />

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">Elegí un lugar</h2>
            <Link href="/combos" className="arrow-link shrink-0">
              Todos <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
        {rest.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay más destinos publicados.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-12">
            {rest.map((combo, index) => (
              <Reveal key={combo.id} delay={index * 80} className={`${mosaicClass(index)} h-full`}>
                <DestinationCard combo={combo} index={index + 2} className="h-full" />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="px-4 pb-4 sm:px-6">
        <Reveal>
          <Link
            href="/contacto?tipo=disenar_viaje"
            className="group relative block overflow-hidden rounded-[2rem] bg-ink px-7 py-14 text-cream sm:px-12 sm:py-20"
          >
            <p className="text-[11px] tracking-[0.22em] text-white/45 uppercase">A medida</p>
            <h2 className="display mt-4 max-w-3xl text-[clamp(2.4rem,7vw,5.4rem)]">
              ¿No está tu destino?
            </h2>
            <p className="mt-5 max-w-lg text-white/70">
              Lo diseñamos juntos: fechas, ritmo y presupuesto. Sin copiar el top 10 de Google.
            </p>
            <span className="cta-pill is-light mt-8">
              Diseñemos tu viaje <span className="arrow">→</span>
            </span>
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">Ideas para irse</h2>
            <Link href="/blog" className="arrow-link">
              Blog <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
        {stories.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay notas publicadas.</p>
        ) : (
          <div className="grid gap-6">
            {leadStory ? (
              <Reveal>
                <PostCard post={leadStory} featured />
              </Reveal>
            ) : null}
            {moreStories.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-3">
                {moreStories.map((post, index) => (
                  <Reveal key={post.id} delay={index * 90}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </section>

      {leadReview ? (
        <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">Lo que dicen</h2>
              <Link href="/reviews" className="arrow-link">
                Reviews <span className="arrow">→</span>
              </Link>
            </div>
            <blockquote className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-cream sm:px-14 sm:py-16">
              <span className="quote-mark">“</span>
              <p className="mt-2 max-w-4xl font-heading text-[clamp(1.5rem,3.4vw,2.7rem)] leading-[1.15] italic">
                {leadReview.body}
              </p>
              <footer className="mt-8 text-sm text-white/65">
                {leadReview.author_name}
                {leadReview.author_location ? ` · ${leadReview.author_location}` : ""}
              </footer>
            </blockquote>
          </Reveal>
          {moreReviews.length > 0 ? (
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {moreReviews.map((review, index) => (
                <Reveal key={review.id} delay={index * 80}>
                  <blockquote className="surface h-full p-6">
                    <Stars rating={review.rating} />
                    <p className="mt-3 text-sm leading-relaxed">{review.body}</p>
                    <footer className="mt-3 text-sm text-muted-foreground">
                      {review.author_name}
                      {review.author_location ? ` · ${review.author_location}` : ""}
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
