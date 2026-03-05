import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// --- 1. THIS WAS THE MISSING IMPORT ---
import { Link } from 'react-router-dom';

// Mock data for notifications
const notifications = [
  {
    icon: <MessageSquare size={20} className="text-blue-500" />,
    text: "Pawan Kushwaha sent you a message",
    time: "2m ago"
  },
  {
    icon: <Check size={20} className="text-green-500" />,
    text: "Your chatflow 'Booking Bot' is now active",
    time: "1h ago"
  },
  {
    icon: <MessageSquare size={20} className="text-blue-500" />,
    text: "Neha Sharma sent you a message",
    time: "3h ago"
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1.0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

export default function NotificationDropdown() {
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
        className="text-gray-500 hover:text-gray-700 relative theme-dark:text-gray-400 theme-dark:hover:text-white"
      >
        <Bell size={22} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdown}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10 theme-dark:bg-gray-800  theme-dark:border-gray-700"
          >
            <div className="p-4 bg-gray-100 rounded-t-lg theme-dark:bg-gray-800 theme-dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 theme-dark:text-white">Notifications</h4>
            </div>
            <ul className="divide-y theme-dark:divide-gray-700 max-h-80 overflow-y-auto">
              {notifications.map((notification, index) => (
                <li key={index} className="p-4 hover:bg-gray-50 theme-dark:hover:bg-gray-700/50">
                  <div className="flex space-x-3">
                    <div className="shrink-0">{notification.icon}</div>
                    <div>
                      <p className="text-sm text-gray-800 theme-dark:text-gray-200">{notification.text}</p>
                      <p className="text-xs text-gray-500 theme-dark:text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-2 bg-gray-100 theme-dark:bg-gray-800 theme-dark:border-gray-700">
              {/* --- 2. This Link will now work --- */}
              <Link
                to="/dashboard/notifications"
                onClick={() => setIsOpen(false)} // Close dropdown on click
                className="block w-full text-center text-sm text-blue-600 theme-dark:text-blue-400 hover:bg-gray-100 theme-dark:hover:bg-gray-700 p-2 rounded-md"
              >
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}