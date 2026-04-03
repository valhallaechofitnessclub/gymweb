'use client';

import React from 'react';
import { useDictionary } from '@/app/context/DictionaryContext';
import Hero from './sections/Hero';
import CardSection from './sections/CardSection';
import Trainers from './sections/Trainers';
import Locations from './sections/Locations';


export default function Home() {
  const { dict, lang } = useDictionary();

  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <CardSection dict={dict.cards} />
      <Trainers lang={lang as 'en' | 'ge'} dict={dict.trainers} />
      <Locations lang={lang as 'en' | 'ge'} dict={dict.locations} />
    </div>
  );
}