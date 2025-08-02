"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";


const content = [
  {
    title: "Be Discovered",
    description:
      "Tell clients about what you offer. Showcase your latest work and share your portfolio with one click.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-4xl font-bold">
        1
      </div>
    ),
  },
  {
    title: "Collaborate & Connect",
    description:
      "Find and work with other creatives.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-4xl font-bold">
        2
      </div>
    ),
  },
  {
    title: "Manage Work",
    description:
      "Take control of your time and offerings. Manage on the go and stay on schedule.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white text-4xl font-bold">
        3
      </div>
    ),
  },
  {
    title: "Secure Payments",
    description:
      "Fast next day secure payments.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-4xl font-bold">
        4
      </div>
    ),
  },
];
export function ForVendor() {
  return (
    <div className="w-full">
      <StickyScroll content={content} />
    </div>
  );
}
