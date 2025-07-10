"use client";
import { FC, useEffect } from "react";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Script from 'next/script';
import { useContentManager } from '@/hooks/useContentManager';

// Declare Tawk_API on window object
declare global {
  interface Window {
    Tawk_API?: {
      showWidget: () => void;
      maximize: () => void;
      hideWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

// Define animation variants for the Sourced text
const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for sleek motion
    }
  }
};

// Letter animation for staggered reveal
const letterVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      delay: custom * 0.05, // Staggered delay based on letter index
      ease: [0.22, 1, 0.36, 1],
    }
  })
};

export const Footer: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const {
    subscriptionTitle,
    subscriptionSubtitle,
    copyrightText,
    instagramIcon,
    linkedinIcon,
    footerColumns,
    isLoading: contentLoading
  } = useContentManager();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Split the text "Sourced" into letters for individual animation
  const logoText = "SOURCED";
  const logoLetters = logoText.split("");

  if (contentLoading) {
    return <div>Loading...</div>;
  }

  // Parse footer columns
  const parsedColumns = footerColumns.map(columnString => {
    const [title, linksString] = columnString.split('|');
    const links = linksString ? linksString.split(',').map(linkString => {
      const [slug, displayName] = linkString.split(':');
      return { slug: slug?.trim(), displayName: displayName?.trim() };
    }) : [];
    return { title: title?.trim(), links };
  });

  return (
    <footer className="w-full bg-white mt-16 py-16 px-6 md:px-16 border-t border-gray-400">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* LEFT: Subscription Box */}
        <div className="flex-1 p-8 rounded-3xl bg-gray-100 flex flex-col items-start justify-center">
          <h3 className="text-xl font-bold">{subscriptionTitle}</h3>
          <p className="text-base mt-2 mb-6 text-black/80">{subscriptionSubtitle}</p>

          {/* Email + Subscribe */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-full border border-black px-6 py-3 text-base flex-1 placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-black text-white px-8 py-3 rounded-full text-base font-semibold tracking-widest flex items-center justify-center gap-2">
              SUBSCRIBE
              <PlusCircle width={18} height={18} />
            </button>
          </div>
        </div>

        {/* RIGHT: Dynamic Navigation Columns */}
        <div className="flex-[1.2] flex flex-wrap md:flex-nowrap gap-12 uppercase">
          {parsedColumns.map((column, index) => (
            <div key={index} className="min-w-[140px]">
              <h4 className="font-semibold text-gray-500 uppercase text-sm mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3 text-base text-black">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={`/${link.slug}`} 
                      className="hover:font-medium"
                    >
                      {link.displayName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* SOCIAL MEDIA COLUMN */}
          <div className="min-w-[140px]">
            <h4 className="font-semibold text-gray-500 uppercase text-sm mb-4">
              Social Media
            </h4>
            <ul className="space-y-3 text-base text-black">
              {/* Instagram */}
              <li className="group relative inline-flex items-center">
                <a href="#" className="hover:font-medium flex items-center">
                  Instagram
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                    className="transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300"
                  />
                </a>
              </li>

              {/* LinkedIn */}
              <li className="group relative inline-flex items-center">
                <a href="#" className="hover:font-medium flex items-center">
                  LinkedIn
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                    className="transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 my-16"></div>
      
      {/* Large Brand Logo with Animation */}
      <motion.div 
        ref={ref}
        className="max-w-screen-2xl mx-auto mb-20 overflow-hidden"
        initial="hidden"
        animate={controls}
        variants={logoVariants}
      >
        <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter flex overflow-hidden">
          {logoLetters.map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              className="inline-block"
              style={{ 
                display: 'inline-block', 
                willChange: 'transform'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>
      
      {/* Copyright and Legal Links */}
      <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-base text-gray-500
      border-t border-black
      py-6 gap-6">
        <div>{copyrightText}</div>
        <div className="flex space-x-6">
          <a href="/terms" className="hover:text-black transition-colors">Terms & Conditions</a>
          <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
        </div>
        <div className="flex space-x-4">
      <a href="#" aria-label="Instagram" className="hover:opacity-75">
        <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
      </a>
      <a href="#" aria-label="LinkedIn" className="hover:opacity-75">
        <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6" />
      </a>
    </div>
      </div>

     {/* Tawk.to script */}
      <Script
        strategy="afterInteractive"
        src="https://embed.tawk.to/67cbecbd2c2717190f9e743f/1ilq99hcs"
         onLoad={() => {
          if (!window.Tawk_API) {
            window.Tawk_API = {
              showWidget: () => {},
              maximize: () => {},
              hideWidget: () => {}
            };
          }
          window.Tawk_LoadStart = new Date();

          // Wait for Tawk to be ready, then hide the widget
          const waitForTawk = setInterval(() => {
            if (window.Tawk_API?.hideWidget) {
              window.Tawk_API.hideWidget();
              clearInterval(waitForTawk);
            }
          }, 300);
        }}
      />
    </footer>
  );
};
