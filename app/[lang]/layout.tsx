import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getDictionary } from "@/dictionary";
import { DictionaryProvider } from "@/app/context/DictionaryContext";
import Header from "./sections/Header";
import Background from "@/components/Background";
import Footer from "./sections/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym App",
  description: "Multilingual fitness website",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang); // Load once here

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Background />
        <Header dict={dict.header} />
        <DictionaryProvider dict={dict} lang={lang}>
          {children}
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}