export function TurtleMark({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} fill="none" aria-hidden>
      <path
        d="M18 48c18-28 38-38 58-28 14 7 22 22 14 34-10 16-34 10-38-4-3-12 8-18 18-12 8 5 6 18-6 20-22 4-38-18-28-34 8-12 28-10 34 4"
        stroke="#8B4A32"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="86" cy="28" r="5" fill="#8B4A32" />
    </svg>
  );
}

export function SunMark({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <circle cx="60" cy="60" r="18" stroke="#C4A035" strokeWidth="6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="60"
          y1="60"
          x2="60"
          y2="18"
          stroke="#C4A035"
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}
    </svg>
  );
}

export function WavesMark({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 80" className={className} fill="none" aria-hidden>
      <path
        d="M8 28c18 16 28 16 46 0 18-16 28-16 46 0 12 10 22 12 32 8"
        stroke="#2C3A4A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M8 48c18 16 28 16 46 0 18-16 28-16 46 0 12 10 22 12 32 8"
        stroke="#2C3A4A"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoBadge({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-full bg-[#f4e04d] text-center shadow-[0_4px_0_rgba(196,160,53,0.25)] ${className}`}
    >
      <div className="leading-none">
        <p className="font-heading text-[0.55rem] font-semibold tracking-[0.18em] text-ink uppercase">
          muevetechico
        </p>
        <p className="mt-1 text-[8px] tracking-[0.3em] text-ink/70">+ TRAVEL</p>
      </div>
    </div>
  );
}
