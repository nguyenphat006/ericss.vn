"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { CountUp } from "@/components/shared/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import type { HomeContent } from "@/data/home";
import {
  GrowthAreaChart,
  ProjectsBarChart,
  SatisfactionRadial,
} from "./stats-charts";

function ChartCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-border shadow-ocean/0 hover:shadow-ocean flex flex-col rounded-3xl border bg-white p-6 transition-shadow duration-500 ${className ?? ""}`}
    >
      <h3 className="text-ink mb-4 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function StatsSection({ content }: { content: HomeContent["stats"] }) {
  // Chỉ dựng biểu đồ khi cuộn tới để animation của recharts chạy đúng lúc người xem thấy
  const chartsRef = useRef<HTMLDivElement>(null);
  const show = useInView(chartsRef, { once: true, margin: "-120px" });

  return (
    <Section id="stats" className="bg-surface-soft overflow-hidden">
      <div
        aria-hidden
        className="bg-grid mask-fade-y absolute inset-0 opacity-40"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lede={content.lede}
        />

        <Stagger className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {content.cards.map((c) => (
            <StaggerItem key={c.label}>
              <div className="group border-border hover:border-ocean-200 relative overflow-hidden rounded-3xl border bg-white p-6 transition-colors">
                <div className="from-ocean-50 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CountUp
                  value={c.value}
                  suffix={c.suffix}
                  className="font-heading text-gradient relative block text-4xl font-extrabold tracking-tight sm:text-5xl"
                />
                <p className="text-ink-soft relative mt-2 text-sm">{c.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div
          ref={chartsRef}
          className="grid gap-4 lg:grid-cols-[1fr_1.3fr_0.8fr]"
        >
          <Reveal>
            <ChartCard title={content.projectsTitle} className="h-80">
              <div className="min-h-0 flex-1">
                {show ? (
                  <ProjectsBarChart data={content.projectsByYear} />
                ) : null}
              </div>
            </ChartCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ChartCard title={content.growthTitle} className="h-80">
              <div className="min-h-0 flex-1">
                {show ? <GrowthAreaChart data={content.clientGrowth} /> : null}
              </div>
            </ChartCard>
          </Reveal>
          <Reveal delay={0.2}>
            <ChartCard title={content.satisfactionTitle} className="h-80">
              <div className="relative min-h-0 flex-1">
                {show ? (
                  <SatisfactionRadial value={content.satisfaction} />
                ) : null}
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                  <div>
                    <CountUp
                      value={content.satisfaction}
                      suffix="%"
                      className="font-heading text-ink block text-4xl font-extrabold"
                    />
                    <p className="text-ink-soft text-xs">
                      {content.satisfactionNote}
                    </p>
                  </div>
                </div>
              </div>
            </ChartCard>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
