import React from 'react';

import dictionaryEn from '@/dictionary/en.json';
import dictionaryGe from '@/dictionary/ge.json';
import PricingPage from '../sections/PricingPage';

const dictionaries = {
  en: dictionaryEn,
  ge: dictionaryGe,
};

interface PricingProps {
  params: Promise<{
    lang: 'en' | 'ge';
  }>;
}

export default async function Pricing({ params }: PricingProps) {
  const { lang } = await params;

  const dictionary = dictionaries[lang] || dictionaryEn;

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <PricingPage dict={dictionary.pricingPage} lang={lang === 'ge' ? 'ka' : 'en'} />
    </div>
  );
}