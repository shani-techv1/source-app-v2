'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useContentManager } from '@/hooks/useContentManager';
import SignupFlow from '../signup/SignupFlow';

interface Hero2Props {
  onModalOpenChange?: (open: boolean) => void;
}

const Hero2 = ({ onModalOpenChange }: Hero2Props) => {
  const { heroImage, heroTitle, heroSubtitle } = useContentManager();
  const hero2Title = heroTitle;
  const hero2Subtitle = heroSubtitle;

  console.log(hero2Subtitle, hero2Title, heroImage);

  // Don't show loading state to prevent hydration mismatch
  // The useContentManager will provide default values during SSR

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Image */}
      <img
        src={heroImage || "/image.png"}
        alt="Creative professional"
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute left-0 right-0 bottom-0 bg-white p-2 lg:p-16">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-black leading-tight"
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              {hero2Title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-2 sm:mt-4 text-lg sm:text-2xl md:text-3xl font-light text-gray-700 leading-relaxed"
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 300,
                letterSpacing: '-0.01em'
              }}
            >
              {hero2Subtitle}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-2"
          >
            <SignupFlow onOpenChange={onModalOpenChange} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;