import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart(); // clearCart function context mein add kar dein
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });

  const deliveryCharges = 150;
  const gst = Math.round(cartTotal * 0.13);
  const grandTotal = cartTotal + deliveryCharges + gst;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call
    const generatedId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(generatedId);
    
    // Order place hone ke baad logic
    setTimeout(() => {
      setIsSubmitted(true);
      // clearCart(); // Cart khali karne ke liye isay uncomment karein
    }, 500);
  };

  // Success UI Component
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8 p-8"
        >
          {/* Animated Success Icon */}
          <div className="relative mx-auto w-24 h-24">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="absolute inset-0 bg-[#C5A267] rounded-full flex items-center justify-center text-white text-4xl"
            >
              ✓
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-[#C5A267]/20 rounded-full"
            />
          </div>

          <div className="space-y-3">
            <h2 className="font-black text-3xl italic text-zinc-900 uppercase tracking-tight">Order Received!</h2>
            <p className="text-zinc-500 font-medium">Get ready for the best coffee experience. We're preparing your order right now.</p>
          </div>

          <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Order ID</p>
            <p className="font-black text-xl text-zinc-900 tracking-wider">{orderId}</p>
            <div className="mt-4 pt-4 border-t border-zinc-200 flex justify-between items-center text-sm font-bold">
              <span className="text-zinc-500 uppercase tracking-tighter">Amount to pay:</span>
              <span className="text-zinc-900">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-[#1a1611] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#C5A267] transition-all"
            >
              Continue Shopping
            </button>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              A confirmation text will be sent to {formData.phone}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Chkout form logic (Wohi purana responsive code)
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-black text-3xl italic">YOUR BAG IS EMPTY</h2>
        <button onClick={() => navigate('/')} className="mt-6 bg-[#1a1611] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-[#C5A267]">
          Go Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16">
        
        {/* Left Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 order-2 lg:order-1"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-black text-4xl italic uppercase text-zinc-900">Checkout</h1>
            <p className="text-zinc-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2">Personal Details & Delivery</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                required type="text" placeholder="Full Name"
                className="w-full p-5 bg-zinc-50 border border-zinc-200 rounded-[24px] focus:border-[#C5A267] outline-none"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <input 
                required type="tel" placeholder="Phone Number"
                className="w-full p-5 bg-zinc-50 border border-zinc-200 rounded-[24px] focus:border-[#C5A267] outline-none"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <textarea 
              required rows="3" placeholder="Full Delivery Address..."
              className="w-full p-5 bg-zinc-50 border border-zinc-200 rounded-[24px] focus:border-[#C5A267] outline-none resize-none"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['cash', 'card'].map((method) => (
                <label key={method} className={`p-6 border-2 rounded-[24px] cursor-pointer flex justify-between items-center transition-all ${formData.paymentMethod === method ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-100 bg-zinc-50'}`}>
                  <input type="radio" name="payment" className="hidden" value={method} checked={formData.paymentMethod === method} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
                  <span className="font-black uppercase text-xs tracking-widest">{method === 'cash' ? 'Cash on Delivery' : 'Credit Card'}</span>
                  <span>{method === 'cash' ? '💵' : '💳'}</span>
                </label>
              ))}
            </div>

            <button type="submit" className="w-full bg-[#1a1611] text-white py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-sm hover:bg-[#C5A267] shadow-2xl active:scale-95 transition-all">
              Place Order • Rs. {grandTotal.toLocaleString()}
            </button>
          </form>
        </motion.div>

        {/* Right Side: Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 order-1 lg:order-2"
        >
          <div className="bg-zinc-50 rounded-[40px] p-8 lg:sticky lg:top-36 border border-zinc-100">
            <h2 className="font-black text-2xl italic uppercase mb-8">Summary</h2>
            <div className="space-y-5 mb-8 max-h-[300px] overflow-y-auto pr-3 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <img src={item.image} className="w-16 h-16 rounded-2xl object-cover border border-zinc-200" alt="" />
                    <div className="flex flex-col justify-center">
                      <h4 className="font-black text-[12px] uppercase text-zinc-900">{item.name}</h4>
                      <p className="text-[10px] text-[#C5A267] font-bold">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-6 border-t border-zinc-200 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-zinc-900 font-black">Rs. {cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="text-zinc-900 font-black">Rs. {deliveryCharges}</span></div>
              <div className="flex justify-between border-t border-zinc-900 pt-4 mt-4 text-zinc-900">
                <span className="text-sm">Total</span>
                <span className="text-3xl leading-none tracking-tighter">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;