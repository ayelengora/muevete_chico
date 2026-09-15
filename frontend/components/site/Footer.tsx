import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { InstagramIcon } from "@/components/brand/Marks";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-black/8 bg-[#f3eee0]">
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 font-heading text-[22vw] italic leading-none text-ink/[0.045] select-none"
      >
        mundo
      </p>
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-12 px-4 py-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-md">
          <p className="font-heading text-4xl leading-none tracking-tight sm:text-5xl">{settings.brand_name}</p>
          <p className="mt-2 text-[11px] tracking-[0.28em] text-muted-foreground uppercase">mucho mundo</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{settings.about}</p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-sm">
          <div className="flex flex-col gap-2.5">
            <p className="kicker">Sitio</p>
            <Link href="/destinos" className="arrow-link w-fit">
              Destinos
            </Link>
            <Link href="/combos" className="hover:underline">
              Combos
            </Link>
            <Link href="/blog" className="w-fit hover:underline">
              Blog
            </Link>
            <Link href="/reviews" className="w-fit hover:underline">
              Reviews
            </Link>
            <Link href="/guia-malaga" className="w-fit hover:underline">
              Guía de Málaga
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="kicker">Contacto</p>
            <a href={`mailto:${settings.email}`} className="w-fit hover:underline">
              {settings.email}
            </a>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 hover:underline"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              @muevetechico
            </a>
            <Link href="/contacto" className="arrow-link w-fit">
              Charlemos <span className="arrow">→</span>
            </Link>
            <Link href="/admin/login" className="w-fit text-muted-foreground hover:underline">
              Estudio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
