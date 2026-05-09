import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marusgroup | Устранение дефектов стекла для застройщиков",
  description:
    "B2B-подрядчик по аккуратному устранению царапин, окалины и дефектов стекла на объектах бизнес-класса без повреждения отделки."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
