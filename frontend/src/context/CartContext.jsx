import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id && i.variant === item.variant);
      if (existing) {
        return prev.map(i => i.id === item.id && i.variant === item.variant 
          ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true); // Item add hote hi drawer khul jaye
  };

  const removeFromCart = (id, variant) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.variant === variant)));
  };

  const updateQuantity = (id, variant, delta) => {
    setCart(prev => prev.map(i => 
      i.id === id && i.variant === variant 
        ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, 
      cartTotal, isCartOpen, setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);