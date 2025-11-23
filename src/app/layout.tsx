import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JapanStack",
  description: "日本向けビジネスOSデモ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="text-lg font-semibold">JapanStack</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/wedding" className="hover:underline">Wedding</Link>
            <Link href="/salon" className="hover:underline">Salon</Link>
            <Link href="/restaurant" className="hover:underline">Restaurant</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
