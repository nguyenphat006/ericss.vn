"use client";

import { Menu, Languages, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const otherLocale = locale === "vi" ? "en" : "vi";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,box-shadow,border-color] duration-500",
          scrolled
            ? "glass border-border border-b shadow-[0_8px_30px_-18px_rgb(11_91_211/0.35)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-ink-soft hover:text-ocean-700 after:bg-ocean-500 relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              locale={otherLocale}
              className="text-ink-soft hover:text-ocean-700 hover:bg-ocean-50 hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors sm:flex"
              aria-label={t("language")}
            >
              <Languages className="size-4" />
              {t("languageShort")}
            </Link>
            <a
              href="#contact"
              className="group bg-ink hover:bg-ocean-600 hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 sm:inline-flex"
            >
              {t("cta")}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="text-ink hover:bg-ocean-50 grid size-10 place-items-center rounded-full lg:hidden"
                aria-label={t("menu")}
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                  {[
                    ...navItems,
                    { key: "contact", href: "#contact" } as const,
                  ].map((item, i) => (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                      className="font-heading text-ink hover:bg-ocean-50 hover:text-ocean-700 rounded-xl px-3 py-3 text-2xl font-semibold"
                    >
                      {t(item.key)}
                    </motion.a>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3 p-4">
                  <Link
                    href="/"
                    locale={otherLocale}
                    className="border-border text-ink inline-flex items-center justify-center gap-2 rounded-full border py-3 text-sm font-medium"
                  >
                    <Languages className="size-4" />
                    {t("language")}
                  </Link>
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="bg-ocean-600 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
                  >
                    {t("cta")}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Thanh tiến trình cuộn trang */}
      <motion.div
        aria-hidden
        className="from-ocean-500 to-aqua absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
