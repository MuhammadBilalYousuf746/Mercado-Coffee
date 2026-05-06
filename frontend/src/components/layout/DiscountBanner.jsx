import React from 'react';
import { Tag } from 'lucide-react';

const DiscountBanner = ({ amount = "20" }) => {
  return (
    <div className="w-full mx-auto my-4">
      <div className="relative overflow-hidden flex items-center justify-between bg-[#1a1611] rounded-2xl px-5 py-4 sm:px-8 sm:py-5">

        {/* Left — Icon + Text */}
        <div className="flex items-center gap-3 sm:gap-4 z-10">
          <div className="bg-[#C5A267] p-2 rounded-xl">
            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[#C5A267] text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase">
              Limited Time Offer
            </p>
            <p className="text-white text-sm sm:text-base font-bold tracking-tight leading-tight">
              Flat <span className="text-[#C5A267]">{amount}% off</span> on your first order
            </p>
          </div>
        </div>

        {/* Right — Big % badge */}
        <div className="z-10 flex items-center gap-1 shrink-0">
          <span className="text-4xl sm:text-5xl font-black text-white leading-none">{amount}</span>
          <div className="flex flex-col justify-center">
            <span className="text-[#C5A267] text-lg sm:text-xl font-black leading-none">%</span>
            <span className="text-zinc-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase leading-none mt-0.5">OFF</span>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute right-24 sm:right-32 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#C5A267] opacity-5" />
        <div className="absolute right-16 sm:right-20 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#C5A267] opacity-5" />
      </div>
    </div>
  );
};

export default DiscountBanner;