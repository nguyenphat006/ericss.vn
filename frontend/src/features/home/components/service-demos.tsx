"use client";

import { Bell, Check, Search, Sparkles } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { HomeContent, ServiceKey } from "@/data/home";
import { cn } from "@/lib/utils";

type Demo = HomeContent["services"]["demo"];

/**
 * Bước hiện tại của một vòng hoạt ảnh lặp. Chỉ chạy khi thẻ đang trong khung nhìn,
 * khi giảm chuyển động thì đứng ở bước cuối (trạng thái đầy đủ).
 */
function useLoop(steps: number, ms: number, active: boolean) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active || reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), ms);
    return () => clearInterval(id);
  }, [active, reduce, steps, ms]);
  return reduce ? steps - 1 : step;
}

/** Gõ dần một chuỗi theo bước: bước 0 trống, đến `full` thì đủ chữ. */
function typed(text: string, step: number, full: number) {
  const n = Math.round((Math.min(step, full) / full) * text.length);
  return text.slice(0, n);
}

/* Website: thanh địa chỉ tự gõ rồi trang dựng dần từng khối */
function WebsiteDemo({ demo, active }: { demo: Demo; active: boolean }) {
  const step = useLoop(16, 260, active);
  const built = step >= 9;
  return (
    <div className="border-ocean-100 flex h-full flex-col rounded-xl border bg-white shadow-sm">
      <div className="border-ocean-50 flex items-center gap-2 border-b px-3 py-2">
        <span className="flex gap-1">
          <span className="bg-ocean-200 size-1.5 rounded-full" />
          <span className="bg-ocean-200 size-1.5 rounded-full" />
          <span className="bg-ocean-200 size-1.5 rounded-full" />
        </span>
        <span className="bg-ocean-50 text-ink-soft flex h-5 flex-1 items-center gap-1.5 rounded-full px-2 font-mono text-[10px]">
          <Search className="text-ocean-400 size-2.5" />
          {typed(demo.url, step, 7)}
          {step < 8 ? (
            <span className="bg-ocean-500 h-2.5 w-px animate-pulse" />
          ) : null}
        </span>
      </div>
      <div className="relative flex-1 space-y-1.5 p-3">
        {[
          "h-3 w-2/3 bg-gradient-to-r from-ocean-500 to-aqua",
          "h-1.5 w-1/2 bg-ocean-100",
        ].map((c, i) => (
          <motion.div
            key={c}
            className={cn("rounded-full", c)}
            animate={{ opacity: built ? 1 : 0, x: built ? 0 : -8 }}
            transition={{ delay: built ? i * 0.12 : 0, duration: 0.35 }}
          />
        ))}
        <div className="grid grid-cols-3 gap-1.5 pt-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="bg-ocean-50 h-8 rounded-md"
              animate={{ opacity: built ? 1 : 0, y: built ? 0 : 8 }}
              transition={{ delay: built ? 0.25 + i * 0.1 : 0, duration: 0.35 }}
            />
          ))}
        </div>
        <motion.span
          className="absolute right-2 bottom-2 rounded-full bg-[#e8fbef] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#14883a]"
          animate={{ opacity: step >= 12 ? 1 : 0, scale: step >= 12 ? 1 : 0.6 }}
        >
          ⚡ 0.8s
        </motion.span>
      </div>
    </div>
  );
}

