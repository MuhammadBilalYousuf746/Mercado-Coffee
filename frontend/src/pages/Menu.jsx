import React, { useState, useEffect, useRef } from 'react';
import { MERCADO_MENU } from '../data/menuData';
import CategoryBar from '../components/CategoryBar';
import SearchBar from '../components/SearchBar';
import DiscountBanner from '../components/DiscountBanner';
import FeaturedSelections from '../components/FeaturedSelections';
import MenuSection from '../components/MenuSection';

const OFFSET = 130;

function Menu() {
  const [activeCategory, setActiveCategory] = useState(MERCADO_MENU[0].id);
  const isScrollingRef = useRef(false);

  // CategoryBar click → smooth scroll
  const handleCategoryClick = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    isScrollingRef.current = true;
    setActiveCategory(id);

    window.scrollTo({
      top: element.offsetTop - OFFSET,
      behavior: 'smooth'
    });

    // Scroll end hone ke baad observer ko wapis control do
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 200);
  };

  // Scroll hone pe automatically active category update ho
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${OFFSET}px 0px -60% 0px`,
        threshold: 0
      }
    );

    MERCADO_MENU.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#32CD32]">
      <CategoryBar
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />

      <div className="mt-4 px-4 sm:px-16">
        <SearchBar />
        <DiscountBanner amount="20" className="mt-4" />
      </div>

      <main className="p-4 sm:p-16">
        <FeaturedSelections />

        {MERCADO_MENU.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}

export default Menu;