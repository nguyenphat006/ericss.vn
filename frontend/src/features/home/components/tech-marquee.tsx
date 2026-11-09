const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Three.js",
  "Tailwind CSS",
  "Node.js",
  "Django",
  "PostgreSQL",
  "React Native",
  "Flutter",
  "Gemini",
  "OpenAI",
  "Docker",
  "Vercel",
];

/** Dải chữ công nghệ chạy ngang vô tận (CSS thuần, dừng khi rê chuột). */
export function TechMarquee() {
  const row = [...TECH, ...TECH];
  return (
    <div className="border-border relative border-y bg-white py-6">
      <div className="mask-fade-x group flex overflow-hidden [--marquee-duration:45s] [--marquee-gap:3rem]">
        <ul className="animate-marquee flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <li
              key={`${t}-${i}`}
              className="font-heading text-ink/35 hover:text-ocean-600 flex items-center gap-3 text-2xl font-bold whitespace-nowrap transition-colors"
              aria-hidden={i >= TECH.length}
            >
              <span className="bg-ocean-300 size-1.5 rounded-full" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
