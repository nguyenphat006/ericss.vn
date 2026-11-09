import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Logo chữ tạm thời (chưa có file logo): khối gradient + "ericss". */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Ericss"
    >
      <span className="from-ocean-500 to-aqua shadow-ocean relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br text-white transition-transform duration-500 group-hover:rotate-[-8deg]">
        <span className="font-heading text-lg leading-none font-extrabold">
          e
        </span>
        <span className="absolute -right-1 -bottom-1 size-3 rounded-full bg-white/40" />
      </span>
      <span className="font-heading text-ink text-xl font-bold tracking-tight">
        ericss<span className="text-aqua">.</span>
      </span>
    </Link>
  );
}
