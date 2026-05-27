import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRAGUE.ME — Ton Coach IA Séduction",
  description: "Le premier coach IA de séduction. Analyse tes conversations, génère des messages parfaits, optimise ton profil Tinder. Résultats garantis.",
  keywords: ["séduction", "tinder", "IA", "coach", "messages", "draguer"],
  openGraph: {
    title: "DRAGUE.ME — Ton Coach IA Séduction",
    description: "Le premier coach IA de séduction. Analyse tes conversations, génère des messages parfaits.",
    type: "website",
    siteName: "DRAGUE.ME"
  },
  twitter: {
    card: "summary_large_image",
    title: "DRAGUE.ME — Ton Coach IA Séduction",
    description: "Le premier coach IA de séduction."
  },
  themeColor: "#080808"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-bg-primary text-text-primary antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#161616",
              color: "#fff",
              border: "1px solid #222222",
              borderRadius: "12px",
              fontSize: "14px"
            },
            success: {
              iconTheme: { primary: "#FF0033", secondary: "#fff" }
            }
          }}
        />
      </body>
    </html>
  );
}
