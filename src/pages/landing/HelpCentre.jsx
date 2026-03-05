import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  BookOpen, // For Getting Started
  Brain, // For AI
  CreditCard, // For Billing
  Plug, // For Integrations
  User, // For Account
  LifeBuoy, // For Support
  ArrowRight
} from 'lucide-react';

// --- Reusable FaqItem (from your components/Landing/FaqItem.jsx) ---
function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`
            h-5 w-5 shrink-0 text-blue-600
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96' : 'max-h-0'}
        `}
      >
        <p className="p-6 pt-0 text-gray-700">{answer}</p>
      </div>
    </div>
  );
}

// --- Reusable TopicCard (styled like your FeatureCard.jsx) ---
const TopicCard = ({ icon, title, desc }) => (
  <div className="group relative rounded-xl bg-gray-200 p-px shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
    <div className="relative z-10 h-full rounded-[11px] bg-white p-6">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:bg-blue-600">
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

// --- Animation Variant (from your LandingPage.jsx) ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// --- FAQ Data (for potential customers) ---
const faqs = [
  {
    question: 'Do I need technical skills to use ChatFlow AI?',
    answer: 'No, not at all! Our platform is built with a simple, no-code, drag-and-drop interface. If you can send an email, you can build a powerful chatbot.',
  },
  {
    question: 'What platforms do you support?',
    answer: 'We have native support for WhatsApp, Facebook Messenger, Instagram, and a widget you can embed on any website.',
  },
  {
    question: 'Can I integrate this with my existing calendar or CRM?',
    answer: 'Yes! Our "Business" plan includes integrations for Google Calendar, HubSpot, Notion, and you can connect to thousands of other apps via Zapier.',
  },
  {
    question: 'What happens if I go over my monthly chat limit?',
    answer: 'We will notify you when you get close to your limit. If you go over, we will charge a small per-message fee. You can also upgrade to the next plan at any time.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer a 7-day free demo for you to test all the features of our "Business" plan. You can sign up from our "Get Free Demo" page.',
  },
];

export default function LandingHelpCenter() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="overflow-hidden">
      
      {/* --- 1. Hero Section --- */}
      <motion.div 
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 text-center"
      >
        <div className="container mx-auto max-w-4xl px-6">
          
          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            How can we help?
          </h1>
          <p className="mt-6 text-xl text-gray-700">
            Have questions? We're here to help. Find answers to your questions about our product, pricing, and more.
          </p>
          <div className="relative mt-8 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search for answers (e.g., 'whatsapp')"
              className="w-full rounded-full py-4 pl-12 pr-6 text-lg border border-gray-300 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </motion.div>
      
      {/* --- 2. Topics Section --- */}
      <motion.section 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="mb-16 text-center text-4xl font-bold">
            Browse by Topic
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TopicCard
              icon={<BookOpen />}
              title="Getting Started"
              desc="Learn the basics of ChatFlow.AI and how to set up your account."
            />
            <TopicCard
              icon={<Brain />}
              title="AI & Training"
              desc="How our AI works and how you can train it with your data."
            />
            <TopicCard
              icon={<CreditCard />}
              title="Pricing & Billing"
              desc="Find answers about our plans, pricing, and managing your subscription."
            />
            <TopicCard
              icon={<Plug />}
              title="Integrations"
              desc="Connect ChatFlow.AI to WhatsApp, Google Calendar, and more."
            />
            <TopicCard
              icon={<User />}
              title="Account"
              desc="Manage your profile, team members, and account security."
            />
            <TopicCard
              icon={<LifeBuoy />}
              title="Support"
              desc="Learn how to contact our support team and get help."
            />
          </div>
        </div>
      </motion.section>

      {/* --- 3. FAQ Section --- */}
      <motion.section 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-gray-50 py-24"
      >
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-center text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mb-16 text-center text-lg text-gray-600">
            Quick answers to the questions we get the most.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- 4. Contact CTA --- */}
      <motion.section 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-white py-24"
      >
        <div className="container mx-auto max-w-4xl px-6">
          <div className="rounded-xl bg-blue-600 p-12 text-center shadow-xl">
            <h2 className="text-4xl font-bold text-white">
              Still have questions?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Get in touch with our team and we'll be happy to help you.
            </p>
            <Link
              to="/demo"
              className="
                mt-8 inline-flex items-center justify-center space-x-2 rounded-lg bg-white
                px-6 py-3 text-base font-medium text-blue-600 shadow-lg
                transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5
              "
            >
              <span className="whitespace-nowrap">Contact Sales</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}