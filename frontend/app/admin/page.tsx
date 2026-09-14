"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Combo, Inquiry, Post, Review } from "@/lib/types";

export default function AdminHomePage() {
  const [counts, setCounts] = useState({ posts: 0, combos: 0, reviews: 0, inquiries: 0, pending: 0 });

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    Promise.all([
      adminRequest<Post[]>("/api/v1/admin/posts", token),
      adminRequest<Combo[]>("/api/v1/admin/combos", token),
      adminRequest<Review[]>("/api/v1/admin/reviews", token),
      adminRequest<Inquiry[]>("/api/v1/admin/inquiries", token),
    ]).then(([posts, combos, reviews, inquiries]) => {
      setCounts({
        posts: posts.length,
        combos: combos.length,
        reviews: reviews.length,
        inquiries: inquiries.length,
        pending: reviews.filter((r) => !r.approved).length,
      });
    });
  }, []);

  const cards = [
    ["Blogs", counts.posts, "/admin/posts"],
    ["Combos", counts.combos, "/admin/combos"],
    ["Reviews pendientes", counts.pending, "/admin/reviews"],
    ["Consultas", counts.inquiries, "/admin/inquiries"],
  ] as const;

  return (
    <div>
      <h1 className="font-heading text-4xl">Hola</h1>
      <p className="mt-2 text-muted-foreground">
        Acá editás la web, subís blogs de viajes y combos, y mirás lo que te deja la gente.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map(([label, value, href]) => (
          <Link key={href} href={href} className="rounded-3xl bg-card p-6 ring-1 ring-[#ead98a]">
            <p className="font-heading text-3xl">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
