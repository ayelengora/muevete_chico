export function BrandLogo({
  className = "h-12 w-12",
}: {
  className?: string;
}) {
  return (
    <img
      src="/brand/logo.jpg"
      alt="muevetechico"
      className={`rounded-full object-cover ${className}`}
    />
  );
}
