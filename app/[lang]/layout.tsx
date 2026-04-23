import { getDictionary } from "@/dictionary";
import { DictionaryProvider } from "@/app/context/DictionaryContext";
import Header from "./sections/Header";
import Background from "@/components/Background";
import Footer from "./sections/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valhalla Echo Fitness Club",
  description: "Premium gym in Tbilisi, Georgia",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Valhalla Echo Fitness Club",
    description: "Premium gym in Tbilisi, Georgia",
    url: "https://valhalla-echo-fitness.com",
    images: [
      {
        url: "https://valhalla-echo-fitness.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
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
    <>
      <Background />
      <Header dict={dict.header} />
      <DictionaryProvider dict={dict} lang={lang}>
        {children}
        <Footer />
      </DictionaryProvider>
    </>
  );
}
