import React from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

/**
 * A simple full-width, fixed-height text mask
 * showing the underlying video only inside the text "NAJBARDZIEJ."
 */
export default function TextMask() {
  return (
    <div className="relative w-full h-[400px] bg-transparent overflow-hidden">
      {/* Background video: occupies entire container behind the mask */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover saturate-50"
        src="https://videos.pexels.com/video-files/7540038/7540038-uhd_2560_1440_24fps.mp4" // <-- Replace with your actual video path
        autoPlay
        loop
        muted
      />

      {/* The SVG Mask container */}
      <div className="absolute inset-0 flex items-center justify-center invert">
        <svg
          className="w-[100%] h-auto"
          viewBox="0 0 1201 302"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="najbardziej-mask">
              {/* 
                1) Fill entire area with white (fully visible)
                2) "Draw" the text in black (black = masked out = transparent)
              */}
              <rect width="100%" height="100%" fill="white" />
              <text
                x="50%"
                y="50%"
                fill="black"
                fontSize="170"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily="sans-serif"
              >
                NAJBARDZIEJ
              </text>
            </mask>
          </defs>

          {/* 
            Draw a black rectangle across the entire SVG,
            but apply our custom mask, so the letters become "windows"
            that show the video behind it.
          */}
          <rect
            width="100%"
            height="100%"
            fill="black"
            mask="url(#najbardziej-mask)"
          />
        </svg>
      </div>
    </div>
  );
}
