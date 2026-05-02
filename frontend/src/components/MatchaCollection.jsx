import React from 'react';
import ProductCard from './ProductCard';

const items = [
  { id: 601, name: "Blue Matcha Elixir", price: "930", category: "Matcha", image: "https://images.unsplash.com/photo-1582781201157-11daa664147e" },
  { id: 602, name: "Pink Matcha Fusion", price: "930", category: "Matcha", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7" }
];

const MatchaCollection = () => (
  <section className="mb-12">
    <h2 className="text-xl font-bold uppercase mb-6">Matcha Collection</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default MatchaCollection;