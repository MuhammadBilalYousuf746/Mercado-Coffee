import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Helper function to handle navigation and close drawer
  const handleBrowseMenu = () => {
    setIsCartOpen(false); // Drawer close karega
    
    // Agar hum pehle se menu page par hain toh scroll karega, 
    // agar nahi toh pehle menu page pe le jayega phir scroll karega.
    if (window.location.pathname === '/menu') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/menu');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay - Fast fade */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[99] backdrop-blur-[2px]"
          />
          
          {/* Drawer - Responsive width & Fast Slide */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: "circOut" }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-[420px] bg-white z-[100] shadow-2xl flex flex-col"
          >
            {/* Header - Adjusted padding for mobile */}
            <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-white">
              <div>
                <h2 className="font-black text-xl sm:text-2xl italic text-zinc-900 leading-none">YOUR BAG</h2>
                <p className="text-[9px] sm:text-[10px] text-zinc-400 font-bold tracking-[0.2em] mt-1 uppercase">
                  {cart.length === 0 ? 'Empty' : `${cart.length} items selected`}
                </p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-black hover:border-zinc-900 transition-all active:scale-90"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Cart Items - Improved Scroll & spacing */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="space-y-2 opacity-50">
                    <span className="text-4xl sm:text-5xl block">☕</span>
                    <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Your bag is empty.</p>
                  </div>
                  
                  {/* Browse the Menu Button */}
                  <button 
                    onClick={handleBrowseMenu}
                    className="px-8 py-3 border-2 border-zinc-900 text-zinc-900 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all duration-300 active:scale-95"
                  >
                    Browse the Menu
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={`${item.id}-${item.variant}`} 
                    className="flex gap-3 sm:gap-4 group"
                  >
                    {/* Responsive Image Box */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-50">
                        <img 
                          src={item.image || 'https://via.placeholder.com/150'} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start">
                        <div className="max-w-[70%]">
                          <h4 className="font-black text-[11px] sm:text-[13px] uppercase tracking-tight text-zinc-900 line-clamp-1">{item.name}</h4>
                          <p className="text-[9px] sm:text-[10px] font-bold text-[#C5A267] uppercase mt-0.5">
                            {item.variant} {item.hasAddon && `• ${item.addonName}`}
                          </p>
                        </div>
                        <p className="font-black text-xs sm:text-sm text-zinc-900">Rs. {item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Compact Quantity Selector */}
                        <div className="flex items-center bg-zinc-50 rounded-lg p-0.5 border border-zinc-100">
                          <button 
                            onClick={() => updateQuantity(item.id, item.variant, -1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-black transition-colors"
                          >-</button>
                          <span className="w-6 sm:w-8 text-center text-[10px] sm:text-[11px] font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.variant, 1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-black transition-colors"
                          >+</button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id, item.variant)}
                          className="text-[9px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer - Sticky Bottom */}
            <div className="p-6 sm:p-8 bg-white border-t border-zinc-100 mt-auto">
              <div className="space-y-2 mb-5 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">Subtotal</span>
                  <span className="font-medium text-zinc-900 text-sm sm:text-base text-right">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-zinc-50">
                  <span className="text-zinc-900 font-black uppercase tracking-widest text-xs sm:text-sm">Total</span>
                  <span className="font-black text-xl sm:text-2xl text-zinc-900">Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                disabled={cart.length === 0}
                className="w-full bg-[#1a1611] text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] sm:text-[12px] hover:bg-[#C5A267] transition-all duration-300 disabled:bg-zinc-200 disabled:cursor-not-allowed shadow-lg active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;