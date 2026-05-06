// src/components/Checkout/EmptyCart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    /* h-screen and overflow-hidden to match SuccessScreen and eliminate gaps */
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center px-6 bg-[#F2F1EF] text-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[320px] w-full space-y-6"
      >
        {/* Premium SVG Icon instead of Emoji */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200/50">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#C5A267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="#C5A267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#C5A267" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-2">
          <h2 className="font-serif text-3xl text-[#3E4235] lowercase italic tracking-tight">
            Your bag is empty.
          </h2>
          <p className="text-stone-500 text-[11px] font-medium tracking-widest uppercase">
            Start your coffee journey
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/')}
            className="group relative w-full bg-[#3E4235] text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all active:scale-[0.98] shadow-lg shadow-stone-300"
          >
            <span className="relative z-10">Explore Menu</span>
            <div className="absolute inset-0 bg-[#C5A267] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </div>

        {/* Branding Footer */}
        <p className="pt-4 text-[7px] text-stone-400 font-bold uppercase tracking-[0.4em] opacity-40 italic">
          Niqro Premium Coffee
        </p>
      </motion.div>
    </div>
  );
};

export default EmptyCart;