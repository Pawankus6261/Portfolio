import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* --- The Question Button --- */}
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        
        {/* --- The Animated Icon --- */}
        <FaChevronDown
          className={`
            h-5 w-5 shrink-0 text-blue-600
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </button>

      {/* --- The Animated Answer Panel --- */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96' : 'max-h-0'}
        `}
      >
        <p className="p-6 pt-0 text-gray-700">{answer}</p>
      </div>
    </div>
  );
}