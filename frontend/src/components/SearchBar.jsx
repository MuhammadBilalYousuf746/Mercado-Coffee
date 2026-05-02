import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-2">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center w-full group"
      >
        {/* Input Field 
            - Mobile: py-2.5 (chota height)
            - Tablet/Laptop: sm:py-4 (standard height)
        */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for iced spanish latte..."
          className="w-full py-2.5 sm:py-4 px-5 sm:px-8 pr-12 sm:pr-14 rounded-full border-2 border-stone-200 focus:border-[#3E4235] focus:outline-none text-sm sm:text-base text-[#3E4235] placeholder-stone-400 transition-all shadow-sm"
        />
        
        {/* Search/Arrow Icon Button 
            - Button size scales with input
        */}
        <button 
          type="submit"
          className="absolute right-1.5 sm:right-2 p-1.5 sm:p-2.5 bg-[#3E4235] rounded-full text-white hover:bg-black transition-all active:scale-95"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;