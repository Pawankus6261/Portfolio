import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Check, Users } from 'lucide-react';

// Mock data for a fuller notification list
const allNotifications = [
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
  {
    icon: <Users size={20} className="text-indigo-500" />,
    text: "You have 3 new customers today",
    time: "8h ago"
  },
  {
    icon: <Check size={20} className="text-green-500" />,
    text: "AI Training is 100% complete",
    time: "1d ago"
  },
];

const staggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Notifications</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <ul className="divide-y theme-dark:divide-gray-700">
          {allNotifications.map((notification, index) => (
            <motion.li 
              key={index} 
              className="p-4 hover:bg-gray-50 theme-dark:hover:bg-gray-700/50"
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }} // Stagger animation
            >
              <div className="flex space-x-4">
                <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                <div>
                  <p className="text-sm text-gray-800 theme-dark:text-gray-200">{notification.text}</p>
                  <p className="text-xs text-gray-500 theme-dark:text-gray-400">{notification.time}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}