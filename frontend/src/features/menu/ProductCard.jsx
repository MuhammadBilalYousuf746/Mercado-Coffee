import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCartSheet from '../cart/AddToCartSheet';
import { useCart } from '../../context/CartContext';

// ── Updated PlusIcon with rounded caps for a premium feel ──────────
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// ── Main component ─────────────────────────────────────────
const ProductCard = ({ name, desc, price, type, prices, addon, image }) => {
  const [isDouble, setIsDouble] = useState(false);
  const [addFries, setAddFries] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const { addToCart } = useCart();

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
        className="group relative bg-[#ebede6] rounded-[24px] sm:rounded-[32px] p-3 sm:p-4
          border border-white/50 flex flex-col justify-between
          hover:shadow-2xl transition-all duration-300 overflow-hidden shadow-sm"
      >
        {/* Unique Floating Image Section */}
        <div className="relative w-full h-32 sm:h-40 md:h-48 mb-3 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/40 rounded-[20px] sm:rounded-[24px] scale-95 group-hover:scale-100 transition-transform duration-500" />
          
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="relative z-10 w-full h-full object-contain p-2 transition-transform duration-500
              group-hover:scale-110 group-hover:-translate-y-2"
          />
        </div>

        {/* Text Section - Centered */}
        <div className="mb-3 text-center px-1">
          <h3 className="font-black text-[13px] sm:text-[14px] uppercase leading-tight
            tracking-tighter text-zinc-900">
            {name}
          </h3>
          {desc && (
            <p className="text-zinc-500 text-[10px] sm:text-[11px] mt-1
              line-clamp-2 leading-relaxed italic">
              {desc}
            </p>
          )}
        </div>

        <div className="mt-auto space-y-3">
          {/* Toggles */}
          {type === 'multi-price' && (
            <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-xl text-[9px] sm:text-[10px]
              font-black relative border border-white/20 shadow-inner">
              <button
                onClick={() => setIsDouble(false)}
                className={`flex-1 py-1.5 rounded-lg z-10 transition-colors duration-200
                  ${!isDouble ? 'text-white' : 'text-zinc-500'}`}
              >
                SINGLE
              </button>
              <button
                onClick={() => setIsDouble(true)}
                className={`flex-1 py-1.5 rounded-lg z-10 transition-colors duration-200
                  ${isDouble ? 'text-white' : 'text-zinc-500'}`}
              >
                DOUBLE
              </button>
              <motion.div
                animate={{ x: isDouble ? '100%' : '0%' }}
                transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)]
                  bg-zinc-900 rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Addon */}
          {addon && (
            <label className="flex items-center justify-center gap-2 cursor-pointer py-1">
              <div
                onClick={() => setAddFries(!addFries)}
                className="relative w-4 h-4 rounded-md border flex items-center justify-center transition-all shadow-sm bg-white"
              >
                <motion.div
                  animate={{ backgroundColor: addFries ? '#C5A267' : '#FFFFFF' }}
                  className="absolute inset-0 rounded-md"
                />
                {addFries && <span className="z-10 text-[10px] text-white">✓</span>}
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-zinc-600">
                + {addon.name}
              </span>
            </label>
          )}

          {/* Price + Add Button */}
          <div className="flex justify-between items-center bg-white/40 p-2 rounded-2xl border border-white/40">
            <motion.span
              key={displayPrice}
              className="font-black text-sm sm:text-lg text-zinc-900 pl-1"
            >
              Rs.{displayPrice.toLocaleString()}
            </motion.span>

            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setShowSheet(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                bg-zinc-900 text-white hover:bg-[#C5A267] shadow-lg transition-all duration-300"
            >
              <PlusIcon />
            </motion.button>
          </div>
        </div>
      </motion.div>

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