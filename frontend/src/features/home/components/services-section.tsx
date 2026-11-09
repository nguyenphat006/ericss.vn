import {
  Bot,
  Check,
  GraduationCap,
  Globe,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import type { HomeContent, ServiceKey } from "@/data/home";

const ICONS: Record<ServiceKey, LucideIcon> = {
  website: Globe,
  mobile: Smartphone,
  chatbot: Bot,
  academic: GraduationCap,
};

export function ServicesSection({
  content,
}: {
  content: HomeContent["services"];
}) {
  return (
    <Section id="services" className="overflow-hidden">
      <div
        aria-hidden
        className="bg-dots mask-fade-y absolute inset-0 opacity-40"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lede={content.lede}
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((s, i) => {
            const Icon = ICONS[s.key];
            return (
              <StaggerItem key={s.key} className="h-full">
                <SpotlightCard className="h-full p-7">
                  <div className="flex items-start justify-between">
                    <span className="from-ocean-500 to-aqua shadow-ocean relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-6 transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="text-ocean-200 group-hover:text-ocean-400 font-mono text-sm transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-ink mt-6 text-xl font-bold">
                    {s.title}
                  </h3>
                  <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                  <ul className="mt-6 flex flex-col gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="text-ink flex items-center gap-2 text-sm"
                      >
                        <Check className="text-ocean-500 size-4 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="from-ocean-500 to-aqua absolute inset-x-7 -bottom-7 h-1 origin-left scale-x-0 rounded-full bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100" />
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
