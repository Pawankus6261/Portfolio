import React from 'react';
import { motion } from 'framer-motion';

import Hero from '../../components/Landing/Hero';
import Features from '../../components/Landing/Features';
import HowItWorks from '../../components/Landing/HowItWorks';
import UseCases from '../../components/Landing/UseCases';
import Pricing from '../../components/Landing/Pricing';
import Testimonials from '../../components/Landing/Testimonials';
import ContactForm from '../../components/Landing/Contact';
import Faq from '../../components/Landing/Faq';

// --- No changes to your variants ---
const fadeUp = {
  hidden: { 
    opacity: 0,
    y: 30 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function LandingPage() {
  
  // --- No changes to this helper component ---
  const AnimatedSection = ({ variants, children }) => {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      {/* --- THIS IS THE CHANGE ---
        We wrap the Hero in a 'motion.div' but use
        'animate="visible"' instead of 'whileInView'
        to make it animate on page load.
      */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <Hero />
      </motion.div>

      {/* All other sections stay the same */}
      <AnimatedSection variants={fadeUp}>
        <Features />
      </AnimatedSection>
      
      <AnimatedSection variants={fadeLeft}>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <UseCases />
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <Pricing />
      </AnimatedSection>

      <AnimatedSection variants={fadeLeft}>
        <Testimonials />
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <ContactForm />
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <Faq />
      </AnimatedSection>
    </>
  );
}