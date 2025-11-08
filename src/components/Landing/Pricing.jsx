import React, { useState } from 'react';
import PricingCard from './PricingCard'; // We're passing a new prop to this

// --- UPDATED PLANS ARRAY ---
// - No more "Free" plan
// - "Pro" is now 'popular'
// - Prices are objects with 'monthly' and 'annual'
// - Added "Enterprise" plan with a 'Custom' price
const plans = [
  {
    name: 'Pro',
    price: { monthly: '₹499', annual: '₹4,990' }, // 12 months for the price of 10
    desc: 'For small businesses & clinics',
    popular: true,
    features: [
      '500 chats/month',
      '2 WhatsApp Numbers',
      'Auto Appointment Booking',
      'Analytics Dashboard',
      'Custom AI Workflows',
    ],
  },
  {
    name: 'Business',
    price: { monthly: '₹999', annual: '₹9,990' }, // 12 months for the price of 10
    desc: 'For agencies & scaling teams',
    features: [
      'Unlimited chats',
      '5 WhatsApp Numbers',
      'All "Pro" Features',
      'CRM & Calendar Integrations',
      'Team Inbox & Live Handoff',
      'Priority Support',
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annual: 'Custom' }, // Special case
    desc: 'For large-scale, custom needs',
    features: [
      'All "Business" Features',
      'Dedicated Account Manager',
      'Custom Integrations',
      'On-premise Deployment Option',
      '24/7/365 Support',
    ],
  },
];

export default function Pricing() {
  // --- ADDED STATE FOR TOGGLE ---
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-4 text-center text-4xl font-bold">
          Choose the Right Plan For You
        </h2>
        <p className="mb-12 text-center text-lg text-gray-600">
          Simple, transparent pricing. No hidden fees.
        </p>

        {/* --- ADDED TOGGLE SWITCH --- */}
        <div className="mb-12 flex items-center justify-center space-x-4">
          <span className={`font-medium ${!isAnnual ? 'text-blue-600' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`
              relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none
              ${isAnnual ? 'bg-blue-600' : 'bg-gray-300'}
            `}
          >
            <span
              className={`
                inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
                transition-transform duration-200 ease-in-out
                ${isAnnual ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
          <span className={`font-medium ${isAnnual ? 'text-blue-600' : 'text-gray-500'}`}>
            Annual
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
              Save 2 months
            </span>
          </span>
        </div>

        {/* --- GRID UPDATED (passes isAnnual prop) --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isAnnual={isAnnual}
            />
          ))}
        </div>
      </div>
    </section>
  );
}