import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import SharedHeader from '../header/SharedHeader';

interface LiquidGlassModalProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const LiquidGlassModal: React.FC<LiquidGlassModalProps> = ({
  title = "Modal Title",
  children,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setIsAnimating(true), 50);
  }, []);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 transition-all duration-300 ease-out ${
        isAnimating
          ? 'backdrop-blur-xl bg-[#F2F0EF]/70 backdrop-saturate-250'
          : 'backdrop-blur-none bg-transparent'
      }`}
      onClick={handleClose}
      style={{
        backdropFilter: isAnimating ? 'blur(20px) saturate(180%)' : 'none',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        minWidth: '100vw',
        top: 0,
        left: 0,
      }}
    >
      <SharedHeader isTransparent={true} />
      <div
        className={`relative w-full h-full max-w-none max-h-none overflow-auto rounded-none shadow-none transition-all duration-500 ease-out transform ${
          isAnimating
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          background: 'rgba(255,255,255,0.01)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close button in top right */}
        {/* <button
          onClick={handleClose}
          className="absolute top-[8%] right-7 md:top-20 md:right-16 flex items-center justify-center w-12 h-12 group z-50"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-black/80 transition-colors duration-200" />
        </button> */}

        {/* Header */}
        <div className="relative flex items-center justify-between px-8 md:px-16 pt-20 pb-6">
          {/* <h2 className="text-3xl font-semibold text-black/90 tracking-tight">
            {title}
          </h2> */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-16 pb-16 pt-4 text-black">
          {children}
        </div>
      </div>
    </div>
  );
};

// Example usage with your slug handling
const ExampleUsage = () => {
  // Your existing Home component would go here as background
  const Home = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Home Component</h1>
        <p className="text-gray-600">This is where your existing Home component content goes...</p>
      </div>
    </div>
  );

  // Example slug handling (replace with your actual slug logic)
  const [slug] = useState('about'); // This would come from your router
  
  const handleCloseModal = () => {
    // Your logic to navigate back to home/clear slug
    console.log('Navigate to home');
  };

  if (slug === 'about') {
    return (
      <>
        <Home />
        <LiquidGlassModal
          onClose={handleCloseModal}
          title="About Us"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Our Story</h3>
              <p className="text-white/80 leading-relaxed">
                We are a forward-thinking company dedicated to creating beautiful, 
                functional user experiences. Our team combines technical expertise 
                with creative vision to build products that delight users.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                To bridge the gap between complex technology and intuitive design, 
                making digital experiences more accessible and enjoyable for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="font-medium text-white mb-2">Our Values</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Innovation & creativity</li>
                  <li>• User-centered design</li>
                  <li>• Quality & attention to detail</li>
                  <li>• Continuous learning</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="font-medium text-white mb-2">Our Team</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Designers & developers</li>
                  <li>• Product strategists</li>
                  <li>• UX researchers</li>
                  <li>• Creative directors</li>
                </ul>
              </div>
            </div>
          </div>
        </LiquidGlassModal>
      </>
    );
  }

  // Default return your Home component
  return <Home />;
};

export default LiquidGlassModal;