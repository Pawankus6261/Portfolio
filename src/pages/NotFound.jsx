import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react'; // Removed 'Compass' as it's not used
import { motion } from 'framer-motion'; // Import framer-motion

// This is our new SVG Illustration component (No changes here)
const LostIllustration = () => (
  <svg
    width="300"
    height="220"
    viewBox="0 0 300 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    {/* ... (Your full SVG code is perfect, it goes here) ... */}
    <path
      d="M59.5 212C59.5 212 79.5 190.5 102.5 190.5C125.5 190.5 140 212 140 212"
      stroke="#D1D5DB"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M165 212C165 212 185 190.5 208 190.5C231 190.5 245.5 212 245.5 212"
      stroke="#D1D5DB"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M272 135.5C272 149.7 260.7 161 246.5 161C232.3 161 221 149.7 221 135.5C221 121.3 232.3 110 246.5 110C260.7 110 272 121.3 272 135.5Z"
      fill="#F3F4F6"
      stroke="#9CA3AF"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M246.5 161V190.5"
      stroke="#9CA3AF"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M84.5 135.5C84.5 149.7 73.2 161 59 161C44.8 161 33.5 149.7 33.5 135.5C33.5 121.3 44.8 110 59 110C73.2 110 84.5 121.3 84.5 135.5Z"
      fill="#F3F4F6"
      stroke="#9CA3AF"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M59 161V190.5"
      stroke="#9CA3AF"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M102.5 190.5H208"
      stroke="#9CA3AF"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M155.2 28.5C155.2 38.4 147.1 46.5 137.2 46.5C127.3 46.5 119.2 38.4 119.2 28.5C119.2 18.6 127.3 10.5 137.2 10.5C147.1 10.5 155.2 18.6 155.2 28.5Z"
      fill="#F3F4F6"
    />
    <path
      d="M155.2 28.5C155.2 38.4 147.1 46.5 137.2 46.5C127.3 46.5 119.2 38.4 119.2 28.5C119.2 18.6 127.3 10.5 137.2 10.5C147.1 10.5 155.2 18.6 155.2 28.5Z"
      stroke="#4B5563"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M173.5 49C173.5 61.4 163.4 71.5 151 71.5C138.6 71.5 128.5 61.4 128.5 49"
      stroke="#4B5563"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M192.5 135.5H180.5C179.4 135.5 178.5 134.6 178.5 133.5V64.5C178.5 63.4 179.4 62.5 180.5 62.5H192.5C193.6 62.5 194.5 63.4 194.5 64.5V133.5C194.5 134.6 193.6 135.5 192.5 135.5Z"
      fill="#F3F4F6"
      stroke="#4B5563"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M128.5 135.5H116.5C115.4 135.5 114.5 134.6 114.5 133.5V64.5C114.5 63.4 115.4 62.5 116.5 62.5H128.5C129.6 62.5 130.5 63.4 130.5 64.5V133.5C130.5 134.6 129.6 135.5 128.5 135.5Z"
      fill="#F3F4F6"
      stroke="#4B5563"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M187 135.5V190.5"
      stroke="#4B5563"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M122 135.5V190.5"
      stroke="#4B5563"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M114.5 190.5H194.5"
      stroke="#4B5563"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M137.2 32.5C138.8 32.5 140.2 31.1 140.2 29.5C140.2 27.9 138.8 26.5 137.2 26.5C135.6 26.5 134.2 27.9 134.2 29.5C134.2 31.1 135.6 32.5 137.2 32.5Z"
      fill="#4B5563"
    />
    <g className="animate-pulse opacity-80">
      <path
        d="M260.5 35.5L250 46"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M250 35.5L260.5 46"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <g className="animate-pulse opacity-80" style={{ animationDelay: '0.2s' }}>
      <path
        d="M48.5 35.5L38 46"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 35.5L48.5 46"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeMiterlimit="1Player-Controlled"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <g className="animate-bounce">
      <circle cx="218.5" cy="18.5" r="8" fill="#3B82F6" />
      <path
        d="M218.5 10.5V2V10.5Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M218.5 34.5V26.5V34.5Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M210.5 18.5L204 18.5L210.5 18.5Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M233 18.5L226.5 18.5L233 18.5Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M212.8 12.8L207.2 7.2L212.8 12.8Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M229.8 29.8L224.2 24.2L229.8 29.8Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M212.8 24.2L207.2 29.8L212.8 24.2Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M229.8 7.2L224.2 12.8L229.8 7.2Z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const NotFound = () => {
  return (
    // 1. We use motion.div to add a fade-in animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // 2. We make the container fill the *entire screen*
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-6 antialiased"
    >
      {/* 3. We remove the <main> card and just have a centered content block */}
      <div className="text-center max-w-lg mx-auto">
        
        {/* 4. The illustration is now a primary element */}
        <LostIllustration />
        
        {/* 5. We make the typography much bigger and bolder */}
        <h1 className="mt-12 text-8xl md:text-9xl font-extrabold text-gray-900 animate-pulse">
          404
        </h1>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for. It seems our
          robot got a little lost.
        </p>

        {/* 6. The CTA button is made larger to match */}
        <Link
          to="/"
          className="
            mt-10 inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600
            px-8 py-4 text-lg font-medium text-white shadow-lg
            transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5
          "
        >
          <Home className="h-5 w-5" />
          <span className="whitespace-nowrap">Go Back Home</span>
        </Link>
        
      </div>
    </motion.div>
  );
};

export default NotFound;