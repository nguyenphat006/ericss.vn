import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import type { HomeContent } from "@/data/home";

// Mỗi dự án một "ảnh bìa" dựng bằng gradient + lưới (chưa có ảnh chụp màn hình thật)
const COVERS = [
  "from-ocean-600 via-ocean-500 to-aqua",
  "from-aqua via-ocean-400 to-ocean-700",
  "from-ocean-800 via-ocean-600 to-ocean-300",
];

export function ProjectsSection({
  content,
}: {
  content: HomeContent["projects"];
}) {
  const t = useTranslations("Common");
  return (
    <Section id="projects" className="pt-0 sm:pt-0">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {content.items.map((p, i) => (
            <StaggerItem key={p.name}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group border-border hover:shadow-ocean block overflow-hidden rounded-3xl border bg-white transition-shadow duration-500"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${COVERS[i % COVERS.length]}`}
                >
                  <div className="bg-grid absolute inset-0 opacity-25 invert" />
                  {/* Khung trình duyệt giả lập, nghiêng nhẹ và trượt lên khi rê chuột */}
                  <div className="absolute inset-x-8 top-10 bottom-0 translate-y-4 rounded-t-xl bg-white/90 p-3 shadow-2xl transition-transform duration-700 group-hover:translate-y-0 group-hover:-rotate-1">
                    <div className="mb-3 flex gap-1.5">
                      <span className="bg-ocean-200 size-2 rounded-full" />
                      <span className="bg-ocean-200 size-2 rounded-full" />
                      <span className="bg-ocean-200 size-2 rounded-full" />
                    </div>
                    <div className="font-heading text-ink text-2xl font-extrabold">
                      {p.name}
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="bg-ocean-100 h-2 w-3/4 rounded-full" />
                      <div className="bg-ocean-100 h-2 w-1/2 rounded-full" />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="bg-ocean-50 h-10 rounded-lg" />
                        <div className="bg-ocean-50 h-10 rounded-lg" />
                        <div className="bg-ocean-50 h-10 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <span className="text-ocean-600 font-mono text-xs tracking-wider uppercase">
                      {p.tag}
                    </span>
                    <h3 className="font-heading text-ink mt-1 text-xl font-bold">
                      {p.url.replace("https://", "")}
                    </h3>
                    <p className="text-ink-soft mt-2 text-sm">{p.desc}</p>
                  </div>
                  <span
                    className="border-border text-ink group-hover:bg-ocean-600 group-hover:border-ocean-600 grid size-10 shrink-0 place-items-center rounded-full border transition-colors group-hover:text-white"
                    aria-label={t("visit")}
                  >
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
