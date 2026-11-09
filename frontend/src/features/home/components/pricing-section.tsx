import { Check, Sparkles } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import type { HomeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function PricingSection({
  content,
}: {
  content: HomeContent["pricing"];
}) {
  return (
    <Section id="pricing" className="bg-surface-soft overflow-hidden">
      <div
        aria-hidden
        className="bg-dots mask-fade-y absolute inset-0 opacity-50"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lede={content.lede}
        />
        <Stagger className="grid items-stretch gap-6 lg:grid-cols-3">
          {content.plans.map((plan) => {
            const hot = plan.highlighted;
            return (
              <StaggerItem key={plan.name} className="h-full">
                <div
                  className={cn(
                    "group relative flex h-full flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2",
                    hot
                      ? "from-ocean-700 via-ocean-600 to-ocean-500 shadow-ocean bg-gradient-to-br text-white lg:scale-105"
                      : "border-border border bg-white",
                  )}
                >
                  {hot ? (
                    <>
                      <div
                        aria-hidden
                        className="bg-grid absolute inset-0 rounded-3xl opacity-15 invert"
                      />
                      <span className="bg-aqua text-ink absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
                        <Sparkles className="size-3.5" />
                        {content.popular}
                      </span>
                    </>
                  ) : null}
                  <div className="relative flex flex-1 flex-col">
                    <h3
                      className={cn(
                        "font-heading text-xl font-bold",
                        hot ? "text-white" : "text-ink",
                      )}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        hot ? "text-ocean-100" : "text-ink-soft",
                      )}
                    >
                      {plan.desc}
                    </p>
                    <p className="mt-6 flex items-baseline gap-1.5">
                      <span
                        className={cn(
                          "font-heading text-4xl font-extrabold tracking-tight",
                          hot ? "text-white" : "text-ink",
                        )}
                      >
                        {plan.price}
                      </span>
                      {plan.unit ? (
                        <span
                          className={cn(
                            "text-sm",
                            hot ? "text-ocean-100" : "text-ink-soft",
                          )}
                        >
                          {plan.unit}
                        </span>
                      ) : null}
                    </p>
                    <ul className="mt-8 flex flex-1 flex-col gap-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <span
                            className={cn(
                              "grid size-5 shrink-0 place-items-center rounded-full",
                              hot
                                ? "bg-white/20 text-white"
                                : "bg-ocean-50 text-ocean-600",
                            )}
                          >
                            <Check className="size-3" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className={cn(
                        "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                        hot
                          ? "text-ocean-700 hover:bg-ocean-50 bg-white"
                          : "border-ocean-200 text-ocean-700 hover:bg-ocean-600 hover:border-ocean-600 border hover:text-white",
                      )}
                    >
                      {content.cta}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <p className="text-ink-soft mt-10 text-center text-sm">
          {content.note}
        </p>
      </Container>
    </Section>
  );
}
