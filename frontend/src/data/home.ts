/*
 * Nội dung trang chủ (mock, 2026-11-09). Lấy từ docs/Ericss Portfolio Website.docx.
 * Sau này chuyển sang CMS (backend/) và giữ nguyên kiểu HomeContent để UI không phải sửa.
 *
 * MOCK cần thay bằng số liệu thật trước khi chạy thật:
 * - stats.projectsByYear / clientGrowth: tài liệu chỉ ghi tổng 200+ dự án, 200+ khách hàng;
 * - pricing: tài liệu chưa có giá, đang để giá tham khảo;
 * - testimonials: tài liệu có 47+ ảnh feedback nhưng chưa có file, đang dùng lời nhận xét mẫu;
 * - contact.mapQuery: tài liệu chưa có địa chỉ văn phòng.
 */
import type { Locale } from "@/i18n/routing";

export type ServiceKey = "website" | "mobile" | "chatbot" | "academic";
export type TechCategoryKey =
  "frontend" | "backend" | "mobile" | "ai" | "cloud" | "ecommerce";

export type HomeContent = {
  hero: {
    kicker: string;
    titleLead: string;
    rotating: string[];
    titleTail: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    badges: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    items: {
      key: ServiceKey;
      title: string;
      desc: string;
      points: string[];
    }[];
  };
  stats: {
    eyebrow: string;
    title: string;
    lede: string;
    cards: { value: number; suffix: string; label: string }[];
    projectsTitle: string;
    projectsByYear: { year: string; projects: number }[];
    growthTitle: string;
    clientGrowth: { period: string; clients: number }[];
    satisfactionTitle: string;
    satisfaction: number;
    satisfactionNote: string;
  };
  tech: {
    eyebrow: string;
    title: string;
    lede: string;
    categories: { key: TechCategoryKey; label: string; skills: string[] }[];
    highlights: { title: string; desc: string }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    items: { name: string; url: string; tag: string; desc: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    story: string[];
    founder: { name: string; role: string; quote: string };
    timeline: { year: string; title: string; desc: string }[];
    advantages: { title: string; desc: string }[];
  };
  feedback: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { name: string; company: string; text: string; rating: number }[];
    form: {
      title: string;
      name: string;
      company: string;
      message: string;
      rating: string;
      submit: string;
      success: string;
      errors: { name: string; message: string; rating: string };
    };
  };
  pricing: {
    eyebrow: string;
    title: string;
    lede: string;
    note: string;
    popular: string;
    cta: string;
    plans: {
      name: string;
      price: string;
      unit: string;
      desc: string;
      features: string[];
      highlighted?: boolean;
    }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    mapQuery: string;
    labels: { email: string; hotline: string; zalo: string; website: string };
  };
  chat: {
    title: string;
    status: string;
    greeting: string;
    placeholder: string;
    send: string;
    suggestions: { q: string; a: string }[];
    fallback: string;
  };
};

