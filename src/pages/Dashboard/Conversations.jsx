import React from 'react';
import { Search, Send, User } from 'lucide-react';
// 1. Import motion
import { motion } from 'framer-motion';

// 2. Define animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const messageItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function ConversationsPage() {
  return (
    <div>
      {/* 3. Animate the h1 */}
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Conversations
      </motion.h1>

      {/* 4. Animate the main chat container */}
      <motion.div 
        className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow-lg overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        {/* Chat List (Left) */}
        <div className="w-1/3  flex flex-col">
          <div className="p-4 h-20 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          {/* 5. Animate the chat list items */}
          <motion.div 
            className="flex-1 overflow-y-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Mock Chat Item */}
            <motion.div variants={staggerItem}>
              {/* STYLES FIXED: Added bg-blue-500/10 for dark mode compatibility */}
              <div className="p-4 flex items-center space-x-3  hover:bg-gray-200 cursor-pointer theme-dark:bg-blue-500/10  ">
                <User className="w-10 h-10 p-2 bg-gray-200 text-gray-600 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-900">Pawan Kushwaha</h3>
                  <p className="text-sm text-gray-600 truncate">Great! We have slots open...</p>
                </div>
              </div>
            </motion.div>
            {/* Mock Chat Item 2 */}
            <motion.div variants={staggerItem}>
              <div className="p-4 flex items-center space-x-3  hover:bg-gray-200 cursor-pointer">
                <User className="w-10 h-10 p-2 bg-gray-200 text-gray-600 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-900">+91 12345 67890</h3>
                  <p className="text-sm text-gray-600 truncate">Book a table for 2 please.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Chat Viewer (Right) */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 h-20 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Pawan Kushwaha</h2>
            <p className="text-sm text-green-500">Active</p>
          </div>
          
          {/* 6. Animate the messages */}
          <motion.div 
            className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* STYLES FIXED: Added theme-dark styles to message bubbles */}
            <motion.div variants={messageItem} className="flex justify-start">
              <div className="bg-gray-200 theme-dark:bg-gray-700 p-3 rounded-lg max-w-lg text-gray-900">Hi! How can I help?</div>
            </motion.div>
            <motion.div variants={messageItem} className="flex justify-end">
              <div className="bg-blue-600 text-white p-3 rounded-lg max-w-lg">I'd like to book a haircut.</div>
            </motion.div>
            <motion.div variants={messageItem} className="flex justify-start">
              <div className="bg-gray-200 theme-dark:bg-gray-700 p-3 rounded-lg max-w-lg text-gray-900">Great! We have slots open tomorrow at 2:00 PM and 4:00 PM. Which do you prefer?</div>
            </motion.div>
          </motion.div>

          {/* Input */}
          <div className="p-4 bg-white">
            <div className="relative">
              <input type="text" placeholder="Type a message to take over..." className="w-full pr-12 pl-4 py-3 border rounded-full bg-gray-100"/>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}