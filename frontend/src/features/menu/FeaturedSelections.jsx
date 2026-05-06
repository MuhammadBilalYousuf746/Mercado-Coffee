import React, { useRef } from 'react';

const featured = [
  {
    id: 101,
    name: "Mercado Grand Breakfast",
    tag: "Chef's Pick",
    price: 1200,
    desc: "Mercado's signature morning platter",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80",
    bg: "from-amber-900 to-stone-900"
  },
  {
    id: 102,
    name: "Jalapeño Inferno Zinger",
    tag: "Fan Favourite",
    price: 799,
    desc: "Crispy chicken with Jalapeño heat",
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=400&q=80",
    bg: "from-red-900 to-zinc-900"
  },
  {
    id: 103,
    name: "Spanish Latte",
    tag: "Most Ordered",
    price: 600,
    desc: "Rich espresso with silky condensed milk",
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400&q=80",
    bg: "from-zinc-800 to-stone-900"
  },
  {
    id: 104,
    name: "Lotus Frappe",
    tag: "Trending",
    price: 890,
    desc: "Caramelized biscuit bliss",
    image: "https://images.unsplash.com/photo-1572490122747-3e9b3d67b0c2?w=400&q=80",
    bg: "from-orange-900 to-zinc-900"
  },
];

const FeaturedSelections = () => {
  const scrollRef = useRef(null);

  return (
    <section className="mb-10 sm:mb-14">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400 mb-0.5">
            Hand Picked
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
            Featured
          </h2>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 hidden sm:block">
          Scroll to explore →
        </span>
      </div>

      {/* Horizontal scroll cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2"
      >
        {featured.map((item, i) => (
          <div
            key={item.id}
            className={`
              relative flex-shrink-0 overflow-hidden rounded-[20px] sm:rounded-[24px]
              w-[200px] sm:w-[240px] md:w-[280px]
              h-[260px] sm:h-[300px] md:h-[340px]
              bg-gradient-to-br ${item.bg}
              group cursor-pointer
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl
            `}
          >
            {/* Background image */}
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Tag */}
            <div className="absolute top-3 left-3">
              <span className="bg-[#C5A267] text-black text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                {item.tag}
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <h3 className="text-white font-black uppercase tracking-tight leading-tight text-sm sm:text-base md:text-lg mb-1">
                {item.name}
              </h3>
              <p className="text-white/60 text-[10px] sm:text-[11px] uppercase tracking-wider mb-3">
                {item.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white font-black text-base sm:text-lg">
                  Rs. {item.price.toLocaleString()}
                </span>
                <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 hover:bg-[#C5A267] border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default FeaturedSelections;