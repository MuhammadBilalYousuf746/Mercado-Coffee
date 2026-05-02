import React from 'react';
import ProductCard from './ProductCard';

const items = [
  { id: 701, name: "V60 Bourbon (Hot)", price: "780", category: "Hand Brew", image: "https://images.unsplash.com/photo-1544787210-2213d64ac9f9" },
  { id: 702, name: "V60 Bourbon (Cold)", price: "800", category: "Hand Brew", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" }
];

const HandBrew = () => (
  <section className="mb-12">
    <h2 className="text-xl font-bold uppercase mb-6">V60 Hand Brew</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default HandBrew;