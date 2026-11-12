import type { Metadata } from "next";
import { Figtree, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PalmAssistant from "@/components/PalmAssistant";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://palmschooledu.com"),
  title: {
    default: "Palm Matric Hr. Sec. School — Thiruthuraipoondi",
    template: "%s | Palm Matric Hr. Sec. School",
  },
  description:
    "Since 2012, Palm Matric Hr. Sec. School has been a leading educational institution in Thiruthuraipoondi, nurturing young minds with academic excellence, character building, and innovative learning experiences.",
  keywords: [
    "Palm Matric School",
    "Thiruthuraipoondi school",
    "matriculation school Thiruvarur",
    "admission open 2026",
    "palmschooledu",
  ],
  openGraph: {
    title: "Palm Matric Hr. Sec. School — Thiruthuraipoondi",
    description:
      "Quality education at an affordable cost in Thiruthuraipoondi. Admissions open for the 2026 academic year.",
    images: ["/assets/img/hero-gate.jpg"],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${tamil.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <PalmAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
