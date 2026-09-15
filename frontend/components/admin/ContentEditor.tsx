"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";

type Kind = "posts" | "combos" | "destinations";

type Values = {
  id?: number;
  title?: string;
  name?: string;
  excerpt?: string;
  blurb?: string;
  body?: string;
  description?: string;
  destination?: string;
  region?: string;
  country?: string;
  duration?: string;
  price_from?: number | null;
  currency?: string;
  includes?: string[] | string;
  itinerary?: string[] | string;
  places?: string[] | string;
  cover_url?: string | null;
  published?: boolean;
  featured?: boolean;
};

export function ContentEditor({ kind, initial }: { kind: Kind; initial?: Values }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isCombo = kind === "combos";
  const isPlace = kind === "destinations";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const published = data.get("published") === "on";
    const featured = data.get("featured") === "on";
    data.set("published", String(published));
    data.set("featured", String(featured));
    const payload: Record<string, string> = {};
    data.forEach((value, key) => {
      if (key === "cover") return;
      payload[key] = String(value);
    });
    setLoading(true);
    setError("");
    try {
      const path = initial?.id ? `/api/v1/admin/${kind}/${initial.id}` : `/api/v1/admin/${kind}`;
      const method = initial?.id ? "PATCH" : "POST";
      const file = data.get("cover");
      const hasFile = file instanceof File && file.size > 0;
      if (hasFile) {
        await adminRequest(path, token, { method, body: data });
      } else {
        await adminRequest(path, token, { method, body: JSON.stringify(payload) });
      }
      router.push(`/admin/${kind}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setLoading(false);
    }
  }

  const includesText = Array.isArray(initial?.includes)
    ? initial?.includes.join("\n")
    : initial?.includes || "";
  const itineraryText = Array.isArray(initial?.itinerary)
    ? initial?.itinerary.join("\n")
    : initial?.itinerary || "";
  const placesText = Array.isArray(initial?.places)
    ? initial?.places.join("\n")
    : initial?.places || "";

  return (
    <form onSubmit={onSubmit} className="surface space-y-4 p-6">
      {isPlace ? (
        <Field name="name" label="Nombre del destino" defaultValue={initial?.name} required />
      ) : (
        <Field name="title" label="Título" defaultValue={initial?.title} required />
      )}
      {isPlace ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="region" label="Región / zona" defaultValue={initial?.region} />
            <Field name="country" label="País" defaultValue={initial?.country} />
          </div>
          <Field name="blurb" label="Bajada corta" defaultValue={initial?.blurb} />
          <div className="space-y-1.5">
            <Label htmlFor="description">Sobre el lugar</Label>
            <Textarea id="description" name="description" rows={8} defaultValue={initial?.description} required />
          </div>
        </>
      ) : isCombo ? (
        <>
          <Field name="destination" label="Destino o combinación" defaultValue={initial?.destination} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field name="duration" label="Duración (días cerrados)" defaultValue={initial?.duration} />
            <Field
              name="price_from"
              label="Precio desde"
              type="number"
              defaultValue={initial?.price_from?.toString()}
            />
            <Field name="currency" label="Moneda" defaultValue={initial?.currency || "EUR"} />
          </div>
          <Field name="excerpt" label="Bajada" defaultValue={initial?.excerpt} />
          <div className="space-y-1.5">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" rows={8} defaultValue={initial?.description} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="itinerary">Cronograma (una línea por día)</Label>
            <Textarea id="itinerary" name="itinerary" rows={6} defaultValue={itineraryText} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="places">Destinos que combina (slugs, uno por línea: malaga, nerja…)</Label>
            <Textarea id="places" name="places" rows={3} defaultValue={placesText} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="includes">Incluye (una línea por ítem)</Label>
            <Textarea id="includes" name="includes" rows={5} defaultValue={includesText} />
          </div>
        </>
      ) : (
        <>
          <Field name="destination" label="Destino" defaultValue={initial?.destination} />
          <Field name="excerpt" label="Bajada" defaultValue={initial?.excerpt} />
          <div className="space-y-1.5">
            <Label htmlFor="body">Nota</Label>
            <Textarea id="body" name="body" rows={12} defaultValue={initial?.body} required />
          </div>
        </>
      )}
      <Field name="cover_url" label="URL de portada (si no subís archivo)" defaultValue={initial?.cover_url || ""} />
      <div className="space-y-1.5">
        <Label htmlFor="cover">Subir portada</Label>
        <Input id="cover" name="cover" type="file" accept="image/*" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={initial?.published} />
        Publicado
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={initial?.featured} />
        Destacado en home
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="rounded-full" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} required={required} />
    </div>
  );
}
