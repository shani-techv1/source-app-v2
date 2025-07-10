"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

interface ImagesSliderProps {
  images: string[];
  currentIndex: number;
  direction?: "up" | "down";
  children?: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
}

export const ImagesSlider = ({
  images,
  currentIndex,
  direction = "up",
  children,
  overlay = true,
  overlayClassName,
  className,
}: ImagesSliderProps) => {
  // State for loading images
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Preload all images on mount
  useEffect(() => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loaded) => {
        setLoadedImages(loaded as string[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load images", err);
        setLoading(false);
      });
  }, [images]);

  // Framer Motion variants for the fade/slide
  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* 1) Background image(s) behind everything */}
      {areImagesLoaded && (
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        </AnimatePresence>
      )}

      {/* 2) Overlay behind text & buttons (z-10) */}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-10", overlayClassName)}
        />
      )}

      {/* 3) Children on top of the overlay (z-20 or higher) */}
      {areImagesLoaded && children && (
        <div className="z-20 relative w-full h-full">{children}</div>
      )}
    </div>
  );
};
