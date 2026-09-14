"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

type Props = {
  defaultType?: string;
  title?: string;
  submitLabel?: string;
};

export function InquiryForm({
  defaultType = "asesoria_1a1",
  title = "Escribime y armamos el plan",
  submitLabel = "Enviar",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setMessage("");
    try {
      const travelers = data.get("travelers")?.toString();
      const result = await api.createInquiry({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        whatsapp: String(data.get("whatsapp") || ""),
        inquiry_type: String(data.get("inquiry_type") || defaultType),
        destination: String(data.get("destination") || ""),
        travelers: travelers ? Number(travelers) : undefined,
        travel_dates: String(data.get("travel_dates") || ""),
        message: String(data.get("message") || ""),
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
    <form onSubmit={onSubmit} className="surface space-y-4 p-6 sm:p-7">
      <h3 className="font-heading text-2xl">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tu nombre" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="WhatsApp" name="whatsapp" />
        <div className="space-y-1.5">
          <Label htmlFor="inquiry_type">Qué necesitás</Label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            defaultValue={defaultType}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="asesoria_1a1">Asesoría 1:1 — ¿Te querés ir?</option>
            <option value="disenar_viaje">Diseñemos tu próximo viaje</option>
            <option value="guia_malaga">Guía de Málaga</option>
            <option value="otro">Otra consulta</option>
          </select>
        </div>
        <Field label="Destino soñado" name="destination" />
        <Field label="Cuántas personas" name="travelers" type="number" />
        <Field label="Fechas aproximadas" name="travel_dates" className="sm:col-span-2" />
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message">Contame un poco</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Ritmo, presupuesto, si viajás sola, playa o pueblo..."
          />
        </div>
      </div>
      <Button type="submit" disabled={status === "loading"} className="h-10 rounded-full px-5">
        {status === "loading" ? "Enviando..." : submitLabel}
      </Button>
      {message ? (
        <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sea"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className || ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
