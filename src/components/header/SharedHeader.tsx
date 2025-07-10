'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useContentManager } from '@/hooks/useContentManager';
import { ChevronDown, Menu, X } from "lucide-react";

interface SharedHeaderProps {
  isTransparent?: boolean;
  className?: string;
  onChatOpen?: () => void;
  isLoaded?: boolean;
}

export default function SharedHeader({ 
  isTransparent = true, 
  className = "", 
  onChatOpen,
  isLoaded = true
}: SharedHeaderProps) {
  const [showHowItWorksDropdown, setShowHowItWorksDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const {
    brandName,
    brandLogo,
    howItWorksMenuItems,
    companyMenuItems,
    isLoading: contentLoading
  } = useContentManager();

  if (contentLoading) {
    return <div className="w-full h-20"></div>; // Placeholder
  }

  const openChat = () => {
    if (onChatOpen) {
      onChatOpen();
    }
  };

  // Use the same header design for all pages
  const headerClasses = isTransparent 
    ? "w-full absolute top-0 z-50" 
    : "w-full bg-white shadow-sm border-b relative z-50";

  return (
    <>
      <header className={`${headerClasses} ${className}`}>
        <div className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Left Logo/Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              {brandLogo && (
                <div className="flex-shrink-0">
                  <img
                    src={brandLogo}
                    alt={brandName}
                    className="h-8 w-8 md:h-10 md:w-10 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              )}
              {(brandName || !brandLogo) && (
                <h1 className="text-2xl md:text-3xl font-semibold tracking-wide uppercase text-black">
                  {brandName}
                </h1>
              )}
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center px-2 bg-white/70 backdrop-blur-sm py-1 rounded-sm">
            {/* Nav Items with pill-shaped backgrounds */}
            <nav className="flex items-center space-x-3">
              {/* How It Works Dropdown */}
              <div className="relative">
                <button
                  className="text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
                  onMouseEnter={() => setShowHowItWorksDropdown(true)}
                  onMouseLeave={() => setShowHowItWorksDropdown(false)}
                >
                  HOW IT WORKS
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {showHowItWorksDropdown && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                    onMouseEnter={() => setShowHowItWorksDropdown(true)}
                    onMouseLeave={() => setShowHowItWorksDropdown(false)}
                  >
                    {howItWorksMenuItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div className="relative">
                <button
                  className="text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
                  onMouseEnter={() => setShowCompanyDropdown(true)}
                  onMouseLeave={() => setShowCompanyDropdown(false)}
                >
                  COMPANY
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {showCompanyDropdown && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                    onMouseEnter={() => setShowCompanyDropdown(true)}
                    onMouseLeave={() => setShowCompanyDropdown(false)}
                  >
                    {companyMenuItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>
            
            {/* Headphone Icon */}
            <div className="ml-2">
              <button 
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                onClick={openChat}
                disabled={!isLoaded}
                aria-label="Support"
              >
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
              </button>
            </div>
          </div>

          {/* Mobile Menu Button and Support */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Support Icon for Mobile */}
            <button 
              className="p-2 hover:bg-white/20 rounded-full transition-colors bg-white/70 backdrop-blur-sm"
              onClick={openChat}
              disabled={!isLoaded}
              aria-label="Support"
            >
              <svg
                width="20"
                height="20"
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
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors bg-white/70 backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
          <div 
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Menu</h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-black" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-6 space-y-6">
              {/* How It Works Section */}
              <div>
                <h3 className="text-lg font-medium text-black mb-3 uppercase tracking-wide">
                  How It Works
                </h3>
                <div className="space-y-2">
                  {howItWorksMenuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      onClick={() => setShowMobileMenu(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Company Section */}
              <div>
                <h3 className="text-lg font-medium text-black mb-3 uppercase tracking-wide">
                  Company
                </h3>
                <div className="space-y-2">
                  {companyMenuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      onClick={() => setShowMobileMenu(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Support Section */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    openChat();
                    setShowMobileMenu(false);
                  }}
                  disabled={!isLoaded}
                  className="w-full flex items-center justify-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M12 1C7.03 1 3 5.03 3 10v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2H5c0-3.87 3.13-7 7-7s7 3.13 7 7h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-4c0-4.97-4.03-9-9-9z"
                      fill="currentColor"
                    />
                  </svg>
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 