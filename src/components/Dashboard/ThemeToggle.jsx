import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('Toggle button clicked! Changing theme.');
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle} // Use the new handler
      className="
        text-gray-500 hover:text-gray-700 
        relative h-9 w-9 flex items-center justify-center rounded-full
        hover:bg-gray-100
      "
    >
      <Sun 
        size={22} 
        className={`
          transition-all duration-300 transform
          ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}
        `}
      />
      <Moon 
        size={22} 
        className={`
          absolute transition-all duration-300 transform
          ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}
        `}
      />
    </button>
  );
}