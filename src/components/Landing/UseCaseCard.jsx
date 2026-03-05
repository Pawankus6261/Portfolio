import React, { useState, useRef } from 'react';

export default function UseCaseCard({ icon, name }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    // Get position of cursor *relative* to the card
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create the radial gradient style for the "spotlight"
    const gradient = `radial-gradient(
      250px circle at ${x}px ${y}px,
      rgba(59, 130, 246, 0.2),
      transparent 80%
    )`;

    // Update the style state
    setStyle({
      background: gradient,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    // Fade the gradient out
    setStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group relative flex cursor-pointer flex-col items-center
        rounded-xl bg-white p-8 shadow-md
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-2
      "
    >
      {/* --- The Gradient Spotlight ---
        - Sits on top of the white bg, but behind the content (icon/text)
      */}
      <div
        style={style}
        className="absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
      />

      {/* --- Card Content ---
        - 'relative z-10' places this *above* the spotlight gradient
      */}
      <div className="relative z-10 flex flex-col items-center">
        {/* --- ENHANCED ICON --- */}
        <div
          className="
            flex h-24 w-24 items-center justify-center rounded-full
            bg-gray-100 text-blue-600 transition-all duration-300
            group-hover:bg-blue-600 group-hover:text-white
          "
        >
          {/* Clone the icon to add styling */}
          {React.cloneElement(icon, {
            className: 'h-10 w-10 transition-transform duration-300 group-hover:scale-110',
          })}
        </div>

        {/* --- ENHANCED TEXT --- */}
        <h3
          className="
            mt-6 text-lg font-semibold text-gray-800
            transition-colors duration-300 group-hover:text-blue-600
          "
        >
          {name}
        </h3>
      </div>
    </div>
  );
}