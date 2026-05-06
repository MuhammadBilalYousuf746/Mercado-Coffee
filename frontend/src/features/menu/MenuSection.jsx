import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';

const MenuSection = ({ section }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="mb-10 sm:mb-14 md:mb-16 scroll-mt-20"
    >
      {/* Section Header */}
      <div className="mb-4 sm:mb-6 md:mb-8 flex items-end gap-4">

        {/* Left border + heading */}
        <div className={`flex gap-3 sm:gap-4 transition-all duration-500`}>

          {/* Vertical underline */}
          <div className={`w-[3px] sm:w-1 rounded-full transition-all duration-500 flex-shrink-0 ${
            isVisible
              ? 'bg-[#C5A267] opacity-100'
              : 'bg-transparent opacity-0'
          }`} />

          <div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none transition-all duration-500 ${
              isVisible ? 'text-zinc-900' : 'text-zinc-400'
            }`}>
              {section.title}
            </h2>
            {section.description && (
              <p className="text-zinc-400 text-[10px] sm:text-xs font-medium uppercase tracking-widest mt-1">
                {section.description}
              </p>
            )}
          </div>
        </div>

        {/* Decorative line */}
        <div className="flex-1 h-[1px] bg-zinc-100 mb-1 hidden sm:block" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
        {section.items.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;