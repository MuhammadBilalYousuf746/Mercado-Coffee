// src/components/Checkout/UserDetailsForm.jsx
import React from 'react';
import { motion } from 'framer-motion';
import CheckoutInput from './CheckoutInput';
import { fmtPhone } from '../../utils/checkoutHelpers';

const UserDetailsForm = ({ form, set, onNext }) => {
  const canProceed = form.fullName.trim() && form.phone.trim() && form.address.trim();

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CheckoutInput
          label="Full Name"
          type="text"
          value={form.fullName}
          onChange={e => set('fullName', e.target.value)}
          required
        />
        <CheckoutInput
          label="Phone Number"
          type="tel"
          inputMode="numeric"
          value={form.phone}
          onChange={e => set('phone', fmtPhone(e.target.value))}
          required
          maxLength={11}
        />
      </div>

      {/* Textarea with floating label */}
      <div className="relative">
        <textarea
          rows="3"
          placeholder=" "
          value={form.address}
          onChange={e => set('address', e.target.value)}
          required
          className="peer w-full bg-white border border-zinc-200 rounded-2xl
            px-5 pt-6 pb-3 text-sm font-semibold text-zinc-900 outline-none
            resize-none placeholder-transparent transition-all duration-200
            focus:border-[#C5A267] focus:ring-2 focus:ring-[#C5A267]/20"
        />
        <label className="
          absolute left-5 top-4 text-[10px] font-black uppercase tracking-widest
          text-zinc-400 pointer-events-none cursor-text transition-all duration-200
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm
          peer-placeholder-shown:font-semibold peer-placeholder-shown:tracking-normal
          peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-black
          peer-focus:tracking-widest peer-focus:text-[#C5A267]
        ">
          Delivery Address
        </label>
      </div>

      <button
        type="button"
        onClick={() => canProceed && onNext()}
        disabled={!canProceed}
        className="w-full bg-[#1a1611] text-white py-5 rounded-2xl font-black uppercase
          tracking-[0.2em] text-xs shadow-xl transition-all duration-300
          hover:bg-[#C5A267] hover:shadow-[#C5A267]/30 active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Payment →
      </button>
    </motion.div>
  );
};

export default UserDetailsForm;