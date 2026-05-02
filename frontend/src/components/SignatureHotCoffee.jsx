import React from 'react';
import ProductCard from './ProductCard';

const items = [
  { id: 301, name: "Americano", price: "480", category: "Hot Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  { id: 302, name: "Cappuccino Classico", price: "580", category: "Hot Coffee", image: "https://images.unsplash.com/photo-1572442330615-582747194883" },
  { id: 303, name: "Mocha Latte", price: "630", category: "Hot Coffee", image: "https://images.unsplash.com/photo-1536939459926-301728717817" }
];

const SignatureHotCoffee = () => (
  <section className="mb-12">
    <h2 className="text-xl font-bold uppercase mb-6">Signature Hot Coffee</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default SignatureHotCoffee;