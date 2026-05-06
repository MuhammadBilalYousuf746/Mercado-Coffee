import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const CategoryModal = ({ isOpen, onClose, categories, activeCategory, onSelect }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay - Snappy Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[10000] backdrop-blur-[2px]"
          />

          {/* Modal Content - Smooth Bottom Sheet Slide */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            // Optimized Spring for zero lag and high responsiveness
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-[10001] max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Grab Handle for better Mobile UX */}
            <div className="w-12 h-1.5 bg-[#3E4235] rounded-full mx-auto mt-3 mb-1" />

            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Select Category</h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <IoClose size={24} className="text-zinc-600" />
              </button>
            </div>

            {/* Category List with Stagger Effect */}
            <motion.div 
              className="p-4 overflow-y-auto"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.03 }
                }
              }}
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelect(cat.id);
                    onClose();
                  }}
                  className={`w-full text-left p-4 rounded-2xl mb-2 transition-all duration-200 uppercase text-sm font-semibold tracking-wide ${
                    activeCategory === cat.id 
                    ? "bg-[#3E4235] text-white shadow-md" 
                    : "text-zinc-500 hover:bg-zinc-50 border border-transparent"
                  }`}
                >
                  {cat.name}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;