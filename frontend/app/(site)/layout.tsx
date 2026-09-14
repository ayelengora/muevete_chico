import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api } from "@/lib/api";
import type { SiteSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

const fallback: SiteSettings = {
  brand_name: "muevetechico",
  tagline: "Rutas y experiencias reales :)",
  hero_title: "¿Te querés ir? charlemos",
  hero_subtitle: "",
  about: "",
  email: "hola@muevetechico.com",
  instagram_url: "https://www.instagram.com/muevetechico/",
  whatsapp: "",
  esim_url: "#",
  esim_label: "Descuento eSIM",
  rental_code: "MUEVETECHICO",
  rental_label: "Renntentials 10% off",
  malaga_guide_title: "Guía Málaga",
  malaga_guide_blurb: "",
  logo_url: "/brand/logo.jpg",
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = fallback;
  try {
    settings = { ...fallback, ...(await api.settings()) };
  } catch {
    /* API still booting */
  }

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
