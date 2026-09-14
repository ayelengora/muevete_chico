"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrandLogo } from "@/components/brand/Logo";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { SiteSettings } from "@/lib/types";

const heroFields = [
  { key: "hero_title", label: "Título (A dónde te vas)", area: false },
  { key: "hero_subtitle", label: "Bajada debajo del título", area: true },
  { key: "tagline", label: "Línea chica sobre el título", area: false },
  { key: "brand_name", label: "Nombre en el pie", area: false },
] as const;

const contactFields = [
  { key: "about", label: "Sobre muevetechico", area: true },
  { key: "email", label: "Email", area: false },
  { key: "instagram_url", label: "Instagram", area: false },
  { key: "whatsapp", label: "WhatsApp", area: false },
] as const;

const promoFields = [
  { key: "esim_url", label: "Link descuento eSIM", area: false },
  { key: "esim_label", label: "Texto eSIM", area: false },
  { key: "rental_code", label: "Código de descuento", area: false },
  { key: "rental_label", label: "Texto alquiler / promo", area: false },
  { key: "malaga_guide_title", label: "Título guía Málaga", area: false },
  { key: "malaga_guide_blurb", label: "Texto guía Málaga", area: true },
] as const;

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    adminRequest<SiteSettings>("/api/v1/admin/settings", token).then(setSettings);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("logo");
    const hasFile = file instanceof File && file.size > 0;
    setMessage("");
    const updated = hasFile
      ? await adminRequest<SiteSettings>("/api/v1/admin/settings", token, {
          method: "PUT",
          body: data,
        })
      : await adminRequest<SiteSettings>("/api/v1/admin/settings", token, {
          method: "PUT",
          body: JSON.stringify({
            settings: Object.fromEntries(
              [...data.entries()].filter(([key]) => key !== "logo")
            ),
          }),
        });
    setSettings(updated);
    setPreview(null);
    setMessage("Guardado. Recargá el inicio para verlo.");
  }

  if (!settings) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="font-heading text-4xl">La web</h1>
      <p className="mt-2 text-muted-foreground">
        El sello va una sola vez, en el menú de arriba. El título y la bajada son del inicio.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-8">
        <section className="surface space-y-4 p-6">
          <div>
            <h2 className="font-heading text-2xl">Inicio</h2>
            <p className="text-sm text-muted-foreground">
              Logo del menú, título y bajada de la home.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <BrandLogo src={preview || settings.logo_url} className="h-16 w-16" />
            <div className="space-y-1.5">
              <Label htmlFor="logo">Cambiar logo</Label>
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
              />
            </div>
          </div>
          {heroFields.map((field) => (
            <Field key={field.key} field={field} value={settings[field.key] || ""} />
          ))}
        </section>

        <section className="surface space-y-4 p-6">
          <h2 className="font-heading text-2xl">Contacto</h2>
          {contactFields.map((field) => (
            <Field key={field.key} field={field} value={settings[field.key] || ""} />
          ))}
        </section>

        <section className="surface space-y-4 p-6">
          <h2 className="font-heading text-2xl">Promos y guía</h2>
          {promoFields.map((field) => (
            <Field key={field.key} field={field} value={settings[field.key] || ""} />
          ))}
        </section>

        <Button type="submit" className="rounded-full">
          Guardar cambios
        </Button>
        {message ? <p className="text-sm">{message}</p> : null}
      </form>
    </div>
  );
}

function Field({
  field,
  value,
}: {
  field: { key: string; label: string; area: boolean };
  value: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.key}>{field.label}</Label>
      {field.area ? (
        <Textarea id={field.key} name={field.key} rows={3} defaultValue={value} />
      ) : (
        <Input id={field.key} name={field.key} defaultValue={value} />
      )}
    </div>
  );
}
