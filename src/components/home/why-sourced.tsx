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
    return <div>Loading...</div>;
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
    <section className="py-16 md:py-24 px-4 md:px-12 ">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">{whySourcedBadge}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-4xl md:text-6xl font-bold md:mb-0 mb-6">
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
        <div className="w-full space-y-6">
          {parsedAccordions.map((accordion) => (
            <div key={accordion.id} className="p-4 pr-10 rounded-3xl bg-gray-100">
              <details className="group" open={accordion.isOpen}>
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div className="flex items-center">
                    {getIcon(accordion.icon)}
                    <span className="text-xl md:text-2xl font-semibold">{accordion.title}</span>
                  </div>
                  <img 
                    src="/arrow2.svg" 
                    alt="Chevron Down" 
                    className="h-6 w-10 shrink-0 text-gray-400 transition-transform group-open:rotate-180" 
                  />
                </summary>
                <div className="pt-4 text-base">
                  <p className="text-gray-600 pl-[50px] md:pl-[300px] text-xl md:text-2xl font-thin">
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