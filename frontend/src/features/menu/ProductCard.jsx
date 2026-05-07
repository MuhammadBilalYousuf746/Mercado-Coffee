import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCartSheet from '../cart/AddToCartSheet';
import { useCart } from '../../context/CartContext';

// ── Extracted once, not recreated on every render ──────────
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v16m8-8H4" />
  </svg>
);

// ── Main component ─────────────────────────────────────────
const ProductCard = ({ name, desc, price, type, prices, addon, image }) => {
  const [isDouble, setIsDouble] = useState(false);
  const [addFries, setAddFries] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const { addToCart } = useCart();

  // Memoized — recalculates only when isDouble or addFries changes
  const displayPrice = useMemo(() => {
    if (type === 'multi-price') {
      const base = isDouble ? prices.double : prices.single;
      return addFries ? base + addon.price : base;
    }
    return addon && addFries ? price + addon.price : price;
  }, [type, isDouble, addFries, price, prices, addon]);

  const handleConfirm = () => {
    addToCart({
      id: name,
      name,
      price: displayPrice,
      image,
      variant: type === 'multi-price' ? (isDouble ? 'Double' : 'Single') : 'Standard',
      hasAddon: addFries,
      addonName: addFries ? addon?.name : null,
    });
    setShowSheet(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="group relative bg-white rounded-[16px] sm:rounded-[20px] p-2.5 sm:p-3
          border border-zinc-100 flex flex-col justify-between
          hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        {/* Top gold line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r
          from-transparent via-[#C5A267] to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Section - Fixed zoom and gaps */}
        <div className="w-full h-28 sm:h-36 md:h-40 rounded-[12px] sm:rounded-[14px]
          mb-2.5 overflow-hidden bg-zinc-100">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-300
              group-hover:scale-110"
          />
        </div>

        {/* Name + desc */}
        <div className="mb-2">
          <h3 className="font-black text-[12px] sm:text-[13px] uppercase leading-tight
            tracking-tight text-zinc-900">
            {name}
          </h3>
          {desc && (
            <p className="text-zinc-400 text-[10px] sm:text-[11px] mt-0.5
              line-clamp-2 leading-relaxed">
              {desc}
            </p>
          )}
        </div>

        <div className="mt-auto">
          {/* Single / Double toggle */}
          {type === 'multi-price' && (
            <div className="flex bg-zinc-100 p-0.5 rounded-full text-[9px] sm:text-[10px]
              font-black mb-2 relative">
              <button
                onClick={() => setIsDouble(false)}
                className={`flex-1 py-1 rounded-full z-10 transition-colors duration-200
                  ${!isDouble ? 'text-white' : 'text-zinc-400'}`}
              >
                SINGLE
              </button>
              <button
                onClick={() => setIsDouble(true)}
                className={`flex-1 py-1 rounded-full z-10 transition-colors duration-200
                  ${isDouble ? 'text-white' : 'text-zinc-400'}`}
              >
                DOUBLE
              </button>
              <motion.div
                animate={{ x: isDouble ? '100%' : '0%' }}
                transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                className="absolute top-0.5 left-0.5 bottom-0.5 w-[calc(50%-2px)]
                  bg-[#1a1611] rounded-full"
              />
            </div>
          )}

          {/* Addon checkbox */}
          {addon && (
            <label className="flex items-center gap-1.5 cursor-pointer mb-2">
              <div
                onClick={() => setAddFries(!addFries)}
                className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded flex items-center
                  justify-center border transition-all duration-100"
              >
                <motion.div
                  animate={{
                    backgroundColor: addFries ? '#C5A267' : '#FFFFFF',
                    borderColor:     addFries ? '#C5A267' : '#D4D4D8',
                  }}
                  className="absolute inset-0 rounded border"
                />
                <AnimatePresence>
                  {addFries && (
                    <motion.svg
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ duration: 0.1 }}
                      className="z-10" width="9" height="9" viewBox="0 0 10 10" fill="none"
                    >
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-zinc-500">
                + {addon.name} <span className="text-zinc-400">(Rs. {addon.price})</span>
              </span>
            </label>
          )}

          {/* Price + Add button */}
          <div className="flex justify-between items-center mt-1">
            <motion.span
              key={displayPrice}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="font-black text-sm sm:text-base text-zinc-900"
            >
              Rs. {displayPrice.toLocaleString()}
            </motion.span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSheet(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                bg-[#1a1611] text-white hover:bg-[#C5A267] transition-colors duration-150"
            >
              <PlusIcon />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {showSheet && (
          <AddToCartSheet
            item={{ name, desc, price: displayPrice, type, prices, addon, image }}
            onClose={() => setShowSheet(false)}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;