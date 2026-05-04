import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left hover:text-[#C5A267] transition-all duration-300 group"
      >
        <span className="font-black uppercase text-sm sm:text-base tracking-tight group-hover:pl-2 transition-all duration-300">
          {question}
        </span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? '#C5A267' : '#000' }}
          className="text-3xl font-light leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: { height: { duration: 0.4 }, opacity: { duration: 0.3, delay: 0.1 } }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } }
            }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-zinc-500 leading-relaxed max-w-2xl text-sm sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQs = () => {
  const faqs = [
    { 
      question: "What are your delivery hours?", 
      answer: "We deliver from 8:00 AM to 11:00 PM daily across Karachi. Our riders ensure your coffee stays at the perfect temperature during transit." 
    },
    { 
      question: "How long does delivery take?", 
      answer: "Usually between 25-40 minutes. We route orders to the nearest Mercado hub to your location to minimize wait time." 
    },
    { 
      question: "Do you offer sugar-free options?", 
      answer: "Absolutely! Most of our lattes, cold brews, and teas can be customized with Stevia or zero-sugar syrups. Just mention it in the order notes." 
    },
    { 
      question: "Can I track my order?", 
      answer: "Yes, once your order is prepared, you will receive a tracking link via SMS to follow your rider in real-time." 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen"
    >
      <header className="mb-16">
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[#C5A267] font-bold text-[10px] tracking-[0.3em] uppercase mb-4"
        >
          Support Center
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-black text-5xl md:text-6xl italic uppercase leading-none"
        >
          Common <br/>
          <span className="text-[#C5A267]">Queries</span>
        </motion.h1>
      </header>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 p-8 bg-zinc-50 rounded-[32px] text-center border border-zinc-100"
      >
        <p className="text-zinc-500 text-sm font-medium italic">
          Still have questions? Reach out at <span className="text-zinc-900 font-bold not-italic">hello@mercado.com</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FAQs;