"use client";

import React from "react";
import { Users, FileText, Calendar, CreditCard, Settings, Image as ImageIcon } from "lucide-react";
import SignupFlow from "@/components/signup/SignupFlow";
import { useContentManager } from '@/hooks/useContentManager';

interface WhySourcedSectionProps {
  onModalOpenChange?: (open: boolean) => void;
}

const WhySourcedSection = ({ onModalOpenChange }: WhySourcedSectionProps) => {
  // Use content management system
  const {
    whySourcedBadge,
    whySourcedTitle,
    accordionItems,
    isLoading: contentLoading
  } = useContentManager();

  if (contentLoading) {
    return (
      <section className="py-14 md:py-24 px-4 md:px-24">
        <div className="mx-auto">
          {/* Skeleton Header */}
          <div className="mb-20">
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mb-8 animate-pulse">
              <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="w-3/4 space-y-4">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Skeleton Accordion Items */}
          <div className="w-full space-y-6 px-12">
            {[1, 2, 3].map((index) => (
              <div key={index} className="pl-14 pr-10 py-8 rounded-3xl bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 mr-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconMap = {
      Users,
      FileText,
      Calendar,
      CreditCard,
      Settings,
      Image: ImageIcon
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Users;
    return <IconComponent className="h-8 w-8 mr-4 text-gray-400 flex-shrink-0" />;
  };

  // Parse accordion items
  const parsedAccordions = accordionItems.map((item, index) => {
    const [title, description, icon] = item.split('|');
    return {
      id: index,
      title: title || 'Untitled',
      description: description || 'No description',
      icon: icon || 'Users',
      isOpen: index === 0 // First item open by default
    };
  });

  return (
    <section className="py-14 md:py-24 px-4 md:px-24">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mb-8">
            <span className="text-sm font-medium">{whySourcedBadge}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-4xl md:text-6xl md:mb-0 mb-6">
              {whySourcedTitle.split(' ').map((word, index, array) => (
                <React.Fragment key={index}>
                  {word}
                  {index === Math.floor(array.length / 2) - 1 && <br />}
                  {index < array.length - 1 && index !== Math.floor(array.length / 2) - 1 && ' '}
                </React.Fragment>
              ))}
            </h2>
            
            <div className="flex-shrink-0">
              <SignupFlow onOpenChange={onModalOpenChange} />
            </div>
          </div>
        </div>

        {/* Dynamic Accordion Sections */}
        <div className="w-full space-y-6 px-12">
          {parsedAccordions.map((accordion) => (
            <div key={accordion.id} className="pl-14 pr-10 py-8 rounded-3xl bg-gray-100">
              <details className="group" open={accordion.isOpen}>
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div className="flex items-center">
                    {getIcon(accordion.icon)}
                    <span className="text-xl md:text-2xl">{accordion.title}</span>
                  </div>
                  <img 
                    src="/arrow2.svg" 
                    alt="Chevron Down" 
                    className="h-4 w-6 shrink-0 text-gray-400 transition-transform group-open:rotate-180" 
                  />
                </summary>
                <div className="pt-4 text-base">
                  <p className="text-gray-600 pl-[50px] md:pl-[355px] text-xl md:text-2xl font-thin pr-10">
                    {accordion.description}
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Hidden/Disabled Accordion Items (keeping for reference) */}
        <div className="hidden">
          {/* Booking Accordion Item */}
          <div className="border-b border-gray-200 py-4 d-none ">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-semibold">Book and Manage Seamlessly</span>
                </div>
                <img src="/arrow2.svg" alt="Chevron Down" className=" h-6 w-10  shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pl-12 pt-4 text-base">
                <p className="text-gray-600">
                  Coordinate schedules, manage contracts, and book talent all in one place. 
                  Our platform streamlines communication and project management, 
                  so you can focus on creating amazing work together.
                </p>
              </div>
            </details>
          </div>

          {/* Payment Accordion Item */}
          <div className="border-b border-gray-200 py-4 d-none ">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-semibold">Payment Made Simple</span>
                </div>
                <img src="/arrow2.svg" alt="Chevron Down" className=" h-6 w-10  shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pl-12 pt-4 text-base">
                <p className="text-gray-600">
                  Handle payments securely and efficiently within the platform. Set up milestones, 
                  release funds when work is approved, and maintain a clear record of all transactions.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export { WhySourcedSection };
export default WhySourcedSection; 