import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { BrandWordmark } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand/Marks";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-black/8 bg-[#f3eee0]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <BrandWordmark name={settings.brand_name} />
          <p className="mt-1 text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            mucho mundo
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{settings.about}</p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-sm">
          <div className="flex flex-col gap-2.5">
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Sitio</p>
            <Link href="/combos" className="hover:underline">
              Destinos
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/reviews" className="hover:underline">
              Reviews
            </Link>
            <Link href="/guia-malaga" className="hover:underline">
              Guía de Málaga
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Contacto</p>
            <a href={`mailto:${settings.email}`} className="hover:underline">
              {settings.email}
            </a>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              @muevetechico
            </a>
            <Link href="/contacto" className="hover:underline">
              Charlemos
            </Link>
            <Link href="/admin/login" className="text-muted-foreground hover:underline">
              Estudio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
