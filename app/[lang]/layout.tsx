import { getDictionary } from "@/dictionary";
import { DictionaryProvider } from "@/app/context/DictionaryContext";
import Header from "./sections/Header";
import Background from "@/components/Background";
import Footer from "./sections/Footer";

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