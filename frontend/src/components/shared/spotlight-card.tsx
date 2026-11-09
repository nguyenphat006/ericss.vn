"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Thẻ có vệt sáng xanh chạy theo con trỏ (biến CSS --x/--y, không re-render React). */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group border-border hover:border-ocean-200 hover:shadow-ocean relative overflow-hidden rounded-3xl border bg-white transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--ocean-200) 55%, transparent), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
