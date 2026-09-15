"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Combo, Destination, Inquiry, Post, Review } from "@/lib/types";

export default function AdminHomePage() {
  const [counts, setCounts] = useState({
    posts: 0,
    destinations: 0,
    combos: 0,
    reviews: 0,
    inquiries: 0,
    pending: 0,
  });

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    Promise.all([
      adminRequest<Post[]>("/api/v1/admin/posts", token),
      adminRequest<Destination[]>("/api/v1/admin/destinations", token),
      adminRequest<Combo[]>("/api/v1/admin/combos", token),
      adminRequest<Review[]>("/api/v1/admin/reviews", token),
      adminRequest<Inquiry[]>("/api/v1/admin/inquiries", token),
    ]).then(([posts, destinations, combos, reviews, inquiries]) => {
      setCounts({
        posts: posts.length,
        destinations: destinations.length,
        combos: combos.length,
        reviews: reviews.length,
        inquiries: inquiries.length,
        pending: reviews.filter((r) => !r.approved).length,
      });
    });
  }, []);

  const cards = [
    ["Inicio (logo y título)", "La web", "/admin/settings"],
    ["Destinos", String(counts.destinations), "/admin/destinations"],
    ["Combos", String(counts.combos), "/admin/combos"],
    ["Blogs", String(counts.posts), "/admin/posts"],
    ["Reviews pendientes", String(counts.pending), "/admin/reviews"],
    ["Consultas", String(counts.inquiries), "/admin/inquiries"],
  ] as const;

  return (
    <div>
      <h1 className="font-heading text-4xl">Hola</h1>
      <p className="mt-2 text-muted-foreground">
        El logo del menú y el título del inicio se editan en <span className="font-medium">La web</span>.
        Los lugares van en Destinos; los viajes de días cerrados, en Combos.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map(([label, value, href]) => (
          <Link key={href} href={href} className="surface p-6 transition hover:bg-white">
            <p className="font-heading text-3xl">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
