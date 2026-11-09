"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/data/home";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "me"; text: string };

/*
 * Trợ lý chat nổi (giai đoạn 1, chỉ frontend): trả lời theo câu hỏi gợi ý soạn sẵn trong data/home.ts.
 * Khi có backend sẽ nối Google Generative AI / OpenAI qua route server (không gọi API key từ trình duyệt).
 */
export function ChatWidget({ content }: { content: HomeContent["chat"] }) {
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: content.greeting },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  function ask(text: string) {
    const q = text.trim();
    if (!q || typing) return;
    const match = content.suggestions.find((s) => s.q === q);
    setMessages((m) => [...m, { from: "me", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "bot", text: match?.a ?? content.fallback },
      ]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="border-border shadow-ocean flex h-[30rem] max-h-[calc(100svh-7rem)] w-[min(22rem,calc(100vw-2.5rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border bg-white"
            role="dialog"
            aria-label={content.title}
          >
            <div className="from-ocean-600 to-ocean-500 flex items-center gap-3 bg-gradient-to-r px-5 py-4 text-white">
              <span className="grid size-10 place-items-center rounded-2xl bg-white/15">
                <Bot className="size-5" />
              </span>
              <div className="flex-1">
                <p className="font-semibold">{content.title}</p>
                <p className="text-ocean-100 flex items-center gap-1.5 text-xs">
                  <span className="size-1.5 rounded-full bg-[#28c840]" />
                  {content.status}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-white/15"
                aria-label={t("closeChat")}
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={listRef}
              className="bg-surface-soft flex flex-1 flex-col gap-3 overflow-y-auto p-4"
            >
              {messages.map((m, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.from === "bot"
                      ? "text-ink self-start rounded-bl-md bg-white shadow-sm"
                      : "bg-ocean-600 self-end rounded-br-md text-white",
                  )}
                >
                  {m.text}
                </motion.p>
              ))}
              {typing ? (
                <span className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="bg-ocean-400 size-1.5 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: d * 0.15,
                      }}
                    />
                  ))}
                </span>
              ) : null}
            </div>

            <div className="border-border flex flex-wrap gap-2 border-t px-4 pt-3">
              {content.suggestions.map((s) => (
                <button
                  key={s.q}
                  type="button"
                  onClick={() => ask(s.q)}
                  className="border-ocean-100 text-ocean-700 hover:bg-ocean-50 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  {s.q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 p-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={content.placeholder}
                className="border-input focus:border-ocean-400 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-ocean-600 hover:bg-ocean-700 grid size-10 place-items-center rounded-full text-white transition-colors"
                aria-label={content.send}
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="from-ocean-600 to-aqua shadow-ocean relative grid size-14 place-items-center rounded-full bg-gradient-to-br text-white transition-transform hover:scale-105"
        aria-label={open ? t("closeChat") : t("openChat")}
        aria-expanded={open}
      >
        {!open ? (
          <span className="bg-ocean-500 animate-pulse-ring absolute inset-0 rounded-full" />
        ) : null}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {open ? (
              <X className="size-6" />
            ) : (
              <MessageCircle className="size-6" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
