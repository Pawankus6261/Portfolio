import React, { useMemo, useState, useRef } from 'react';
import { Bot, User, Send, Phone, Video, Smile, Paperclip, Check } from 'lucide-react';

// --- Chat Bubble Component ---
const ChatBubble = ({ message, time, isBot, status }) => (
  <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
    <div
      className={`relative max-w-xs rounded-lg px-3 py-2 shadow-sm ${
        isBot
          ? 'bg-white text-gray-800 rounded-bl-none'
          : 'bg-linear-to-br from-green-400 to-emerald-500 text-white rounded-br-none'
      }`}
    >
      <p className="text-sm">{message}</p>
      {/* Timestamp and Status (like 'seen') */}
      <div className="mt-1 flex items-center justify-end space-x-1">
        <p className={`text-xs ${isBot ? 'text-gray-400' : 'text-emerald-100/80'}`}>
          {time}
        </p>
        {!isBot && status === 'seen' && (
          <Check size={14} className="text-blue-300" />
        )}
      </div>
    </div>
  </div>
);

// --- Typing Indicator Component ---
const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex items-center space-x-1.5 rounded-lg rounded-bl-none bg-white px-3 py-3 shadow-sm">
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300"></div>
    </div>
  </div>
);

// --- Mockup Data ---
const chatData = {
  salon: {
    avatar: 'https://placehold.co/100x100/F9A8D4/C83781?text=NS',
    name: "Neha's Salon",
    status: 'online',
    messages: [
      { isBot: true, msg: "Hi! Welcome to Neha's Salon. How can I help you today? (Booking, Services, etc.)", time: '10:30 AM' },
      { isBot: false, msg: "I'd like to book a haircut.", time: '10:31 AM' },
      { isBot: true, msg: 'Great! We have slots open tomorrow at 2:00 PM and 4:00 PM. Which do you prefer?', time: '10:31 AM' },
    ],
  },
  doctor: {
    avatar: 'https://placehold.co/100x100/A5B4FC/312E81?text=DC',
    name: 'Dr. Verma\'s Clinic',
    status: 'online',
    messages: [
      { isBot: true, msg: 'Hello, this is Dr. Verma\'s Clinic. How can we assist you?', time: '09:15 AM' },
      { isBot: false, msg: 'Hi, I need to book a follow-up appointment for this Friday.', time: '09:16 AM' },
      { isBot: true, msg: 'Certainly. Dr. Verma is available at 11:00 AM or 3:00 PM. Which time works for you?', time: '09:16 AM' },
    ],
  },
  restaurant: {
    avatar: 'https://placehold.co/100x100/FDBA74/9A3412?text=DH',
    name: 'The Dosa Hub',
    status: 'online',
    messages: [
      { isBot: true, msg: 'Welcome to The Dosa Hub! 🥞 Would you like to place an order or book a table?', time: '6:30 PM' },
      { isBot: false, msg: 'Book a table for 2 tonight, please.', time: '6:31 PM' },
      { isBot: true, msg: 'We have a table available at 7:30 PM. Does that sound good?', time: '6:31 PM' },
      { isBot: false, msg: 'Perfect, see you then!', time: '6:32 PM', status: 'seen' },
    ],
  },
};

// --- Main Mockup Component ---
export default function ProductMockup({ scenario = 'salon' }) {
  const data = useMemo(() => chatData[scenario] || chatData.salon, [scenario]);

  const [messages, setMessages] = useState(data.messages);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // --- 1. State and Ref for 3D mouse effect ---
  const mockupRef = useRef(null);
  const defaultTransform = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.9)',
    transition: 'transform 0.5s ease-in-out'
  };
  const [transformStyle, setTransformStyle] = useState(defaultTransform);
  // --- End of State ---

  const handleSend = (e) => {
// ... (existing handleSend function) ...
    e.preventDefault();
    const newMesssage = inputValue.trim();
    if (!newMesssage) return;

    // 1. Add user's message
    setMessages([
      ...messages,
      { isBot: false, msg: newMesssage, time: '10:32 AM', status: 'seen' }
    ]);
    setInputValue(''); // Clear input
    setIsBotTyping(true); // Bot starts "typing"

    // 2. Simulate bot reply
    setTimeout(() => {
      let botReply = "Sorry, I'm not sure how to help with that.";
      if (newMesssage.toLowerCase().includes('hello') || newMesssage.toLowerCase().includes('hi')) {
        botReply = "Hello! How can I assist you today?";
      } else if (newMesssage.toLowerCase().includes('booking') || newMesssage.toLowerCase().includes('book')) {
        botReply = "Sure, I can help with that. What day are you looking for?";
      }

      setIsBotTyping(false); // Bot stops typing
      setMessages(prev => [
        ...prev,
        { isBot: true, msg: botReply, time: '10:32 AM' }
      ]);
    }, 1500); // 1.5 second delay
  };

  // --- 2. Mouse move and leave handlers ---
  const handleMouseMove = (e) => {
    if (!mockupRef.current) return;

    const rect = mockupRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { width, height } = rect;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Map mouse position to rotation (max 15 degrees)
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.95)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle(defaultTransform); // Reset to default on leave
  };
  // --- End of handlers ---

  return (
    // --- 3. Apply event handlers and style to wrapper ---
    <div
      className="mx-auto max-w-4xl "
      ref={mockupRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
    >
      <div
        className="
          transform-gpu rounded-2xl border border-gray-200 bg-white shadow-2xl
          transition-all duration-300
          // --- 4. Removed static transform classes ---
        "
      >
        {/* --- 2. Enhanced WhatsApp-style Header --- */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2.5 rounded-t-2xl">
          <div className="flex items-center">
            <img
              className="h-9 w-9 rounded-full object-cover"
              src={data.avatar}
              alt={data.name}
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-900">{data.name}</p>
              <p className="text-xs font-medium text-green-500">{data.status}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <Video size={20} />
            <Phone size={20} />
          </div>
        </div>

        {/* --- 3. Chat Window (Made smaller) --- */}
        <div className="flex h-80 flex-col bg-green-50/50 p-4" style={{
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAHYCAMAAACOi/FvAAAAA1BMVEX/8/Rk0FqfAAAAJElEQVR42u3BAQEAAACAkP6fzggQwIEBvAABAgQIECBAgAABAgQIECBAYgGgX7Gq5gAAAABJRU5ErkJggg==")',
          backgroundRepeat: 'repeat',
          backgroundSize: '360px 337px',
          opacity: 1,
        }}>
          {/* --- Render messages from state --- */}
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            {messages.map((chat, index) => (
              <ChatBubble
                key={index}
                message={chat.msg}
                time={chat.time}
                isBot={chat.isBot}
                status={chat.status}
              />
            ))}
            {/* 4. Show Typing Indicator if bot is typing */}
            {isBotTyping && <TypingIndicator />}
          </div>
          
          {/* --- 5. Interactive Input Bar (wrapped in a form) --- */}
          <form onSubmit={handleSend} className="mt-4 flex items-center space-x-2">
            <div className="flex flex-1 items-center rounded-full bg-white px-4 py-2 shadow-sm">
              <Smile size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Message..."
                value={inputValue} // Set value from state
                onChange={(e) => setInputValue(e.target.value)} // Update state on change
                className="ml-2 w-full flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
              <Paperclip size={20} className="ml-2 text-gray-400" />
            </div>
            <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-500 text-white shadow-md">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

