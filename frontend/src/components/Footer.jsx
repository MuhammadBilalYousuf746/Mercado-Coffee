import React from 'react';

function Footer() {
  return (
    // Responsive Padding: Mobile par px-6, tablet par px-12, desktop par px-20
    <footer className="relative w-full bg-[#3E4235] text-white pt-16 pb-10 px-6 sm:px-12 md:px-20 mt-16 font-serif overflow-hidden">
      
      {/* Inverted Circle Design - Mobile friendly size */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl z-10">
      </div>

      {/* Grid: 
          - Mobile: 1 Column
          - Tablet: 2 Columns (Philosophy stays wide)
          - Desktop: 3 Columns
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
        
        {/* Column 1: The Philosophy */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          {/* Responsive Font Size for Header */}
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-2 text-white">
            MERCADO<span className="text-[#C5A267]">.</span>
          </h2>
          
          <p className="text-sm sm:text-base leading-relaxed mb-6 italic text-stone-200 antialiased max-w-sm">
            "From South Melbourne to North Melbourne, we bring the essence of premium brewing culture to the heart of Karachi."
          </p>
          
          <div className="flex flex-wrap gap-4 sm:gap-5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
            <a href="#" className="hover:text-stone-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-stone-400 transition-colors">TikTok</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Snapchat</a>
          </div>
        </div>

        {/* Column 2: The Estate */}
        <div className="col-span-1">
          <h3 className="text-[10px] font-bold mb-4 uppercase tracking-[0.3em] text-stone-400 font-sans">The Location</h3>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-stone-100">
            Plot 141, Block 14,<br />
            <span className="font-bold uppercase tracking-tight">Gulistan-e-Johar, Karachi</span>
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block mt-3 text-[10px] uppercase tracking-widest font-bold border-b border-stone-500 pb-1 hover:text-stone-400 hover:border-stone-400 transition-all font-sans">
            — Get Directions
          </a>
          
          <div className="mt-4 w-full h-24 rounded-sm overflow-hidden border border-stone-600/30 grayscale opacity-40 hover:opacity-100 transition-all duration-500">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.123456789!2d67.123456789!3d24.912345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU0JzQ0LjQiTiA2N8KwMDcnMjQuNCJF!5e0!3m2!1sen!2spk!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Mercado Location"
            ></iframe>
          </div>
        </div>

        {/* Column 3: The Ritual */}
        <div className="col-span-1">
          <h3 className="text-[10px] font-bold mb-4 uppercase tracking-[0.3em] text-stone-400 font-sans">Brewing Hours</h3>
          <div className="space-y-0.5">
            <p className="text-[11px] text-stone-300 font-sans uppercase tracking-wider">Mon — Sun</p>
            <p className="text-2xl sm:text-3xl font-light tracking-tight text-white">07:30 — 01:30</p>
            <p className="text-[9px] mt-3 italic text-stone-400 antialiased border-t border-white/10 pt-2">
              *KITCHEN CLOSES 15 MINS EARLY
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Stacked on mobile, row on tablet/desktop */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.4em] text-stone-500 uppercase font-sans text-center sm:text-left order-2 sm:order-1">
          © 2026 MERCADO COFFEE BAR.
        </p>
        
        <div className="flex gap-4 sm:gap-6 text-[9px] tracking-[0.2em] text-stone-400 uppercase font-sans order-1 sm:order-2">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Menu</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;