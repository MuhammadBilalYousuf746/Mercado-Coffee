import React from 'react';
import ProductCard from './ProductCard';

const items = [
  { id: 501, name: "Lotus Frappe", price: "890", category: "Frappes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699" },
  { id: 502, name: "Pistachio Frappe", price: "890", category: "Frappes", image: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2" }
];

const ArtisanFrappes = () => (
  <section className="mb-12">
    <h2 className="text-xl font-bold uppercase mb-6">Artisan Frappes</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default ArtisanFrappes;