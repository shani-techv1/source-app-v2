// components/Header.jsx

import React from "react";

export default function Header2() {
  return (
    <header className="w-full absolute top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="white"/>
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="45"
              fontWeight="bold"
              fill="black"
              fontFamily="serif"
            >
              ()
            </text>
          </svg>
        </div>

        {/* Right Nav Items and Icon */}
        <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm p-2">
          {/* Nav Items with opaque backgrounds */}
          <nav className="flex items-center space-x-3">
            <span className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors cursor-pointer">
              HOW IT WORKS
            </span>
            <span className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors cursor-pointer">
              COMPANY
            </span>
        </nav>
          
          {/* Headphone Icon */}
          <div className="ml-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path
                d="M12 1C7.03 1 3 5.03 3 10v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2H5c0-3.87 3.13-7 7-7s7 3.13 7 7h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-4c0-4.97-4.03-9-9-9z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
