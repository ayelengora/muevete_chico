"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Destination } from "@/lib/types";

export default function AdminDestinationsPage() {
  const [places, setPlaces] = useState<Destination[]>([]);

  function load(token: string) {
    adminRequest<Destination[]>("/api/v1/admin/destinations", token).then(setPlaces);
  }

  useEffect(() => {
    const token = getAdminToken();
    if (token) load(token);
  }, []);

  async function remove(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("¿Borrar este destino?")) return;
    await adminRequest(`/api/v1/admin/destinations/${id}`, token, { method: "DELETE" });
    load(token);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-4xl">Destinos</h1>
        <Link href="/admin/destinations/new" className="inline-flex h-8 items-center rounded-full bg-ink px-3 text-sm text-cream">
          Nuevo destino
        </Link>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Lugares disponibles. Los viajes de días cerrados se arman en Combos.</p>
      <div className="mt-6 space-y-3">
        {places.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay destinos. Subí el primero.</p>
        ) : (
          places.map((place) => (
            <div key={place.id} className="surface flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">{place.name}</p>
                <p className="text-xs text-muted-foreground">
                  {place.published ? "Publicado" : "Borrador"} · {[place.region, place.country].filter(Boolean).join(" · ")}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/destinations/${place.id}`} className="inline-flex h-7 items-center rounded-lg border border-border px-2.5 text-[0.8rem]">
                  Editar
                </Link>
                <Button variant="destructive" size="sm" onClick={() => remove(place.id)}>
                  Borrar
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
