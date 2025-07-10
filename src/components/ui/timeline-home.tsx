"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";

/** ICONS */
const SignUpIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black/50 dark:text-white"
  >
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 22V19C4 16.2386 6.23858 14 9 14H15C17.7614 14 20 16.2386 20 19V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ConnectIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black/50 dark:text-white"
  >
    <path
      d="M17 7H7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 12H7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 17H7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black/50 dark:text-white"
  >
    <path
      d="M4 19V5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PaymentIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black/50 dark:text-white"
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 10H22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** HOW IT WORKS SECTION */
export function HowItWorksSection() {
  const data = [
    {
      title: "Step 1: Sign Up & Create a Profile",
      content: (
        <div className="flex flex-col items-center justify-items-center md:flex-row md:items-center md:gap-4 text-center md:text-left">
          {/* Icon */}
          <SignUpIcon />
          {/* Vertical line on desktop */}
          <div className="hidden md:block w-px h-8 bg-neutral-300" />
          {/* Text */}
          <p className="mt-4 md:mt-0 text-neutral-800 dark:text-neutral-200 text-sm font-normal">
            Register as a creative or provider, set up your portfolio, and showcase
            your work to potential clients.
          </p>
        </div>
      ),
    },
    {
      title: "Step 2: Discover & Connect",
      content: (
        <div className="flex flex-col items-center justify-items-center md:flex-row md:items-center md:gap-4 text-center md:text-left">
          <ConnectIcon />
          <div className="hidden md:block w-px h-8 bg-neutral-300" />
          <p className="mt-4 md:mt-0 text-neutral-800 dark:text-neutral-200 text-sm font-normal">
            Browse through top creatives, filter by categories, and connect with
            professionals for your projects.
          </p>
        </div>
      ),
    },
    {
      title: "Step 3: Book & Collaborate",
      content: (
        <div className="flex flex-col items-center justify-items-center md:flex-row md:items-center md:gap-4 text-center md:text-left">
          <BookIcon />
          <div className="hidden md:block w-px h-8 bg-neutral-300" />
          <p className="mt-4 md:mt-0 text-neutral-800 dark:text-neutral-200 text-sm font-normal">
            Securely book creatives, communicate through our in-platform messaging,
            and manage your projects seamlessly.
          </p>
        </div>
      ),
    },
    {
      title: "Step 4: Get Paid & Grow Your Network",
      content: (
        <div className="flex flex-col items-center justify-items-center md:flex-row md:items-center md:gap-4 text-center md:text-left">
          <PaymentIcon />
          <div className="hidden md:block w-px h-8 bg-neutral-300" />
          <p className="mt-4 md:mt-0 text-neutral-800 dark:text-neutral-200 text-sm font-normal">
            Receive secure payments, gather client reviews, and expand your
            creative business with our platform.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full py-12">
      {/* The Timeline component you’ve shown in the screenshot */}
      <Timeline data={data} />
    </div>
  );
}
