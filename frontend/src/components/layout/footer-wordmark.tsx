"use client";

import { motion, useReducedMotion } from "motion/react";

const WORD = "ERICSS";

/** Chữ thương hiệu khổng lồ ở chân trang: từng chữ cái trồi lên khi cuộn tới, rê chuột thì nảy nhẹ. */
export function FooterWordmark() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-auto relative -mb-[0.14em] flex justify-center overflow-hidden select-none"
    >
      {WORD.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={reduce ? false : { y: "70%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          whileHover={reduce ? undefined : { y: "-6%" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.8,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-heading from-ocean-600 via-ocean-400 to-aqua/30 bg-gradient-to-b bg-clip-text text-[27vw] leading-[0.9] font-extrabold tracking-[-0.06em] text-transparent xl:text-[23rem]"
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}
