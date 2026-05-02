import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ name, price, image, category }) => {
  return (
    /* Removed fixed max-width to let the parent grid decide the size */
    <div className="group bg-white border border-stone-100 rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3 shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col h-full">
      
      {/* 1. Image Container - Responsive aspect ratio */}
      <div className="relative aspect-square overflow-hidden rounded-[15px] sm:rounded-[18px] bg-stone-50">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge - Slightly smaller on mobile */}
        {category && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 shadow-sm">
            {category}
          </span>
        )}
      </div>

      {/* 2. Content Section - flex-grow ensures buttons align if names are different lengths */}
      <div className="mt-3 sm:mt-4 px-1 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 uppercase tracking-tight leading-tight">
            {name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase font-bold">Price</span>
            <span className="text-sm sm:text-base font-black text-[#800010] whitespace-nowrap">
              Rs. {price}
            </span>
          </div>

          {/* Add to Cart Button - Scaled for touch targets on mobile */}
          <button className="bg-black hover:bg-[#800010] text-white p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors duration-300 shadow-lg shadow-black/5 active:scale-90">
            <Plus size={18} className="sm:w-5 sm:h-5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;