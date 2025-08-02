import React from 'react';
import ImageMoodboard from './ImageMoodboard';

// Image Collage Component


// Main Sticky Scroll Component
const ForAgency = () => {
  const textSections = [
    {
      title: "Creative Vision",
      content: "Our approach to visual storytelling combines traditional photography techniques with modern digital artistry. Each frame captures not just an image, but an emotion, a moment frozen in time that speaks to the viewer's soul."
    },
    {
      title: "Studio Mastery",
      content: "The controlled environment of our studio allows for precise lighting, composition, and mood creation. Every element is carefully considered - from the backdrop to the model's expression, creating a cohesive visual narrative."
    },
    {
      title: "Location Scouting",
      content: "Beyond the studio walls, we seek out unique locations that complement our creative vision. Whether it's urban landscapes or natural settings, each location adds its own character to the final composition."
    },
    {
      title: "Digital Artistry",
      content: "Post-production is where magic happens. Our digital artists enhance each image while maintaining authenticity, creating collages that tell stories beyond what any single photograph could convey."
    },
    {
      title: "Model Direction",
      content: "Working with professional models requires clear communication and creative direction. We focus on capturing genuine expressions and poses that align with our artistic vision while ensuring comfort and professionalism."
    },
    {
      title: "Final Presentation",
      content: "The culmination of our process results in compelling visual stories that can be presented as individual pieces or dynamic slideshows, depending on the intended audience and platform."
    }
  ];

  return (
    <div className="min-h-screen">

      {/* Sticky Scroll Section */}
      <div className="flex gap-8 mx-auto px-8">
        
        {/* Left Content - Scrolling Text */}
        <div className="flex-1 space-y-16 pb-20">
          {textSections.map((section, index) => (
            <div key={index} className="max-w-xl ml-4">
              <div className="bg-transparent duration-300">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {section.content}
                </p>
                <div className="mt-6 flex items-center text-sm text-gray-400">
                  <div className="w-8 h-0.5 bg-gray-300 mr-3"></div>
                  <span>Section {index + 1} of {textSections.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right Content - Sticky Image Collage */}
        <div className="flex-1">
          <div className="sticky top-8 h-fit">
            <ImageMoodboard />
          </div>
        </div>
        
      </div>

      {/* Footer */}
    </div>
  );
};

export default ForAgency;