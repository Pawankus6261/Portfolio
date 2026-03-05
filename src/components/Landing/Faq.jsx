import React, { useState } from 'react';
import FaqItem from './FaqItem'; // We will create this component next

// --- Your FAQ Data ---
const faqs = [
  {
    question: 'Do I need technical skills to use ChatFlow AI?',
    answer: 'No, not at all! Our platform is built with a simple, no-code, drag-and-drop interface. If you can send an email, you can build a powerful chatbot.',
  },
  {
    question: 'Can I integrate this with my existing calendar or CRM?',
    answer: 'Yes! We have native integrations with Google Calendar, Notion, HubSpot, and many more. You can also connect to thousands of other apps via our Zapier integration.',
  },
  {
    question: 'What happens if the AI doesn\'t know the answer?',
    answer: 'Our "Live Handoff" feature is built for this. You can set a trigger (like if a user types "talk to human") that instantly pauses the bot and notifies a real person on your team to take over the chat.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption for all data, both in transit and at rest. Your customer data and conversations are 100% secure and private.',
  },
];

export default function Faq() {
  // This state will hold the index of the *one* open item
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    // If the clicked item is already open, close it (set to null)
    // Otherwise, open the clicked item
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="mb-16 text-center text-lg text-gray-600">
          Quick answers to the questions we get the most.
        </p>
        
        {/* This is the list of FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index} // Is this item the one that's open?
              onClick={() => toggleFaq(index)} // Pass the toggle function
            />
          ))}
        </div>
      </div>
    </section>
  );
}