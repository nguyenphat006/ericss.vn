import {
  BellRing,
  BrainCircuit,
  Cloud,
  CreditCard,
  Database,
  FileSearch,
  Network,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import {
  siDocker,
  siDjango,
  siExpo,
  siFigma,
  siFirebase,
  siFlutter,
  siFramer,
  siGithubactions,
  siGooglegemini,
  siGraphql,
  siLangchain,
  siMedusa,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siReact,
  siRedis,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

/*
 * Logo công nghệ thật (simple-icons, CC0). Thương hiệu không có trong simple-icons
 * (OpenAI, AWS đã rút khỏi bộ) hoặc khái niệm chung (RAG, CI/CD...) dùng icon lucide.
 */
const BRANDS: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  "React Native": siReact,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Three.js": siThreedotjs,
  "Framer Motion": siFramer,
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  Django: siDjango,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  "REST / GraphQL": siGraphql,
  Flutter: siFlutter,
  Expo: siExpo,
  Firebase: siFirebase,
  "Google Gemini": siGooglegemini,
  Gemini: siGooglegemini,
  LangChain: siLangchain,
  Vercel: siVercel,
  Docker: siDocker,
  Nginx: siNginx,
  "CI/CD": siGithubactions,
  Medusa: siMedusa,
  Figma: siFigma,
};

const FALLBACK: Record<string, LucideIcon> = {
  OpenAI: BrainCircuit,
  RAG: FileSearch,
  "Vector DB": Database,
  AWS: Cloud,
  "Push Notification": BellRing,
  "Thanh toán online": CreditCard,
  "Online payments": CreditCard,
  "Quản lý kho": Warehouse,
  Inventory: Warehouse,
  "Đa kênh": Network,
  Omnichannel: Network,
};

export function hasBrandLogo(name: string) {
  return name in BRANDS;
}

/** Logo màu thương hiệu (hoặc `mono` để dùng currentColor, ví dụ dải logo xám). */
export function TechLogo({
  name,
  className,
  mono,
}: {
  name: string;
  className?: string;
  mono?: boolean;
}) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("size-5 shrink-0", className)}
        fill={mono ? "currentColor" : `#${brand.hex}`}
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const Icon = FALLBACK[name] ?? Network;
  return (
    <Icon
      aria-hidden
      className={cn("text-ocean-600 size-5 shrink-0", className)}
    />
  );
}
