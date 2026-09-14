import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-3 font-heading text-4xl">Esa ruta no existe</h1>
      <p className="mt-3 text-muted-foreground">Volvé al inicio y elegí otro destino.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-cream hover:bg-black"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
