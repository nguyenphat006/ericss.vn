import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollTopButton } from "@/components/shared/scroll-top-button";
import { getHomeContent } from "@/data/home";
import {
  AboutSection,
  ChatWidget,
  ContactSection,
  FaqSection,
  FeedbackSection,
  HeroSection,
  KineticType,
  PricingSection,
  ProcessSection,
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
  const t = await getTranslations("Common");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection content={c.hero} />
        <TechMarquee />
        <ServicesSection content={c.services} />
        <KineticType content={c.kinetic} />
        <StatsSection content={c.stats} />
        <TechSection content={c.tech} />
        <ProcessSection content={c.process} />
        <ProjectsSection content={c.projects} />
        <AboutSection content={c.about} />
        <FeedbackSection content={c.feedback} />
        <PricingSection content={c.pricing} />
        <FaqSection content={c.faq} />
        <ContactSection content={c.contact} />
      </main>
      <SiteFooter />
      <ScrollTopButton label={t("scrollTop")} />
      <ChatWidget content={c.chat} />
    </>
  );
}
