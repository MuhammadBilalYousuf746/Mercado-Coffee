import React from 'react';
import { BadgePercent } from 'lucide-react'; // Ek icon use kar rahe hain

const DiscountBanner = ({ amount = "20" }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl p-4 shadow-sm">
        {/* Icon */}
        <BadgePercent className="text-rose-800 w-6 h-6 mr-3" />
        
        {/* Text Section */}
        <div className="flex items-center font-bold text-[#3E4235] text-lg sm:text-xl tracking-tight">
          <span>Flat</span>
          
          {/* Circular Discount Badge */}
          <div className="mx-2 bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(250,204,21,0.4)]">
            {amount}
          </div>
          
          <span>% Off</span>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;