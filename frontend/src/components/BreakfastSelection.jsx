import React from 'react';
import ProductCard from './ProductCard';

const items = [
  // --- Eggs & Classics ---
  { id: 201, name: "Heritage Masala Omelette", price: "899", category: "Breakfast", image: "https://images.unsplash.com/photo-1510629954389-c1e0da47d415" },
  { id: 202, name: "Classic French Omelette", price: "1199", category: "Breakfast", image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba04d87" },
  { id: 203, name: "Forest Mushroom Omelette", price: "1199", category: "Breakfast", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
  { id: 204, name: "Soft Scrambled Eggs", price: "1050", category: "Breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
  { id: 205, name: "Eggs Benedict", price: "1299", category: "Breakfast", image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8" },
  { id: 206, name: "Devilled Eggs Royale", price: "550", category: "Breakfast", image: "https://images.unsplash.com/photo-1590080873974-9a38ca490234" },
  { id: 207, name: "Mercado Grand Breakfast", price: "1200", category: "Breakfast", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666" },

  // --- Morning Indulgences ---
  { id: 208, name: "Buttermilk Pancakes", price: "1050", category: "Breakfast", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93" },
  { id: 209, name: "Brioche French Toast", price: "800", category: "Breakfast", image: "https://images.unsplash.com/photo-1484723088339-fe28233e562e" },
  { id: 210, name: "Sunny-Side Farm Eggs", price: "795", category: "Breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
  { id: 211, name: "Wholesome Oat Porridge", price: "500", category: "Breakfast", image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc" },

  // --- Sandwiches ---
  { id: 301, name: "Croque Monsieur Classique", price: "1300", category: "Sandwiches", image: "https://images.unsplash.com/photo-1475090169767-40ed8d18a67d" },
  { id: 302, name: "Artisan Stuffed Grilled Cheese", price: "1200", category: "Sandwiches", image: "https://images.unsplash.com/photo-1528733385370-431cc2924a2b" },
  { id: 303, name: "Classic Clubhouse Sandwich", price: "1499", category: "Sandwiches", image: "https://images.unsplash.com/photo-1567234665766-cd14619e69f7" },

  // --- From the Sea ---
  { id: 401, name: "Golden Fillet-O-Fish Burger", price: "1400", category: "Seafood", image: "https://images.unsplash.com/photo-1511909523672-017a411f6499" },
  { id: 402, name: "Classic Fish & Chips", price: "1400", category: "Seafood", image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a" }
];

const BreakFastSelection = () => (
  <section className="mb-12">
    <h2 className="text-xl font-bold uppercase mb-6">Menu Selection</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map(item => <ProductCard key={item.id} {...item} />)}
    </div>
  </section>
);

export default BreakFastSelection;