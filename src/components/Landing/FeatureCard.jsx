import React, { useState, useRef } from 'react';

export default function FeatureCard({ icon, title, desc }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    // Get position of cursor *relative* to the card
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create the radial gradient style
    const gradient = `radial-gradient(
      350px circle at ${x}px ${y}px,
      rgba(59, 130, 246, 0.4),
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
      className="group relative rounded-xl bg-gray-200 p-px shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
    >
      {/* --- The Gradient Spotlight ---
        - This div sits between the border (parent) and content (sibling)
        - Its 'style' is controlled by the component's state
      */}
      <div
        style={style}
        className="absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
      />

      {/* --- Inner Content Card ---
        - 'relative z-10' places it *above* the animated gradient
      */}
      <div className="relative z-10 h-full rounded-[11px] bg-white p-6">
        
        {/* --- Enhanced Icon --- */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:bg-blue-600">
          {/* We use React.cloneElement to add classes to the icon prop */}
          {React.cloneElement(icon, {
            className:
              'h-8 w-8 text-blue-600 transition-all duration-300 group-hover:text-white group-hover:scale-110',
          })}
        </div>
        
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}