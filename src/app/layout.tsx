import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SystemWrapper from "@/components/SystemWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Zewail Digital Book Pavilions — Powered by IEEE Zewail City",
  description: "A next-generation digital book fair bringing together Egypt's most prestigious publishers under one virtual roof. Honoring the legacy of Dr. Ahmed Zewail.",
  keywords: ["Zewail", "Digital Book Fair", "IEEE", "Egyptian Publishers", "Ahmed Zewail"],
  authors: [{ name: "IEEE Zewail City" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground dark:bg-zewail-navy-dark dark:text-white transition-colors duration-300`}
      >
        <SystemWrapper>
          {children}
        </SystemWrapper>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
