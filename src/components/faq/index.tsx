import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const faqData = [
    {
      id: 1,
      question: "What is Sourced?",
      answer: "Sourced is a platform that connects businesses with talented professionals for various projects and services."
    },
    {
      id: 2,
      question: "Who is Sourced for?",
      answer: "Sourced is designed for both businesses looking to hire skilled professionals and freelancers seeking new opportunities."
    },
    {
      id: 3,
      question: "How do I get started?",
      answer: "Getting started is simple - create an account, complete your profile, and start browsing opportunities or posting projects."
    },
    {
      id: 4,
      question: "How quick will I receive a payment?",
      answer: "Payments are typically processed within 3-5 business days after project completion and approval."
    },
    {
      id: 5,
      question: "What happens if someone cancels last minute?",
      answer: "We have policies in place to protect both parties. Cancellation fees may apply depending on the timing and circumstances."
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="">
        <div className="p-8 flex space-x-10">
          <h1 className="text-5xl font-light text-gray-900 mr-[5%]">FAQ</h1>
          
          <div className="space-y-0 w-full px-4">
            {faqData.map((item, index) => (
              <div key={item.id}>
                <div 
                  className="flex items-center justify-between py-6 cursor-pointer hover:bg-gray-50 px-4 -mx-4 rounded-lg transition-all duration-200"
                  onClick={() => toggleExpand(item.id)}
                >
                  <h3 className="text-xl font-normal text-gray-800 flex-1 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {expandedItems[item.id] ? (
                      <Minus className="w-6 h-6 text-gray-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </div>
                
                {expandedItems[item.id] && (
                  <div className="px-4 pb-6 -mx-4">
                    <div className="text-gray-700 text-base leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
                
                {index < faqData.length - 1 && (
                  <div className="border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;