import React from 'react';
import { FaComments, FaCalendarAlt, FaBrain, FaSyncAlt, FaChartBar, FaHeadset } from 'react-icons/fa';
import FeatureCard from './FeatureCard'; // We will create this new component

// Feature data remains the same
const features = [
  {
    icon: <FaComments />,
    title: 'Smart Chat Replies',
    desc: 'Instantly respond to customer queries using AI-powered chat logic.',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Auto Appointment Booking',
    desc: 'Let your customers book slots directly on WhatsApp.',
  },
  {
    icon: <FaBrain />,
    title: 'Custom AI Workflow',
    desc: 'Build automated flows for FAQs, service selection, and feedback.',
  },
  {
    icon: <FaSyncAlt />,
    title: 'CRM & Calendar Sync',
    desc: 'Integrate with Google Calendar, Notion, or CRM tools easily.',
  },
  {
    icon: <FaChartBar />,
    title: 'Analytics Dashboard',
    desc: 'Track your leads, response rate, and bookings in real time.',
  },
  
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold">
          Why ChatFlow AI?
        </h2>
        <p className="mb-16 text-center text-lg text-gray-600">
          Everything you need to automate your business and grow.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}