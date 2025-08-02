import React from 'react';

const ImageMoodboard = () => {
  return (
    <div className="w-full">
      {/* Title */}
      
      {/* Main collage container */}
      <div className="relative w-full h-[600px] bg-white">
        
        {/* Top large studio space - spans full width */}
        <div className="absolute top-0 left-0 w-[70%] h-[45%] overflow-hidden -translate-y-3 translate-x-60">
          <img 
            src="https://images.unsplash.com/photo-1580791445032-e50c3a9eb529?q=80&w=2741&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Studio space"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Left portrait - positioned on left side */}
        <div className="absolute top-[47%] left-0 w-[25%] h-[36%] overflow-hidden -translate-y-24">
          <img 
            src="https://images.pexels.com/photos/8129089/pexels-photo-8129089.jpeg" 
            alt="Model portrait 1"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Center interior scene */}
        <div className="absolute top-[47%] left-[27%] w-[46%] h-[35%] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1580791445032-e50c3a9eb529?q=80&w=2741&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Modern interior"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right portrait */}
        <div className="absolute top-[47%] right-0 w-[25%] h-[35%] overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/8129089/pexels-photo-8129089.jpeg" 
            alt="Model portrait 2"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Bottom left portrait with film strip effect */}
        <div className="absolute bottom-0 left-[27%] w-[23%] h-[30%] overflow-hidden border-4 border-black translate-y-20">
          <div className="relative w-full h-full bg-black">
            {/* Film strip holes */}
            <div className="absolute top-1 left-1 right-1 flex justify-between">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Film text */}
            <div className="absolute top-0 right-2 text-white text-xs font-mono">
              KODAK 400TX 40
            </div>
            
            {/* Main image area */}
            <div className="absolute top-4 left-2 right-2 bottom-2 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8129089/pexels-photo-8129089.jpeg" 
                alt="Film portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Bottom right studio ceiling */}
        <div className="absolute bottom-0 right-0 w-[25%] h-[15%] overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/8129089/pexels-photo-8129089.jpeg" 
            alt="Studio ceiling"
            className="w-full h-full object-cover"
          />
        </div>
        
      </div>
    </div>
  );
};

export default ImageMoodboard;