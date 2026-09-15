import { Stars } from "@/components/site/Cards";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { ReviewForm } from "@/components/site/ReviewForm";
import { api } from "@/lib/api";

export const metadata = { title: "Reviews" };

export default async function ReviewsPage() {
  const reviews = await api.reviews();
  const [lead, ...rest] = reviews;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <PageIntro kicker="Viajes vividos" title="Reviews">
        Lo que cuentan quienes ya armaron un viaje o pasaron por una asesoría.
      </PageIntro>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">Todavía no hay reviews aprobadas.</p>
          ) : (
            <div className="space-y-4">
              {lead ? (
                <Reveal>
                  <blockquote className="rounded-[2rem] bg-ink px-7 py-10 text-cream">
                    <span className="quote-mark">“</span>
                    <Stars rating={lead.rating} />
                    <p className="mt-4 font-heading text-2xl leading-snug italic sm:text-3xl">{lead.body}</p>
                    <footer className="mt-6 text-sm text-white/65">
                      {lead.author_name}
                      {lead.author_location ? ` · ${lead.author_location}` : ""}
                      {lead.trip ? ` · ${lead.trip}` : ""}
                    </footer>
                  </blockquote>
                </Reveal>
              ) : null}
              {rest.map((review, index) => (
                <Reveal key={review.id} delay={index * 70}>
                  <blockquote className="surface p-6">
                    <Stars rating={review.rating} />
                    <p className="mt-3 leading-relaxed">{review.body}</p>
                    <footer className="mt-3 text-sm text-muted-foreground">
                      {review.author_name}
                      {review.author_location ? ` · ${review.author_location}` : ""}
                      {review.trip ? ` · ${review.trip}` : ""}
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          )}
        </div>
        <Reveal delay={100}>
          <ReviewForm />
        </Reveal>
      </div>
    </div>
  );
}
