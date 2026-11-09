"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import type { HomeContent } from "@/data/home";
import { cn } from "@/lib/utils";

function Row({
  words,
  x,
  outline,
}: {
  words: string[];
  x: MotionValue<string>;
  outline?: boolean;
}) {
  // Lặp 3 lần để hàng luôn phủ kín bề ngang khi trượt
  const list = [...words, ...words, ...words];
  return (
    <motion.ul
      style={{ x }}
      className="flex w-max items-center gap-6 whitespace-nowrap sm:gap-10"
    >
      {list.map((w, i) => (
        <li
          key={`${w}-${i}`}
          aria-hidden={i >= words.length}
          className="flex items-center gap-6 sm:gap-10"
        >
          <span
            className={cn(
              // leading rộng + py để dấu tiếng Việt chồng tầng (Ế, Ầ, Ỗ) không bị cắt hay đè hàng trên
              "font-heading py-[0.06em] text-[12vw] leading-[1.2] font-extrabold tracking-tight uppercase sm:text-[8vw] lg:text-[6.5rem]",
              outline
                ? "text-ocean-200/80 hover:text-ocean-400 transition-colors duration-500"
                : i % 2
                  ? "text-gradient"
                  : "text-ink",
            )}
          >
            {w}
          </span>
          <span className="text-aqua text-[6vw] sm:text-[4vw] lg:text-5xl">
            ✦
          </span>
        </li>
      ))}
    </motion.ul>
  );
}

/**
 * Hai hàng chữ khổng lồ (đậm + nhạt) trượt ngược chiều theo nhịp cuộn (không tự chạy):
 * cuộn nhanh thì chữ lướt nhanh, dừng cuộn thì chữ dừng. Do người xem điều khiển nên giữ cả khi giảm chuyển động.
 */
export function KineticType({ content }: { content: HomeContent["kinetic"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const x1 = useTransform(p, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(p, [0, 1], ["-35%", "-5%"]);

  return (
    <div
      ref={ref}
      className="relative -mt-8 overflow-x-clip py-2 sm:-mt-12 sm:py-6"
      aria-label={content.solid.join(", ")}
      role="img"
    >
      <div className="flex flex-col">
        <Row words={content.solid} x={x1} />
        <Row words={content.outline} x={x2} outline />
      </div>
    </div>
  );
}
