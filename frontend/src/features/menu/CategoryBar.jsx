import React, { useRef, useState, useEffect } from 'react';
import { MERCADO_MENU } from '../../data/menuData';
import { motion } from 'framer-motion';
import { HiMenuAlt2, HiChevronLeft, HiChevronRight } from "react-icons/hi"; 
import CategoryModal from "./CategoryModal";

const categories = MERCADO_MENU.map(section => ({
  label: section.shortTitle || section.title,
  id: section.id
}));

// Animation variants hata diye gaye hain taaki initial load par delay na aaye

const CategoryBar = ({ onCategoryClick, activeCategory }) => {
  const scrollRef = useRef(null);
  const buttonRefs = useRef({});
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const animFrame = useRef(null);
  const [dragged, setDragged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Background Scroll Stop Logic
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  // Manual Button Scroll Logic
  const handleArrowScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!activeCategory || !scrollRef.current) return;
    const btn = buttonRefs.current[activeCategory];
    if (!btn) return;
    const bar = scrollRef.current;
    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const barWidth = bar.offsetWidth;
    const targetScroll = btnLeft - barWidth / 2 + btnWidth / 2;
    bar.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }, [activeCategory]);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
    cancelAnimationFrame(animFrame.current);
    setDragged(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    velocity.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    if (Math.abs(walk) > 4) setDragged(true);
  };

  const onMouseUp = () => {
    isDragging.current = false;
    const glide = () => {
      if (Math.abs(velocity.current) < 0.5) return;
      scrollRef.current.scrollLeft -= velocity.current;
      velocity.current *= 0.92;
      animFrame.current = requestAnimationFrame(glide);
    };
    glide();
  };

  const handleClick = (e, id) => {
    if (dragged) { e.preventDefault(); return; }
    onCategoryClick(id);
  };

  return (
    <div className="w-full sticky top-0 z-40 border-t border-zinc-800 bg-black flex items-center">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="md:hidden pl-4 text-white hover:text-[#C5A267] transition-colors"
      >
        <HiMenuAlt2 size={22} />
      </button>

      {/* Left Arrow - Desktop Only */}
      <button 
        onClick={() => handleArrowScroll('left')}
        className="hidden md:flex items-center justify-center px-2 text-white/50 hover:text-white transition-colors"
      >
        <HiChevronLeft size={24} />
      </button>

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="
          flex items-center overflow-x-auto no-scrollbar
          cursor-grab active:cursor-grabbing select-none
          px-4 py-3 gap-5
          sm:px-5 sm:py-4 sm:gap-6
          md:px-2 md:py-5 md:gap-8
          flex-1
        "
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            ref={(el) => (buttonRefs.current[cat.id] = el)}
            onClick={(e) => handleClick(e, cat.id)}
            className="
              font-bold tracking-widest uppercase whitespace-nowrap
              text-white transition-all duration-200 group relative
              text-[10px] pb-1
              sm:text-[11px]
              md:text-[11px]
            "
          >
            {cat.label}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#C5A267] transition-all duration-200
                ${activeCategory === cat.id ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />
          </button>
        ))}
      </div>

      {/* Right Arrow - Desktop Only */}
      <button 
        onClick={() => handleArrowScroll('right')}
        className="hidden md:flex items-center justify-center px-2 text-white/50 hover:text-white transition-colors"
      >
        <HiChevronRight size={24} />
      </button>

      <CategoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories.map(c => ({ id: c.id, name: c.label }))}
        activeCategory={activeCategory}
        onSelect={onCategoryClick}
      />
    </div>
  );
};

export default CategoryBar;