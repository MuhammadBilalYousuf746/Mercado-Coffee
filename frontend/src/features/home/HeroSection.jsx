import React, { useState, useEffect, useRef } from 'react';
import HeroCard from './HeroCard';

import img1 from '../../assets/images/HeroSection/img1.png';
import img2 from '../../assets/images/HeroSection/img2.png';
import img3 from '../../assets/images/HeroSection/img3.png';
import img4 from '../../assets/images/HeroSection/img4.png';
import img5 from '../../assets/images/HeroSection/img5.png';
import img6 from '../../assets/images/HeroSection/img6.png';
import img7 from '../../assets/images/HeroSection/img7.png';
import img8 from '../../assets/images/HeroSection/img8.png';

const cardData = [
  { id: 1, image: img1, title: "Americano", description: "Pure & Bold" },
  { id: 2, image: img2, title: "Caramel Latte", description: "Sweet Indulgence" },
  { id: 3, image: img3, title: "Matcha", description: "Ceremonial Grade" },
  { id: 4, image: img4, title: "Cold Brew", description: "Slow Extracted" },
  { id: 5, image: img5, title: "Frappe", description: "Blended & Chilled" },
  { id: 6, image: img6, title: "Espresso", description: "Rich & Intense" },
  { id: 7, image: img7, title: "Spanish Latte", description: "Silky Condensed" },
  { id: 8, image: img8, title: "V60 Brew", description: "Hand Crafted" },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const totalCards = cardData.length;
  const isScrollingManually = useRef(false);

  // Auto-scroll logic (kuch nahi badla)
  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      // Swipe ke waqt auto-scroll ko thodi der rukne dete hain logic wise
      if (!isScrollingManually.current) {
        setActiveIndex((prev) => (prev + 1) % totalCards);
      }
    }, 4000);
    return () => clearInterval(intervalId);
  }, [totalCards]);

  // Handle active card centering (apka logic)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isScrollingManually.current) return;
    
    const isMobile = window.innerWidth < 640;
    const cardWidth = isMobile ? (160 + 12) : (224 + 24);
    const containerWidth = container.offsetWidth;
    const scrollPosition = (activeIndex * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
    
    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }, [activeIndex]);

  // Manual Swipe Detection for dots
  const handleManualScroll = () => {
    if (!containerRef.current) return;
    
    // Jab user touch karega, hum toggle kar denge taaki auto-scroll clash na kare
    isScrollingManually.current = true;
    
    const container = containerRef.current;
    const isMobile = window.innerWidth < 640;
    const cardWidth = isMobile ? (160 + 12) : (224 + 24);
    
    // Calculate which card is in center
    const scrollLeft = container.scrollLeft;
    const centerPoint = scrollLeft + (container.offsetWidth / 2);
    const newIndex = Math.round((centerPoint - (cardWidth / 2)) / cardWidth);
    
    if (newIndex >= 0 && newIndex < totalCards && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }

    // Reset manual flag after a short delay
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      isScrollingManually.current = false;
    }, 150);
  };

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 mt-4 sm:mt-6 md:mt-10 mb-4 sm:mb-6 md:mb-10">
      <div className="bg-white border-2 border-zinc-900 rounded-[28px] sm:rounded-[40px] md:rounded-[60px] px-4 pt-5 pb-4 sm:p-8 md:py-12 md:px-16 shadow-sm overflow-hidden">

        {/* Heading Section (Kashif logic) */}
        <div className="mb-4 sm:mb-8 md:mb-12 text-center md:text-left overflow-hidden">
          <div className={`transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-zinc-300">
              Discover
            </span>
          </div>

          <div className={`transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#3E4235]">
              Premium Coffee
            </span>
          </div>

          <div className={`mt-2 sm:mt-3 h-[2px] bg-zinc-900 origin-left transition-all duration-700 delay-500 ${
            mounted ? 'w-16 sm:w-24 md:w-32 opacity-100' : 'w-0 opacity-0'
          } md:mx-0 mx-auto`} />
        </div>

        {/* Cards Section - Added overflow-x-auto and snap alignment for premium feel */}
        <div 
          ref={containerRef} 
          onScroll={handleManualScroll}
          className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {cardData.map((card, index) => (
            <div key={card.id} className="snap-center">
              <HeroCard
                data={card}
                isActive={index === activeIndex}
              />
            </div>
          ))}
        </div>

        {/* Dots (Kashif logic) */}
        <div className="flex justify-center md:justify-start gap-1.5 md:gap-3 mt-3 sm:mt-6 md:mt-8">
          {cardData.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                isScrollingManually.current = false; // Force auto-logic to take over for click
                setActiveIndex(i);
              }}
              className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${
                i === activeIndex
                  ? 'w-6 sm:w-8 md:w-12 bg-[#3E4235]'
                  : 'w-1.5 sm:w-2 md:w-3 bg-zinc-200 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer {
          0% { left: -75%; }
          100% { left: 125%; }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;