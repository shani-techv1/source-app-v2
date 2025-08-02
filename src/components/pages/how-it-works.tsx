'use client';

import { useState, useEffect } from 'react';
import PricingTable from '../pricing/PricingTable';
import ImageCollage from '../booking/ImageCollage';
import Steps from '../booking/Steps';
import { ForVendor } from '../forvendor';
import ForAgency from '../foragency';
import FAQ from '../faq';
import { useSearchParams } from 'next/navigation';


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
  const [showArrow, setShowArrow] = useState(true);


  const params = useSearchParams();

  useEffect(() => {
    const tabParam = params.get('tab');
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [params]);



  

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY < 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="w-full py-2">
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

      {/* Conditional Pricing Table */}
      {activeTab === 'pricing' && (
        <>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8 h-[80vh]">
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
          {showArrow && (
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
          )}
          <div className="px-8">
            <PricingTable />
          </div>
        </>
      )}

      {
        activeTab === 'booking' && (
          <>
            {/* Main Content Grid */}
            <div className='flex flex-col justify-end px-8'>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column - Main Title and Description */}
                <div className="lg:pl-10 flex flex-col justify-center">
                  <h1 className="text-4xl lg:text-5xl font-light text-black leading-tight mb-8">
                    Express booking
                  </h1>
                  <p className="text-lg text-gray-900 leading-relaxed mb-8">
                    Discover top vendors from around the world and see their availability instantly.
                  </p>
                </div>
                {/* Right Column - Image Collage */}
                <div className="relative mt-8 ml-20">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {/* Main central image */}
                    <div className="col-span-2 row-span-2 relative">
                      <div className="pt-8">
                      <ImageCollage />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                          <div className="px-8 mt-16">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Quick and Simple */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-500 text-sm">(big icon)</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Quick and Simple</h3>
                  <p className="text-gray-600">Browse and book in minutes not days.</p>
                </div>

                {/* Make Boards */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-500 text-sm">(big icon)</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Make Boards</h3>
                  <p className="text-gray-600">Save vendors for future projects. Create organized boards to manage.</p>
                </div>

                {/* Payment History */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-500 text-sm">(big icon)</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Payment History</h3>
                  <p className="text-gray-600">Keep track of past payments</p>
                </div>

                {/* Transparency */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-500 text-sm">(big icon)</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Transparency</h3>
                  <p className="text-gray-600">Know who you&apos;re working with before you hire through star ratings, descriptions and more.</p>
                </div>
              </div>
            </div>
            </div>

            {/* How it works section */}


            {/* Bottom scroll indicator */}
            {showArrow && (
            <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center mb-40 z-10">
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
          )}


            <div>

              <Steps/>
            </div>
          </>
        )
      }

      {activeTab === 'vendor' && ( 
        <ForVendor/>
       )}

      {activeTab === 'agency' && (
        <ForAgency/>
      )}

      {activeTab === 'faq' && (
        <FAQ/>
      )}

    </div>
  );
}