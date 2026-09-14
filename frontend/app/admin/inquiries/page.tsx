"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import { inquiryLabel, formatDate } from "@/lib/format";
import type { Inquiry } from "@/lib/types";

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);

  function load(token: string) {
    adminRequest<Inquiry[]>("/api/v1/admin/inquiries", token).then(setItems);
  }

  useEffect(() => {
    const token = getAdminToken();
    if (token) load(token);
  }, []);

  async function setStatus(id: number, status: string) {
    const token = getAdminToken();
    if (!token) return;
    await adminRequest(`/api/v1/admin/inquiries/${id}`, token, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    load(token);
  }

  return (
    <div>
      <h1 className="font-heading text-4xl">Consultas</h1>
      <p className="mt-2 text-muted-foreground">Lo que llega por los formularios de la web.</p>
      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay consultas.</p>
        ) : (
          items.map((item) => (
            <article key={item.id} className="surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {item.name} · {inquiryLabel(item.inquiry_type)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.email}
                    {item.whatsapp ? ` · ${item.whatsapp}` : ""} · {formatDate(item.created_at)}
                  </p>
                  {item.destination ? <p className="text-sm">Destino: {item.destination}</p> : null}
                  {item.message ? <p className="mt-2 text-sm">{item.message}</p> : null}
                </div>
                <div className="flex gap-2">
                  {["nueva", "leida", "respondida"].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={item.status === status ? "default" : "outline"}
                      onClick={() => setStatus(item.id, status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
