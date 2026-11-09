"use client";

import {
  Award,
  Quote,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { ScrollRevealText } from "@/components/shared/scroll-reveal-text";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import type { HomeContent } from "@/data/home";

const ADV_ICONS: LucideIcon[] = [Award, Rocket, ShieldCheck];

export function AboutSection({ content }: { content: HomeContent["about"] }) {
  const timelineRef = useRef<HTMLOListElement>(null);
  // Vạch timeline "chảy" xuống theo tiến độ cuộn
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const initials = content.founder.name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("");

  return (
    <Section id="about" className="bg-surface-soft overflow-hidden">
      <div
        aria-hidden
        className="bg-ocean-100/60 absolute top-1/3 -right-40 size-[480px] rounded-full blur-3xl"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          align="left"
          className="mb-8 sm:mb-10"
        />

        <ScrollRevealText
          text={content.manifesto}
          className="font-heading text-ink mb-16 max-w-5xl text-3xl leading-[1.15] font-bold tracking-tight sm:mb-24 sm:text-5xl lg:text-6xl"
        />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-8">
            {/* Thẻ Founder: chưa có ảnh nên dùng chữ cái đầu trên nền gradient */}
            <Reveal>
              <div className="group border-border relative overflow-hidden rounded-3xl border bg-white p-8">
                <div className="from-ocean-600 to-aqua absolute -top-24 -right-24 size-56 rounded-full bg-gradient-to-br opacity-15 transition-transform duration-700 group-hover:scale-125" />
                <div className="relative flex items-center gap-5">
                  <div className="relative">
                    <div className="from-ocean-600 to-aqua shadow-ocean grid size-20 place-items-center rounded-2xl bg-gradient-to-br text-white">
                      <span className="font-heading text-2xl font-extrabold">
                        {initials}
                      </span>
                    </div>
                    <span className="absolute -right-1 -bottom-1 size-5 rounded-full border-4 border-white bg-[#28c840]" />
                  </div>
                  <div>
                    <p className="font-heading text-ink text-xl font-bold">
                      {content.founder.name}
                    </p>
                    <p className="text-ink-soft text-sm">
                      {content.founder.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-ink relative mt-6 flex gap-3 text-lg leading-snug font-medium">
                  <Quote className="text-ocean-300 size-6 shrink-0 -scale-x-100" />
                  {content.founder.quote}
                </blockquote>
              </div>
            </Reveal>
            <Reveal
              delay={0.1}
              className="text-ink-soft flex flex-col gap-4 text-base leading-relaxed"
            >
              {content.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          <ol ref={timelineRef} className="relative flex flex-col gap-8 pl-10">
            <span
              aria-hidden
              className="bg-ocean-100 absolute top-2 bottom-2 left-[11px] w-0.5 rounded-full"
            />
            <motion.span
              aria-hidden
              style={{ scaleY: lineScale }}
              className="from-ocean-600 to-aqua absolute top-2 bottom-2 left-[11px] w-0.5 origin-top rounded-full bg-gradient-to-b"
            />
            {content.timeline.map((item, i) => (
              <li key={item.year} className="relative">
                <Reveal delay={i * 0.08}>
                  <span className="border-ocean-500 absolute top-1.5 -left-10 grid size-6 place-items-center rounded-full border-2 bg-white">
                    <span className="bg-ocean-500 size-2 rounded-full" />
                  </span>
                  <span className="text-gradient font-heading text-3xl font-extrabold">
                    {item.year}
                  </span>
                  <h3 className="text-ink mt-1 text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-ink-soft text-sm">{item.desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-3">
          {content.advantages.map((a, i) => {
            const Icon = ADV_ICONS[i % ADV_ICONS.length];
            return (
              <StaggerItem key={a.title}>
                <div className="group border-border hover:border-ocean-200 hover:shadow-ocean flex h-full items-start gap-4 rounded-3xl border bg-white p-6 transition-[border-color,box-shadow] duration-500">
                  <span className="bg-ocean-50 text-ocean-600 group-hover:bg-ocean-600 grid size-12 shrink-0 place-items-center rounded-2xl transition-colors duration-300 group-hover:text-white">
                    <Icon className="size-5 transition-transform duration-500 group-hover:rotate-12" />
                  </span>
                  <div>
                    <h3 className="text-ink font-semibold">{a.title}</h3>
                    <p className="text-ink-soft mt-1 text-sm">{a.desc}</p>
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
