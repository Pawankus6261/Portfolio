import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowLeft, Home } from 'lucide-react'; // Using Lucide icons

// This is our new SVG Illustration component for the failed page
const PaymentFailedIllustration = () => (
  <svg
    width="300"
    height="220"
    viewBox="0 0 300 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    {/* Robot Body (same as NotFound) */}
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
    {/* Robot Legs (same as NotFound) */}
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
    {/* Failed Icon (Red X) */}
    <g className="animate-pulse opacity-80">
      <path
        d="M260.5 35.5L240 56"
        stroke="#EF4444" // Red color
        strokeWidth="6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M240 35.5L260.5 56"
        stroke="#EF4444" // Red color
        strokeWidth="6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    {/* Sad Face */}
    <path
      d="M142.2 32.5C140.6 32.5 139.2 31.1 139.2 29.5C139.2 27.9 140.6 26.5 142.2 26.5C143.8 26.5 145.2 27.9 145.2 29.5C145.2 31.1 143.8 32.5 142.2 32.5Z"
      fill="#4B5563"
    />
    <path
      d="M132.2 32.5C130.6 32.5 129.2 31.1 129.2 29.5C129.2 27.9 130.6 26.5 132.2 26.5C133.8 26.5 135.2 27.9 135.2 29.5C135.2 31.1 133.8 32.5 132.2 32.5Z"
      fill="#4B5563"
    />
    {/* Bouncing Red Alert */}
    <g className="animate-bounce">
      <circle cx="68.5" cy="18.5" r="12" fill="#FEE2E2" />
      <circle cx="68.5" cy="18.5" r="8" fill="#EF4444" />
      <path
        d="M68.5 14.5V18.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M68.5 22.5V23.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    // New gradient background (red/orange theme) and layout
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center bg-linear-to-br from-red-50 via-pink-50 to-orange-50 py-12 px-4 antialiased">
      
      {/* Main Content: Set to 60% width on large screens */}
      <main className="w-full lg:w-3/5 mx-auto px-6 py-16 text-center">
        
        {/* The Card: New glassmorphism style */}
        <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-lg md:p-12">
          
          {/* Replaced icon with new SVG illustration */}
          <PaymentFailedIllustration />
          
          <h1 className="mt-8 text-5xl font-extrabold text-gray-900">
            Payment Failed
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Unfortunately, we couldn't process your payment. This might be due to a card issue or a temporary network problem.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            Please check your details and try again.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/* Button 1: Try Again (Go back to Payment) */}
            <button
              onClick={() => navigate('/payment')}
              className="
                flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600
                px-6 py-3 text-base font-medium text-white shadow-lg
                transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5
              "
            >
              <RotateCcw className="h-5 w-5" />
              <span className="whitespace-nowKrap">Try Payment Again</span>
            </button>
            
            {/* Button 2: Go Back to Home */}
            <Link
              to="/"
              className="
                flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300
                bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm
                transition-all duration-300 hover:bg-gray-50 hover:-translate-y-0.5
              "
            >
              <Home className="h-5 w-5" />
              <span className="whitespace-nowrap">Back to Home</span>
            </Link>
          </div>
          
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Need help? <Link to="/#contact" className="font-medium text-blue-600 hover:underline">Contact Support</Link>
        </p>
      </main>
    </div>
  );
};

export default PaymentFailed;

