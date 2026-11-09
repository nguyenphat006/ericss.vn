import { ArrowRight, Globe, Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { siteConfig, telUrl, zaloUrl } from "@/config/site";
import type { HomeContent } from "@/data/home";

export function ContactSection({
  content,
}: {
  content: HomeContent["contact"];
}) {
  const items = [
    {
      icon: Mail,
      label: content.labels.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      label: content.labels.hotline,
      value: siteConfig.hotline,
      href: telUrl,
    },
    {
      icon: MessageCircle,
      label: content.labels.zalo,
      value: siteConfig.zalo,
      href: zaloUrl,
    },
    {
      icon: Globe,
      label: content.labels.website,
      value: siteConfig.website,
      href: `https://${siteConfig.website}`,
    },
  ];

  return (
    <Section id="contact" className="pt-0 sm:pt-0">
      <Container>
        <Reveal>
          <div className="from-ocean-700 via-ocean-600 to-ocean-500 shadow-ocean relative grid overflow-hidden rounded-[2rem] bg-gradient-to-br text-white lg:grid-cols-2">
            <div
              aria-hidden
              className="bg-grid absolute inset-0 opacity-15 invert"
            />
            <div
              aria-hidden
              className="bg-aqua/40 absolute -top-24 -left-24 size-80 rounded-full blur-3xl"
            />

            <div className="relative flex flex-col gap-6 p-8 sm:p-12">
              <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-xs tracking-wider uppercase">
                {content.eyebrow}
              </span>
              <h2 className="font-heading text-3xl leading-tight font-bold text-balance sm:text-5xl">
                {content.title}
              </h2>
              <p className="text-ocean-100 max-w-md">{content.lede}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 transition-colors hover:bg-white/20"
                    >
                      <span className="text-ocean-700 grid size-10 shrink-0 place-items-center rounded-xl bg-white">
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="text-ocean-100 block text-xs">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-semibold">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="group text-ocean-700 hover:bg-ocean-50 inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold transition-colors"
              >
                {content.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Bản đồ: tài liệu chưa có địa chỉ văn phòng, đang dùng vị trí tạm (data/home.ts) */}
            <div className="relative min-h-80 p-3 lg:p-4">
              <iframe
                title="Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(content.mapQuery)}&z=13&output=embed`}
                className="h-full min-h-80 w-full rounded-[1.5rem] border-0 bg-white/10"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
