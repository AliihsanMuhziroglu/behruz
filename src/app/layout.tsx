import type { Metadata } from "next";
import { Nunito, Rubik } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/hooks/useGameContext";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Мир приключений Бехруза",
  description: "Игры, задания, викторины и море веселья!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${nunito.variable} ${rubik.variable}`}>
      <body className="font-body antialiased">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
