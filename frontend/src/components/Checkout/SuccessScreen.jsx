// src/components/Checkout/SuccessScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_METHODS } from '../../utils/checkoutHelpers';

const SuccessScreen = ({ orderId, grandTotal, form }) => {
  const navigate    = useNavigate();
  const methodLabel = PAYMENT_METHODS.find(m => m.id === form.paymentMethod)?.label;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#faf9f7]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-sm w-full text-center space-y-8 py-12"
      >
        {/* Animated checkmark */}
        <div className="relative mx-auto w-28 h-28">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            className="w-28 h-28 bg-[#C5A267] rounded-full flex items-center justify-center
              shadow-[0_20px_60px_#C5A26750]"
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <motion.path
                d="M10 22 L19 31 L34 13"
                stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </svg>
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute inset-0 rounded-full bg-[#C5A267]"
          />
        </div>

        <div>
          <h2 className="font-black text-4xl italic text-zinc-900 uppercase tracking-tight">
            Order Placed!
          </h2>
          <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
            We're brewing something special.<br />Your order is being prepared with care.
          </p>
        </div>

        {/* Details card */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm text-left space-y-4">
          <div>
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Order ID</p>
            <p className="font-black text-xl text-zinc-900 tracking-wider mt-1">{orderId}</p>
          </div>
          <div className="border-t border-zinc-100 pt-4 space-y-2">
            {[
              { label: 'Payment', value: methodLabel },
              { label: 'Total',   value: `Rs. ${grandTotal.toLocaleString()}` },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-xs font-bold
                text-zinc-400 uppercase tracking-widest">
                <span>{r.label}</span>
                <span className="text-zinc-700">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {form.paymentMethod === 'cash' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4
              text-sm text-green-800 font-semibold"
          >
            💵 Please keep Rs. {grandTotal.toLocaleString()} ready at delivery
          </motion.div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#1a1611] text-white py-5 rounded-2xl font-black uppercase
            tracking-[0.2em] text-[11px] shadow-xl transition-all duration-300
            hover:bg-[#C5A267] hover:shadow-[#C5A267]/40"
        >
          Continue Shopping
        </button>
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
          Confirmation sent to {form.phone}
        </p>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;