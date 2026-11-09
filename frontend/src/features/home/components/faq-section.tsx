import { Reveal } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { HomeContent } from "@/data/home";

export function FaqSection({ content }: { content: HomeContent["faq"] }) {
  return (
    <Section id="faq">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          align="left"
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <Reveal>
          <Accordion
            type="single"
            collapsible
            defaultValue="q-0"
            className="flex flex-col gap-3"
          >
            {content.items.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`q-${i}`}
                className="border-border data-[state=open]:border-ocean-200 data-[state=open]:shadow-ocean rounded-2xl border bg-white px-6 transition-[border-color,box-shadow] duration-300 last:border-b"
              >
                <AccordionTrigger className="text-ink hover:text-ocean-700 py-5 text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-ink-soft pb-5 text-[15px] leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
