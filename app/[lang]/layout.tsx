import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getDictionary } from "@/dictionary";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Background from "@/components/Background";

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
  params: { lang: string };
}) {
  const dict = getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Background />
        <Header dict={dict.header} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
