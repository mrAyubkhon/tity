import React from 'react';
import { motion } from 'framer-motion';

const Quotes = () => {
  const quotes = [
    {
      text: "Elegance is the only beauty that never fades.",
      author: "Audrey Hepburn"
    },
    {
      text: "Style is a way to say who you are without having to speak.",
      author: "Rachel Zoe"
    },
    {
      text: "Luxury is not a necessity, but it is a privilege that brings joy.",
      author: "Unknown"
    }
  ];

  return (
    <section id="quotes" className="section-padding bg-gradient-to-br from-luxury-red/5 to-elegant-red/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary text-luxury-red mb-4">
            Words of Wisdom
          </h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-luxury-red mx-auto rounded-full"
          ></motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="luxury-card p-8 lg:p-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-luxury-red rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </motion.div>
                
                <blockquote className="text-2xl lg:text-3xl font-elegant font-medium text-gray-800 mb-6 leading-relaxed">
                  "{quote.text}"
                </blockquote>
                
                <cite className="text-lg text-luxury-red font-medium not-italic">
                  — {quote.author}
                </cite>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-4 h-4 border border-luxury-red/30 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-6 h-6 border border-luxury-red/30 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-20 w-2 h-2 bg-luxury-red/20 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-20 w-3 h-3 bg-luxury-red/20 rounded-full"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
