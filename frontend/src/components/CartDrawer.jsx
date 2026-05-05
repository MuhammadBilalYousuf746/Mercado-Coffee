import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const SUGGESTED_ITEMS = [
  { id: 's1', name: 'Candy Colada', price: 440, emoji: '🍹', tag: 'Refreshing & fruity' },
  { id: 's2', name: 'Blueberry Smash', price: 464, emoji: '🫐', tag: 'Fan favourite' },
  { id: 's3', name: 'Fudge Brownie', price: 345, emoji: '🍰', tag: 'Goes with coffee' },
  { id: 's4', name: 'Butter Croissant', price: 280, emoji: '🥐', tag: 'Freshly baked' },
  { id: 's5', name: 'Choco Chip Cookie', price: 180, emoji: '🍪', tag: 'Sweet treat' },
];

const BESTSELLERS = [
  { id: 'b1', name: 'Mocha Frappé', price: 800, emoji: '☕', tag: '⭐ Bestseller' },
  { id: 'b2', name: 'Candy Colada', price: 440, emoji: '🍹', tag: 'Refreshing & fruity' },
  { id: 'b3', name: 'Butter Croissant', price: 280, emoji: '🥐', tag: 'Freshly baked daily' },
];

const DISCOUNT_PERCENT = 20;

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, cartTotal, updateQuantity, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  const discountAmount = Math.round((cartTotal * DISCOUNT_PERCENT) / 100);
  const grandTotal = cartTotal - discountAmount;

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const handleBrowseMenu = () => {
    setIsCartOpen(false);
    if (window.location.pathname === '/menu') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/menu');
    }
  };

  const handleAddSuggested = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      variant: 'Regular',
      quantity: 1,
      image: null,
    });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/55 z-[99] backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'circOut' }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-[420px] z-[100] shadow-2xl flex flex-col"
            style={{ background: '#faf9f7', fontFamily: "'DM Sans', sans-serif" }}
          >

            {/* Header */}
            <div style={{ background: '#1a1611' }} className="px-5 py-4 flex justify-between items-center flex-shrink-0">
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 20, fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1 }}>
                  Your Cart
                </h2>
                <p style={{ color: '#C5A267', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
                  {cart.length === 0 ? 'Nothing here yet' : `${cart.length} item${cart.length > 1 ? 's' : ''} selected`}
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, transition: 'all 0.2s' }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#C5A267 transparent' }}>

              {cart.length === 0 ? (
                /* ── Empty State ── */
                <div className="flex flex-col items-center px-5 pt-8 pb-6">
                  <div className="text-center mb-5">
                    <div style={{ fontSize: 48, opacity: 0.45, marginBottom: 10 }}>☕</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1a1611', marginBottom: 6 }}>
                      Your bag is empty
                    </h3>
                    <p style={{ fontSize: 11, color: '#a09080', lineHeight: 1.5 }}>
                      Add something delicious to get started
                    </p>
                  </div>

                  <button
                    onClick={handleBrowseMenu}
                    style={{ padding: '11px 28px', border: '2px solid #1a1611', background: 'none', color: '#1a1611', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 10, cursor: 'pointer', marginBottom: 28, transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
                    onMouseEnter={e => { e.target.style.background = '#1a1611'; e.target.style.color = '#fff'; }}
                    onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = '#1a1611'; }}
                  >
                    Browse the Menu →
                  </button>

                  {/* Bestsellers */}
                  <div className="w-full">
                    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a09080', marginBottom: 4 }}>
                      You might like
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: '#1a1611', marginBottom: 12 }}>
                      Our bestsellers
                    </p>
                    <div className="flex flex-col gap-2">
                      {BESTSELLERS.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'flex', gap: 10, background: '#fff', borderRadius: 12, border: '0.5px solid #ece9e3', padding: 10, alignItems: 'center' }}
                        >
                          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg,#f5e6cc,#e8d5b0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                            {item.emoji}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1611' }}>{item.name}</div>
                            <div style={{ fontSize: 10, color: '#a09080', marginTop: 1 }}>{item.tag}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: '#1a1611' }}>
                              Rs. {item.price.toLocaleString()}
                            </div>
                            <button
                              onClick={() => handleAddSuggested(item)}
                              style={{ background: '#1a1611', color: '#C5A267', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 3, transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
                            >
                              + Add
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Filled State ── */
                <>
                  {/* Cart Items */}
                  <div>
                    {cart.map((item) => (
                      <motion.div
                        layout
                        key={`${item.id}-${item.variant}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: 'flex', gap: 12, padding: '14px 20px', borderBottom: '0.5px solid #ece9e3', background: '#fff' }}
                      >
                        <div style={{ width: 62, height: 62, borderRadius: 12, background: 'linear-gradient(135deg,#f5e6cc,#e8d5b0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0, border: '0.5px solid #ece9e3', overflow: 'hidden' }}>
                          {item.image
                            ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : '☕'}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1611', letterSpacing: '0.01em' }}>{item.name}</div>
                              <div style={{ fontSize: 10, color: '#C5A267', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                                {item.variant}{item.hasAddon ? ` • ${item.addonName}` : ''}
                              </div>
                            </div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: '#1a1611' }}>
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f5f0e8', borderRadius: 8, overflow: 'hidden', border: '0.5px solid #e8e0d0' }}>
                              <button onClick={() => updateQuantity(item.id, item.variant, -1)} style={{ width: 26, height: 26, background: 'none', border: 'none', color: '#888', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                              <span style={{ width: 26, textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#1a1611' }}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.variant, 1)} style={{ width: 26, height: 26, background: 'none', border: 'none', color: '#888', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id, item.variant)} style={{ fontSize: 10, fontWeight: 600, color: '#c9a0a0', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.15s', fontFamily: "'DM Sans', sans-serif" }}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add More */}
                  <button
                    onClick={handleBrowseMenu}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', color: '#C5A267', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', background: '#fff', border: 'none', borderBottom: '0.5px solid #ece9e3', width: '100%', transition: 'background 0.2s', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #C5A267', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>+</span>
                    Add more items
                  </button>

                  {/* Suggestions */}
                  <div style={{ padding: '16px 20px 8px', background: '#faf9f7' }}>
                    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a09080', marginBottom: 4 }}>
                      Popular with your order
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: '#1a1611', marginBottom: 12 }}>
                      Customers often buy these together
                    </p>
                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
                      {SUGGESTED_ITEMS.filter(s => !cart.find(c => c.id === s.id)).map((item) => (
                        <div key={item.id} style={{ flexShrink: 0, width: 100, background: '#fff', borderRadius: 12, border: '0.5px solid #ece9e3', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}>
                          <div style={{ width: '100%', height: 68, background: 'linear-gradient(135deg,#f5e6cc,#e8d5b0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                            {item.emoji}
                          </div>
                          <div style={{ padding: '8px 8px 4px' }}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: '#1a1611', lineHeight: 1.3, marginBottom: 3 }}>{item.name}</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, fontWeight: 700, color: '#C5A267' }}>Rs. {item.price}</div>
                          </div>
                          <button
                            onClick={() => handleAddSuggested(item)}
                            style={{ display: 'block', width: 'calc(100% - 16px)', margin: '0 8px 8px', padding: '5px 0', background: '#1a1611', color: '#C5A267', border: 'none', borderRadius: 6, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer — only shown when cart has items */}
            {cart.length > 0 && (
              <div style={{ padding: '16px 20px', background: '#fff', borderTop: '0.5px solid #ece9e3', flexShrink: 0 }}>
                {/* Price Breakdown */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#a09080', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1611' }}>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 500, color: '#a09080', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Discount
                    <span style={{ background: '#e8f5ec', color: '#2d7a4a', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {DISCOUNT_PERCENT}% off
                    </span>
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2d7a4a' }}>− Rs. {discountAmount.toLocaleString()}</span>
                </div>

                <div style={{ height: '0.5px', background: '#ece9e3', margin: '8px 0 10px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#1a1611' }}>Grand Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: '#1a1611' }}>
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* ETA Banner */}
                <div style={{ background: '#f5f0e8', borderRadius: 10, padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, border: '0.5px solid #e8e0d0' }}>
                  <span style={{ fontSize: 14 }}>⏱</span>
                  <p style={{ fontSize: 10, color: '#6b5b45', lineHeight: 1.4, fontWeight: 500 }}>
                    Your order will be ready for{' '}
                    <strong style={{ color: '#1a1611' }}>Pickup in 45 mins</strong>
                    {' '}on <strong style={{ color: '#1a1611' }}>{today}</strong>
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  style={{ width: '100%', padding: '15px', background: '#1a1611', color: '#fff', border: 'none', borderRadius: 14, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.25s', fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={e => e.target.style.background = '#C5A267'}
                  onMouseLeave={e => e.target.style.background = '#1a1611'}
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;