import { createElement, type ReactNode } from "react";

export function formatPrice(amount?: number | null, currency = "EUR") {
  if (amount == null) return "A consultar";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function inquiryLabel(type: string) {
  const map: Record<string, string> = {
    asesoria_1a1: "Asesoría 1:1",
    disenar_viaje: "Diseñar viaje",
    guia_malaga: "Guía Málaga",
    otro: "Otro",
  };
  return map[type] || type;
}

export function renderBody(body?: string) {
  if (!body) return [];
  return body
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    return bold ? createElement("strong", { key: index }, bold[1]) : part;
  });
}
