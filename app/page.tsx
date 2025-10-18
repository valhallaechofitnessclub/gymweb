import React from 'react';
import Hero from './sections/Hero';
import CardSection from './sections/CardSection';
import Locations from './sections/Locations';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <Hero />
      <CardSection />
      <Locations />
    </div>
  );
}
