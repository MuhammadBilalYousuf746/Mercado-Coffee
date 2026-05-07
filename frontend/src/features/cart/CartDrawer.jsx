import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { MERCADO_MENU } from '../../data/menuData';

const DISCOUNT_PERCENT = 20;

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, cartTotal, updateQuantity, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const discountAmount = Math.round((cartTotal * DISCOUNT_PERCENT) / 100);
  const grandTotal = cartTotal - discountAmount;

  const today = new Date();
  const readyTime = new Date(today.getTime() + 45 * 60000);
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = readyTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const SUGGESTIONS = (MERCADO_MENU || [])
    .flatMap(category => category.items || [])
    .filter(item => {
      const alreadyInCart = cart.some(c => c.id === item.id);
      const isAddon = item.id >= 1900;
      return !alreadyInCart && !isAddon;
    })
    .slice(0, 10);

  const handleAddSuggested = (item) => {
    const itemPrice = item.prices ? item.prices.single : item.price;
    addToCart({
      id: item.id,
      name: item.name,
      price: itemPrice,
      variant: item.prices ? 'Single' : 'Regular',
      quantity: 1,
      image: item.image || 'https://via.placeholder.com/150?text=Mercado',
    });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-99 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            className="fixed right-0 top-0 h-dvh w-full sm:w-105 z-100 shadow-2xl flex flex-col bg-[#FAF9F7]"
          >
            {/* Header */}
            <div className="bg-[#1a1611] px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">Your Basket</h2>
                <p className="text-[#C5A267] text-[10px] font-bold uppercase tracking-widest mt-0.5">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
                </p>
              </div>

              {/* ✕ → Premium SVG Close */}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 active:bg-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-[#FAF9F7] overscroll-contain">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                  <span className="text-4xl mb-4">🍳</span>
                  <p className="text-stone-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="py-3 px-3 sm:py-4 sm:px-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="bg-white rounded-2xl p-3 sm:p-4 mb-2.5 flex gap-3 sm:gap-4 shadow-sm border border-stone-100">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-stone-100 rounded-xl shrink-0 overflow-hidden">
                        <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between font-bold text-[13px] sm:text-sm text-[#1a1611] gap-2">
                          <h4 className="truncate">{item.name}</h4>
                          <span className="shrink-0">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-[#C5A267] uppercase font-bold mt-0.5">{item.variant}</p>

                        <div className="flex justify-between items-center mt-2.5">
                          <div className="flex items-center bg-stone-50 rounded-lg border border-stone-200">
                            <button onClick={() => updateQuantity(item.id, item.variant, -1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-black active:bg-stone-100 rounded-l-lg transition-colors">−</button>
                            <span className="px-2 text-xs font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.variant, 1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-black active:bg-stone-100 rounded-r-lg transition-colors">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.variant)} className="text-[10px] text-red-400 font-bold uppercase hover:text-red-600 active:text-red-700 transition-colors py-1 px-2">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Suggestions Slider */}
                  <div className="mt-6 mb-3">
                    <h4 className="text-[13px] font-bold text-[#1a1611] mb-3 ml-1">Popular with your order</h4>
                    <div className="flex gap-2.5 overflow-x-auto pb-3 no-scrollbar -mx-1 px-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                      {SUGGESTIONS.map(item => (
                        <div key={item.id} className="bg-white p-2.5 rounded-2xl border border-stone-100 min-w-32.5 sm:min-w-35 shadow-sm shrink-0">
                          <div className="h-17.5 sm:h-20 bg-stone-100 rounded-lg mb-2 overflow-hidden">
                            <img src={item.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                          </div>
                          <h5 className="text-[10px] font-bold truncate">{item.name}</h5>
                          <div className="flex justify-between items-center mt-1.5">
                            <span className="text-[10px] font-bold text-[#C5A267]">Rs. {item.prices ? item.prices.single : item.price}</span>
                            <button onClick={() => handleAddSuggested(item)} className="w-7 h-7 bg-[#1a1611] text-white rounded-full flex items-center justify-center text-xs active:scale-90 transition-transform">+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-4 pt-4 pb-5 sm:p-6 bg-white border-t border-stone-100 shrink-0">
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-sm">
                  <div className="flex justify-between text-stone-400 text-[13px] sm:text-sm"><span>Subtotal</span><span>Rs. {cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-green-600 font-bold text-[13px] sm:text-sm"><span>Discount (20%)</span><span>- Rs. {discountAmount.toLocaleString()}</span></div>
                  <div className="flex justify-between text-base sm:text-lg font-black pt-2 border-t border-stone-50"><span>Total</span><span>Rs. {grandTotal.toLocaleString()}</span></div>
                </div>

                {/* ⏱ → Premium SVG Timer */}
                <div className="bg-[#F5F0E8] p-2.5 sm:p-3 rounded-xl mb-3 sm:mb-4 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A267" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="12" cy="13" r="8"/>
                    <path d="M12 9v4l2.5 2.5"/>
                    <path d="M9.5 2.5h5"/>
                    <path d="M12 2.5V5"/>
                  </svg>
                  <div className="text-[10px] font-medium leading-tight">
                    Ready for pickup in <b>45 mins</b><br />
                    <span className="text-stone-400 text-[9px]">{formattedDate} | {formattedTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  className="w-full bg-[#1a1611] text-white py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-black/10 active:scale-[0.98] transition-all hover:bg-[#C5A267]"
                >
                  Checkout Now
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