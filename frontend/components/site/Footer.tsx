import Link from "next/link";
import { Mail } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { BrandLogo } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand/Marks";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-[#ead98a]/70 bg-[#fbf6e8]/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo src={settings.logo_url} className="h-14 w-14 ring-2 ring-[#f4e04d]" />
            <p className="font-heading text-xl">{settings.brand_name}</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {settings.about}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase">Explorá</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/combos">Destinos</Link>
            <Link href="/blog">Blogs de viaje</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/guia-malaga">Guía de Málaga</Link>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase">Charlemos</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" /> {settings.email}
            </a>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2"
            >
              <InstagramIcon className="h-4 w-4" /> @muevetechico
            </a>
            <Link href="/admin/login" className="text-muted-foreground">
              Entrar al estudio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
