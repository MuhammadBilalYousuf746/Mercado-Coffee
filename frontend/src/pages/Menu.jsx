import React from 'react';
import CategoryBar from '../components/CategoryBar';
import SearchBar from '../components/SearchBar'; // SearchBar ko import karein

function Menu() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Category Bar sab se upar */}
      <CategoryBar />

      {/* 2. Search Bar theek CategoryBar ke niche (image_a5d3e3.png ke style mein) */}
      <div className="mt-4 px-4"> 
        <SearchBar />
      </div>

      {/* 3. Main Content jo thora niche shuru ho raha hai */}
      <main className="flex-grow flex justify-center items-center p-10 bg-white mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#800010] mb-4 uppercase tracking-tighter">
            MERCADO COFFEE BAR
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            Karachi's Premium Brewing Experience
          </p>
          
          <div className="mt-20 text-stone-300 italic">
            Menu items coming soon...
          </div>
        </div>
      </main>
    </div>
  );
}

export default Menu;