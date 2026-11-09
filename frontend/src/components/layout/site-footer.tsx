import { Mail, Phone, Globe, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/section";
import { navItems, siteConfig, telUrl, zaloUrl } from "@/config/site";
import { FooterWordmark } from "./footer-wordmark";
import { Logo } from "./logo";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const year = new Date().getFullYear();

  const contacts = [
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: siteConfig.hotline, href: telUrl },
    { icon: MessageCircle, label: `Zalo ${siteConfig.zalo}`, href: zaloUrl },
    {
      icon: Globe,
      label: siteConfig.website,
      href: `https://${siteConfig.website}`,
    },
  ];

  return (
    <footer className="border-border bg-surface-soft relative overflow-hidden border-t">
      <div
        aria-hidden
        className="bg-dots mask-fade-y absolute inset-0 opacity-60"
      />
      <Container className="relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-ink-soft max-w-xs text-sm">{t("tagline")}</p>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="text-ink-soft hover:text-ocean-700 inline-flex w-fit items-center gap-2 text-sm"
          >
            <GithubIcon className="size-4" />
            github.com/nguyenphat006
          </a>
        </div>
        <div>
          <h3 className="text-ink mb-4 font-mono text-xs tracking-wider uppercase">
            {t("explore")}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-ink-soft hover:text-ocean-700 text-sm"
                >
                  {nav(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-ink mb-4 font-mono text-xs tracking-wider uppercase">
            {t("contact")}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-ink-soft hover:text-ocean-700 inline-flex items-center gap-2 text-sm"
                >
                  <Icon className="text-ocean-500 size-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="relative">
        <FooterWordmark />
      </Container>
      <Container className="relative">
        <div className="border-border text-ink-soft flex flex-col gap-2 border-t py-6 text-xs sm:flex-row sm:justify-between">
          <span>
            © {year} Ericss. {t("rights")}
          </span>
          <span className="font-mono">Made with Next.js · Three.js</span>
        </div>
      </Container>
    </footer>
  );
}
