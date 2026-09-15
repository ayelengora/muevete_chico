import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-16">
      <Reveal>
        <p className="kicker">{kicker}</p>
        <h1 className="display mt-4 max-w-4xl text-[clamp(2.6rem,8vw,5.6rem)]">{title}</h1>
        {children ? (
          <div className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {children}
          </div>
        ) : null}
      </Reveal>
    </header>
  );
}
