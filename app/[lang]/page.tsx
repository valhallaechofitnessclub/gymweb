'use client';

import React from 'react';
import Hero from './sections/Hero';
import CardSection from './sections/CardSection';
import Locations from './sections/Locations';
import Trainers from './sections/Trainers';

// English dictionary
const dictionaryEn = {
  header: {
    locations: "LOCATIONS",
    activities: "ACTIVITIES",
    trainers: "TRAINERS",
    prices: "PRICES",
    contact: "CONTACT",
  },
  cards: {
    card1: {
      title: "LOCATIONS",
      text: "Discover premium training facilities",
    },
    card2: {
      title: "PRICING",
      text: "Flexible plans for every goal",
    },
    card3: {
      title: "ACTIVITIES",
      text: "Transform your body and mind",
    },
  },
  trainers: {
    title: "TRAINERS",
    text: "Meet our team of certified professionals dedicated to helping you reach your fitness goals and transform your life.",
    button: "VIEW TRAINERS",
    img: "trainers.jpg",
  },
  locations: {
    title: "LOCATIONS",
    text: "Our fitness centers are strategically located to help you stay active, no matter where you are.",
    button: "VIEW LOCATIONS",
  },
};

// Georgian dictionary
const dictionaryGe = {
  header: {
    locations: "ლოკაციები",
    activities: "აქტივობები",
    trainers: "ტრენერები",
    prices: "ფასები",
    contact: "კონტაქტი",
  },
  cards: {
    card1: {
      title: "ლოკაციები",
      text: "აღმოაჩინე პრემიუმ სავარჯიშო ობიექტები",
    },
    card2: {
      title: "ფასები",
      text: "მოქნილი გეგმები ყველა მიზნისთვის",
    },
    card3: {
      title: "აქტივობები",
      text: "გარდაქმენი შენი სხეული და გონება",
    },
  },
  trainers: {
    title: "ტრენერები",
    text: "გაიცანი ჩვენი სერტიფიცირებული პროფესიონალების გუნდი, რომლებიც ეხმარებიან შენს ფიტნეს მიზნების მიღწევაში და ცხოვრების გარდაქმნაში.",
    button: "ნახე ტრენერები",
    img: "trainers.jpg",
  },
  locations: {
    title: "ლოკაციები",
    text: "ჩვენი ფიტნეს ცენტრები სტრატეგიულად არის განთავსებული, რომ დაგეხმაროს აქტიურობის შენარჩუნებაში, არ აქვს მნიშვნელობა სად ხარ.",
    button: "ნახე ლოკაციები",
  },
};

// Dictionaries object
const dictionaries = {
  en: dictionaryEn,
  ge: dictionaryGe,
};

interface HomeProps {
  params: {
    lang: 'en' | 'ge';
  };
}

export default function Home({ params }: HomeProps) {
  // Get the correct dictionary based on language
  const dictionary = dictionaries[params.lang] || dictionaryEn;

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <Hero />
      <CardSection dict={dictionary.cards} />
      <Trainers dict={dictionary.trainers} />
      <Locations dict={dictionary.locations} />
    </div>
  );
}