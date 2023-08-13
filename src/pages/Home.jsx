import React from 'react'
import Hero from '../components/Hero'
import Static from '../components/Static'
import Features from '../components/Features'
import SpecialOffers from '../components/SpecialOffers'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Static />
      <SpecialOffers />
    </>
  );
}

export default Home