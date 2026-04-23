import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ОЗОН-ПРО",
  description: "Интернет-магазин ОЗОН-ПРО",
  authors: [{ name: "Ахмед", url: "https://vk.ru/id1110743535" }],
  creator: "Ахмед",
  keywords: ["ОЗОН-ПРО", "интернет-магазин", "frontend", "Next.js"],
  other: {
    "author-telegram": "@AcDcRock32",
    "author-email": "kochesokov1503@gmail.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
