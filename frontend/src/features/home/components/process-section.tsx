"use client";

import { Check, MousePointer2, ShieldCheck, Terminal } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/shared/section";
import type { HomeContent } from "@/data/home";
import { cn } from "@/lib/utils";

type Content = HomeContent["process"];

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- Hình minh hoạ của từng giai đoạn ---------- */

function DiscoveryVisual({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it, i) => (
        <motion.li
          key={it}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.18 }}
          className="border-ocean-100 flex items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-medium"
        >
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.35 + i * 0.18, type: "spring" }}
            className="bg-ocean-600 grid size-5 place-items-center rounded-md text-white"
          >
            <Check className="size-3" strokeWidth={3} />
          </motion.span>
          {it}
        </motion.li>
      ))}
    </ul>
  );
}

const WIRE = [
  "col-span-6 h-8",
  "col-span-4 h-24",
  "col-span-2 h-24",
  "col-span-2 h-14",
  "col-span-2 h-14",
  "col-span-2 h-14",
];
const SWATCHES = ["bg-ocean-600", "bg-ocean-400", "bg-aqua", "bg-ocean-100"];

function DesignVisual({ items }: { items: string[] }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-2">
        {WIRE.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            className={cn(
              "rounded-lg border border-dashed",
              c,
              i === 1
                ? "border-ocean-300 from-ocean-100 to-aqua/20 bg-gradient-to-br"
                : "border-ocean-200 bg-white",
            )}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {SWATCHES.map((s, i) => (
            <motion.span
              key={s}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className={cn("size-6 rounded-full ring-2 ring-white", s)}
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          {items.map((it, i) => (
            <span
              key={it}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[10px]",
                i === items.length - 1
                  ? "bg-ocean-600 text-white"
                  : "bg-ocean-50 text-ocean-700",
              )}
            >
              {it}
            </span>
          ))}
        </div>
      </div>
      {/* Con trỏ "người thiết kế" lướt qua các khối */}
      <motion.span
        className="text-ocean-700 absolute top-0 left-0"
        initial={{ x: 20, y: 20 }}
        animate={{ x: [20, 180, 120, 230], y: [20, 60, 120, 40] }}
        transition={{ duration: 3.2, repeat: Infinity, repeatType: "mirror" }}
      >
        <MousePointer2 className="fill-ocean-600 size-5" />
      </motion.span>
    </div>
  );
}

function DevVisual({ items }: { items: string[] }) {
  return (
    <div className="bg-ocean-900 rounded-2xl p-5 font-mono text-[13px] text-white/85">
      <div className="mb-4 flex items-center gap-2 text-xs text-white/50">
        <Terminal className="size-3.5" />
        ericss@build
      </div>
      {items.map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.35 }}
          className="leading-7"
        >
          <span className={i === 0 ? "text-aqua" : "text-[#5ee08a]"}>
            {i === 0 ? "$" : "✓"}
          </span>{" "}
          {line}
        </motion.p>
      ))}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.6, ease: "easeInOut" }}
          className="from-ocean-400 to-aqua h-full origin-left rounded-full bg-gradient-to-r"
        />
      </div>
    </div>
  );
}

function ScoreRing({
  label,
  value,
  i,
}: {
  label: string;
  value: number;
  i: number;
}) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-16">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={r}
            className="stroke-ocean-50"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-[#1fbf60]"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - value / 100) }}
            transition={{
              delay: 0.15 + i * 0.12,
              duration: 1.1,
              ease: "easeOut",
            }}
          />
        </svg>
        <span className="text-ink absolute inset-0 grid place-items-center text-sm font-bold tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-ink-soft text-center text-[11px] leading-tight">
        {label}
      </span>
    </div>
  );
}

