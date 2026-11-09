// Thông tin liên hệ và điều hướng (2026-11-09, lấy từ docs/Ericss Portfolio Website.docx)
export const siteConfig = {
  name: "Ericss",
  email: "ericss@gmail.com",
  hotline: "0379157360",
  zalo: "0379157360",
  website: "ericss.vn",
  github: "https://github.com/nguyenphat006",
} as const;

export const zaloUrl = `https://zalo.me/${siteConfig.zalo}`;
export const telUrl = `tel:${siteConfig.hotline}`;

// Trang chủ là trang duy nhất (giai đoạn 1): menu cuộn tới section theo id
export const navItems = [
  { key: "services", href: "#services" },
  { key: "stats", href: "#stats" },
  { key: "tech", href: "#tech" },
  { key: "about", href: "#about" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
