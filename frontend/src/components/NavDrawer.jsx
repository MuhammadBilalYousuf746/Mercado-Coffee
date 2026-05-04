import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom"; // Link import karein

function NavDrawer({ isOpen, setIsOpen }) {
  
  // Locations pe click ho to scroll karne ke liye function
  const scrollToFooter = (e) => {
    e.preventDefault();
    setIsOpen(false); // Drawer band karein
    const footer = document.querySelector('footer'); // Footer element ko select karein
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
    }
  };

  // Nav items ka naya structure paths ke sath
  const navLinks = [
    { name: 'Menu', path: '/' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'FAQs', path: '/faqs' }, // Extra: FAQs bhi add kar diya
    { name: 'Privacy', path: '/privacy-policy' }
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div className={`fixed top-0 left-0 h-full w-[85%] sm:w-80 bg-[#3E4235] z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white hover:rotate-90 transition-transform duration-300 p-1"
          >
            <IoClose size={32} />
          </button>
        </div>

        {/* Links Section */}
        <nav className="flex flex-col space-y-6 sm:space-y-8 px-8 sm:px-10 mt-6 sm:mt-10 font-serif">
          {/* Mapping Dynamic Links */}
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className="text-2xl sm:text-3xl text-white hover:text-stone-300 transition-colors relative group w-fit"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C5A267] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Locations Link (Custom Scroll) */}
          <button 
            onClick={scrollToFooter}
            className="text-2xl sm:text-3xl text-white hover:text-stone-300 transition-colors relative group w-fit text-left"
          >
            Locations
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C5A267] transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        {/* Footer of Drawer */}
        <div className="absolute bottom-10 px-8 sm:px-10 text-stone-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            Powered By Niqro
        </div>
      </div>
    </>
  );
}

export default NavDrawer;