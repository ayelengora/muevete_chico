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
