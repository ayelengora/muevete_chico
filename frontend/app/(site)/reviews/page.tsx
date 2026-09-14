import { Stars } from "@/components/site/Cards";
import { ReviewForm } from "@/components/site/ReviewForm";
import { api } from "@/lib/api";

export const metadata = { title: "Reviews" };

export default async function ReviewsPage() {
  const reviews = await api.reviews();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase">Viajes vividos</p>
        <h1 className="mt-2 font-heading text-4xl">Reviews</h1>
        <p className="mt-3 text-muted-foreground">
          Lo que cuentan quienes ya armaron un viaje o pasaron por una asesoría.
        </p>
        {reviews.length === 0 ? (
          <p className="mt-8 text-muted-foreground">Todavía no hay reviews aprobadas.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {reviews.map((review) => (
              <blockquote key={review.id} className="rounded-3xl bg-card p-5 ring-1 ring-[#ead98a]">
                <Stars rating={review.rating} />
                <p className="mt-3">{review.body}</p>
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
