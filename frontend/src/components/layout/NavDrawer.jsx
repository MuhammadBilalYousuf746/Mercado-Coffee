import React, { useCallback, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { name: 'Menu', path: '/' },
  { name: 'Our Story', path: '/our-story' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'Privacy', path: '/privacy-policy' }
];

function NavDrawer({ isOpen, setIsOpen }) {
  const touchStartPos = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleMenuClick = useCallback((e) => {
    e.preventDefault();
    closeDrawer();
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    } else {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate, closeDrawer]);

  const handleTouchStart = (e) => {
    touchStartPos.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!touchStartPos.current) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStartPos.current - currentTouch;
    if (diff > 50) {
      closeDrawer();
      touchStartPos.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartPos.current = null;
  };

  const scrollToFooter = useCallback((e) => {
    e.preventDefault();
    closeDrawer();
    const footer = document.querySelector('footer');
    footer?.scrollIntoView({ behavior: 'auto' });
  }, [closeDrawer]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDrawer();
        }}
      />

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 left-0 h-full w-[78%] max-w-[310px] bg-[#3E4235] z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Gold top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A267] opacity-70" />

        {/* Close button */}
        <div className="flex justify-end px-[18px] pt-[18px]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '0.5px solid rgba(255,255,255,0.12)'
            }}
          >
            <IoClose className="text-[17px] text-white/70" />
          </button>
        </div>

        {/* Brand tag */}
        <div className="px-7 pt-7">
          <div className="w-7 h-[1.5px] bg-[#C5A267] rounded-full mb-1.5" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-sans">
            Est. 2019
          </span>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col px-7 mt-9 flex-1 font-serif"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={link.name === 'Menu' ? handleMenuClick : closeDrawer}
              className="flex items-center justify-between py-[11px] group"
              style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-[22px] text-white/90 group-hover:text-white transition-colors tracking-[-0.3px]">
                {link.name}
              </span>
              <IoChevronForward className="text-[#C5A267] text-[14px] opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}

          <button
            type="button"
            onClick={scrollToFooter}
            className="flex items-center justify-between py-[11px] group w-full text-left focus:outline-none"
            style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-[22px] text-white/90 group-hover:text-white transition-colors tracking-[-0.3px]">
              Locations
            </span>
            <IoChevronForward className="text-[#C5A267] text-[14px] opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </nav>

        {/* Divider + footer */}
        <div
          className="mx-7 my-5"
          style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)' }}
        />
        <div className="px-7 pb-7">
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/20 select-none">
            Powered by Niqro
          </span>
        </div>
      </div>
    </>
  );
}

export default React.memo(NavDrawer);