function LaunchVisual({ content }: { content: Content }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {content.scores.map((s, i) => (
          <ScoreRing key={s.label} label={s.label} value={s.value} i={i} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="from-ocean-600 to-aqua mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r p-4 text-white"
      >
        <ShieldCheck className="size-6 shrink-0" />
        <span className="font-semibold">{content.warranty}</span>
        <span className="ml-auto rounded-full bg-white/20 px-2.5 py-1 font-mono text-[11px]">
          LIVE
        </span>
      </motion.div>
    </div>
  );
}

function StepVisual({ step, content }: { step: number; content: Content }) {
  const s = content.steps[step];
  if (step === 0) return <DiscoveryVisual items={s.items} />;
  if (step === 1) return <DesignVisual items={s.items} />;
  if (step === 2) return <DevVisual items={s.items} />;
  return <LaunchVisual content={content} />;
}

function Panel({
  step,
  content,
  week,
}: {
  step: number;
  content: Content;
  week: number;
}) {
  const s = content.steps[step];
  return (
    <div className="border-ocean-100 shadow-ocean relative overflow-hidden rounded-[2rem] border bg-white/80 p-6 backdrop-blur sm:p-8">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <div className="relative mb-6 flex items-center justify-between">
        <span className="text-ocean-700 font-mono text-xs tracking-wider uppercase">
          {pad(step + 1)} · {s.title}
        </span>
        <span className="bg-ocean-50 text-ocean-700 rounded-full px-3 py-1 font-mono text-xs tabular-nums">
          {content.weekLabel} {pad(week)}
        </span>
      </div>
      <div className="relative min-h-56">
        <StepVisual step={step} content={content} />
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

/**
 * Hành trình dự án: trên màn hình lớn section được ghim, cuộn để chạy bộ đếm tuần,
 * giai đoạn tương ứng sáng lên và bảng minh hoạ bên phải đổi theo.
 * Màn hình nhỏ hiển thị dạng danh sách để không phải cuộn dài.
 */
export function ProcessSection({ content }: { content: Content }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const total = content.totalWeeks;
  const [week, setWeek] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setWeek(Math.min(total, Math.max(1, Math.floor(v * total) + 1))),
  );
  const step = Math.max(
    0,
    content.steps.findIndex((s) => week >= s.weeks[0] && week <= s.weeks[1]),
  );

  const heading = (
    <Reveal className="flex flex-col items-start gap-4">
      <span className="border-ocean-200 bg-ocean-50 text-ocean-700 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs tracking-wider uppercase">
        <span className="bg-aqua size-1.5 rounded-full" />
        {content.eyebrow}
      </span>
      <h2 className="font-heading text-ink text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
        {content.title}
      </h2>
      <p className="text-ink-soft max-w-md text-base text-pretty">
        {content.lede}
      </p>
    </Reveal>
  );

  return (
    <section id="process" className="bg-surface-soft relative">
      <div
        aria-hidden
        className="bg-grid mask-fade-y pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Màn hình lớn: ghim + cuộn */}
      <div ref={pinRef} className="relative hidden h-[340vh] lg:block">
        <div className="sticky top-0 flex h-svh items-center pt-16">
          <Container className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              {heading}
              <p className="font-heading mt-8 flex items-baseline gap-3 font-extrabold">
                <span className="text-ink-soft text-sm font-semibold tracking-widest uppercase">
                  {content.weekLabel}
                </span>
                <span className="text-gradient text-7xl tabular-nums">
                  {pad(week)}
                </span>
                <span className="text-ocean-200 text-2xl">/ {pad(total)}</span>
              </p>
              <ol className="mt-6 flex flex-col gap-1">
                {content.steps.map((s, i) => (
                  <li
                    key={s.title}
                    className={cn(
                      "border-l-2 py-2 pl-4 transition-colors duration-300",
                      i === step
                        ? "border-ocean-600"
                        : i < step
                          ? "border-ocean-300"
                          : "border-ocean-100",
                    )}
                  >
                    <p
                      className={cn(
                        "flex items-center gap-2 font-semibold transition-colors",
                        i === step ? "text-ink" : "text-ink-soft/60",
                      )}
                    >
                      {i < step ? (
                        <Check className="text-ocean-500 size-4" />
                      ) : (
                        <span className="font-mono text-xs">{pad(i + 1)}</span>
                      )}
                      {s.title}
                      <span className="text-ocean-400 ml-auto font-mono text-[11px] font-normal">
                        {content.weekLabel}{" "}
                        {s.weeks[0] === s.weeks[1]
                          ? pad(s.weeks[0])
                          : `${pad(s.weeks[0])}–${pad(s.weeks[1])}`}
                      </span>
                    </p>
                    <AnimatePresence initial={false}>
                      {i === step ? (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-ink-soft overflow-hidden pt-1 text-sm"
                        >
                          {s.desc}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 24, rotateX: -8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -24, rotateX: 8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 1200 }}
                >
                  <Panel step={step} content={content} week={week} />
                </motion.div>
              </AnimatePresence>
              {/* Thanh 8 tuần: mỗi vạch một tuần */}
              <div className="mt-6 flex gap-1.5" aria-hidden>
                {Array.from({ length: total }, (_, w) => (
                  <span
                    key={w}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors duration-300",
                      w < week ? "bg-ocean-500" : "bg-ocean-100",
                    )}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Màn hình nhỏ: danh sách tĩnh */}
      <Container className="relative py-20 lg:hidden">
        {heading}
        <ol className="mt-10 flex flex-col gap-6">
          {content.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal>
                <p className="text-ocean-700 font-mono text-xs tracking-wider uppercase">
                  {pad(i + 1)} · {content.weekLabel}{" "}
                  {s.weeks[0] === s.weeks[1]
                    ? pad(s.weeks[0])
                    : `${pad(s.weeks[0])}–${pad(s.weeks[1])}`}
                </p>
                <h3 className="font-heading text-ink mt-1 text-xl font-bold">
                  {s.title}
                </h3>
                <p className="text-ink-soft mt-1 mb-4 text-sm">{s.desc}</p>
                <div className="border-ocean-100 rounded-3xl border bg-white p-5">
                  <StepVisual step={i} content={content} />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
