import React, { useState } from 'react';

const ProductCard = ({ name, desc, price, type, prices, addon }) => {
  const [isDouble, setIsDouble] = useState(false);
  const [addFries, setAddFries] = useState(false);
  const [added, setAdded] = useState(false);

  let displayPrice = price;
  if (type === 'multi-price') {
    displayPrice = isDouble ? prices.double : prices.single;
    if (addFries) displayPrice += addon.price;
  } else if (addon && addFries) {
    displayPrice = price + addon.price;
  }

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white rounded-[16px] sm:rounded-[20px] p-2.5 sm:p-3 border border-zinc-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Gold top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A267] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image */}
      <div className="w-full h-28 sm:h-36 md:h-40 rounded-[12px] sm:rounded-[14px] mb-2.5 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 group-hover:from-amber-50 group-hover:via-zinc-100 group-hover:to-zinc-200 transition-all duration-500" />
      </div>

      {/* Name + desc */}
      <div className="mb-2">
        <h3 className="font-black text-[12px] sm:text-[13px] uppercase leading-tight tracking-tight text-zinc-900">
          {name}
        </h3>
        {desc && (
          <p className="text-zinc-400 text-[10px] sm:text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        )}
      </div>

      <div className="mt-auto">
        {/* Single / Double toggle */}
        {type === 'multi-price' && (
          <div className="flex bg-zinc-100 p-0.5 rounded-full text-[9px] sm:text-[10px] font-black mb-2">
            <button
              onClick={() => setIsDouble(false)}
              className={`flex-1 py-1 rounded-full transition-all duration-200 ${
                !isDouble ? 'bg-[#1a1611] text-white shadow-sm' : 'text-zinc-400'
              }`}
            >
              SINGLE
            </button>
            <button
              onClick={() => setIsDouble(true)}
              className={`flex-1 py-1 rounded-full transition-all duration-200 ${
                isDouble ? 'bg-[#1a1611] text-white shadow-sm' : 'text-zinc-400'
              }`}
            >
              DOUBLE
            </button>
          </div>
        )}

        {/* Addon */}
        {addon && (
          <label className="flex items-center gap-1.5 cursor-pointer mb-2">
            <div
              onClick={() => setAddFries(!addFries)}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0 ${
                addFries ? 'bg-[#C5A267] border-[#C5A267]' : 'border-zinc-300 bg-white'
              }`}
            >
              {addFries && (
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-zinc-500">
              + {addon.name} <span className="text-zinc-400">(Rs. {addon.price})</span>
            </span>
          </label>
        )}

        {/* Price + Add */}
        <div className="flex justify-between items-center mt-1">
          <span className="font-black text-sm sm:text-base text-zinc-900">
            Rs. {displayPrice.toLocaleString()}
          </span>

          <button
            onClick={handleAdd}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 flex-shrink-0 ${
              added
                ? 'bg-[#3E4235] text-white scale-95'
                : 'bg-[#1a1611] text-white hover:bg-[#C5A267]'
            }`}
          >
            {added ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;