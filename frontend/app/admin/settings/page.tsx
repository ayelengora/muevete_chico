"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { SiteSettings } from "@/lib/types";

const fields: { key: keyof SiteSettings | string; label: string; area?: boolean }[] = [
  { key: "brand_name", label: "Nombre de la marca" },
  { key: "tagline", label: "Tagline" },
  { key: "hero_title", label: "Título principal" },
  { key: "hero_subtitle", label: "Subtítulo", area: true },
  { key: "about", label: "Sobre muevetechico", area: true },
  { key: "email", label: "Email" },
  { key: "instagram_url", label: "Instagram" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "esim_url", label: "Link descuento eSIM" },
  { key: "esim_label", label: "Texto eSIM" },
  { key: "rental_code", label: "Código de descuento" },
  { key: "rental_label", label: "Texto alquiler / promo" },
  { key: "malaga_guide_title", label: "Título guía Málaga" },
  { key: "malaga_guide_blurb", label: "Texto guía Málaga", area: true },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    adminRequest<SiteSettings>("/api/v1/admin/settings", token).then(setSettings);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const updated = await adminRequest<SiteSettings>("/api/v1/admin/settings", token, {
      method: "PUT",
      body: JSON.stringify({ settings: data }),
    });
    setSettings(updated);
    setMessage("Guardado. Recargá la web pública para verlo.");
  }

  if (!settings) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="font-heading text-4xl">La web</h1>
      <p className="mt-2 text-muted-foreground">
        Textos, mail, Instagram y los botones de la home (eSIM, código, guía).
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-3xl bg-card p-6 ring-1 ring-[#ead98a]">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.area ? (
              <Textarea id={field.key} name={field.key} rows={3} defaultValue={settings[field.key] || ""} />
            ) : (
              <Input id={field.key} name={field.key} defaultValue={settings[field.key] || ""} />
            )}
          </div>
        ))}
        <Button type="submit" className="rounded-full">
          Guardar cambios
        </Button>
        {message ? <p className="text-sm">{message}</p> : null}
      </form>
    </div>
  );
}