const vi: HomeContent = {
  hero: {
    kicker: "Ericss · Giải pháp công nghệ toàn diện",
    titleLead: "Chúng tôi xây",
    rotating: ["Website", "Mobile App", "AI Chatbot", "Sản phẩm số"],
    titleTail: "giúp doanh nghiệp bứt phá",
    lede: "Từ ý tưởng đến sản phẩm chạy thật: thiết kế hiện đại, hiệu năng cao, bàn giao nhanh và bảo hành 12 tháng.",
    primaryCta: "Nhận tư vấn miễn phí",
    secondaryCta: "Xem dịch vụ",
    badges: ["200+ dự án", "99% hài lòng", "Bảo hành 12 tháng"],
  },
  services: {
    eyebrow: "Dịch vụ",
    title: "Bốn mũi nhọn công nghệ",
    lede: "Mỗi dịch vụ đi kèm quy trình rõ ràng, tiến độ minh bạch và đội ngũ đồng hành sau bàn giao.",
    items: [
      {
        key: "website",
        title: "Website",
        desc: "Website doanh nghiệp, bán hàng, landing page chuẩn SEO, tốc độ tải dưới 2 giây.",
        points: ["Next.js / React", "Chuẩn SEO", "Quản trị nội dung"],
      },
      {
        key: "mobile",
        title: "Mobile App",
        desc: "Ứng dụng iOS và Android đa nền tảng, trải nghiệm mượt, dễ mở rộng.",
        points: ["React Native / Flutter", "Thông báo đẩy", "Thanh toán"],
      },
      {
        key: "chatbot",
        title: "AI Chatbot",
        desc: "Trợ lý AI trả lời khách 24/7, học từ dữ liệu của doanh nghiệp bạn.",
        points: [
          "Gemini / OpenAI",
          "Huấn luyện theo dữ liệu",
          "Tích hợp website, Zalo",
        ],
      },
      {
        key: "academic",
        title: "Đồ án CNTT",
        desc: "Hướng dẫn và hỗ trợ đồ án, luận văn CNTT với mã nguồn sạch, tài liệu đầy đủ.",
        points: ["Phân tích thiết kế", "Mã nguồn sạch", "Hỗ trợ bảo vệ"],
      },
    ],
  },
  stats: {
    eyebrow: "Con số",
    title: "Tăng trưởng đều qua từng năm",
    lede: "Hơn bốn năm đồng hành cùng khách hàng từ startup đến doanh nghiệp.",
    cards: [
      { value: 200, suffix: "+", label: "Dự án hoàn thành" },
      { value: 200, suffix: "+", label: "Khách hàng tin tưởng" },
      { value: 4, suffix: "+", label: "Năm kinh nghiệm" },
      { value: 99, suffix: "%", label: "Khách hàng hài lòng" },
    ],
    projectsTitle: "Dự án hoàn thành theo năm",
    projectsByYear: [
      { year: "2022", projects: 28 },
      { year: "2023", projects: 46 },
      { year: "2024", projects: 61 },
      { year: "2025", projects: 72 },
    ],
    growthTitle: "Tăng trưởng khách hàng",
    clientGrowth: [
      { period: "Q1/22", clients: 6 },
      { period: "Q3/22", clients: 22 },
      { period: "Q1/23", clients: 41 },
      { period: "Q3/23", clients: 68 },
      { period: "Q1/24", clients: 97 },
      { period: "Q3/24", clients: 131 },
      { period: "Q1/25", clients: 168 },
      { period: "Q3/25", clients: 204 },
    ],
    satisfactionTitle: "Mức độ hài lòng",
    satisfaction: 99,
    satisfactionNote: "khách hàng hài lòng",
  },
  tech: {
    eyebrow: "Công nghệ",
    title: "Bộ công nghệ chúng tôi làm chủ",
    lede: "Chọn đúng công cụ cho từng bài toán, ưu tiên ổn định và dễ bảo trì lâu dài.",
    categories: [
      {
        key: "frontend",
        label: "Frontend",
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Three.js",
          "Framer Motion",
        ],
      },
      {
        key: "backend",
        label: "Backend",
        skills: [
          "Node.js",
          "NestJS",
          "Django",
          "PostgreSQL",
          "Redis",
          "REST / GraphQL",
        ],
      },
      {
        key: "mobile",
        label: "Mobile",
        skills: [
          "React Native",
          "Flutter",
          "Expo",
          "Firebase",
          "Push Notification",
        ],
      },
      {
        key: "ai",
        label: "AI",
        skills: ["Google Gemini", "OpenAI", "RAG", "LangChain", "Vector DB"],
      },
      {
        key: "cloud",
        label: "Cloud",
        skills: ["Vercel", "Docker", "AWS", "Nginx", "CI/CD"],
      },
      {
        key: "ecommerce",
        label: "E-commerce",
        skills: ["Medusa", "Thanh toán online", "Quản lý kho", "Đa kênh"],
      },
    ],
    highlights: [
      { title: "Clean Code", desc: "Kiến trúc rõ ràng, dễ đọc, dễ bàn giao." },
      { title: "Performance", desc: "Điểm PageSpeed 90+, tải dưới 2 giây." },
      { title: "Security", desc: "Bảo mật theo chuẩn, cập nhật thường xuyên." },
      { title: "SEO", desc: "Cấu trúc chuẩn, dữ liệu có cấu trúc đầy đủ." },
    ],
  },
  projects: {
    eyebrow: "Dự án",
    title: "Sản phẩm đang vận hành",
    items: [
      {
        name: "Rentino",
        url: "https://rentino.vn",
        tag: "Nền tảng cho thuê",
        desc: "Nền tảng cho thuê đồ công nghệ: đặt lịch, thanh toán, quản lý thiết bị.",
      },
      {
        name: "Celebi",
        url: "https://celebi.vn",
        tag: "Website dịch vụ",
        desc: "Website dịch vụ với trải nghiệm đặt hẹn nhanh, tối ưu chuyển đổi.",
      },
      {
        name: "Refurbest",
        url: "https://refurbest.vn",
        tag: "E-commerce",
        desc: "Sàn thương mại điện tử thiết bị tân trang, quản lý đơn hàng đa kênh.",
      },
    ],
  },
  about: {
    eyebrow: "Về chúng tôi",
    title: "Đội ngũ nhỏ, tiêu chuẩn lớn",
    story: [
      "Ericss bắt đầu từ năm 2022 với một mục tiêu đơn giản: giúp doanh nghiệp Việt có sản phẩm số đẹp, nhanh và thực sự mang lại khách hàng.",
      "Sau hơn bốn năm, chúng tôi đã hoàn thành hơn 200 dự án, từ website giới thiệu đến nền tảng thương mại điện tử và trợ lý AI.",
    ],
    founder: {
      name: "Nguyễn Đăng Phát",
      role: "Founder & CEO · Full-stack Developer",
      quote: "Mỗi dòng code đều phải phục vụ một mục tiêu kinh doanh rõ ràng.",
    },
    timeline: [
      {
        year: "2022",
        title: "Thành lập",
        desc: "Nhận những dự án website đầu tiên.",
      },
      {
        year: "2023",
        title: "Mở rộng",
        desc: "Thêm mảng Mobile App và đồ án CNTT.",
      },
      {
        year: "2024",
        title: "AI",
        desc: "Triển khai chatbot AI cho doanh nghiệp.",
      },
      {
        year: "2025",
        title: "200+ dự án",
        desc: "Vận hành nhiều nền tảng thương mại.",
      },
    ],
    advantages: [
      {
        title: "Kỹ sư chuyên nghiệp",
        desc: "Kinh nghiệm thực chiến, làm chủ công nghệ mới.",
      },
      {
        title: "Bàn giao nhanh",
        desc: "Tiến độ rõ ràng theo từng mốc, cập nhật hằng tuần.",
      },
      {
        title: "Bảo hành 12 tháng",
        desc: "Hỗ trợ sửa lỗi và đồng hành sau bàn giao.",
      },
    ],
  },
  feedback: {
    eyebrow: "Khách hàng nói gì",
    title: "Niềm tin được xây từ kết quả",
    lede: "Một vài chia sẻ từ khách hàng đã đồng hành cùng Ericss.",
    items: [
      {
        name: "Anh Minh",
        company: "Chủ shop thời trang",
        rating: 5,
        text: "Website lên nhanh, đơn hàng online tăng rõ ngay tháng đầu.",
      },
      {
        name: "Chị Lan",
        company: "Spa & Beauty",
        rating: 5,
        text: "Đặt lịch online tiện hơn hẳn, khách tự đặt không cần gọi.",
      },
      {
        name: "Anh Tuấn",
        company: "Startup giáo dục",
        rating: 5,
        text: "Team hỗ trợ nhiệt tình, sửa theo góp ý rất nhanh.",
      },
      {
        name: "Bạn Huy",
        company: "Sinh viên CNTT",
        rating: 5,
        text: "Đồ án được hướng dẫn kỹ, mã nguồn sạch, bảo vệ điểm cao.",
      },
      {
        name: "Chị Hà",
        company: "Công ty du lịch",
        rating: 5,
        text: "Chatbot AI trả lời khách cả đêm, đỡ cho đội sale rất nhiều.",
      },
      {
        name: "Anh Khoa",
        company: "Cửa hàng công nghệ",
        rating: 5,
        text: "Giao diện đẹp, tốc độ nhanh, SEO lên top sau vài tháng.",
      },
      {
        name: "Chị Thảo",
        company: "Nhà hàng",
        rating: 5,
        text: "Menu online và đặt bàn hoạt động ổn định, không lỗi vặt.",
      },
      {
        name: "Anh Long",
        company: "Doanh nghiệp sản xuất",
        rating: 5,
        text: "Website giới thiệu chuyên nghiệp, đối tác đánh giá cao.",
      },
    ],
    form: {
      title: "Gửi đánh giá của bạn",
      name: "Họ tên",
      company: "Công ty / vai trò",
      message: "Cảm nhận của bạn",
      rating: "Đánh giá",
      submit: "Gửi đánh giá",
      success: "Cảm ơn bạn đã gửi đánh giá!",
      errors: {
        name: "Vui lòng nhập họ tên",
        message: "Vui lòng viết ít nhất 10 ký tự",
        rating: "Vui lòng chọn số sao",
      },
    },
  },
  pricing: {
    eyebrow: "Bảng giá",
    title: "Gói linh hoạt cho mọi quy mô",
    lede: "Báo giá rõ ràng, không phát sinh ngoài thoả thuận.",
    note: "Giá tham khảo cho website, báo giá chính xác sau buổi tư vấn.",
    popular: "Phổ biến nhất",
    cta: "Chọn gói này",
    plans: [
      {
        name: "Khởi đầu",
        price: "4.900.000đ",
        unit: "/ dự án",
        desc: "Landing page hoặc website giới thiệu gọn nhẹ.",
        features: [
          "Tối đa 5 trang",
          "Giao diện responsive",
          "Chuẩn SEO cơ bản",
          "Bảo hành 12 tháng",
        ],
      },
      {
        name: "Doanh nghiệp",
        price: "12.900.000đ",
        unit: "/ dự án",
        desc: "Website đầy đủ tính năng, có trang quản trị.",
        features: [
          "Không giới hạn trang",
          "Quản trị nội dung",
          "Hiệu ứng, animation",
          "Song ngữ Việt / Anh",
          "Bảo hành 12 tháng",
        ],
        highlighted: true,
      },
      {
        name: "Tuỳ chỉnh",
        price: "Liên hệ",
        unit: "",
        desc: "Nền tảng thương mại, web app, mobile app, AI.",
        features: [
          "Phân tích nghiệp vụ",
          "Kiến trúc mở rộng",
          "Tích hợp AI, thanh toán",
          "Hỗ trợ vận hành",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Câu hỏi thường gặp",
    items: [
      {
        q: "Làm một website mất bao lâu?",
        a: "Landing page khoảng 5 đến 7 ngày, website doanh nghiệp 2 đến 4 tuần tuỳ số trang và tính năng.",
      },
      {
        q: "Tôi có được toàn quyền mã nguồn không?",
        a: "Có. Sau khi nghiệm thu, bạn nhận toàn bộ mã nguồn, tài khoản và tài liệu hướng dẫn.",
      },
      {
        q: "Chế độ bảo hành thế nào?",
        a: "Bảo hành 12 tháng cho mọi lỗi phát sinh từ phía Ericss, hỗ trợ qua Zalo và email.",
      },
      {
        q: "Có hỗ trợ tên miền, hosting không?",
        a: "Có. Chúng tôi tư vấn và cài đặt tên miền, hosting, SSL phù hợp ngân sách.",
      },
      {
        q: "Thanh toán theo hình thức nào?",
        a: "Thường chia 2 đến 3 đợt theo mốc tiến độ, thanh toán chuyển khoản.",
      },
    ],
  },
  contact: {
    eyebrow: "Liên hệ",
    title: "Sẵn sàng bắt đầu dự án của bạn?",
    lede: "Kể cho chúng tôi nghe ý tưởng, bạn sẽ nhận phản hồi trong vòng 24 giờ.",
    cta: "Chat qua Zalo",
    mapQuery: "Ho Chi Minh City, Vietnam",
    labels: {
      email: "Email",
      hotline: "Hotline",
      zalo: "Zalo",
      website: "Website",
    },
  },
  chat: {
    title: "Trợ lý Ericss",
    status: "Thường trả lời ngay",
    greeting: "Xin chào! Bạn cần tư vấn dịch vụ nào?",
    placeholder: "Nhập câu hỏi...",
    send: "Gửi",
    suggestions: [
      {
        q: "Làm website giá bao nhiêu?",
        a: "Gói Khởi đầu từ 4.900.000đ, gói Doanh nghiệp từ 12.900.000đ. Bạn để lại số điện thoại hoặc nhắn Zalo 0379157360 để nhận báo giá chi tiết nhé.",
      },
      {
        q: "Bao lâu thì xong?",
        a: "Landing page khoảng 5 đến 7 ngày, website doanh nghiệp 2 đến 4 tuần.",
      },
      {
        q: "Có làm chatbot AI không?",
        a: "Có! Chúng tôi làm chatbot AI dùng Gemini hoặc OpenAI, học theo dữ liệu của doanh nghiệp bạn.",
      },
    ],
    fallback:
      "Cảm ơn bạn! Để được tư vấn chi tiết, vui lòng nhắn Zalo 0379157360 hoặc gửi email ericss@gmail.com.",
  },
};

const en: HomeContent = {
  hero: {
    kicker: "Ericss · End-to-end technology solutions",
    titleLead: "We build",
    rotating: ["Websites", "Mobile Apps", "AI Chatbots", "Digital Products"],
    titleTail: "that move your business forward",
    lede: "From idea to a product in production: modern design, high performance, fast delivery and a 12-month warranty.",
    primaryCta: "Get a free consultation",
    secondaryCta: "Explore services",
    badges: ["200+ projects", "99% satisfied", "12-month warranty"],
  },
  services: {
    eyebrow: "Services",
    title: "Four technology spearheads",
    lede: "Every service comes with a clear process, transparent timelines and support after handover.",
    items: [
      {
        key: "website",
        title: "Websites",
        desc: "Corporate sites, online stores and SEO-ready landing pages that load in under 2 seconds.",
        points: ["Next.js / React", "SEO-ready", "Content management"],
      },
      {
        key: "mobile",
        title: "Mobile Apps",
        desc: "Cross-platform iOS and Android apps with smooth, scalable experiences.",
        points: ["React Native / Flutter", "Push notifications", "Payments"],
      },
      {
        key: "chatbot",
        title: "AI Chatbots",
        desc: "AI assistants that answer customers 24/7, trained on your business data.",
        points: [
          "Gemini / OpenAI",
          "Trained on your data",
          "Website and Zalo integration",
        ],
      },
      {
        key: "academic",
        title: "IT Projects",
        desc: "Guidance for IT capstone projects and theses with clean code and full documentation.",
        points: ["Analysis and design", "Clean source code", "Defense support"],
      },
    ],
  },
  stats: {
    eyebrow: "Numbers",
    title: "Steady growth, year after year",
    lede: "Over four years working with clients from startups to enterprises.",
    cards: [
      { value: 200, suffix: "+", label: "Projects delivered" },
      { value: 200, suffix: "+", label: "Clients served" },
      { value: 4, suffix: "+", label: "Years of experience" },
      { value: 99, suffix: "%", label: "Client satisfaction" },
    ],
    projectsTitle: "Projects delivered per year",
    projectsByYear: vi.stats.projectsByYear,
    growthTitle: "Client growth",
    clientGrowth: vi.stats.clientGrowth,
    satisfactionTitle: "Satisfaction",
    satisfaction: 99,
    satisfactionNote: "of clients satisfied",
  },
  tech: {
    eyebrow: "Technology",
    title: "The stack we master",
    lede: "The right tool for each problem, favouring stability and long-term maintainability.",
    categories: [
      {
        key: "frontend",
        label: "Frontend",
        skills: vi.tech.categories[0].skills,
      },
      {
        key: "backend",
        label: "Backend",
        skills: vi.tech.categories[1].skills,
      },
      { key: "mobile", label: "Mobile", skills: vi.tech.categories[2].skills },
      { key: "ai", label: "AI", skills: vi.tech.categories[3].skills },
      { key: "cloud", label: "Cloud", skills: vi.tech.categories[4].skills },
      {
        key: "ecommerce",
        label: "E-commerce",
        skills: ["Medusa", "Online payments", "Inventory", "Omnichannel"],
      },
    ],
    highlights: [
      {
        title: "Clean Code",
        desc: "Clear architecture, easy to read and hand over.",
      },
      {
        title: "Performance",
        desc: "PageSpeed 90+, loads in under 2 seconds.",
      },
      { title: "Security", desc: "Secure by default, regularly updated." },
      { title: "SEO", desc: "Solid structure and complete structured data." },
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "Products running in production",
    items: [
      {
        name: "Rentino",
        url: "https://rentino.vn",
        tag: "Rental platform",
        desc: "A tech gear rental platform: booking, payments and device management.",
      },
      {
        name: "Celebi",
        url: "https://celebi.vn",
        tag: "Service website",
        desc: "A service website with fast booking, optimised for conversion.",
      },
      {
        name: "Refurbest",
        url: "https://refurbest.vn",
        tag: "E-commerce",
        desc: "A marketplace for refurbished devices with omnichannel order management.",
      },
    ],
  },
  about: {
    eyebrow: "About us",
    title: "A small team with high standards",
    story: [
      "Ericss started in 2022 with a simple goal: help Vietnamese businesses get digital products that look great, run fast and actually bring in customers.",
      "Four years later we have delivered over 200 projects, from company websites to e-commerce platforms and AI assistants.",
    ],
    founder: {
      name: "Nguyễn Đăng Phát",
      role: "Founder & CEO · Full-stack Developer",
      quote: "Every line of code should serve a clear business goal.",
    },
    timeline: [
      {
        year: "2022",
        title: "Founded",
        desc: "Delivered the first website projects.",
      },
      {
        year: "2023",
        title: "Expanded",
        desc: "Added mobile apps and IT projects.",
      },
      {
        year: "2024",
        title: "AI",
        desc: "Shipped AI chatbots for businesses.",
      },
      {
        year: "2025",
        title: "200+ projects",
        desc: "Running several commerce platforms.",
      },
    ],
    advantages: [
      {
        title: "Professional engineers",
        desc: "Hands-on experience with modern technology.",
      },
      { title: "Fast delivery", desc: "Clear milestones with weekly updates." },
      {
        title: "12-month warranty",
        desc: "Bug fixes and support after handover.",
      },
    ],
  },
  feedback: {
    eyebrow: "Testimonials",
    title: "Trust built on results",
    lede: "A few words from clients who worked with Ericss.",
    items: [
      {
        name: "Minh",
        company: "Fashion store owner",
        rating: 5,
        text: "The site launched fast and online orders grew in the very first month.",
      },
      {
        name: "Lan",
        company: "Spa & Beauty",
        rating: 5,
        text: "Online booking is so much easier, customers book without calling.",
      },
      {
        name: "Tuan",
        company: "EdTech startup",
        rating: 5,
        text: "Very supportive team, feedback was applied quickly.",
      },
      {
        name: "Huy",
        company: "IT student",
        rating: 5,
        text: "Great guidance, clean code and a high score at my defense.",
      },
      {
        name: "Ha",
        company: "Travel company",
        rating: 5,
        text: "The AI chatbot answers customers all night, a big help for sales.",
      },
      {
        name: "Khoa",
        company: "Tech store",
        rating: 5,
        text: "Beautiful design, fast loading, top search rankings within months.",
      },
      {
        name: "Thao",
        company: "Restaurant",
        rating: 5,
        text: "Online menu and table booking run reliably without glitches.",
      },
      {
        name: "Long",
        company: "Manufacturer",
        rating: 5,
        text: "A professional company website that partners appreciate.",
      },
    ],
    form: {
      title: "Share your review",
      name: "Full name",
      company: "Company / role",
      message: "Your experience",
      rating: "Rating",
      submit: "Send review",
      success: "Thank you for your review!",
      errors: {
        name: "Please enter your name",
        message: "Please write at least 10 characters",
        rating: "Please pick a rating",
      },
    },
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Flexible plans for every size",
    lede: "Clear quotes with no surprises.",
    note: "Indicative website prices; an exact quote follows the consultation.",
    popular: "Most popular",
    cta: "Choose plan",
    plans: [
      {
        name: "Starter",
        price: "4,900,000₫",
        unit: "/ project",
        desc: "A lean landing page or company website.",
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Basic SEO",
          "12-month warranty",
        ],
      },
      {
        name: "Business",
        price: "12,900,000₫",
        unit: "/ project",
        desc: "A full-featured website with an admin panel.",
        features: [
          "Unlimited pages",
          "Content management",
          "Effects and animation",
          "Vietnamese / English",
          "12-month warranty",
        ],
        highlighted: true,
      },
      {
        name: "Custom",
        price: "Contact us",
        unit: "",
        desc: "Commerce platforms, web apps, mobile apps, AI.",
        features: [
          "Business analysis",
          "Scalable architecture",
          "AI and payment integration",
          "Operations support",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "How long does a website take?",
        a: "A landing page takes about 5 to 7 days, a company website 2 to 4 weeks depending on pages and features.",
      },
      {
        q: "Do I own the source code?",
        a: "Yes. After acceptance you receive all source code, accounts and documentation.",
      },
      {
        q: "What does the warranty cover?",
        a: "12 months for any defect on our side, with support via Zalo and email.",
      },
      {
        q: "Do you help with domains and hosting?",
        a: "Yes. We advise on and set up domain, hosting and SSL to fit your budget.",
      },
      {
        q: "How do payments work?",
        a: "Usually 2 to 3 instalments tied to milestones, by bank transfer.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Ready to start your project?",
    lede: "Tell us your idea and hear back within 24 hours.",
    cta: "Chat on Zalo",
    mapQuery: vi.contact.mapQuery,
    labels: {
      email: "Email",
      hotline: "Hotline",
      zalo: "Zalo",
      website: "Website",
    },
  },
  chat: {
    title: "Ericss Assistant",
    status: "Usually replies instantly",
    greeting: "Hi there! Which service can we help you with?",
    placeholder: "Type a question...",
    send: "Send",
    suggestions: [
      {
        q: "How much is a website?",
        a: "Starter from 4,900,000₫, Business from 12,900,000₫. Message us on Zalo at 0379157360 for a detailed quote.",
      },
      {
        q: "How long does it take?",
        a: "About 5 to 7 days for a landing page, 2 to 4 weeks for a company website.",
      },
      {
        q: "Do you build AI chatbots?",
        a: "Yes! We build AI chatbots on Gemini or OpenAI, trained on your business data.",
      },
    ],
    fallback:
      "Thanks! For a detailed consultation, message us on Zalo at 0379157360 or email ericss@gmail.com.",
  },
};

const content: Record<Locale, HomeContent> = { vi, en };

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale];
}
