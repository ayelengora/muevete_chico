"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAdminToken } from "@/lib/auth";
import { apiBase } from "@/lib/api";
import { LogoBadge } from "@/components/brand/Marks";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiBase()}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo entrar");
      setAdminToken(json.token);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-3xl bg-card p-8 text-center ring-1 ring-[#ead98a]"
      >
        <div className="flex justify-center">
          <LogoBadge />
        </div>
        <h1 className="font-heading text-3xl">Estudio</h1>
        <p className="text-sm text-muted-foreground">
          Para editar la web, blogs y combos.
        </p>
        <div className="space-y-1.5 text-left">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue="hola@muevetechico.com" required />
        </div>
        <div className="space-y-1.5 text-left">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="w-full rounded-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
