import React, { useState } from 'react';

const categories = [
  "RITUAL EDIT", "Sun Spill", "DEAL", "MATCHA", 
  "HOT BEVERAGES", "COLD BEVERAGES", "FRAPPES", 
  "DRIP COFFEE", "ICED TEA", "MOCKTAILS", "DESSERTS", "ADD ONS"
];

function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState(""); 

  return (
    /* pt-2 kiya hai taake halka sa gap rahe aur design cramped na lage */
    <div className="w-full bg-white border-b border-stone-100 sticky top-0 z-40 shadow-sm pt-2">
      <div className="flex items-center justify-start lg:justify-between px-6 md:px-10 lg:px-16 py-4 bg-black overflow-x-auto no-scrollbar gap-6 lg:gap-4 whitespace-nowrap">
        {categories.map((cat, index) => (
          <button 
            key={index}
            onClick={() => setActiveCategory(cat)}
            className={`text-[11px] sm:text-[12px] lg:text-[13px] font-bold tracking-wider transition-all duration-300 uppercase relative group pb-1 flex-shrink-0
              ${activeCategory === cat ? 'text-[#C5A267]' : 'text-[#ffffff] hover:text-[#C5A267]'}`}
          >
            {cat}
            <span className={`absolute left-0 bottom-0 h-[2px] bg-[#C5A267] transition-all duration-300 
              ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'}`}>
            </span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default CategoryBar;