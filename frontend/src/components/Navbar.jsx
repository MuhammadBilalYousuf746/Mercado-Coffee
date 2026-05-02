import { useState, useEffect } from 'react';
import logo from '../assets/logo/logo.png' 
import { FaPhoneAlt, FaChevronDown } from 'react-icons/fa'; 
import { HiOutlineShoppingBag, HiMenuAlt2 } from 'react-icons/hi'; 
import NavDrawer from './NavDrawer';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [location, setLocation] = useState("Gulistan-e-Johar");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const area = data.address.suburb || data.address.city || "Karachi";
          setLocation(area);
        } catch (error) { console.error(error); }
      });
    }
  };

  useEffect(() => { fetchLocation(); }, []);

  return (
    <>
      <nav className="relative w-full h-20 bg-[#3E4235] flex items-center justify-between px-4 sm:px-8 md:px-12">
        
        {/* Left Side: Menu and Location */}
        <div className="flex items-center space-x-3 sm:space-x-6 z-20">
          {/* Burger Menu */}
          <div 
            onClick={() => setIsDrawerOpen(true)}
            className="bg-black p-2 rounded-md cursor-pointer hover:bg-stone-900 transition-all flex-shrink-0"
          >
            <HiMenuAlt2 className="text-white text-xl sm:text-2xl" />
          </div>

          {/* Location Section - Tablet/Desktop only */}
          <div className="hidden lg:block text-white flex-shrink-0">
            <p className="text-[9px] tracking-[0.2em] text-stone-400 font-bold uppercase leading-none mb-1">Change Location</p>
            <div onClick={fetchLocation} className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-xs sm:text-sm font-bold border-b border-white tracking-wide">{location}</span>
              <FaChevronDown className="text-[10px] group-hover:translate-y-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Logo Circle - Responsive sizing */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#000000] border-4 border-black rounded-full 
                        flex items-center justify-center z-50 overflow-hidden shadow-lg">
          <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 sm:p-3" />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-white z-20">
          <button className="hover:text-stone-400 transition-colors p-1">
            <FaPhoneAlt className="text-lg sm:text-xl" />
          </button>

          <div className="relative cursor-pointer hover:text-stone-400 transition-colors p-1">
            <HiOutlineShoppingBag className="text-2xl sm:text-[26px]" />
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-white text-[#3E4235] text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border border-black shadow-sm">
              0
            </span>
          </div>
        </div>
      </nav>

      {/* Drawer Component */}
      <NavDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </>
  )
}

export default Navbar;