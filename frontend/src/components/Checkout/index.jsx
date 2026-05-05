// src/components/Checkout/index.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { calcTotals } from '../../utils/checkoutHelpers';

import EmptyCart       from './EmptyCart';
import StepIndicator   from './StepIndicator';
import UserDetailsForm from './UserDetailsForm';
import PaymentSection  from './PaymentSection';
import OrderSummary    from './OrderSummary';
import SuccessScreen   from './SuccessScreen';

const INITIAL_FORM = {
  fullName: '', phone: '', address: '',
  paymentMethod: 'cash',
  cashNote: '', mobileAccount: '',
  cardName: '', cardNumber: '', expiry: '', cvv: '',
};

const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const [step, setStep]         = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId]   = useState('');
  const [form, setForm]         = useState(INITIAL_FORM);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const { grandTotal } = calcTotals(cartTotal);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const id = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(id);
    setTimeout(() => setSubmitted(true), 400);
  };

  if (submitted)   return <SuccessScreen orderId={orderId} grandTotal={grandTotal} form={form} />;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-black text-[#C5A267] uppercase tracking-[0.4em] mb-2">
            Secure Checkout
          </p>
          <h1 className="font-black text-5xl sm:text-6xl italic uppercase text-zinc-900 tracking-tight">
            Complete Order
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">

          {/* Left: multi-step form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <StepIndicator currentStep={step} onBack={() => setStep(1)} />

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <UserDetailsForm
                    form={form} set={set}
                    onNext={() => setStep(2)}
                  />
                )}
                {step === 2 && (
                  <PaymentSection
                    form={form} set={set}
                    grandTotal={grandTotal}
                    onBack={() => setStep(1)}
                  />
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right: sticky summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <OrderSummary cart={cart} cartTotal={cartTotal} />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;