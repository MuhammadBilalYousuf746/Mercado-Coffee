import React from 'react';
import ProductCard from './ProductCard';

const items = [
  { id: 401, name: "Iced Spanish Latte", price: "710", category: "Iced Coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c" },
  { id: 402, name: "Dream Lavender Latte", price: "790", category: "Iced Coffee", image: "https://images.unsplash.com/photo-1594631252845-29fc4586b37b" }
];

const IcedCoffeeCreation = () => (
  <section className="mb-12">
    <h2 className="text-xl font-bold uppercase mb-6">Iced Coffee Creations</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default IcedCoffeeCreation;