import React, { useState } from 'react';
import {
  FaWhatsapp,
  FaSitemap,
  FaMousePointer,
  FaCalendarCheck,
  FaChartLine,
  FaCheck,
  FaCommentDots,
} from 'react-icons/fa';

// --- NEW ENHANCED VISUALS IN STEPS ARRAY ---
const steps = [
  {
    num: 1,
    title: 'Connect',
    text: 'Connect your WhatsApp Business account to ChatFlow AI in under 5 minutes. No code required.',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-8">
        <div className="flex items-center space-x-4">
          <FaWhatsapp className="text-7xl text-green-500" />
          <div className="flex h-1 w-12 bg-gray-300"></div>
          <span className="text-3xl font-bold text-blue-600">ChatFlow.AI</span>
        </div>
        <div className="mt-4 rounded-full bg-green-100 px-4 py-2 text-green-700">
          <FaCheck className="mr-2 inline" /> Connected
        </div>
      </div>
    ),
  },
  {
    num: 2,
    title: 'Create',
    text: 'Use our simple drag-and-drop workflow builder to design your ideal customer conversation flow.',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-8">
        <div className="flex space-x-3">
          <div className="rounded-lg border-2 border-dashed border-gray-400 bg-white p-4">
            <FaCommentDots className="text-3xl text-gray-500" />
          </div>
          <div className="flex h-1 w-10 self-center bg-gray-300"></div>
          <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-4 shadow-md">
            <FaSitemap className="text-3xl text-blue-600" />
          </div>
          <FaMousePointer className="relative -top-2 -right-1 text-3xl text-gray-700" />
        </div>
        <p className="mt-4 font-medium text-gray-600">Drag-and-Drop Builder</p>
      </div>
    ),
  },
  {
    num: 3,
    title: 'Trigger',
    text: 'Add powerful triggers for bookings, payments, or notifications. Integrate with your existing tools.',
    visual: (
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100 p-8">
        <p className="rounded-lg bg-white p-3 shadow-md">"Show me available slots..."</p>
        <div className="absolute right-8 top-20 z-10 rounded-lg bg-purple-100 p-6 shadow-xl">
          <FaCalendarCheck className="text-5xl text-purple-600" />
        </div>
        <p className="mt-2 rounded-lg bg-white p-3 shadow-md">"Here are the options..."</p>
      </div>
    ),
  },
  {
    num: 4,
    title: 'Launch',
    text: 'Go live! Sit back and watch as ChatFlow AI handles your customers, books appointments, and grows your business.',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-8">
        <div className="w-full max-w-xs">
          <div className="flex h-32 items-end space-x-3">
            <div className="h-1/3 w-1/4 rounded-t-lg bg-gray-300"></div>
            <div className="h-1/2 w-1/4 rounded-t-lg bg-gray-300"></div>
            <div className="h-full w-1/4 rounded-t-lg bg-blue-500"></div>
            <div className="h-3/4 w-1/4 rounded-t-lg bg-gray-300"></div>
          </div>
          <div className="h-1 w-full bg-gray-300"></div>
        </div>
        <p className="mt-4 font-medium text-gray-600">Live Analytics</p>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const activeStepData = steps.find((step) => step.num === activeStep);

  return (
    <section id="how" className="bg-gray-50 py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold">
          Get Started in 4 Simple Steps
        </h2>
        <p className="mb-16 text-center text-lg text-gray-600">
          From connection to conversation, all in minutes.
        </p>

        {/* --- Tab Buttons --- */}
        <div className="relative mb-8 flex w-full justify-between rounded-lg bg-gray-200 p-2">
          {steps.map((step) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`
                relative z-10 w-1/4 rounded-md py-3 text-center text-lg font-medium
                transition-colors duration-300
                ${
                  activeStep === step.num
                    ? 'text-white'
                    : 'text-gray-600 hover:text-black'
                }
              `}
            >
              <span className="hidden md:inline">{step.num}. {step.title}</span>
              <span className="md:hidden">{step.num}</span>
            </button>
          ))}
          <div
            className="absolute top-2 left-2 z-0 h-[calc(100%-1rem)] w-1/4 rounded-md bg-blue-600 shadow-md
              transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${(activeStep - 1) * 100}%)`,
            }}
          />
        </div>

        {/* --- Tab Content Area --- */}
        <div className="rounded-xl bg-white p-8 shadow-xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            
            {/* --- THIS IS THE FIX --- */}
            <div key={activeStepData.num} className="animate-[fadeIn_0.5s_ease-out_forwards]">
              <h3 className="mb-4 text-3xl font-bold text-blue-600">
                {activeStepData.title}
              </h3>
              <p className="text-xl text-gray-700">
                {activeStepData.text}
              </p>
            </div>

            {/* --- THIS IS THE FIX --- */}
            <div
              key={activeStepData.num + '-visual'}
              className="h-72 w-full animate-[fadeIn_0.5s_ease-out_forwards]"
            >
              {activeStepData.visual}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}