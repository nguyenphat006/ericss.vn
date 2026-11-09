import { TechLogo } from "@/components/shared/tech-logo";

const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Three.js",
  "Tailwind CSS",
  "Node.js",
  "Django",
  "PostgreSQL",
  "Flutter",
  "Firebase",
  "Gemini",
  "LangChain",
  "Docker",
  "Vercel",
  "Figma",
];

/** Dải logo công nghệ (màu thương hiệu thật) chạy ngang vô tận, CSS thuần, dừng khi rê chuột. */
export function TechMarquee() {
  const row = [...TECH, ...TECH];
  return (
    <div className="border-border relative border-y bg-white py-6">
      <div className="mask-fade-x group flex overflow-hidden [--marquee-duration:50s] [--marquee-gap:3rem]">
        <ul className="animate-marquee flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <li
              key={`${t}-${i}`}
              aria-hidden={i >= TECH.length}
              className="text-ink-soft hover:text-ink flex items-center gap-3 whitespace-nowrap transition-colors duration-300"
            >
              <TechLogo name={t} className="size-7" />
              <span className="font-heading text-xl font-bold">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
