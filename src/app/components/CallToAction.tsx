import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const scaleUp = {
  initial: { scale: 0.9 },
  animate: { scale: 1 },
  transition: { duration: 0.3 }
};

const CTASection = () => {
  return (
    <section className="bg-black py-20 text-center relative font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.18),_transparent_35%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-6 font-sans" 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Let's create something amazing together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-sans"
        >
          We're ready to bring your ideas to life with our innovative solutions.
        </motion.p>
        <Link href="/contact">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ duration: 0.35 }}
            className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-300 hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 font-sans"
          >
            Contact Us <ArrowRight className="w-5 h-5 inline-block ml-2" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
