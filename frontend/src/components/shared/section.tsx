import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

/** Tiêu đề section chung: eyebrow dạng chip + tiêu đề lớn + mô tả. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <span className="border-ocean-200 bg-ocean-50 text-ocean-700 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs tracking-wider uppercase">
        <span className="bg-aqua size-1.5 rounded-full" />
        {eyebrow}
      </span>
      <h2 className="font-heading text-ink max-w-3xl text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="text-ink-soft max-w-2xl text-base text-pretty sm:text-lg">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
