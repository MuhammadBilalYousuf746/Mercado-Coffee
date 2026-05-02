import { IoClose } from "react-icons/io5";

function NavDrawer({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel 
          - Mobile: w-[85%] (taake side se thora background nazar aaye)
          - Tablet/Desktop: sm:w-80 (fixed width)
      */}
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
          {['Menu', 'Locations', 'Our Story', 'Contact'].map((item) => (
            <a 
              key={item}
              href="#" 
              onClick={() => setIsOpen(false)} // Link click pe drawer band ho jaye
              className="text-2xl sm:text-3xl text-white hover:text-stone-300 transition-colors relative group w-fit"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C5A267] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
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