import { setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getHomeContent } from "@/data/home";
import {
  AboutSection,
  ChatWidget,
  ContactSection,
  FaqSection,
  FeedbackSection,
  HeroSection,
  PricingSection,
  ProjectsSection,
  ServicesSection,
  StatsSection,
  TechMarquee,
  TechSection,
} from "@/features/home";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getHomeContent(locale as Locale);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection content={c.hero} />
        <TechMarquee />
        <ServicesSection content={c.services} />
        <StatsSection content={c.stats} />
        <TechSection content={c.tech} />
        <ProjectsSection content={c.projects} />
        <AboutSection content={c.about} />
        <FeedbackSection content={c.feedback} />
        <PricingSection content={c.pricing} />
        <FaqSection content={c.faq} />
        <ContactSection content={c.contact} />
      </main>
      <SiteFooter />
      <ChatWidget content={c.chat} />
    </>
  );
}
