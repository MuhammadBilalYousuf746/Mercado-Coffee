// src/components/Checkout/CheckoutInput.jsx
import React from 'react';

const CheckoutInput = ({ label, ...props }) => (
  <div className="relative">
    <input
      {...props}
      placeholder=" "
      className="
        peer w-full bg-white border border-zinc-200 rounded-2xl
        px-5 pt-6 pb-3 text-sm font-semibold text-zinc-900
        outline-none transition-all duration-200
        focus:border-[#C5A267] focus:ring-2 focus:ring-[#C5A267]/20
        placeholder-transparent
      "
    />
    <label className="
      absolute left-5 top-4 text-[10px] font-black uppercase tracking-widest
      text-zinc-400 transition-all duration-200 cursor-text pointer-events-none
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
      peer-placeholder-shown:text-sm peer-placeholder-shown:font-semibold
      peer-placeholder-shown:tracking-normal
      peer-focus:top-4 peer-focus:translate-y-0 peer-focus:text-[10px]
      peer-focus:font-black peer-focus:tracking-widest peer-focus:text-[#C5A267]
    ">
      {label}
    </label>
  </div>
);

export default CheckoutInput;