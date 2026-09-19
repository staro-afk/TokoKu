import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "TokoKu — Catat Stok & Kas Toko",
  description:
    "Aplikasi sederhana untuk mencatat barang, stok, tanggal expired, serta pemasukan dan pengeluaran tokomu.",
};

export const viewport: Viewport = {
  themeColor: "#F5F3EE",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
