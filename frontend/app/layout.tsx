import { Fraunces, Outfit, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "muevetechico — rutas y experiencias reales",
    template: "%s · muevetechico",
  },
  description:
    "Agencia de viajes y asesorías 1:1. Combos, blogs y experiencias reales para armar tu próximo viaje.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