/* Mobile: điện thoại cuộn danh sách, thông báo đẩy trượt xuống */
function MobileDemo({ demo, active }: { demo: Demo; active: boolean }) {
  const step = useLoop(6, 700, active);
  return (
    <div className="border-ink/85 relative mx-auto h-full w-24 overflow-hidden rounded-[18px] border-[3px] bg-white">
      <span className="bg-ink/85 absolute top-1 left-1/2 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full" />
      <motion.div
        className="space-y-1.5 px-2 pt-5"
        animate={{ y: -(step % 3) * 14 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className={cn(
                "size-4 shrink-0 rounded-md",
                i % 2 ? "bg-aqua/40" : "bg-ocean-200",
              )}
            />
            <span className="bg-ocean-50 h-1.5 flex-1 rounded-full" />
          </div>
        ))}
      </motion.div>
      <AnimatePresence>
        {step >= 2 && step <= 4 ? (
          <motion.div
            key="push"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="text-ink ring-ocean-100 absolute inset-x-1 top-4 flex items-center gap-1 rounded-lg bg-white/95 p-1 text-[7px] leading-tight font-semibold shadow-md ring-1"
          >
            <Bell className="text-ocean-600 size-2.5 shrink-0" />
            {demo.notification}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* Chatbot: khách hỏi, bot "đang gõ" rồi trả lời */
function ChatbotDemo({ demo, active }: { demo: Demo; active: boolean }) {
  const step = useLoop(7, 800, active);
  return (
    <div className="bg-ocean-50/70 flex h-full flex-col justify-end gap-1.5 rounded-xl p-3 text-[10px] leading-snug">
      <motion.p
        className="bg-ocean-600 max-w-[80%] self-end rounded-xl rounded-br-sm px-2.5 py-1.5 text-white"
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 6 }}
      >
        {demo.chatQ}
      </motion.p>
      {step === 2 || step === 3 ? (
        <span className="flex w-fit gap-0.5 rounded-xl rounded-bl-sm bg-white px-2.5 py-2 shadow-sm">
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="bg-ocean-400 size-1 rounded-full"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 0.7, delay: d * 0.12 }}
            />
          ))}
        </span>
      ) : (
        <motion.p
          className="text-ink flex max-w-[85%] gap-1 self-start rounded-xl rounded-bl-sm bg-white px-2.5 py-1.5 shadow-sm"
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 6 }}
        >
          <Sparkles className="text-aqua mt-px size-2.5 shrink-0" />
          {demo.chatA}
        </motion.p>
      )}
    </div>
  );
}

/* Đồ án: dòng code tự gõ, chạy test và báo đạt */
const CODE = [
  { w: "w-3/5", c: "bg-ocean-400", indent: 0 },
  { w: "w-4/5", c: "bg-aqua/70", indent: 1 },
  { w: "w-1/2", c: "bg-ocean-200", indent: 1 },
  { w: "w-2/3", c: "bg-ocean-300", indent: 2 },
  { w: "w-1/3", c: "bg-ocean-400", indent: 0 },
];
function AcademicDemo({ demo, active }: { demo: Demo; active: boolean }) {
  const step = useLoop(9, 450, active);
  return (
    <div className="bg-ocean-900 relative flex h-full flex-col gap-1.5 rounded-xl p-3">
      {CODE.map((l, i) => (
        <div
          key={i}
          className="flex items-center gap-2"
          style={{ paddingLeft: l.indent * 10 }}
        >
          <span className="text-ocean-300/60 w-2 font-mono text-[8px]">
            {i + 1}
          </span>
          <motion.span
            className={cn("h-1.5 origin-left rounded-full", l.w, l.c)}
            animate={{ scaleX: step > i ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          />
        </div>
      ))}
      <motion.span
        className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-[#28c840]/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-[#5ee08a]"
        animate={{ opacity: step >= 7 ? 1 : 0, y: step >= 7 ? 0 : 6 }}
      >
        <Check className="size-2.5" />
        {demo.tests}
      </motion.span>
    </div>
  );
}

const DEMOS: Record<
  ServiceKey,
  (p: { demo: Demo; active: boolean }) => ReactNode
> = {
  website: WebsiteDemo,
  mobile: MobileDemo,
  chatbot: ChatbotDemo,
  academic: AcademicDemo,
};

/** Khung "màn hình" thu nhỏ ở đầu thẻ dịch vụ, tự chạy khi cuộn tới. */
export function ServiceDemo({ kind, demo }: { kind: ServiceKey; demo: Demo }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-60px" });
  const Comp = DEMOS[kind];
  return (
    <div
      ref={ref}
      aria-hidden
      className="border-ocean-100 from-ocean-50 to-ocean-50 relative h-36 overflow-hidden rounded-2xl border bg-gradient-to-br via-white p-3"
    >
      <div className="bg-dots absolute inset-0 opacity-60" />
      <div className="relative h-full">
        <Comp demo={demo} active={active} />
      </div>
    </div>
  );
}
