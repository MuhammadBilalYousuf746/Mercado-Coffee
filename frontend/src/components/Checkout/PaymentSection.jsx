// src/components/Checkout/PaymentSection.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CheckoutInput from './CheckoutInput';
import { PAYMENT_METHODS, fmtCard, fmtExpiry, fmtPhone } from '../../utils/checkoutHelpers';

/* ── Professional SVGs ── */
const EasypaisaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#3BB54A"/>
    <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const JazzCashLogo = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#FF0000"/>
    <path d="M10 20H30M20 10V30" stroke="white" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const CardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* ── Per-method field panels ───────────────────────────── */
const MobileWalletFields = ({ method, form, set }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-100 border border-stone-200">
      <div className="flex-shrink-0">
        {method === 'easypaisa' ? <EasypaisaLogo /> : <JazzCashLogo />}
      </div>
      <p className="text-[11px] font-bold text-stone-600 uppercase tracking-tight">
        Pay via <span className="text-[#3E4235]">{method}</span> — Exact 11-digit mobile number
      </p>
    </div>
    <CheckoutInput
      label={`${method === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} Number (03xxxxxxxxx)`}
      type="tel"
      inputMode="numeric"
      value={form.mobileAccount}
      onChange={e => {
        const val = e.target.value.replace(/\D/g, ''); // Sirf digits allow karein
        // 11 digits se upar type karne se rokega
        if (val.length <= 11) set('mobileAccount', val);
      }}
      required
      maxLength={11}
      minLength={11} // Min length also set to 11
      pattern="[0-9]{11}" // Browser-level validation for exact 11 digits
      title="Must be exactly 11 digits (e.g., 03001234567)"
      placeholder="03001234567"
    />
  </div>
);

const CardFields = ({ form, set }) => (
  <div className="space-y-3">
    <div className="flex justify-end gap-1 mb-1 opacity-60">
      <div className="w-8 h-5 bg-stone-200 rounded-sm" />
      <div className="w-8 h-5 bg-stone-200 rounded-sm" />
    </div>
    <CheckoutInput
      label="Cardholder Name"
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
      icon={<CardIcon />}
    />
    <div className="grid grid-cols-2 gap-3">
      <CheckoutInput
        label="Expiry (MM/YY)"
        type="text"
        inputMode="numeric"
        value={form.expiry}
        onChange={e => set('expiry', fmtExpiry(e.target.value))}
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
    <div className="flex items-center justify-center gap-2 py-2 text-[9px] text-stone-400 font-black uppercase tracking-[0.2em]">
      <LockIcon />
      SSL Encrypted & Secure
    </div>
  </div>
);

const CashFields = ({ form, set, grandTotal }) => (
  <div className="space-y-4">
    <div className="bg-[#F9F5EE] border border-[#E8E0D1] rounded-xl p-5 text-center">
      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em] mb-1">Payable at Door</p>
      <p className="text-2xl font-serif italic text-[#3E4235]">Rs. {grandTotal.toLocaleString()}</p>
    </div>
    <div className="relative">
       <label className="block text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1.5 ml-1">
        Notes for Rider
      </label>
      <textarea
        placeholder="e.g. Please bring change for Rs. 5000..."
        value={form.cashNote}
        onChange={e => set('cashNote', e.target.value)}
        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-[12px] font-bold text-[#3E4235] outline-none transition-all focus:border-[#C5A267] min-h-[70px] resize-none"
      />
    </div>
  </div>
);

/* ── Main PaymentSection ────────────────────────────────── */
const PaymentSection = ({ form, set, grandTotal, onBack }) => (
  <motion.div
    key="step2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-6"
  >
    {/* Responsive Method Selector: grid-cols-1 on mobile, sm:grid-cols-2 on larger */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {PAYMENT_METHODS.map(m => {
        const active = form.paymentMethod === m.id;
        return (
          <label
            key={m.id}
            className={`relative p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3
              ${active ? 'border-[#3E4235] bg-[#3E4235] shadow-lg' : 'border-stone-100 bg-white hover:border-stone-200'}`}
          >
            <input
              type="radio" name="payment" className="hidden"
              value={m.id} checked={active}
              onChange={e => set('paymentMethod', e.target.value)}
            />
            {/* Logic to show SVG or Icon */}
            <div className={`flex-shrink-0 transition-all duration-300 ${active ? 'scale-90' : 'grayscale opacity-70'}`}>
              {m.id === 'easypaisa' ? <EasypaisaLogo /> : 
               m.id === 'jazzcash' ? <JazzCashLogo /> : 
               m.id === 'card' ? <CardIcon /> : 
               <span className="text-lg">💵</span>}
            </div>
            <span className={`font-black text-[9px] uppercase tracking-tight
              ${active ? 'text-white' : 'text-stone-500'}`}
            >
              {m.label}
            </span>
            {active && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A267] rounded-full flex items-center justify-center shadow-sm">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </label>
        );
      })}
    </div>

    {/* Content Area */}
    <div className="min-h-[200px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={form.paymentMethod}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
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
    </div>

    {/* Actions: Responsive gap and padding */}
    <div className="flex gap-2 sm:gap-3 pt-4 border-t border-stone-100">
      <button
        type="button"
        onClick={onBack}
        className="px-4 sm:px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] border border-stone-200 text-stone-400 hover:text-stone-800 transition-all active:scale-95 flex-shrink-0"
      >
        Back
      </button>
      <button
        type="submit"
        className="flex-1 bg-[#3E4235] text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#2A2D24] transition-all active:scale-95"
      >
        Confirm Order · Rs. {grandTotal.toLocaleString()}
      </button>
    </div>
  </motion.div>
);

export default PaymentSection;