import React from 'react';
import ProductCard from './ProductCard';

const featured = [
  { id: 101, name: "Mercado Grand Breakfast", price: "1200", category: "Featured", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666" },
  { id: 102, name: "Jalapeño Inferno Zinger", price: "799", category: "Featured", image: "https://images.unsplash.com/photo-1521305916504-4a1121188589" },
  { id: 103, name: "Spanish Latte", price: "600", category: "Featured", image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f" }
];

const FeaturedSelections = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-l-4 border-[#800010] pl-3">Featured Selections</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {featured.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default FeaturedSelections;