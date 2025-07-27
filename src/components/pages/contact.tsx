'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    emailAddress: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement form submission logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setSubmitStatus('success');
      setFormData({ fullName: '', companyName: '', phoneNumber: '', emailAddress: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto py-16">
      {/* Contact Title */}
      <h1 className="text-8xl font-light text-black mb-8 px-8">
        Contact
      </h1>

      {/* Email Button */}
      <div className="mb-16 border-b px-8 border-gray-200 pb-12">
        <div onClick={() => window.open('mailto:info@sourced.ltd', '_blank')} className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm cursor-pointer">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          info@sourced.ltd
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8">
        {/* Left Column - Description */}
        <div className="lg:pr-8 max-w-lg">
          <p className="text-gray-900 text-base leading-relaxed">
            If you have any questions or need any general information please complete this form. One of our team members will get back to you as soon as possible.
          </p>
        </div>

        {/* Right Column - Form */}
        <div>
          <div onSubmit={handleSubmit} className="space-y-8">
            {/* First Row: Full Name and Company Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-0 py-3 text-base bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-0 py-3 text-base bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Second Row: Phone Number and Email Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-0 py-3 text-base bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="emailAddress"
                  placeholder="E-mail Address"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="w-full px-0 py-3 text-base bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={8}
                className="w-full px-0 py-3 text-base bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 placeholder-gray-400 resize-none"
                required
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="text-green-600 text-base">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-600 text-base">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-black text-white px-20 py-6 rounded-full text-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}