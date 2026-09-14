"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { clearAdminToken, getAdminToken } from "@/lib/auth";
import { LogoBadge } from "@/components/brand/Marks";

const nav = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/posts", label: "Blogs" },
  { href: "/admin/combos", label: "Combos" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/inquiries", label: "Consultas" },
  { href: "/admin/settings", label: "La web" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (!getAdminToken()) router.replace("/admin/login");
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
      <aside className="md:w-56">
        <div className="flex items-center gap-3">
          <LogoBadge className="h-12 w-12" />
          <div>
            <p className="font-heading text-lg">Estudio</p>
            <p className="text-xs text-muted-foreground">muevetechico</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-wrap gap-2 md:flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm ${
                pathname === item.href ? "bg-ink text-cream" : "bg-card hover:bg-butter"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/" className="rounded-full px-3 py-2 text-sm text-muted-foreground">
            Ver la web
          </Link>
          <button
            type="button"
            className="rounded-full px-3 py-2 text-left text-sm text-muted-foreground"
            onClick={() => {
              clearAdminToken();
              router.push("/admin/login");
            }}
          >
            Salir
          </button>
        </nav>
      </aside>
      <div className="flex-1 pb-10">{children}</div>
    </div>
  );
}
