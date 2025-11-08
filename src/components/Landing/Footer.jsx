import React from 'react';
import { Link } from 'react-router-dom';
// Import icons for social media
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-6 py-16">
        
        {/* --- Top Section: 4-Column Grid --- */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          {/* Column 1: Logo & Info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-600">
            ChatFlow<span className="bg-linear-to-br from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">.AI</span>
          </Link>
            <p className="mt-4 text-gray-600">
              Automate conversations and grow your business.
            </p>
            <p className="mt-4 text-gray-600">✉️ support@chatflowai.in</p>
            <p className="mt-2 text-gray-600">📍 Bhopal, India</p>
          </div>
          
          {/* Column 2: Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
              <li><a href="#how" className="text-gray-600 hover:text-blue-600">How It Works</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-blue-600">FAQs</a></li>
            </ul>
          </div>
          
          {/* Column 3: Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="/about-us" className="text-gray-600 hover:text-blue-600">About Us</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a></li>
              <li><a href="/blog" className="text-gray-600 hover:text-blue-600">Blog</a></li>
            </ul>
          </div>
          
          {/* Column 4: Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="/privacy-policy" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
              <li><a href="/help" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        {/* --- Bottom Section: Copyright & Socials --- */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            
            {/* Copyright */}
            <p className="text-gray-600">
              © 2025 ChatFlow AI. All rights reserved.
            </p>
            
            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-6 sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-blue-600" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Crafted by (kept it, but made it subtle) */}
          <p className="mt-6 text-center text-sm text-gray-500 sm:text-right">
            Crafted with ❤️ by Pawan Kushwaha
          </p>
        </div>
        
      </div>
    </footer>
  );
}