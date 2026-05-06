// src/components/Checkout/CheckoutInput.jsx
import React from 'react';

const CheckoutInput = ({ label, icon, ...props }) => (
  <div className="relative group">
    {/* Input Field */}
    <input
      {...props}
      placeholder=" "
      className="
        peer w-full bg-white border border-stone-200 rounded-xl
        px-5 pt-6 pb-2 text-[13px] font-bold text-[#3E4235]
        outline-none transition-all duration-300
        focus:border-[#C5A267] focus:bg-stone-50/30
        placeholder-transparent
      "
    />
    
    {/* Floating Label */}
    <label className="
      absolute left-5 top-2 text-[9px] font-black uppercase tracking-[0.15em]
      text-stone-400 transition-all duration-300 cursor-text pointer-events-none
      
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
      peer-placeholder-shown:text-[11px] peer-placeholder-shown:font-bold 
      peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-stone-500
      
      peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[9px]
      peer-focus:font-black peer-focus:tracking-[0.15em] peer-focus:text-[#C5A267]
    ">
      {label}
    </label>

    {/* Subtle Bottom Line Decor */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C5A267] transition-all duration-500 peer-focus:w-full rounded-full opacity-50" />
    
    {/* Icon (Optional) */}
    {icon && (
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-300 peer-focus:text-[#C5A267] transition-colors duration-300">
        {icon}
      </div>
    )}
  </div>
);

export default CheckoutInput;