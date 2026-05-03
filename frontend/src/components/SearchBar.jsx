import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">

        {/* Search icon — left */}
        <Search
          className={`absolute left-3.5 sm:left-5 w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] pointer-events-none transition-colors duration-200
            ${isFocused ? 'text-[#3E4235]' : 'text-zinc-400'}`}
          strokeWidth={2.5}
        />

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search — try 'latte' or 'burger'..."
          className="
            w-full bg-zinc-50 border-2 border-zinc-200
            rounded-xl sm:rounded-2xl
            text-zinc-800 placeholder-zinc-400
            transition-all duration-200
            focus:outline-none focus:border-[#3E4235] focus:bg-white
            pl-9 pr-16 py-2.5
            sm:pl-12 sm:pr-28 sm:py-4
            text-[12px] sm:text-sm font-medium
          "
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 sm:right-20 text-zinc-400 hover:text-zinc-600 transition-colors p-1"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
          </button>
        )}

        {/* Submit — icon only on mobile, text on sm+ */}
        <button
          type="submit"
          className="
            absolute right-2
            bg-black text-white
            rounded-lg sm:rounded-xl
            transition-all duration-200
            hover:bg-[#3E4235] active:scale-95
            flex items-center justify-center
            p-2 sm:px-4 sm:py-2.5
          "
        >
          {/* Mobile: sirf icon */}
          <ArrowRight className="w-4 h-4 sm:hidden" strokeWidth={2.5} />
          {/* Tablet/Laptop: text */}
          <span className="hidden sm:inline text-[11px] font-bold tracking-wider uppercase">
            Search
          </span>
        </button>

      </form>
    </div>
  );
};

export default SearchBar;