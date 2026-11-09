"use client";

import {
  Code2,
  Gauge,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import type { HomeContent } from "@/data/home";
import { cn } from "@/lib/utils";

const HIGHLIGHT_ICONS: LucideIcon[] = [Code2, Gauge, ShieldCheck, Search];

export function TechSection({ content }: { content: HomeContent["tech"] }) {
  const [active, setActive] = useState(content.categories[0].key);
  const current =
    content.categories.find((c) => c.key === active) ?? content.categories[0];

  return (
    <Section id="tech">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lede={content.lede}
        />

        <Reveal className="mx-auto max-w-4xl">
          <div
            role="tablist"
            aria-label={content.title}
            className="border-border bg-surface-soft mx-auto mb-8 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border p-1.5"
          >
            {content.categories.map((c) => (
              <button
                key={c.key}
                role="tab"
                type="button"
                aria-selected={c.key === active}
                onClick={() => setActive(c.key)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  c.key === active
                    ? "text-white"
                    : "text-ink-soft hover:text-ocean-700",
                )}
              >
                {c.key === active ? (
                  <motion.span
                    layoutId="tech-pill"
                    className="from-ocean-600 to-ocean-500 shadow-ocean absolute inset-0 rounded-full bg-gradient-to-r"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>

          <div className="border-border relative flex min-h-44 items-center justify-center overflow-hidden rounded-3xl border bg-white p-8">
            <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
            <AnimatePresence mode="wait">
              <motion.ul
                key={current.key}
                role="tabpanel"
                className="relative flex flex-wrap justify-center gap-3"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {
                    transition: { staggerChildren: 0.02, staggerDirection: -1 },
                  },
                  show: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {current.skills.map((s) => (
                  <motion.li
                    key={s}
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.9 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="border-ocean-100 bg-ocean-50 text-ocean-800 hover:border-ocean-300 cursor-default rounded-2xl border px-5 py-3 font-mono text-sm font-medium shadow-[0_6px_20px_-14px_rgb(11_91_211/0.6)] transition-colors"
                  >
                    {s}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
            return (
              <StaggerItem key={h.title}>
                <div className="group hover:bg-ocean-50 flex items-start gap-4 rounded-2xl p-4 transition-colors">
                  <span className="border-ocean-100 text-ocean-600 group-hover:bg-ocean-600 grid size-11 shrink-0 place-items-center rounded-xl border bg-white transition-colors group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-ink font-semibold">{h.title}</h3>
                    <p className="text-ink-soft mt-1 text-sm">{h.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
