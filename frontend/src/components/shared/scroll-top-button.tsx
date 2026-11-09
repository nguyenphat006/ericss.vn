"use client";

import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

const R = 20;

/** Nút lên đầu trang, viền vòng tròn chạy theo phần trăm đã cuộn. Hiện sau khi cuộn qua màn đầu. */
export function ScrollTopButton({ label }: { label: string }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          key="top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={label}
          className="group glass text-ocean-700 shadow-ocean fixed right-6 bottom-24 z-40 grid size-12 place-items-center rounded-full"
        >
          <svg
            viewBox="0 0 48 48"
            className="absolute inset-0 size-full -rotate-90"
            aria-hidden
          >
            <circle
              cx="24"
              cy="24"
              r={R}
              fill="none"
              strokeWidth="2.5"
              className="stroke-ocean-100"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={R}
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="stroke-ocean-600"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
