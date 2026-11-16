"use client";

import { useSyncExternalStore } from "react";

/*
 * Thay cho useReducedMotion của motion: bản đó đọc matchMedia ngay lần render đầu ở client nên
 * khác HTML server (máy bật giảm chuyển động sẽ lỗi hydration). Ở đây lúc hydrate luôn trả false
 * như server, React render lại với giá trị thật ngay sau đó.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
