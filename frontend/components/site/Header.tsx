"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { SiteSettings } from "@/lib/types";
import { BrandLogo } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand/Marks";

const links = [
  { href: "/combos", label: "Destinos" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-[#f7f3e8]">
      <div className="mx-auto flex h-[4.4rem] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="muevetechico, ir al inicio"
          className="shrink-0 transition-transform duration-500 hover:-rotate-6 hover:scale-105"
          onClick={() => setOpen(false)}
        >
          <BrandLogo src={settings.logo_url} className="h-11 w-11" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full p-2 text-ink/70 transition hover:text-ink"
            aria-label="Instagram de muevetechico"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <Link href="/contacto" className="cta-pill">
            Charlemos <span className="arrow">→</span>
          </Link>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-black/5 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-black/6 px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm hover:bg-black/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
