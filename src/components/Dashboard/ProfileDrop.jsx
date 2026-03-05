import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, CreditCard, LogOut, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const dropdownVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1.0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

export default function ProfileDropdown() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !trigger.current) return;
      if (!isOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <img
          className="w-9 h-9 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtIDaMD4yH_crArBVbJ0hR8jqK8z8eizIw&s"
          alt="User"
        />
        <div className="hidden sm:block text-left">
          <span className="font-medium text-sm text-gray-800 theme-dark:text-gray-200">{currentUser?.name || 'Business Owner'}</span>
          <span className="block text-xs text-gray-500 theme-dark:text-gray-400">{currentUser?.email}</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdown}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl z-10 theme-dark:bg-gray-800 border theme-dark:border-gray-700"
          >
            <div className="p-4 border-b border-gray-200 theme-dark:border-gray-700">
              <p className="font-medium text-gray-800 theme-dark:text-gray-200">Signed in as</p>
              <p className="font-semibold text-gray-900 theme-dark:text-white truncate">{currentUser?.email}</p>
            </div>
            <div className="p-2">
              <Link
                to="/dashboard/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md theme-dark:text-gray-300 theme-dark:hover:bg-gray-700"
              >
                <Settings size={18} />
                <span>Account Settings</span>
              </Link>
              <Link
                to="/dashboard/billing"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md theme-dark:text-gray-300 theme-dark:hover:bg-gray-700"
              >
                <CreditCard size={18} />
                <span>Billing</span>
              </Link>
              <Link
                to="/dashboard/help"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md theme-dark:text-gray-300 theme-dark:hover:bg-gray-700"
              >
                <HelpCircle size={18} />
                <span>Help Center</span>
              </  Link>
              <hr className="my-2 border-gray-200 theme-dark:border-gray-700" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-md theme-dark:hover:bg-red-500/10"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}