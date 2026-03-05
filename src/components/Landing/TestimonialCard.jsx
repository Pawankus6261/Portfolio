import React from 'react';

export default function TestimonialCard({ testimonial }) {
  const { quote, name, title, avatar } = testimonial;

  return (
    <div
      className="
        flex h-full w-80 shrink-0 flex-col justify-between
        rounded-lg border border-gray-200 bg-white p-6 shadow-md
      "
    >
      {/* --- Quote Body --- */}
      <p className="text-lg text-gray-700">
        “{quote}”
      </p>

      {/* --- Author Info (at the bottom) --- */}
      <div className="mt-6 flex items-center">
        <div className="h-12 w-12 shrink-0">
          <img
            className="h-full w-full rounded-full object-cover"
            src={avatar}
            alt={name}
          />
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
}