"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/site/Cards";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Review } from "@/lib/types";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  function load(token: string) {
    adminRequest<Review[]>("/api/v1/admin/reviews", token).then(setReviews);
  }

  useEffect(() => {
    const token = getAdminToken();
    if (token) load(token);
  }, []);

  async function setApproved(id: number, approved: boolean) {
    const token = getAdminToken();
    if (!token) return;
    await adminRequest(`/api/v1/admin/reviews/${id}`, token, {
      method: "PATCH",
      body: JSON.stringify({ approved }),
    });
    load(token);
  }

  async function remove(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("¿Borrar esta review?")) return;
    await adminRequest(`/api/v1/admin/reviews/${id}`, token, { method: "DELETE" });
    load(token);
  }

  return (
    <div>
      <h1 className="font-heading text-4xl">Reviews</h1>
      <p className="mt-2 text-muted-foreground">Aprobá las que quieras mostrar en la web.</p>
      <div className="mt-6 space-y-3">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">Nadie dejó reviews todavía.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Stars rating={review.rating} />
                  <p className="mt-2">{review.body}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.author_name}
                    {review.author_location ? ` · ${review.author_location}` : ""}
                    {review.trip ? ` · ${review.trip}` : ""}
                    {review.approved ? " · visible" : " · pendiente"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setApproved(review.id, !review.approved)}>
                    {review.approved ? "Ocultar" : "Aprobar"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(review.id)}>
                    Borrar
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
