import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-28">
      <p className="kicker">404</p>
      <h1 className="display mt-4 text-[clamp(2.8rem,8vw,5.5rem)]">Esa ruta no existe</h1>
      <p className="mt-5 text-muted-foreground">Volvé al inicio y elegí otro destino.</p>
      <Link href="/" className="cta-pill mt-8">
        Ir al inicio <span className="arrow">→</span>
      </Link>
    </div>
  );
}
