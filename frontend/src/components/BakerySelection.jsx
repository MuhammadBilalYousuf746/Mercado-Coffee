import React from 'react';
import ProductCard from './ProductCard';

const items = [
  { id: 801, name: "Classic Cheesecake", price: "620", category: "Bakery", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad" },
  { id: 802, name: "Tiramisu Filled Donut", price: "370", category: "Bakery", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b" }
];

const BakerySelection = () => (
  <section className="mb-12">
    <h2 className="text-xl font-bold uppercase mb-6">Bakery Selection</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default BakerySelection;