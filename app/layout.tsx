import type { Metadata, Viewport } from "next";
import { Jost, Montserrat } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://marusgroup.ru";
const TITLE =
  "MARUS GROUP — восстановление стекла и алюминиевого профиля для застройщиков";
const DESCRIPTION =
  "Закрываем замечания по стеклу, фасадному остеклению и алюминиевому профилю на объектах застройщиков перед приёмкой, сдачей и передачей готовых помещений.";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  subsets: ["cyrillic", "latin"],
  variable: "--font-jost",
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — MARUS GROUP",
  },
  description: DESCRIPTION,
  applicationName: "MARUS GROUP",
  keywords: [
    "восстановление стекла для застройщиков",
    "устранение дефектов стекла в новостройках",
    "подготовка остекления к приёмке",
    "полировка стекла на объектах застройщиков",
    "удаление окалины со стекла после строительных работ",
    "реставрация фасадного остекления",
    "реставрация алюминиевого профиля",
    "дефекты стекла перед передачей помещений",
    "работы со стеклом на объектах бизнес-класса",
    "устранение замечаний по стеклу перед сдачей объекта",
  ],
  authors: [{ name: "MARUS GROUP" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "MARUS GROUP",
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
  themeColor: "#1F4E5F",
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
      <body
        className={`${montserrat.variable} ${jost.variable} min-h-screen antialiased pb-20 md:pb-0`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Перейти к основному контенту
        </a>
        {children}
      </body>
    </html>
  );
}
