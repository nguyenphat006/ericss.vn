import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Không có generateMetadata: trang 404 không nhận params; tiêu đề lấy mặc định của layout.
export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-muted-foreground font-mono text-sm">404</p>
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="text-muted-foreground">{t("lede")}</p>
      <Link href="/" className="underline underline-offset-4">
        {t("home")}
      </Link>
    </main>
  );
}
