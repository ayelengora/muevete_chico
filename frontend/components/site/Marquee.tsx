export function DestinationMarquee({ names }: { names: string[] }) {
  if (names.length === 0) return null;
  const loop = [...names, ...names];

  return (
    <div className="marquee border-y border-black/8 py-5">
      <div className="marquee-track">
        {loop.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="flex items-center gap-8 px-8 font-heading text-2xl italic tracking-tight text-ink/80 sm:text-3xl"
          >
            {name}
            <span className="text-base not-italic text-butter">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
