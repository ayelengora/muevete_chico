"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

export function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const result = await api.createReview({
        author_name: String(data.get("author_name") || ""),
        author_location: String(data.get("author_location") || ""),
        rating: Number(data.get("rating") || 5),
        trip: String(data.get("trip") || ""),
        body: String(data.get("body") || ""),
      });
      setStatus("ok");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No se pudo enviar");
    }
  }

  return (
    <form onSubmit={onSubmit} autoComplete="off" className="surface space-y-4 p-6 sm:p-7">
      <h3 className="font-heading text-2xl">Dejá tu review</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        La publico cuando la leo, para que no se mezcle spam con viajes reales.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="author_name">Nombre</Label>
          <Input id="author_name" name="author_name" type="text" autoComplete="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="author_location">Desde dónde escribís</Label>
          <Input
            id="author_location"
            name="author_location"
            type="text"
            autoComplete="off"
            placeholder="Buenos Aires, Madrid..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="trip">Qué viaje o combo</Label>
          <Input
            id="trip"
            name="trip"
            type="text"
            autoComplete="off"
            placeholder="Málaga, asesoría 1:1..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rating">Puntaje</Label>
          <select
            id="rating"
            name="rating"
            defaultValue="5"
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} estrellas
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="body">Tu experiencia</Label>
          <Textarea id="body" name="body" rows={4} required minLength={10} />
        </div>
      </div>
      <Button type="submit" disabled={status === "loading"} className="h-10 rounded-full px-5">
        {status === "loading" ? "Enviando..." : "Publicar review"}
      </Button>
      {message ? (
        <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sea"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
