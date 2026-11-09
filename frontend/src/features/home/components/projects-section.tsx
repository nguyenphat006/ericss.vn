"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import type { HomeContent } from "@/data/home";
import { cn } from "@/lib/utils";

type Project = HomeContent["projects"]["items"][number];

// Mỗi dự án một "ảnh bìa" dựng bằng gradient + lưới (chưa có ảnh chụp màn hình thật)
const COVERS = [
  "from-ocean-600 via-ocean-500 to-aqua",
  "from-aqua via-ocean-400 to-ocean-700",
  "from-ocean-800 via-ocean-600 to-ocean-300",
];

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectCard({
  p,
  i,
  total,
  progress,
}: {
  p: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const t = useTranslations("Common");
  // Thẻ phía dưới trượt lên phủ dần thẻ trước, thẻ trước lùi nhỏ lại như một chồng bài
  const scale = useTransform(
    progress,
    [i / total, 1],
    [1, 1 - (total - 1 - i) * 0.05],
  );
  return (
    <div className="sticky" style={{ top: `calc(6.5rem + ${i * 2.25}rem)` }}>
      <motion.a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        style={{ scale }}
        className="group border-border shadow-ocean grid origin-top overflow-hidden rounded-[2rem] border bg-white md:h-[26rem] md:grid-cols-[1.25fr_1fr]"
      >
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-gradient-to-br md:aspect-auto",
            COVERS[i % COVERS.length],
          )}
        >
          <div className="bg-grid absolute inset-0 opacity-25 invert" />
          {/* Khung trình duyệt giả lập, trượt lên khi rê chuột */}
          <div className="absolute inset-x-6 top-8 bottom-0 translate-y-6 rounded-t-2xl bg-white/90 p-4 shadow-2xl transition-transform duration-700 group-hover:translate-y-0 sm:inset-x-10 sm:top-12">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="bg-ocean-200 size-2 rounded-full" />
              <span className="bg-ocean-200 size-2 rounded-full" />
              <span className="bg-ocean-200 size-2 rounded-full" />
              <span className="bg-ocean-50 text-ink-soft ml-2 rounded-full px-3 py-0.5 font-mono text-[10px]">
                {p.url.replace("https://", "")}
              </span>
            </div>
            <div className="font-heading text-ink text-3xl font-extrabold sm:text-4xl">
              {p.name}
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-ocean-100 h-2 w-3/4 rounded-full" />
              <div className="bg-ocean-100 h-2 w-1/2 rounded-full" />
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="bg-ocean-50 h-14 rounded-lg" />
                <div className="bg-ocean-50 h-14 rounded-lg" />
                <div className="bg-ocean-50 h-14 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <span className="text-ocean-200 font-heading text-6xl font-extrabold">
              {pad(i + 1)}
            </span>
            <span className="text-ocean-600 mt-4 block font-mono text-xs tracking-wider uppercase">
              {p.tag}
            </span>
            <h3 className="font-heading text-ink mt-1 text-2xl font-bold">
              {p.name}
            </h3>
            <p className="text-ink-soft mt-3 text-sm leading-relaxed">
              {p.desc}
            </p>
          </div>
          <span className="text-ink group-hover:text-ocean-700 inline-flex items-center gap-2 text-sm font-semibold">
            {t("visit")}
            <span className="border-border group-hover:bg-ocean-600 group-hover:border-ocean-600 grid size-10 place-items-center rounded-full border transition-colors group-hover:text-white">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </span>
        </div>
      </motion.a>
    </div>
  );
}

/**
 * Dự án dạng chồng thẻ: cuộn tới đâu thẻ sau phủ lên thẻ trước tới đó,
 * cột trái giữ tiêu đề, bộ đếm và danh sách dự án đang xem.
 */
export function ProjectsSection({
  content,
}: {
  content: HomeContent["projects"];
}) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 30%", "end 70%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const total = content.items.length;
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total)))),
  );

  return (
    <Section id="projects">
      <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading
            index="05"
            eyebrow={content.eyebrow}
            title={content.title}
            align="left"
            className="mb-0 sm:mb-0"
          />

          <div className="mt-10 hidden lg:block">
            <p className="font-heading text-ink flex items-baseline gap-2 font-extrabold">
              <span className="text-gradient text-7xl tabular-nums">
                {pad(active + 1)}
              </span>
              <span className="text-ocean-200 text-2xl">/ {pad(total)}</span>
            </p>
            <div className="bg-ocean-100 mt-4 h-1 w-full overflow-hidden rounded-full">
              <motion.div
                style={{ scaleX: fill }}
                className="from-ocean-600 to-aqua h-full origin-left rounded-full bg-gradient-to-r"
              />
            </div>
            <ol className="mt-6 flex flex-col gap-1">
              {content.items.map((p, i) => (
                <li
                  key={p.name}
                  className={cn(
                    "flex items-center gap-3 py-1.5 text-sm transition-colors duration-300",
                    i === active
                      ? "text-ink font-semibold"
                      : "text-ink-soft/60",
                  )}
                >
                  <span
                    className={cn(
                      "h-px transition-all duration-500",
                      i === active ? "bg-ocean-500 w-8" : "bg-ocean-200 w-4",
                    )}
                  />
                  {p.name}
                  <span className="text-ocean-400 font-mono text-xs">
                    {p.tag}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div ref={stackRef} className="flex flex-col gap-[14vh] pb-[6vh]">
          {content.items.map((p, i) => (
            <ProjectCard
              key={p.name}
              p={p}
              i={i}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
