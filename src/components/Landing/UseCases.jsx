import React from 'react';
import { FaStethoscope, FaUtensils, FaSchool, FaBriefcase } from 'react-icons/fa';
import UseCaseCard from './UseCaseCard'; // 1. We will create this new component

// We pass the base icon component, just like for Features
const useCases = [
  { icon: <FaStethoscope />, name: 'Clinics & Salons' },
  { icon: <FaUtensils />, name: 'Restaurants & Cafes' },
  { icon: <FaSchool />, name: 'Education Centers' },
  { icon: <FaBriefcase />, name: 'Agencies & Freelancers' },
];

export default function UseCases() {
  return (
    <section id="usecases" className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-4 text-center text-4xl font-bold">
          Perfect For Any Business
        </h2>
        <p className="mb-16 text-center text-lg text-gray-600">
          From local shops to professional agencies, ChatFlow AI is built to adapt.
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {useCases.map((useCase) => (
            // 2. Render the new, dedicated card component
            <UseCaseCard
              key={useCase.name}
              icon={useCase.icon}
              name={useCase.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}