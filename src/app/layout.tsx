import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SALTIS TechInov 2025 - Salon de l'IA en Afrique",
    template: "%s | SALTIS TechInov",
  },
  description:
    "SALTIS TechInov - Le plus grand Salon de l'Intelligence Artificielle en Afrique de l'Ouest. Dakar, Sénégal. Innovation, Technologie, IA.",
  keywords: [
    "SALTIS",
    "TechInov",
    "Intelligence Artificielle",
    "IA",
    "Sénégal",
    "Dakar",
    "Innovation",
    "Technologie",
    "Afrique",
    "Salon",
    "Conférence",
  ],
  authors: [{ name: "SALTIS TechInov" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://saltis-techinov.org",
    siteName: "SALTIS TechInov",
    title: "SALTIS TechInov 2025 - Salon de l'IA en Afrique",
    description:
      "Le plus grand Salon de l'Intelligence Artificielle en Afrique de l'Ouest. Rejoignez-nous à Dakar pour 2 jours d'innovation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SALTIS TechInov 2025",
    description: "Le plus grand Salon de l'IA en Afrique de l'Ouest",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
