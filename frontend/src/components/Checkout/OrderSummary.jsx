// src/components/Checkout/OrderSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { DELIVERY_CHARGES, GST_RATE } from '../../utils/checkoutHelpers';

const BADGES = [
  { icon: '🔒', text: 'Secure Checkout' },
  { icon: '⚡', text: 'Fast Delivery'   },
  { icon: '↩️', text: 'Easy Returns'    },
];

/* ── Payment Icons SVGs ── */
const EasypaisaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="opacity-80 grayscale hover:grayscale-0 transition-all">
    <circle cx="20" cy="20" r="20" fill="#3BB54A"/>
    <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const JazzCashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="opacity-80 grayscale hover:grayscale-0 transition-all">
    <circle cx="20" cy="20" r="20" fill="#FF0000"/>
    <path d="M10 20H30M20 10V30" stroke="white" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const CardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const OrderSummary = ({ cart, cartTotal }) => {
  const gst        = Math.round(cartTotal * GST_RATE);
  const grandTotal = cartTotal + DELIVERY_CHARGES + gst;

  const rows = [
    { label: 'Subtotal',  value: cartTotal         },
    { label: 'Delivery',  value: DELIVERY_CHARGES  },
    { label: 'GST (13%)', value: gst               },
  ];

  return (
    <div className="bg-white rounded-[36px] p-7 lg:sticky lg:top-32 border border-zinc-100 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-black text-xl italic uppercase text-zinc-900">Order Summary</h2>
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest
          bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-200">
          {cart.length} item{cart.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Cart items */}
      <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1 mb-6 scrollbar-hide">
        {cart.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-4"
          >
            <div className="relative flex-shrink-0">
              <img
                src={item.image} alt={item.name}
                className="w-14 h-14 rounded-2xl object-cover border border-zinc-100"
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-zinc-900 text-white
                text-[9px] font-black rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-[12px] uppercase text-zinc-900 truncate">{item.name}</p>
              <p className="text-[10px] text-zinc-400 font-bold">Rs. {item.price.toLocaleString()} each</p>
            </div>
            <span className="font-black text-sm text-zinc-900 flex-shrink-0">
              Rs. {(item.price * item.quantity).toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="border-t border-zinc-100 pt-5 space-y-3">
        {rows.map(r => (
          <div key={r.label} className="flex justify-between items-center
            text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            <span>{r.label}</span>
            <span className="text-zinc-700">Rs. {r.value.toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-100">
          <span className="text-sm font-black uppercase tracking-widest text-zinc-900">Total</span>
          <span className="text-3xl font-black text-zinc-900 leading-none">
            Rs. {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-6 pt-5 border-t border-zinc-100 grid grid-cols-3 gap-3">
        {BADGES.map(b => (
          <div key={b.text} className="flex flex-col items-center gap-1 text-center">
            <span className="text-lg">{b.icon}</span>
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wide leading-tight">
              {b.text}
            </span>
          </div>
        ))}
      </div>

      {/* Accepted Payments Section */}
      <div className="mt-6 flex flex-col items-center gap-3 py-4 bg-zinc-50 rounded-2xl border border-zinc-100">
        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em]">Accepted Payments</span>
        <div className="flex items-center gap-4">
          <EasypaisaIcon />
          <JazzCashIcon />
          <CardIcon />
          <span className="text-[10px] font-black text-zinc-400 uppercase">Cash</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;