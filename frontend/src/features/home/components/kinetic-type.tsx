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
              "font-heading text-[13vw] leading-[0.95] font-extrabold tracking-tight uppercase sm:text-[8.5vw] lg:text-[7rem]",
              outline
                ? "text-stroke-ocean"
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
 * Hai hàng chữ khổng lồ trượt ngược chiều theo nhịp cuộn (không tự chạy):
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
  const tilt = useTransform(p, [0, 0.5, 1], [-2, 0, 2]);

  return (
    <div
      ref={ref}
      className="relative -mt-8 overflow-hidden py-4 sm:-mt-12 sm:py-8"
      aria-label={content.solid.join(", ")}
      role="img"
    >
      <motion.div style={{ rotate: tilt }} className="flex flex-col gap-2">
        <Row words={content.solid} x={x1} />
        <Row words={content.outline} x={x2} outline />
      </motion.div>
    </div>
  );
}
