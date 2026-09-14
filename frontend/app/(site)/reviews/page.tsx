import { Stars } from "@/components/site/Cards";
import { ReviewForm } from "@/components/site/ReviewForm";
import { api } from "@/lib/api";

export const metadata = { title: "Reviews" };

export default async function ReviewsPage() {
  const reviews = await api.reviews();

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div>
        <p className="kicker">Viajes vividos</p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.08] sm:text-5xl">Reviews</h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Lo que cuentan quienes ya armaron un viaje o pasaron por una asesoría.
        </p>
        {reviews.length === 0 ? (
          <p className="mt-8 text-muted-foreground">Todavía no hay reviews aprobadas.</p>
        ) : (
          <div className="mt-8 space-y-3">
            {reviews.map((review) => (
              <blockquote key={review.id} className="surface p-6">
                <Stars rating={review.rating} />
                <p className="mt-3 leading-relaxed">{review.body}</p>
                <footer className="mt-3 text-sm text-muted-foreground">
                  {review.author_name}
                  {review.author_location ? ` · ${review.author_location}` : ""}
                  {review.trip ? ` · ${review.trip}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
      <ReviewForm />
    </div>
  );
}
