import React from 'react';
import Hero from './sections/Hero';
import CardSection from './sections/CardSection';
import Locations from './sections/Locations';
import Trainers from './sections/Trainers';

// Import dictionaries
import dictionaryEn from '@/dictionary/en.json';
import dictionaryGe from '@/dictionary/ge.json';

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
      <Hero />
      <CardSection dict={dictionary.cards} />
      <Trainers dict={dictionary.trainers} />
      <Locations dict={dictionary.locations} />
    </div>
  );
}