import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomizationPanel from './CustomizationPanel';

// ── Sheet Content ─────────────────────────────────────────────────
const SheetContent = ({ item, qty, setQty, note, setNote, options, setOptions, total, onClose, handleConfirm, isMobile }) => {
  const [swipeX, setSwipeX] = useState(0);

  const handleDragEnd = (e, info) => {
    if (info.offset.x > 80) handleConfirm();
    setSwipeX(0);
  };

  return (
    <div className="relative">
      {isMobile && <div className="w-10 h-1 bg-[#3E4235] rounded-full mx-auto mb-4" />}

      {!isMobile && (
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-zinc-100">
          <span className="text-sm font-black uppercase tracking-[0.15em] text-zinc-900">Your Order</span>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="#71717a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <div className={isMobile ? '' : 'px-7 pt-5 pb-6'}>

        {/* Item info */}
        <div className="flex gap-3 mb-4 items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 flex-shrink-0 overflow-hidden border border-zinc-100">
            {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-sm uppercase tracking-tight text-zinc-900 leading-tight truncate">{item.name}</h3>
            {item.desc && <p className="text-zinc-400 text-[11px] mt-0.5 line-clamp-1">{item.desc}</p>}
          </div>
          <span className="font-black text-sm text-zinc-900 flex-shrink-0">
            Rs. {(item.price || item.prices?.single || 0).toLocaleString()}
          </span>
        </div>

        <div className="h-[1px] bg-zinc-100 mb-4" />

        {/* Customization */}
        {item.customizationType && item.customizationType !== 'default' && (
          <div className="mb-4">
            <CustomizationPanel
              type={item.customizationType}
              options={options}
              onChange={setOptions}
              item={item}
            />
            <div className="h-[1px] bg-zinc-100 mt-3 mb-4" />
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600">Quantity</span>
          <div className="flex items-center gap-3 bg-zinc-50 rounded-full px-1 py-1 border border-zinc-100">
            <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:border-zinc-400 transition-colors">
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1h8" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" /></svg>
            </motion.button>
            <motion.span key={qty} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.12 }}
              className="font-black text-base w-6 text-center text-zinc-900">{qty}
            </motion.span>
            <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty(q => q + 1)}
              className="w-7 h-7 rounded-full bg-[#1a1611] flex items-center justify-center hover:bg-[#C5A267] transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            </motion.button>
          </div>
        </div>

        {/* Note */}
        <div className="mb-5">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-900 block mb-1.5">
            Special Instructions <span className="normal-case font-normal text-zinc-400">(optional)</span>
          </label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. less sugar, extra shot..." rows={2}
            className="w-full text-[12px] text-zinc-700 placeholder-zinc-300 bg-zinc-50 border-2 border-zinc-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C5A267] focus:bg-white transition-all resize-none" />
        </div>

        {/* CTA */}
        {isMobile ? (
          <div className="relative h-14 bg-zinc-100 rounded-2xl overflow-hidden flex items-center">
            <motion.div className="absolute left-0 top-0 bottom-0 bg-[#C5A267] rounded-2xl"
              style={{ width: `calc(56px + ${Math.min(swipeX, 200)}px)` }} />
            <motion.div drag="x" dragConstraints={{ left: 0, right: 220 }} dragElastic={0.05}
              onDrag={(e, info) => setSwipeX(Math.max(0, info.offset.x))}
              onDragEnd={handleDragEnd} whileTap={{ scale: 0.95 }}
              className="absolute left-1.5 w-11 h-11 bg-[#1a1611] rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-md"
              style={{ x: swipeX }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-between px-5 pointer-events-none">
              <span className="ml-14 text-[11px] font-black uppercase tracking-widest text-zinc-900">Swipe to Add</span>
              <motion.span key={total} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="text-[12px] font-black text-zinc-600">
                Rs. {total.toLocaleString()}
              </motion.span>
            </div>
          </div>
        ) : (
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleConfirm}
            className="w-full bg-[#1a1611] text-white font-black uppercase tracking-wider rounded-2xl py-3.5 flex items-center justify-between px-5 hover:bg-[#C5A267] transition-colors duration-150">
            <span className="text-sm">Add to Cart</span>
            <motion.span key={total} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm">
              Rs. {total.toLocaleString()}
            </motion.span>
          </motion.button>
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

  // Total price — customization prices bhi add hoti hain
  const total = useMemo(() => {
    const base = (item.price || options.basePrice || item.prices?.single || 0);
    const sizeP = options.sizePrice || 0;
    const milkP = options.milkPrice || 0;
    const extrasP = options.extrasPrice || 0;
    const addonsP = options.addonsPrice || 0;
    const eggP = options.eggPrice || 0;
    const sauceP = options.saucePrice || 0;
    const sideP = options.sidePrice || 0;
    return (base + sizeP + milkP + extrasP + addonsP + eggP + sauceP + sideP) * qty;
  }, [item, options, qty]);

  const handleConfirm = () => {
    onConfirm({ ...item, qty, note, options, total });
    onClose();
  };

  const props = { item, qty, setQty, note, setNote, options, setOptions, total, onClose, handleConfirm };

  return (
    <>
      <AnimatePresence>
        <motion.div key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[80]" />
      </AnimatePresence>

      <AnimatePresence>
        <motion.div key="mobile"
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.7 }}
          className="sm:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white rounded-t-[28px] px-5 pt-4 pb-10 shadow-2xl max-h-[90vh] overflow-y-auto">
          <SheetContent {...props} isMobile />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div key="desktop"
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="hidden sm:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] bg-white rounded-[32px] shadow-2xl w-full max-w-[440px] max-h-[90vh] overflow-y-auto">
          <SheetContent {...props} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AddToCartSheet;