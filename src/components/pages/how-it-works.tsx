'use client';

import { useState } from 'react';

const tabs = [
  {
    id: 'pricing',
    label: 'Pricing',
    title: 'Pricing tailored to you.',
    content: 'Get started for free with just a 5% commission flat fee per transaction',
    additionalContent: 'Advance your profile'
  },
  {
    id: 'booking',
    label: 'Booking',
    title: 'Simple booking process.',
    content: 'Seamless scheduling and booking management for all your sourcing needs',
    additionalContent: 'Streamline your workflow'
  },
  {
    id: 'vendor',
    label: 'For a Vendor',
    title: 'Perfect for vendors.',
    content: 'Expand your reach and connect with quality buyers looking for your products',
    additionalContent: 'Grow your business'
  },
  {
    id: 'agency',
    label: 'For an Agency',
    title: 'Built for agencies.',
    content: 'Manage multiple clients and sourcing projects with our comprehensive agency tools',
    additionalContent: 'Scale your operations'
  },
  {
    id: 'faq',
    label: 'FAQ',
    title: 'Frequently asked questions.',
    content: 'Find answers to common questions about our platform and services',
    additionalContent: 'Get the help you need'
  }
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('pricing');

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="w-full mx-auto py-16">
      {/* Tab Navigation */}
      <div className="px-8 mb-20">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8">
        {/* Left Column - Main Title */}
        <div className="lg:pr-8">
          <h1 className="text-6xl lg:text-7xl font-light text-black leading-tight">
            {activeTabData?.title}
          </h1>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-16">
          {/* Main Content */}
          <div>
            <p className="text-lg text-gray-900 leading-relaxed">
              {activeTabData?.content}
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Viewport Section - Advance your profile */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center pb-8 z-10">
        <p className="text-base text-gray-700 mb-4">
          {activeTabData?.additionalContent}
        </p>
        <div className="flex justify-center animate-bounce">
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 