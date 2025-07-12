import React from "react";
import Link from "next/link";

interface SignupSuccessStepProps {
  onClose: () => void;
}

export const SignupSuccessStep: React.FC<SignupSuccessStepProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Thank you for submitting your application!
      </h1>
      
      <div className="space-y-4 text-gray-600 mb-8">
        <p className="text-base leading-relaxed">
          We&apos;re reviewing your information. You&apos;ll receive a confirmation email
          as soon as your profile is approved and goes live.
        </p>
        <p className="text-base leading-relaxed">
          In the meantime, we recommend visiting your account settings to
          complete your profile. A more complete profile can help build trust
          and increase visibility with potential clients.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={onClose}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
        <Link
          href="/account"
          className="flex-1 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
        >
          Go to Account Settings
        </Link>
      </div>
    </div>
  );
}; 