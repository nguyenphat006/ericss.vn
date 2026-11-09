"use client";

import { ArrowRight, Sparkles, ShieldCheck, Zap, Bot } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/shared/section";
import type { HomeContent } from "@/data/home";

// WebGL chỉ chạy ở trình duyệt; tải sau để không chặn hiển thị chữ của Hero
const HeroParticles = dynamic(() => import("./hero-particles"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-grid align-bottom">
      {/* Giữ chỗ bằng từ dài nhất để dòng không nhảy */}
      <span className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[i]}
          className="text-gradient col-start-1 row-start-1"
          initial={{ y: "60%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CodeCard() {
  const lines = [
    { c: "text-ocean-500", t: "const" },
    { c: "text-ink", t: " project = " },
    { c: "text-aqua", t: "await" },
    { c: "text-ink", t: " ericss.build({" },
  ];
  return (
    <div className="glass border-ocean-100 shadow-ocean w-full max-w-sm rounded-2xl border p-5 font-mono text-[13px] leading-relaxed">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="text-ink-soft ml-auto text-[11px]">ericss.ts</span>
      </div>
      <p>
        {lines.map((l, i) => (
          <span key={i} className={l.c}>
            {l.t}
          </span>
        ))}
      </p>
      <p className="pl-4">
        <span className="text-ink-soft">type:</span>{" "}
        <span className="text-ocean-600">&quot;website&quot;</span>,
      </p>
      <p className="pl-4">
        <span className="text-ink-soft">speed:</span>{" "}
        <span className="text-ocean-600">&quot;&lt; 2s&quot;</span>,
      </p>
      <p className="pl-4">
        <span className="text-ink-soft">warranty:</span>{" "}
        <span className="text-aqua">12</span>,
      </p>
      <p>
        <span className="text-ink">{"});"}</span>
        <span className="bg-ocean-500 ml-0.5 inline-block h-4 w-2 animate-pulse align-middle" />
      </p>
    </div>
  );
}

export function HeroSection({ content }: { content: HomeContent["hero"] }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const heroVisible = useInView(sectionRef);
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };
  const badgeIcons = [Zap, Sparkles, ShieldCheck];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Nền: mảng màu mờ + lưới + trường hạt */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="from-ocean-50 absolute inset-0 bg-gradient-to-b via-white to-white" />
        <div className="bg-grid mask-fade-y absolute inset-0 opacity-50" />
        <div className="bg-ocean-200/50 absolute -top-40 -left-32 size-[520px] rounded-full blur-3xl" />
        <div className="bg-aqua/20 absolute top-20 -right-40 size-[460px] rounded-full blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[28%] sm:h-[50%]">
          <HeroParticles active={heroVisible && !reduce} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
        {/* Làm mờ hạt phía sau khối chữ để chữ luôn dễ đọc */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_22%_55%,white_35%,transparent_75%)] lg:bg-[radial-gradient(ellipse_45%_55%_at_25%_55%,white_40%,transparent_80%)]" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            {...fade(0)}
            className="glass border-ocean-200 text-ocean-700 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium"
          >
            <span className="relative flex size-2">
              <span className="bg-aqua animate-pulse-ring absolute inset-0 rounded-full" />
              <span className="bg-aqua relative size-2 rounded-full" />
            </span>
            {content.kicker}
          </motion.span>

          <motion.h1
            {...fade(0.1)}
            className="font-heading text-ink text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl"
          >
            {content.titleLead} <RotatingWord words={content.rotating} />
            <br />
            <span className="text-ink/90">{content.titleTail}</span>
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="text-ink-soft max-w-xl text-lg text-pretty"
          >
            {content.lede}
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group bg-ocean-600 shadow-ocean hover:bg-ocean-700 relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-semibold text-white transition-colors"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {content.primaryCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="glass border-ocean-200 text-ink hover:border-ocean-400 inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-semibold transition-colors"
            >
              {content.secondaryCta}
            </a>
          </motion.div>

          <motion.ul {...fade(0.4)} className="flex flex-wrap gap-x-6 gap-y-2">
            {content.badges.map((b, i) => {
              const Icon = badgeIcons[i % badgeIcons.length];
              return (
                <li
                  key={b}
                  className="text-ink-soft flex items-center gap-2 text-sm font-medium"
                >
                  <Icon className="text-ocean-500 size-4" />
                  {b}
                </li>
              );
            })}
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="relative hidden justify-center lg:flex"
        >
          <div className="animate-float">
            <CodeCard />
          </div>
          <div className="glass border-ocean-100 shadow-ocean animate-float absolute -bottom-10 -left-4 flex items-center gap-3 rounded-2xl border px-4 py-3 [animation-delay:-3s]">
            <span className="bg-ocean-50 text-ocean-600 grid size-10 place-items-center rounded-xl">
              <Bot className="size-5" />
            </span>
            <div className="text-sm">
              <p className="text-ink font-semibold">AI Chatbot</p>
              <p className="text-ink-soft text-xs">24/7 · Gemini · OpenAI</p>
            </div>
          </div>
          <div className="glass border-ocean-100 shadow-ocean animate-float absolute -top-16 -right-6 rounded-2xl border px-4 py-3 text-center [animation-delay:-1.5s]">
            <p className="font-heading text-gradient text-3xl font-extrabold">
              95+
            </p>
            <p className="text-ink-soft text-xs">SEO · PageSpeed</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
