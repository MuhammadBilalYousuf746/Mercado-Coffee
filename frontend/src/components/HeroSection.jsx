import React, { useState, useEffect, useRef } from 'react';
import HeroCard from './HeroCard';

import img1 from '../assets/images/HeroSection/img1.png';
import img2 from '../assets/images/HeroSection/img2.png';
import img3 from '../assets/images/HeroSection/img3.png';
import img4 from '../assets/images/HeroSection/img4.png';
import img5 from '../assets/images/HeroSection/img5.png';
import img6 from '../assets/images/HeroSection/img6.png';
import img7 from '../assets/images/HeroSection/img7.png';
import img8 from '../assets/images/HeroSection/img8.png';

const cardData = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img6 },
  { id: 7, image: img7 },
  { id: 8, image: img8 },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const totalCards = cardData.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalCards);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [totalCards]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const isMobile = window.innerWidth < 640;
      const cardWidth = isMobile ? (224 + 16) : (256 + 32); 
      const containerWidth = container.offsetWidth;
      const scrollPosition = (activeIndex * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    /* mb-0 kiya hai taake CategoryBar ke saath gap na rahe */
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 mt-6 md:mt-10 mb-0 relative">
      <div className="bg-white border-2 border-zinc-900 rounded-[40px] sm:rounded-[60px] p-6 sm:p-8 md:py-14 md:px-16 shadow-sm overflow-hidden">
        
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight sm:leading-none">
            <span className="text-black">Discover</span> 
            <br/> 
            <span className="text-[#3E4235]">Premium Coffee</span>
          </h1>
        </div>

        <div 
          ref={containerRef}
          className="flex overflow-x-hidden relative pb-4 no-scrollbar"
        >
          {cardData.map((card, index) => (
            <HeroCard 
              key={index} 
              data={card} 
              isActive={index === activeIndex} 
            />
          ))}
        </div>

        <div className="flex justify-center md:justify-start gap-2 md:gap-3 mt-6 md:mt-8">
          {cardData.map((_, i) => (
            <div 
              key={i}
              className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${
                i === activeIndex ? 'w-8 md:w-12 bg-[#800010]' : 'w-2 md:w-3 bg-zinc-200'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default HeroSection;