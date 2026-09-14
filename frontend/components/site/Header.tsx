import Link from "next/link";
import { Mail, Menu } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { InstagramIcon, LogoBadge } from "@/components/brand/Marks";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/combos", label: "Combos" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contacto", label: "Charlemos" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ead98a]/80 bg-[#fbf6e8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <LogoBadge className="h-12 w-12" />
          <div className="hidden sm:block">
            <p className="font-heading text-lg leading-none">{settings.brand_name}</p>
            <p className="mt-1 text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              {settings.tagline}
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm hover:bg-butter"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full p-2 hover:bg-butter"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="rounded-full p-2 hover:bg-butter"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <Link
            href="/contacto"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm text-cream sm:inline-flex"
          >
            ¿Te querés ir?
          </Link>
          <details className="relative md:hidden">
            <summary className="flex list-none rounded-full p-2 hover:bg-butter">
              <Menu className="h-4 w-4" />
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-cream p-2 shadow-lg">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-butter"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
