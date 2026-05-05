// src/components/Checkout/StepIndicator.jsx
import React from 'react';

const LABELS = ['Your Details', 'Payment'];

const StepIndicator = ({ currentStep, onBack }) => (
  <div className="flex items-center gap-3 mb-8">
    {LABELS.map((label, i) => {
      const s = i + 1;
      const done    = currentStep > s;
      const active  = currentStep === s;
      return (
        <React.Fragment key={s}>
          <button
            type="button"
            onClick={() => done && onBack()}
            className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest
              transition-all ${active || done ? 'text-zinc-900' : 'text-zinc-300'}
              ${done ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center
              text-xs font-black transition-all duration-300
              ${done    ? 'bg-[#C5A267] text-white'
              : active  ? 'bg-zinc-900 text-white'
              :           'bg-zinc-200 text-zinc-400'}`}
            >
              {done ? '✓' : s}
            </span>
            {label}
          </button>
          {s < LABELS.length && (
            <div className={`flex-1 h-px transition-all duration-500
              ${done ? 'bg-[#C5A267]' : 'bg-zinc-200'}`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default StepIndicator;