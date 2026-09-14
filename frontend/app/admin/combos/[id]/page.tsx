"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Combo } from "@/lib/types";

export default function EditComboPage() {
  const params = useParams<{ id: string }>();
  const [combo, setCombo] = useState<Combo | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    adminRequest<Combo>(`/api/v1/admin/combos/${params.id}`, token).then(setCombo);
  }, [params.id]);

  if (!combo) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl">Editar combo</h1>
      <ContentEditor kind="combos" initial={combo} />
    </div>
  );
}
