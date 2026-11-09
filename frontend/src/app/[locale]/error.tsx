"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

/*
 * Trang lỗi: hiện khi render trang ném lỗi, chủ yếu là CMS không trả lời được (CmsError ở
 * lib/cms/client.ts) lúc trang chưa có bản cache. Không hiện chi tiết lỗi; digest để đối chiếu log.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="text-muted-foreground">{t("lede")}</p>
      <button
        type="button"
        onClick={reset}
        className="underline underline-offset-4"
      >
        {t("retry")}
      </button>
      {error.digest ? (
        <p className="text-muted-foreground font-mono text-xs">
          {t("reference", { digest: error.digest })}
        </p>
      ) : null}
    </main>
  );
}
