import React from 'react';

const HeroCard = ({ data, isActive }) => {
  const { title, description, image } = data;

  return (
    <div
      className={`
        relative flex-shrink-0 overflow-hidden bg-zinc-100
        w-40 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80
        rounded-[24px] sm:rounded-[32px] md:rounded-[40px]
        mx-1.5 sm:mx-3
        transition-all duration-700 ease-in-out
        ${isActive
          ? 'scale-105 z-10 shadow-2xl opacity-100'
          : 'scale-95 opacity-40 grayscale-[30%]'
        }
      `}
    >
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-in-out ${
            isActive ? 'scale-110' : 'scale-100'
          }`}
        />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      {/* Shimmer — active card pe */}
      {isActive && (
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/10 skew-x-[-20deg] animate-shimmer" />
        </div>
      )}

      {/* Text */}
      <div className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-5 right-4 sm:right-5 text-white transition-all duration-500 ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        <h3 className="text-sm sm:text-xl md:text-2xl font-black uppercase leading-tight tracking-tighter">
          {title}
        </h3>
        <p className="text-white/70 text-[8px] sm:text-[10px] font-medium uppercase tracking-widest mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeroCard;