// src/components/Checkout/PaymentSection.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CheckoutInput from './CheckoutInput';
import { PAYMENT_METHODS, fmtCard, fmtExpiry, fmtPhone } from '../../utils/checkoutHelpers';

/* ── Per-method field panels ───────────────────────────── */
const MobileWalletFields = ({ method, form, set }) => (
  <div className="space-y-4">
    <div className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-bold
      ${method === 'easypaisa'
        ? 'bg-green-50 text-green-800 border border-green-200'
        : 'bg-red-50   text-red-800   border border-red-200'}`}
    >
      <span className="text-xl">{method === 'easypaisa' ? '🟢' : '🔴'}</span>
      Pay via {method === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} — enter your registered mobile number
    </div>
    <CheckoutInput
      label={`${method === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} Account Number`}
      type="tel"
      inputMode="numeric"
      value={form.mobileAccount}
      onChange={e => set('mobileAccount', fmtPhone(e.target.value))}
      required
      maxLength={11}
    />
  </div>
);

const CardFields = ({ form, set }) => (
  <div className="space-y-4">
    <CheckoutInput
      label="Name on Card"
      type="text"
      value={form.cardName}
      onChange={e => set('cardName', e.target.value)}
      required
    />
    <CheckoutInput
      label="Card Number"
      type="text"
      inputMode="numeric"
      value={form.cardNumber}
      onChange={e => set('cardNumber', fmtCard(e.target.value))}
      required
      maxLength={19}
    />
    <div className="grid grid-cols-2 gap-4">
      <CheckoutInput
        label="Expiry MM/YY"
        type="text"
        inputMode="numeric"
        value={form.expiry}
        onChange={e => {
          const raw = e.target.value;
          if (raw.endsWith('/') && form.expiry.length === 4) {
            set('expiry', raw.slice(0, 2));
          } else {
            set('expiry', fmtExpiry(raw));
          }
        }}
        required
        maxLength={5}
      />
      <CheckoutInput
        label="CVV"
        type="password"
        inputMode="numeric"
        value={form.cvv}
        onChange={e => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
        required
        maxLength={4}
      />
    </div>
    <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
        <rect x="1" y="5" width="10" height="8" rx="1.5" stroke="#C5A267" strokeWidth="1.5" />
        <path d="M3.5 5V4a2.5 2.5 0 0 1 5 0v1" stroke="#C5A267" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      Secured with 256-bit SSL encryption
    </div>
  </div>
);

const CashFields = ({ form, set, grandTotal }) => (
  <div className="space-y-4">
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm font-semibold text-amber-900">
      💵 You'll pay <span className="font-black">Rs. {grandTotal.toLocaleString()}</span> in cash at delivery
    </div>
    <div>
      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
        Change Required? (optional)
      </label>
      <input
        type="text"
        placeholder="e.g. I'll pay with Rs. 2000, please bring change"
        value={form.cashNote}
        onChange={e => set('cashNote', e.target.value)}
        className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4
          text-sm font-semibold text-zinc-700 outline-none transition-all duration-200
          focus:border-[#C5A267] focus:ring-2 focus:ring-[#C5A267]/20
          placeholder:text-zinc-300 placeholder:font-normal"
      />
    </div>
  </div>
);

/* ── Main PaymentSection ────────────────────────────────── */
const PaymentSection = ({ form, set, grandTotal, onBack }) => (
  <motion.div
    key="step2"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
    className="space-y-5"
  >
    {/* Method selector */}
    <div className="grid grid-cols-2 gap-3">
      {PAYMENT_METHODS.map(m => {
        const active = form.paymentMethod === m.id;
        return (
          <label
            key={m.id}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer flex items-center
              gap-3 transition-all duration-200
              ${active ? 'border-zinc-900 bg-zinc-900 shadow-xl' : 'border-zinc-100 bg-white hover:border-zinc-300'}`}
          >
            <input
              type="radio" name="payment" className="hidden"
              value={m.id} checked={active}
              onChange={e => set('paymentMethod', e.target.value)}
            />
            <span className="text-xl leading-none">{m.icon}</span>
            <span className={`font-black text-[11px] uppercase tracking-wide leading-tight
              ${active ? 'text-white' : 'text-zinc-700'}`}
            >
              {m.label}
            </span>
            {active && (
              <motion.div
                layoutId="paycheck"
                className="absolute top-2 right-2 w-4 h-4 bg-[#C5A267] rounded-full
                  flex items-center justify-center text-[8px] text-white font-black"
              >✓</motion.div>
            )}
          </label>
        );
      })}
    </div>

    {/* Animated field swap */}
    <AnimatePresence mode="wait">
      <motion.div
        key={form.paymentMethod}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22 }}
      >
        {(form.paymentMethod === 'easypaisa' || form.paymentMethod === 'jazzcash') && (
          <MobileWalletFields method={form.paymentMethod} form={form} set={set} />
        )}
        {form.paymentMethod === 'card' && (
          <CardFields form={form} set={set} />
        )}
        {form.paymentMethod === 'cash' && (
          <CashFields form={form} set={set} grandTotal={grandTotal} />
        )}
      </motion.div>
    </AnimatePresence>

    {/* Actions */}
    <div className="flex gap-3 pt-2">
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px]
          border-2 border-zinc-200 text-zinc-500 transition-all active:scale-[0.98]
          hover:border-zinc-400 hover:text-zinc-800"
      >
        ← Back
      </button>
      <button
        type="submit"
        className="flex-1 bg-[#1a1611] text-white py-5 rounded-2xl font-black uppercase
          tracking-[0.2em] text-xs shadow-xl transition-all duration-300
          hover:bg-[#C5A267] hover:shadow-[#C5A267]/30 active:scale-[0.98]"
      >
        Place Order · Rs. {grandTotal.toLocaleString()}
      </button>
    </div>
  </motion.div>
);

export default PaymentSection;