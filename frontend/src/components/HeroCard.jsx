import React from 'react';

const HeroCard = ({ data, isActive }) => {
  const { title, description, image } = data;

  const activeClass = isActive 
    ? 'scale-105 z-10 shadow-2xl opacity-100' 
    : 'scale-95 opacity-50 grayscale-[20%]';

  return (
    <div
      className={`relative flex-shrink-0 
        w-56 h-72 sm:w-60 sm:h-76 md:w-64 md:h-80 
        rounded-[30px] sm:rounded-[40px] 
        m-2 sm:m-4 
        transition-all duration-700 ease-in-out overflow-hidden bg-zinc-100 ${activeClass}`}
    >
      {/* Background Image */}
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* Text Content */}
      <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-6 right-5 sm:right-6 text-white">
        <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight tracking-tighter">
          {title}
        </h3>
        <p className="text-white/80 text-[9px] sm:text-[10px] font-medium uppercase tracking-widest mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeroCard;