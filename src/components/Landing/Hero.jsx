import React from 'react';
import { FaUserFriends, FaBrain, FaRocket, FaCalendarCheck, FaWhatsapp } from 'react-icons/fa';
import ProductMockup from './Productmockup.jsx';

// A small component for the floating icons
const FloatingIcon = ({ icon, className }) => (
  <div
    className={`
      hidden lg:flex items-center justify-center h-16 w-16 bg-white shadow-lg rounded-xl border border-gray-100
      absolute ${className}
    `}
  >
    {icon}
  </div>
);

export default function Hero() {
  return (
    <section className="relative w-full bg-white pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6 text-center relative z-10">
        
        {/* --- Floating Icons (like the reference) --- */}
        <FloatingIcon
          icon={<FaBrain size={30} className="text-purple-500" />}
          className="top-0 left-0"
        />
        <FloatingIcon
          icon={<FaWhatsapp size={32} className="text-green-500" />}
          className="top-12 right-0"
        />
        <FloatingIcon
          icon={<FaCalendarCheck size={28} className="text-blue-500" />}
          className="bottom-1/4 left-10"
        />
        <FloatingIcon
          icon={<FaRocket size={30} className="text-red-500" />}
          className="bottom-1/2 right-16"
        />

        {/* --- Trust Badge --- */}
        <div className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <FaUserFriends className="mr-2" />
          Trusted by 1,000+ businesses
        </div>

        {/* --- Main Headline --- */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
          Automate Conversations.
          <span className="block text-blue-600">Simplify Bookings.</span>
        </h1>
        
        {/* --- Subheadline --- */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Empower your business with an intelligent WhatsApp automation system that chats, books, and
          manages customers — 24×7, without missing a single message.
        </p>

        {/* --- CTA Buttons --- */}
        <div className="mt-10 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <a
            href="/demo"
            className="rounded-lg bg-blue-600 px-8 py-3.5 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 transform hover:scale-101"
          >
            Get Free Demo
          </a>
          <a
            href="#how"
            className="group flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-lg font-medium text-gray-700 shadow-sm transition-all hover:shadow-md transform hover:scale-101"
          >
            Watch How It Works
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-20">
        <ProductMockup />
      </div>
      <div
        className="absolute -top-1/4 left-1/2 z-0 h-full w-full -translate-x-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(239, 246, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)',
        }}
      ></div>
    </section>
  );
}