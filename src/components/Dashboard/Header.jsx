import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
// 1. Imports updated to match your new filenames
import NotificationDropdown from './NotificationDrop';
import MessageDropdown from './MassageDrop'; // Assuming "MassageDrop" was a typo for "MessageDrop"
import ProfileDropdown from './ProfileDrop';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const { currentUser } = useAuth(); 

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white shadow-sm border-b border-gray-200">
      <div className="flex grow items-center justify-between px-4 py-4 md:px-6 2xl:px-10">
        
        {/* --- Left Side: Hamburger (Mobile/Tablet) or Search (Desktop) --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* --- Hamburger Menu Button (Mobile & Tablet) --- */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            // 2. ALIGNMENT FIX: Now hidden on 'lg' and up
            className="z-50 block rounded-lg border border-gray-300 bg-white p-1.5 shadow-sm lg:hidden"
          >
            <Menu className="text-gray-700" size={24} />
          </button>

          {/* --- Search Bar (Desktop Only) --- */}
          {/* 3. ALIGNMENT FIX: Now hidden below 'lg' */}
          <div className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full max-w-xs pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* --- Right Side: Header Icons --- */}
        <div className=" flex justify-end items-center justify-items-center space-x-4">
          <ThemeToggle />
          <NotificationDropdown />
          <MessageDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}