import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://marusgroup.example";
const TITLE = "Marusgroup — B2B-решения для роста вашего бизнеса";
const DESCRIPTION =
  "Marusgroup — комплексные B2B-решения: автоматизация процессов, интеграции и сопровождение. Помогаем компаниям расти быстрее за счёт прозрачных процессов и измеримых результатов.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Marusgroup",
  },
  description: DESCRIPTION,
  applicationName: "Marusgroup",
  keywords: [
    "Marusgroup",
    "B2B",
    "автоматизация бизнеса",
    "интеграции",
    "корпоративные решения",
    "цифровизация",
  ],
  authors: [{ name: "Marusgroup" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Marusgroup",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1f43f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Перейти к основному контенту
        </a>
        {children}
      </body>
    </html>
  );
}
