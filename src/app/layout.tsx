import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/lib/i18n";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "TechVal AI — Telkom University × Bandung Techno Park Technology Valuation",
  description:
    "Platform Valuasi Teknologi, Kesiapan Komersialisasi, dan Lisensi Industri berbasis Standar WIPO (IDR) & NASA TRL hasil kolaborasi Telkom University dan Bandung Techno Park (BTP) untuk Hilirisasi Kampus dan Adopsi Industri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppStateProvider>
          <AppShell>{children}</AppShell>
        </AppStateProvider>
      </body>
    </html>
  );
}
