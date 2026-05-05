import React, { useCallback, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const navLinks = [
  { name: 'Menu', path: '/' },
  { name: 'Our Story', path: '/our-story' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'Privacy', path: '/privacy-policy' }
];

const ANIMATION_DURATION = 300;

function NavDrawer({ isOpen, setIsOpen }) {

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const scrollToFooter = useCallback((e) => {
    e.preventDefault();
    closeDrawer();

    setTimeout(() => {
      const footer = document.querySelector('footer');
      footer?.scrollIntoView({ behavior: 'smooth' });
    }, ANIMATION_DURATION);
  }, [closeDrawer]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDrawer();
        }}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[85%] sm:w-80 bg-[#3E4235] z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        <div className="flex justify-end p-6">
          <button 
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer} 
            className="text-white hover:rotate-90 transition-transform duration-300 p-1 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <IoClose size={32} />
          </button>
        </div>

        <nav 
          aria-label="Mobile navigation"
          className="flex flex-col space-y-6 sm:space-y-8 px-8 sm:px-10 mt-6 sm:mt-10 font-serif"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={closeDrawer} 
              className="text-2xl sm:text-3xl text-white hover:text-stone-300 transition-colors relative group w-fit"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C5A267] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <button 
            type="button"
            onClick={scrollToFooter}
            className="text-2xl sm:text-3xl text-white hover:text-stone-300 transition-colors relative group w-fit text-left focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Locations
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C5A267] transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        <div className="absolute bottom-10 px-8 sm:px-10 text-stone-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase select-none">
          Powered By Niqro
        </div>
      </div>
    </>
  );
}

export default React.memo(NavDrawer);