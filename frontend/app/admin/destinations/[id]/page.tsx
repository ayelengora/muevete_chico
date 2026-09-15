"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Destination } from "@/lib/types";

export default function EditDestinationPage() {
  const params = useParams<{ id: string }>();
  const [place, setPlace] = useState<Destination | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    adminRequest<Destination>(`/api/v1/admin/destinations/${params.id}`, token).then(setPlace);
  }, [params.id]);

  if (!place) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl">Editar destino</h1>
      <ContentEditor kind="destinations" initial={place} />
    </div>
  );
}
