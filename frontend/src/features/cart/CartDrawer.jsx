import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { MERCADO_MENU } from '../../data/menuData';

const DISCOUNT_PERCENT = 20;

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, cartTotal, updateQuantity, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  // Price Logic
  const discountAmount = Math.round((cartTotal * DISCOUNT_PERCENT) / 100);
  const grandTotal = cartTotal - discountAmount;

  // Time & Date Logic
  const today = new Date();
  const readyTime = new Date(today.getTime() + 45 * 60000);
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = readyTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  // Suggestions Logic
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
          {/* Overlay - Smoother Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[99] backdrop-blur-sm"
          />

          {/* Drawer - Responsive & Lag-free */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            // Tween transition is much smoother for drawers than spring on mobile
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            style={{ willChange: 'transform' }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-[100] shadow-2xl flex flex-col bg-[#FAF9F7]"
          >
            {/* Header */}
            <div className="bg-[#1a1611] px-6 py-5 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-white text-xl font-bold tracking-tight">Your Basket</h2>
                <p className="text-[#C5A267] text-[10px] font-bold uppercase tracking-widest mt-1">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
                </p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-[#FAF9F7]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                  <span className="text-4xl mb-4">🍳</span>
                  <p className="text-stone-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="py-4 px-4">
                  {/* Items */}
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="bg-white rounded-2xl p-4 mb-3 flex gap-4 shadow-sm border border-stone-100">
                      <div className="w-16 h-16 bg-stone-100 rounded-xl flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between font-bold text-sm text-[#1a1611] gap-2">
                          <h4 className="truncate">{item.name}</h4>
                          <span className="shrink-0">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-[#C5A267] uppercase font-bold mt-1">{item.variant}</p>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center bg-stone-50 rounded-lg border border-stone-200">
                            <button onClick={() => updateQuantity(item.id, item.variant, -1)} className="px-3 py-1 text-stone-400 hover:text-black">−</button>
                            <span className="px-2 text-xs font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.variant, 1)} className="px-3 py-1 text-stone-400 hover:text-black">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.variant)} className="text-[10px] text-red-400 font-bold uppercase hover:text-red-600 transition-colors">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Suggestions Slider */}
                  <div className="mt-8 mb-4">
                    <h4 className="text-sm font-bold text-[#1a1611] mb-4 ml-1">Pairs well with...</h4>
                    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-1 px-1">
                      {SUGGESTIONS.map(item => (
                        <div key={item.id} className="bg-white p-3 rounded-2xl border border-stone-100 min-w-[140px] shadow-sm flex-shrink-0">
                          <div className="h-20 bg-stone-100 rounded-lg mb-2 overflow-hidden">
                             <img src={item.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                          </div>
                          <h5 className="text-[10px] font-bold truncate">{item.name}</h5>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] font-bold text-[#C5A267]">Rs. {item.prices ? item.prices.single : item.price}</span>
                            <button 
                              onClick={() => handleAddSuggested(item)}
                              className="w-7 h-7 bg-[#1a1611] text-white rounded-full flex items-center justify-center text-xs active:scale-90 transition-transform"
                            >
                              +
                            </button>
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
              <div className="p-6 bg-white border-t border-stone-100 shrink-0">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-stone-400"><span>Subtotal</span><span>Rs. {cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-green-600 font-bold"><span>Discount (20%)</span><span>- Rs. {discountAmount.toLocaleString()}</span></div>
                  <div className="flex justify-between text-lg font-black pt-2 border-t border-stone-50"><span>Total</span><span>Rs. {grandTotal.toLocaleString()}</span></div>
                </div>

                <div className="bg-[#F5F0E8] p-3 rounded-xl mb-4 flex items-center gap-3">
                  <span className="text-xl">⏱</span>
                  <div className="text-[10px] font-medium leading-tight">
                    Ready for pickup in <b>45 mins</b><br/>
                    <span className="text-stone-400 text-[9px]">{formattedDate} | {formattedTime}</span>
                  </div>
                </div>

                <button 
                   onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  className="w-full bg-[#1a1611] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-black/10 active:scale-[0.98] transition-all hover:bg-[#C5A267]"
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