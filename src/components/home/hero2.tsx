'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useContentManager } from '@/hooks/useContentManager';
import SignupFlow from '../signup/SignupFlow';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Hero2Props {
  onModalOpenChange?: (open: boolean) => void;
}

interface MediaRendererProps {
  mediaUrl: any;
  alt: any;
  className: any;
  style: React.CSSProperties;
  index: any;
  onLoad: () => void;
}

// Component to render a single media item (image or video)
const MediaRenderer: React.FC<MediaRendererProps> = ({ mediaUrl, alt, className, style, index, onLoad }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    setMediaLoaded(false); // Reset loaded state when mediaUrl changes
  }, [mediaUrl]);

  if (mediaUrl.startsWith('data:video/') || mediaUrl.match(/\.(mp4|webm|ogg)$/i)) {
    return (
      <video
        src={mediaUrl}
        // className={`${className} transition-opacity duration-500 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
        className={`${className} transition-opacity duration-500 opacity-100`}
        style={style}
        controls
        autoPlay={index === 0}
        muted
        onLoadedData={() => {
          setMediaLoaded(true);
          onLoad();
        }}
      />
    );
  }

  return (
    <img
      src={mediaUrl}
      alt={`${alt}-${index}`}
      // className={`${className} transition-opacity duration-500 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
      className={`${className} transition-opacity duration-500 opacity-100`}
      style={style}
      onLoad={() => {
        setMediaLoaded(true);
        onLoad();
      }}
    />
  );
};

// Custom slider component
const HeroSlider = ({ mediaItems }: { mediaItems: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (mediaItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
      }, 30000); // Change slide every 30 seconds
      return () => clearInterval(interval);
    }
  }, [mediaItems.length]);

  // Navigation handlers
  const goToPrevious = () => {
    // setIsLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToNext = () => {
    // setIsLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  // Handle media load
  const handleMediaLoad = () => {
    setIsLoaded(true);
  };

  if (!mediaItems || mediaItems.length === 0) {
    return (
      <div className="absolute inset-0 w-full h-full bg-primary animate-pulse flex items-center justify-center z-10">
        {/* <p className="text-white">No media available</p> */}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Media content */}
      {mediaItems.map((mediaUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${index == currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <MediaRenderer
            mediaUrl={mediaUrl}
            alt="Creative professional"
            className="w-full h-full object-cover object-center"
            style={{ position: 'absolute', inset: 0 }}
            index={index}
            onLoad={handleMediaLoad}
          />
        </div>
      ))}

      {/* Skeleton Loader */}
      {!isLoaded && (
        <div
          className="absolute inset-0 w-full h-full bg-primary animate-pulse z-20"
          aria-label="Loading media"
        />
      )}

      {/* Navigation buttons */}
      {mediaItems.length > 1 && (
        <>
          {/* <button
            onClick={goToPrevious}
            className="absolute left-4 top-[40%] transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-[40%] transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button> */}

          {/* Dots navigation */}
          <div className="absolute top-[62%]  left-1/2 transform -translate-x-1/2 flex gap-2 z-50 bg-white/70 p-3 rounded-md">
            {mediaItems.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${dotIndex === currentIndex ? 'bg-white scale-125 shadow-md' : 'bg-gray-500 hover:bg-gray-300'
                  }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Hero2 = ({ onModalOpenChange }: Hero2Props) => {
  const { heroImage, heroTitle, heroSubtitle } = useContentManager();
  // console.log('Hero2 content:', { heroImage });
  const hero2Title = heroTitle;
  const hero2Subtitle = heroSubtitle;

  const [imgLoaded, setImgLoaded] = useState(false);

  const mediaItems = Array.isArray(heroImage) ? heroImage : [heroImage].filter(Boolean) as string[];
  // console.log(mediaItems, 'mediaItems')

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Skeleton Loader */}
      {/* {!imgLoaded && (
        <div
          className="absolute inset-0 w-full h-full bg-primary animate-pulse z-10"
          aria-label="Loading image"
        />
      )} */}
      {/* Hero Image */}
      {/* <img
        src={heroImage}
        alt="Creative professional"
        className={`w-full h-full object-cover object-center transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
        style={{ position: 'absolute', inset: 0 }}
      /> */}
      {/* Hero Slider */}
      <HeroSlider mediaItems={mediaItems} />

      <div className="absolute left-0 right-0 bottom-0 bg-white p-2 md:p-6 z-20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className='space-y-0  '>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-black leading-tight"
              style={{
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
              className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-black leading-relaxed"
              style={{
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