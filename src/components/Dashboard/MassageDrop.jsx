import React, { useState, useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for messages
const messages = [
  {
    name: "Pawan Kushwaha",
    text: "Hey, can you check on the new booking?",
    time: "5m ago",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtIDaMD4yH_crArBVbJ0hR8jqK8z8eizIw&s"
  },
  {
    name: "Neha Sharma",
    text: "The new integration is ready for testing.",
    time: "1h ago",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBFy0j_72yEKBKNRbPbCzxfNxq1H9Y57ygg&s"
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1.0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

export default function MessageDropdown() {
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
        className="text-gray-500 hover:text-gray-700 theme-dark:text-gray-400 theme-dark:hover:text-white"
      >
        <Mail size={22} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdown}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 w-95 bg-white rounded-lg shadow-xl z-10 theme-dark:bg-gray-800 border theme-dark:border-gray-700"
          >
            <div className="p-4 border-b theme-dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 theme-dark:text-white">Messages</h4>
            </div>
            <ul className="divide-y theme-dark:divide-gray-700 max-h-80 overflow-y-auto">
              {messages.map((message, index) => (
                <li key={index} className="p-4 hover:bg-gray-50 theme-dark:hover:bg-gray-700/50">
                  <div className="flex space-x-3">
                    <img className="w-10 h-10 rounded-full" src={message.avatar} alt={message.name} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 theme-dark:text-white">{message.name}</p>
                      <p className="text-sm text-gray-600 theme-dark:text-gray-300 truncate">{message.text}</p>
                      <p className="text-xs text-gray-500 theme-dark:text-gray-400">{message.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-2 border-t theme-dark:border-gray-700">
              <a
                href="/dashboard/conversations"
                className="w-full block text-center text-sm text-blue-600 theme-dark:text-blue-400 hover:bg-gray-100 theme-dark:hover:bg-gray-700 p-2 rounded-md"
                role="button"
              >
                View all messages
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}