import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomizationPanel from '../menu/CustomizationPanel';

// ── Sheet Content ─────────────────────────────────────────────────
const SheetContent = ({ item, qty, setQty, note, setNote, options, setOptions, total, onClose, handleConfirm, isMobile }) => {
  const [swipeX, setSwipeX] = useState(0);

  const handleDragEnd = (e, info) => {
    if (info.offset.x > 80) handleConfirm();
    setSwipeX(0);
  };

  return (
    <div className="relative">
      {/* Mobile handle */}
      {isMobile && (
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-white z-20">
          <div className="w-10 h-1 bg-zinc-300 rounded-full" />
        </div>
      )}

      {/* Desktop header */}
      {!isMobile && (
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-zinc-100 sticky top-0 bg-white z-20">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-0.5">Mercado</p>
            <span className="text-base font-black uppercase tracking-tight text-zinc-900">Your Order</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="#71717a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>
      )}

      <div className={`${isMobile ? 'px-5 pt-3 pb-10' : 'px-7 pt-5 pb-6'}`}>
        {/* Item info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mb-4 items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex-shrink-0 overflow-hidden border border-zinc-200">
            {item.image
              ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-zinc-200" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-sm sm:text-base uppercase tracking-tight text-zinc-900 leading-tight">
              {item.name}
            </h3>
            {item.desc && (
              <p className="text-zinc-400 text-[11px] mt-0.5 line-clamp-2 leading-snug">{item.desc}</p>
            )}
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="font-black text-sm text-zinc-900">
              Rs. {(item.price || item.prices?.single || 0).toLocaleString()}
            </span>
          </div>
        </motion.div>

        <div className="h-[1px] bg-zinc-100 mb-4" />

        {/* Customization Panel */}
        {item.customizationType && item.customizationType !== 'default' && (
          <div className="mb-4">
            <CustomizationPanel
              type={item.customizationType}
              options={options}
              onChange={setOptions}
              item={item}
            />
            <div className="h-[1px] bg-zinc-100 mt-4 mb-4" />
          </div>
        )}

        {/* Quantity Section */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-700">Quantity</span>
          <div className="flex items-center gap-3 bg-zinc-50 rounded-full px-1.5 py-1 border border-zinc-200">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center">-</button>
            <span className="font-black text-lg w-6 text-center">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">+</button>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="mb-5">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-800 block mb-1.5">Special Instructions</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="w-full text-[12px] bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 focus:border-[#C5A267] outline-none transition-all"
            placeholder="Any special requests?"
          />
        </div>

        {/* Footer / Total */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-bold text-zinc-400 uppercase">Total</span>
          <span className="font-black text-base">Rs. {total.toLocaleString()}</span>
        </div>

        {/* Action Button */}
        {isMobile ? (
            <div className="relative h-14 bg-zinc-100 rounded-2xl overflow-hidden flex items-center border border-zinc-200">
                <div className="absolute left-0 top-0 bottom-0 bg-[#C5A267] transition-none" style={{ width: `calc(52px + ${Math.min(swipeX, 210)}px)` }} />
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 220 }}
                    onDrag={(e, info) => setSwipeX(Math.max(0, info.offset.x))}
                    onDragEnd={handleDragEnd}
                    className="absolute left-1.5 w-11 h-11 bg-black rounded-xl flex items-center justify-center z-10 shadow-lg cursor-grab"
                    style={{ x: swipeX }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[11px] font-black uppercase tracking-widest text-zinc-900">Swipe to Add</span>
                </div>
            </div>
        ) : (
          <button onClick={handleConfirm} className="w-full bg-black text-white font-black py-4 rounded-2xl hover:bg-[#C5A267] transition-colors border border-black">
            Add to Cart — Rs. {total.toLocaleString()}
          </button>
        )}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────
const AddToCartSheet = ({ item, onClose, onConfirm }) => {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');
  const [options, setOptions] = useState({});
  const scrollRef = useRef(null);

  // Jab bhi component mount ho, scroll ko 0 kar do
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [item]);

  const total = useMemo(() => {
    const base = item.price || options.basePrice || item.prices?.single || 0;
    return (base + (options.sizePrice || 0) + (options.milkPrice || 0) + (options.extrasPrice || 0) + (options.addonsPrice || 0)) * qty;
  }, [item, options, qty]);

  const handleConfirm = () => {
    onConfirm({ ...item, qty, note, options, total });
    onClose();
  };

  const props = { item, qty, setQty, note, setNote, options, setOptions, total, onClose, handleConfirm };

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-[4px] z-[80]"
        />
      </AnimatePresence>

      <AnimatePresence>
        {/* Mobile */}
        <motion.div
          key="mobile"
          ref={scrollRef}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 40, stiffness: 400 }}
          className="sm:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-zinc-200 max-h-[92vh] overflow-y-auto"
        >
          <SheetContent {...props} isMobile />
        </motion.div>

        {/* Desktop */}
        <motion.div
          key="desktop"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="hidden sm:block fixed top-[10%] left-1/2 -translate-x-1/2 z-[90] bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-zinc-200 w-full max-w-[440px] max-h-[80vh] overflow-y-auto"
        >
          <SheetContent {...props} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AddToCartSheet;