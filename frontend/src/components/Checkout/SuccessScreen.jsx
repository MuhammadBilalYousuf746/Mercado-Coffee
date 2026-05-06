// src/components/Checkout/SuccessScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_METHODS } from '../../utils/checkoutHelpers';

const SuccessScreen = ({ orderId, grandTotal, form }) => {
  const navigate = useNavigate();
  const methodLabel = PAYMENT_METHODS.find(m => m.id === form.paymentMethod)?.label;

  const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    /* 
       FIX: Changed justify-center to justify-between and added flex-1 
       to ensure the content stays centered but the container fills the 
       entire viewport height, merging perfectly with the footer.
    */
    <div className="min-h-screen flex flex-col items-center justify-between px-4 bg-[#F2F1EF]">
      {/* Spacer to push content down slightly for better balance */}
      <div className="flex-1 flex flex-col items-center justify-center w-full py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[380px] w-full mx-auto text-center space-y-4"
        >
          {/* Checkmark with safe distance */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.1 }}
              className="relative z-10 w-14 h-14 bg-[#C5A267] rounded-full flex items-center justify-center shadow-md"
            >
              <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
                <motion.path
                  d="M10 22 L19 31 L34 13"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </svg>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.25], opacity: [0.2, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border border-[#C5A267]"
            />
          </div>

          <motion.div variants={itemVariants} className="space-y-0.5">
            <h2 className="font-serif text-3xl text-[#3E4235] lowercase italic tracking-tight">
              Order Placed.
            </h2>
            <p className="text-stone-500 text-[11px] font-medium tracking-wide uppercase">
              We're brewing perfection.
            </p>
          </motion.div>

          {/* Compact Slip */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-stone-200/40 text-left relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">Order Ref</p>
                  <p className="font-serif text-lg text-[#3E4235] italic leading-tight">#{orderId.toString().slice(-6)}</p>
                </div>
                <div className="bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                  <p className="text-[8px] font-black text-green-600 uppercase">Confirmed</p>
                </div>
              </div>

              <div className="py-3 border-y border-dashed border-stone-100 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-[9px] font-bold text-stone-400 uppercase">Method</p>
                  <p className="text-[10px] font-bold text-[#3E4235] uppercase tracking-tighter">{methodLabel}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[9px] font-bold text-stone-400 uppercase">Total Paid</p>
                  <p className="text-base font-black text-[#3E4235]">Rs. {grandTotal.toLocaleString()}</p>
                </div>
              </div>

              <div className="text-center pt-1">
                <p className="text-[8px] text-stone-400 font-bold uppercase tracking-widest">Receipt sent to</p>
                <p className="text-[10px] text-[#3E4235] font-black">{form.phone}</p>
              </div>
            </div>
          </motion.div>

          {/* Cash on Delivery Info Box */}
          {form.paymentMethod === 'cash' && (
            <motion.div
              variants={itemVariants}
              className="bg-[#F9F5EE] border border-[#E8E0D1] rounded-2xl p-4 flex items-center gap-4 text-left shadow-sm"
            >
              <div className="flex-shrink-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A267" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <p className="text-[11px] text-stone-600 font-medium leading-normal">
                Keep <span className="text-[#3E4235] font-bold">Rs. {grandTotal.toLocaleString()}</span> ready for delivery on <span className="text-[#3E4235] font-bold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </p>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="pt-2">
            <button
              onClick={() => navigate('/')}
              className="group relative w-full bg-[#3E4235] text-white py-3.5 rounded-lg font-bold uppercase tracking-[0.2em] text-[9px] overflow-hidden transition-all active:scale-[0.97]"
            >
              <span className="relative z-10">Return to Shop</span>
              <div className="absolute inset-0 bg-[#C5A267] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </button>
            
            <p className="mt-3 text-[7px] text-stone-400 font-bold uppercase tracking-[0.4em] opacity-40 italic">
              Niqro Premium Coffee
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessScreen;