export function BrandLogo({
  className = "h-12 w-12",
  src,
}: {
  className?: string;
  src?: string | null;
}) {
  return (
    <img
      src={src || "/brand/logo.jpg"}
      alt="muevetechico"
      className={`rounded-full object-cover ${className}`}
    />
  );
}

export function BrandWordmark({
  name = "muevetechico",
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  return (
    <span className={`font-heading text-[1.35rem] leading-none tracking-tight ${className}`}>
      {name}
    </span>
  );
}
