import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Phone, Video, Send, Mic, Paperclip } from 'lucide-react';

// Mock data for activity
const activities = [
  { 
    user: { name: 'Floyd Miles', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNQnBvT-T2yD-s_n1qK-2a1-3_b4w-j-RA&s' }, 
    action: 'Commented on', 
    target: 'Stark Project',
    message: "Hi! Next week we'll start a new project. I'll tell you all the details later",
    time: '10:15 AM' 
  },
  { 
    user: { name: 'Guy Hawkins', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxHa-KJ-5CHqlzCizT29X2IKzUKJJWcL0EqQ&s' }, 
    action: 'Added a file to', 
    target: '7Heros Project',
    file: { name: 'Homepage.fig', size: '13.4 MB' },
    time: '10:15 AM' 
  },
  { 
    user: { name: 'Kristin Watson', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBFy0j_72yEKBKNRbPbCzxfNxq1H9Y57ygg&s' }, 
    action: 'Commented on', 
    target: '7Heros Project',
    message: null,
    time: '10:15 AM' 
  },
];

export default function ActivityFeed() {
  const { currentUser } = useAuth();

  return (
    <aside className="hidden lg:flex w-80 h-screen bg-white border-l border-gray-200 p-6 flex-col">
      {/* Profile Card */}
      <div className="flex flex-col items-center">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtIDaMD4yH_crArBVbJ0hR8jqK8z8eizIw&s"
          alt={currentUser?.name}
        />
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{currentUser?.name}</h3>
        <p className="text-sm text-gray-500">{currentUser?.email}</p>
        <div className="flex space-x-4 mt-4">
          <button className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
            <Phone size={18} />
          </button>
          <button className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
            <Video size={18} />
          </button>
        </div>
      </div>

      <hr className="my-6" />

      {/* Activity Section */}
      <div className="flex-1 overflow-y-auto">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Activity</h4>
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div key={index} className="flex space-x-3">
              <img className="w-10 h-10 rounded-full" src={activity.user.avatar} alt={activity.user.name} />
              <div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{activity.user.name}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-semibold text-blue-600">{activity.target}</span>
                </p>
                {activity.message && (
                  <div className="mt-1 bg-blue-50 p-3 rounded-lg rounded-tl-none text-sm text-gray-700">
                    {activity.message}
                  </div>
                )}
                {activity.file && (
                  <div className="mt-1 bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">{activity.file.name}</p>
                    <p className="text-xs text-gray-500">{activity.file.size}</p>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Write a message"
            className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
            <button className="p-2 text-gray-500 hover:text-gray-800">
              <Paperclip size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-800">
              <Mic size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}