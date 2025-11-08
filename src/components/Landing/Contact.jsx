import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// 1. Updated icons to lucide-react for consistency
import {
  ArrowRight,
  Calendar,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Loader2, // For sending spinner
  Check,   // For success
} from 'lucide-react';

// FloatingIcon helper component (now uses lucide-react)
const FloatingIcon = ({ icon, className }) => (
  <div
    className={`
      flex items-center justify-center h-12 w-12 lg:h-14 lg:w-14 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl border border-gray-100
      absolute z-0 ${className}
    `}
  >
    {/* 2. Cloned icon to set responsive size */}
    {React.cloneElement(icon, { className: 'w-6 h-6 lg:w-auto lg:h-auto' })}
  </div>
);

export default function ContactForm() {
  // Added state for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  // Added state for form submission status
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setFormStatus('error');
      // Reset after 3s
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }
    
    setFormStatus('sending');
    
    // Simulate a network request
    setTimeout(() => {
      // On success:
      setFormStatus('success');
      setFormData({ fullName: '', email: '', message: '' });

      // Reset form back to idle after a few seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);

    }, 2000);
  };

  // Helper function to determine button content
  const getButtonContent = () => {
    if (formStatus === 'sending') {
      return (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Sending...
        </>
      );
    }
    if (formStatus === 'success') {
      return (
        <>
          <Check className="mr-2 h-5 w-5" />
          Message Sent!
        </>
      );
    }
    if (formStatus === 'error') {
      // This is a basic error, you could expand this
      return (
        <>
          <ArrowRight className="mr-2 h-5 w-5" />
          Please fill all fields
        </>
      );
    }
    return (
      <>
        <span className="whitespace-nowrap">Send Message</span>
        <ArrowRight className="h-5 w-5" />
      </>
    );
  };

  return (
    <section
      id="contact"
      // 3. ENHANCED BACKGROUND
      className="relative overflow-hidden bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-24"
    >
      {/* --- 4. ENHANCED Blur Gradients (Glows) --- */}
      <div className="absolute -top-48 -left-48 z-0 h-96 w-96 rounded-full bg-blue-300 opacity-50 blur-3xl" />
      <div className="absolute -bottom-48 -right-48 z-0 h-96 w-96 rounded-full bg-purple-300 opacity-50 blur-3xl" />
      
      {/* --- 5. ENHANCED Floating Icons (visible on mobile) --- */}
      <FloatingIcon 
        icon={<Mail className="text-blue-600" />}
        className="top-24 left-4 lg:top-32 lg:left-[10%] animate-pulse"
      />
      <FloatingIcon 
        icon={<Phone className="text-purple-600" />}
        className="bottom-24 right-4 lg:bottom-32 lg:right-[10%] animate-pulse [animation-delay:'1s']"
      />
      <FloatingIcon 
        icon={<MessageCircle className="text-green-600" />}
        className="top-1/3 left-16 lg:top-1/2 lg:left-[20%] animate-pulse [animation-delay:'0.5s']"
      />
      <FloatingIcon 
        icon={<MapPin className="text-red-600" />}
        className="bottom-1/3 right-16 lg:bottom-1/2 lg:right-[20%] animate-pulse [animation-delay:'1.5s']"
      />

      {/* --- Content (must have relative z-10) --- */}
      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        
        {/* --- 2-Column Layout --- */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          
          {/* --- Column 1: The "CTA" --- */}
          <div className="flex flex-col justify-center text-center md:text-left">
            
            <h2 className="text-4xl font-extrabold tracking-tight text-blue-600">
              Ready to Grow Your Business?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Join 1,000+ businesses using ChatFlow AI to automate, engage, and sell.
            </p>
            
            {/* 6. ADDED list for visual balance */}
            <ul className="mt-8 space-y-4 text-left">
              <li className="flex items-center">
                <Check className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-lg text-gray-700">Get a <strong>Free Demo</strong></span>
              </li>
              <li className="flex items-center">
                <Check className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-lg text-gray-700">Discuss <strong>Custom Needs</strong></span>
              </li>
              <li className="flex items-center">
                <Check className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-lg text-gray-700">Get <strong>Priority Support</strong></span>
              </li>
            </ul>

            <div className="mt-10 flex w-full flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:w-auto md:justify-start">
              
              <Link
                to="/#pricing" // Links to the pricing section on the home page
                className="
                  flex items-center justify-center space-x-2 rounded-lg bg-blue-600
                  px-6 py-2.5 text-base font-medium text-white shadow-lg
                  transition-all duration-300 hover:bg-blue-700 hover:-translate-y-1
                "
              >
                <span className="whitespace-nowrap">Choose Your Plan</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/demo" // You would put your Calendly link here
                className="
                  flex items-center justify-center space-x-2 rounded-lg 
                  border border-gray-300 bg-white px-6 py-2.5
                  text-base font-medium text-gray-700 shadow-sm
                  transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1
                "
              >
                <span className="whitespace-nowrap">Book a Free Demo</span>
                <Calendar className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* --- Column 2: The Form --- */}
          <div className="rounded-xl border border-gray-200 bg-white/80 p-10 shadow-lg backdrop-blur-md">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Or Send Us a Message</h3>
            
            <form onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-2 gap-6">
                
                {/* Full Name (col 1) */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-lg border-2 border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email Address (col 2) */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-lg border-2 border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Message (Full width) */}
                <div className="col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-blue-800"
                    ></textarea>
                  </div>
                </div>
                
                {/* Dynamic Submit Button */}
                <div className="col-span-2">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`
                      flex w-full items-center justify-center space-x-2 rounded-lg
                      px-6 py-3 text-base font-medium text-white shadow-lg
                      transition-all duration-300 hover:-translate-y-0.5
                      ${formStatus === 'sending' && 'cursor-not-allowed bg-blue-400'}
                      ${formStatus === 'success' && 'bg-green-600 hover:bg-green-700'}
                      ${formStatus === 'error' && 'bg-red-600 hover:bg-red-700'}
                      ${formStatus === 'idle' && 'bg-blue-600 hover:bg-blue-700'}
                    `}
                  >
                    {getButtonContent()}
                  </button>
                </div>
                
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}

