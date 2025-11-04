import React from 'react';

// Import dictionaries
import dictionaryEn from '@/dictionary/en.json';
import dictionaryGe from '@/dictionary/ge.json';
import LocationsPage from '../sections/LocationsPage';

const dictionaries = {
  en: dictionaryEn,
  ge: dictionaryGe,
};

interface HomeProps {
  params: Promise<{
    lang: 'en' | 'ge';
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  
  const dictionary = dictionaries[lang] || dictionaryEn;

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <LocationsPage dict={dictionary.locationsPage} />
    </div>
  );
}