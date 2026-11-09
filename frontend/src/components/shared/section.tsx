import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

/**
 * Tách tiêu đề theo dấu *...*: phần thường màu mực đậm, cụm trong sao màu xanh biển chủ đạo.
 * Không có dấu sao thì cả câu màu đậm.
 */
function renderTitle(title: string) {
  if (!title.includes("*")) return title;
  return title.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className="text-ocean-600 whitespace-nowrap">
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={i} className="text-ink">
        {part}
      </span>
    ),
  );
}

/**
 * Tiêu đề section chung:
 * - dòng nhãn: số thứ tự + vạch + nhãn in hoa giãn chữ;
 * - tiêu đề IN HOA rất đậm, dạng nén, hai tông: phần thường màu mực, cụm nhấn bọc *...* màu xanh biển;
 * - mô tả có vạch dọc bên trái. Kiểu "split" đặt mô tả sang cột phải trên màn hình lớn.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "split",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "split" | "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-6 sm:mb-16",
        align === "split" &&
          "lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16",
        center && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-5", center && "items-center")}>
        <p className="flex items-center gap-3">
          {index ? (
            <span className="text-ocean-600 font-mono text-sm font-semibold">
              {index}
            </span>
          ) : null}
          <span className="bg-ocean-300 h-px w-10" />
          <span className="text-ocean-700 text-xs font-bold tracking-[0.22em] uppercase">
            {eyebrow}
          </span>
        </p>
        <h2 className="font-heading text-ink max-w-4xl text-[2.1rem] leading-[1.12] font-extrabold tracking-[-0.015em] text-balance uppercase [font-stretch:82%] sm:text-[3.4rem] lg:text-[4rem]">
          {renderTitle(title)}
        </h2>
      </div>
      {lede ? (
        <p
          className={cn(
            "text-ink-soft max-w-md text-base leading-relaxed text-pretty sm:text-lg",
            center ? "max-w-2xl" : "border-ocean-200 border-l-2 pl-4",
          )}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
