"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Combo } from "@/lib/types";

export default function AdminCombosPage() {
  const [combos, setCombos] = useState<Combo[]>([]);

  function load(token: string) {
    adminRequest<Combo[]>("/api/v1/admin/combos", token).then(setCombos);
  }

  useEffect(() => {
    const token = getAdminToken();
    if (token) load(token);
  }, []);

  async function remove(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("¿Borrar este combo?")) return;
    await adminRequest(`/api/v1/admin/combos/${id}`, token, { method: "DELETE" });
    load(token);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-4xl">Combos</h1>
        <Link href="/admin/combos/new" className="inline-flex h-8 items-center rounded-full bg-ink px-3 text-sm text-cream">
          Nuevo combo
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {combos.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay combos. Subí el primero.</p>
        ) : (
          combos.map((combo) => (
            <div key={combo.id} className="surface flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">{combo.title}</p>
                <p className="text-xs text-muted-foreground">
                  {combo.published ? "Publicado" : "Borrador"} · {combo.destination}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/combos/${combo.id}`} className="inline-flex h-7 items-center rounded-lg border border-border px-2.5 text-[0.8rem]">
                  Editar
                </Link>
                <Button variant="destructive" size="sm" onClick={() => remove(combo.id)}>
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
