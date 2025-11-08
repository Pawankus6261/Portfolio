import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Zap } from 'lucide-react';
import Features from '../../components/Landing/Features';
import ContactForm from '../../components/Landing/Contact';

// --- Animation Variant (from your LandingPage) ---
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

// --- Team Card Component ---
const TeamCard = ({ avatar, name, title }) => (
  <div className="text-center">
    <img 
      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
      src={avatar}
      alt={name}
    />
    <h3 className="mt-4 text-xl font-semibold text-gray-900">{name}</h3>
    <p className="text-blue-600">{title}</p>
  </div>
);

// --- Main About Us Page Component ---
export default function AboutUsPage() {
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
          <p className="text-base font-semibold text-blue-600">OUR STORY</p>
          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            We're building the future of automated conversation.
          </h1>
          <p className="mt-6 text-xl text-gray-700">
            ChatFlow AI started with a simple idea: to help businesses connect with their customers instantly and intelligently, 24/7.
          </p>
        </div>
      </motion.div>
      
      {/* --- 2. Mission & Vision Section --- */}
      <motion.section 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-24"
      >
        <div className="container mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Mission */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Our Mission</h2>
            <p className="mt-2 text-gray-600">
              To empower businesses of all sizes to build extraordinary customer relationships through seamless, AI-powered automation.
            </p>
          </div>
          {/* Vision */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Rocket className="w-8 h-8" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Our Vision</h2>
            <p className="mt-2 text-gray-600">
              A future where no customer has to wait for an answer, and every business can scale its support effortlessly.
            </p>
          </div>
          {/* Values */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Our Values</h2>
            <p className="mt-2 text-gray-600">
              Innovation, Customer-Obsession, and Simplicity. We build powerful tools that are easy for everyone to use.
            </p>
          </div>
        </div>
      </motion.section>

      {/* --- 3. Team Section --- */}
      <motion.section 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-gray-50 py-24"
      >
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-bold">Meet the Team</h2>
          <p className="mt-4 text-lg text-gray-600">The minds behind the magic.</p>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <TeamCard name="Pawan Kushwaha" title="Founder & CEO" avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtIDaMD4yH_crArBVbJ0hR8jqK8z8eizIw&s" />
            <TeamCard name="Neha Sharma" title="Head of Engineering" avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBFy0j_72yEKBKNRbPbCzxfNxq1H9Y57ygg&s" />
            <TeamCard name="Raj Singh" title="Lead Designer" avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxHa-KJ-5CHqlzCizT29X2IKzUKJJWcL0EqQ&s" />
            <TeamCard name="Mason Rivera" title="Product Manager" avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5A_n_8GdSA_6HINZjGenZWcOUii51Y6Rgw&s" />
          </div>
        </div>
      </motion.section>

      {/* --- 4. "Why Choose Us" (Reusing Features) --- */}
      {/* This component is already animated! */}
      <Features />

      {/* --- 5. CTA (Reusing ContactForm) --- */}
      {/* This component is also animated! */}
      <ContactForm />
    </div>
  );
}