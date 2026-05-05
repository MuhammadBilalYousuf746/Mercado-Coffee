// src/components/Checkout/EmptyCart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#faf9f7]">
      <div className="text-6xl mb-6">🛒</div>
      <h2 className="font-black text-3xl italic text-zinc-900 uppercase">Your Bag Is Empty</h2>
      <p className="text-zinc-400 mt-2 text-sm">Add something delicious first!</p>
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-[#1a1611] text-white px-10 py-4 rounded-2xl font-black
          uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#C5A267]"
      >
        Go Back to Menu
      </button>
    </div>
  );
};

export default EmptyCart;