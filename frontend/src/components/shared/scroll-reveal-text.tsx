"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Word({
  word,
  accent,
  range,
  progress,
}: {
  word: string;
  accent: boolean;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={cn("inline-block", accent && "text-gradient")}
    >
      {word}
    </motion.span>
  );
}

/**
 * Đoạn chữ sáng dần từng từ theo vị trí cuộn. Bọc *từ* trong dấu sao để tô gradient.
 * Chỉ đổi độ đậm theo thao tác cuộn của người xem (không tự chạy) nên giữ cả khi giảm chuyển động.
 * Trình đọc màn hình đọc nguyên câu (bản sr-only), phần hiệu ứng ẩn khỏi cây truy cập.
 */
export function ScrollRevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  // Tách từ, ghi nhớ từ nào nằm trong *...*
  const words: { w: string; accent: boolean }[] = [];
  let accent = false;
  for (const raw of text.split(/\s+/)) {
    const starts = raw.startsWith("*");
    const ends = /\*[.,!?]?$/.test(raw);
    if (starts) accent = true;
    words.push({ w: raw.replace(/\*/g, ""), accent });
    if (ends) accent = false;
  }
  const plain = text.replace(/\*/g, "");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{plain}</span>
      {words.map((x, i) => {
        const start = i / words.length;
        return (
          <span key={i} aria-hidden>
            <Word
              word={x.w}
              accent={x.accent}
              range={[start, start + 1 / words.length]}
              progress={scrollYProgress}
            />{" "}
          </span>
        );
      })}
    </p>
  );
}
