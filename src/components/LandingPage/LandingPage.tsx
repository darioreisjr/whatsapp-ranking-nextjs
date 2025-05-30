'use client';

import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { TechSpecs } from './TechSpecs';
import { CallToAction } from './CallToAction';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <TechSpecs />
      <CallToAction />
    </div>
  );
};