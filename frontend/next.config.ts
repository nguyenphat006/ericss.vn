import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Ảnh từ CMS (backend/, /media/...): cho next/image tối ưu đúng nguồn CMS đã khai báo
const cmsApi = process.env.CMS_API_URL
  ? new URL(process.env.CMS_API_URL)
  : null;
const cmsIsLocal =
  cmsApi !== null && ["127.0.0.1", "localhost"].includes(cmsApi.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: cmsApi
      ? [
          {
            protocol: cmsApi.protocol.replace(":", "") as "http" | "https",
            hostname: cmsApi.hostname,
            port: cmsApi.port,
            pathname: "/media/**",
          },
        ]
      : [],
    // Next 16 chặn tối ưu ảnh từ IP nội bộ; chỉ mở khi chạy dev với CMS ở máy local
    dangerouslyAllowLocalIP:
      process.env.NODE_ENV === "development" && cmsIsLocal,
  },
  // Header bảo mật cơ bản cho toàn site
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
