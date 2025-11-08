import React, { useState } from 'react';
// 1. Import Link
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
// 2. Import lucide-react icon
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* 3. Changed <a> to <Link> */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ChatFlow<span className="bg-linear-to-br from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">.AI</span>
          </Link>

          {/* --- Desktop Navigation (with underline) --- */}
          <div className="hidden items-center space-x-6 md:flex">
            <nav className="space-x-6">
              <a href="#features" className="group relative py-2 text-gray-600 hover:text-blue-600">
                Why ChatFlow?
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-blue-600 transition-all duration-300 group-hover:scale-x-100"></span>
              </a>
              <a href="#how" className="group relative py-2 text-gray-600 hover:text-blue-600">
                How It Works
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-blue-600 transition-all duration-300 group-hover:scale-x-100"></span>
              </a>
              <a href="#usecases" className="group relative py-2 text-gray-600 hover:text-blue-600">
                Use Cases
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-blue-600 transition-all duration-300 group-hover:scale-x-100"></span>
              </a>
              <a href="#pricing" className="group relative py-2 text-gray-600 hover:text-blue-600">
                Pricing
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-blue-600 transition-all duration-300 group-hover:scale-x-100"></span>
              </a>
              <a href="#faq" className="group relative py-2 text-gray-600 hover:text-blue-600">
                FAQs
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-blue-600 transition-all duration-300 group-hover:scale-x-100"></span>
              </a>
            </nav>
            {/* 4. Changed <a> to <Link> */}
            <Link
              to="/demo"
              className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700"
            >
              <span>Get Free Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* --- Mobile Menu Button (Hamburger) --- */}
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {/* --- NEW Mobile Menu Panel (Slides from top) --- */}
      <div
        className={`
          fixed top-16 left-0 right-0 z-45 border-b border-gray-200 bg-white/95 shadow-lg
          backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        `}
      >
        {/* Mobile Nav Links (Left-aligned) */}
        <nav className="flex flex-col space-y-4 p-6">
          <a href="#features" className="block text-lg font-medium text-gray-700 hover:text-blue-600" onClick={closeMenu}>
            Why ChatFlow?
          </a>
          <a href="#how" className="block text-lg font-medium text-gray-700 hover:text-blue-600" onClick={closeMenu}>
            How It Works
          </a>
          <a href="#usecases" className="block text-lg font-medium text-gray-700 hover:text-blue-600" onClick={closeMenu}>
            Use Cases
          </a>
          <a href="#pricing" className="block text-lg font-medium text-gray-700 hover:text-blue-600" onClick={closeMenu}>
            Pricing
          </a>
          <a href="#faq" className="block text-lg font-medium text-gray-700 hover:text-blue-600" onClick={closeMenu}>
            FAQs
          </a>
          
          {/* 5. Changed <a> to <Link> */}
          <Link
            to="/demo"
            className="
              mt-4 flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-center
              text-lg font-medium text-white shadow-md transition-all hover:bg-blue-700
            "
            onClick={closeMenu}
          >
            <span>Get Free Demo</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </nav>
      </div>

      {/* --- Background Overlay (for when menu is open) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}

