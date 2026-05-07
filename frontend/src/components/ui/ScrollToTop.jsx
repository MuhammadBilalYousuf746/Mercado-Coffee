import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useCart } from '../../context/CartContext';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isCartOpen } = useCart();

  useEffect(() => {
    let requestRunning = false;

    const handleScroll = () => {
      if (!requestRunning) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrolled / totalHeight) * 100;

          const threshold = window.innerWidth < 768 ? 5 : 25;

          if (scrollPercent > threshold) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          requestRunning = false;
        });
        requestRunning = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && !isCartOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 260, damping: 20 }
          }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          style={{ backgroundColor: "#3E4235" }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] 
                     p-3 md:p-4 text-white rounded-full 
                     shadow-2xl backdrop-blur-sm border border-white/10 
                     flex items-center justify-center transition-shadow hover:shadow-[0_0_15px_rgba(62,66,53,0.5)]"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-[16px] md:text-[20px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;