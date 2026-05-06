import React from 'react';
import { motion } from 'framer-motion';

// ── Reusable Chip Button ──────────────────────────────────────────
const Chip = ({ label, selected, onClick, extra }) => (
  <motion.button
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-150 ${
      selected
        ? 'bg-[#1a1611] text-white border-[#1a1611]'
        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
    }`}
  >
    {label}{extra ? <span className={`ml-1 ${selected ? 'text-[#C5A267]' : 'text-zinc-400'}`}>{extra}</span> : null}
  </motion.button>
);

// ── Row wrapper ───────────────────────────────────────────────────
const OptionRow = ({ label, children }) => (
  <div className="mb-3">
    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">{label}</p>
    <div className="flex flex-wrap gap-1.5">{children}</div>
  </div>
);

// ── COFFEE ───────────────────────────────────────────────────────
const CoffeeOptions = ({ options, onChange }) => (
  <>
    <OptionRow label="Size">
      {[{ l: 'Regular', p: 0 }, { l: 'Large', p: '+80' }].map(({ l, p }) => (
        <Chip key={l} label={l} extra={p || null} selected={options.size === l}
          onClick={() => onChange({ ...options, size: l, sizePrice: p === '+80' ? 80 : 0 })} />
      ))}
    </OptionRow>
    <OptionRow label="Milk">
      {[{ l: 'Whole Milk', p: 0 }, { l: 'Oat Milk', p: '+100' }, { l: 'Almond Milk', p: '+100' }, { l: 'Soy Milk', p: '+100' }].map(({ l, p }) => (
        <Chip key={l} label={l} extra={p || null} selected={options.milk === l}
          onClick={() => onChange({ ...options, milk: l, milkPrice: p ? 100 : 0 })} />
      ))}
    </OptionRow>
    <OptionRow label="Extras">
      {['Extra Shot +100', 'Less Sugar', 'No Sugar', 'Extra Cream +50'].map((e) => {
        const [label, priceStr] = e.split(' +');
        const extraPrice = priceStr ? parseInt(priceStr) : 0;
        const isSelected = options.extras?.includes(label);
        return (
          <Chip key={label} label={label} extra={priceStr ? `+${priceStr}` : null}
            selected={isSelected}
            onClick={() => {
              const extras = options.extras || [];
              const extrasPrice = options.extrasPrice || 0;
              onChange({
                ...options,
                extras: isSelected ? extras.filter(x => x !== label) : [...extras, label],
                extrasPrice: isSelected ? extrasPrice - extraPrice : extrasPrice + extraPrice
              });
            }} />
        );
      })}
    </OptionRow>
  </>
);

// ── BURGER ───────────────────────────────────────────────────────
const BurgerOptions = ({ options, onChange, item }) => (
  <>
    {item?.type === 'multi-price' && (
      <OptionRow label="Size">
        {[{ l: 'Single', p: item.prices.single }, { l: 'Double', p: item.prices.double }].map(({ l, p }) => (
          <Chip key={l} label={l} extra={`Rs.${p}`} selected={options.size === l}
            onClick={() => onChange({ ...options, size: l, basePrice: p })} />
        ))}
      </OptionRow>
    )}
    <OptionRow label="Add-Ons">
      {[{ l: 'Fries', p: 200 }, { l: 'Cold Drink', p: 150 }, { l: 'Extra Sauce', p: 50 }].map(({ l, p }) => {
        const isSelected = options.addons?.includes(l);
        return (
          <Chip key={l} label={l} extra={`+${p}`} selected={isSelected}
            onClick={() => {
              const addons = options.addons || [];
              const addonsPrice = options.addonsPrice || 0;
              onChange({
                ...options,
                addons: isSelected ? addons.filter(x => x !== l) : [...addons, l],
                addonsPrice: isSelected ? addonsPrice - p : addonsPrice + p
              });
            }} />
        );
      })}
    </OptionRow>
  </>
);

// ── DRINKS ───────────────────────────────────────────────────────
const DrinksOptions = ({ options, onChange }) => (
  <>
    <OptionRow label="Size">
      {[{ l: 'Regular', p: 0 }, { l: 'Large', p: '+80' }].map(({ l, p }) => (
        <Chip key={l} label={l} extra={p || null} selected={options.size === l}
          onClick={() => onChange({ ...options, size: l, sizePrice: p ? 80 : 0 })} />
      ))}
    </OptionRow>
    <OptionRow label="Sweetness">
      {['Normal', 'Less Sweet', 'Extra Sweet'].map(s => (
        <Chip key={s} label={s} selected={options.sweetness === s}
          onClick={() => onChange({ ...options, sweetness: s })} />
      ))}
    </OptionRow>
    <OptionRow label="Ice">
      {['Normal Ice', 'Less Ice', 'No Ice'].map(i => (
        <Chip key={i} label={i} selected={options.ice === i}
          onClick={() => onChange({ ...options, ice: i })} />
      ))}
    </OptionRow>
  </>
);

// ── SEAFOOD ──────────────────────────────────────────────────────
const SeafoodOptions = ({ options, onChange }) => (
  <>
    <OptionRow label="Sauce">
      {['Tartare', 'Garlic Mayo', 'Dynamite'].map(s => (
        <Chip key={s} label={s} selected={options.sauce === s}
          onClick={() => onChange({ ...options, sauce: s })} />
      ))}
    </OptionRow>
    <OptionRow label="Side">
      {[{ l: 'Fries', p: 0 }, { l: 'Coleslaw', p: 0 }, { l: 'None', p: 0 }].map(({ l }) => (
        <Chip key={l} label={l} selected={options.side === l}
          onClick={() => onChange({ ...options, side: l })} />
      ))}
    </OptionRow>
  </>
);

// ── BREAKFAST ────────────────────────────────────────────────────
const BreakfastOptions = ({ options, onChange }) => (
  <>
    <OptionRow label="Cook Style">
      {['Soft', 'Medium', 'Well Done'].map(s => (
        <Chip key={s} label={s} selected={options.cookStyle === s}
          onClick={() => onChange({ ...options, cookStyle: s })} />
      ))}
    </OptionRow>
    <OptionRow label="Toast">
      {['White Toast', 'Brown Toast', 'No Toast'].map(t => (
        <Chip key={t} label={t} selected={options.toast === t}
          onClick={() => onChange({ ...options, toast: t })} />
      ))}
    </OptionRow>
    <OptionRow label="Add Egg">
      {[{ l: 'No Extra Egg', p: 0 }, { l: '+ Fried Egg', p: 170 }, { l: '+ Boiled Egg', p: 90 }].map(({ l, p }) => (
        <Chip key={l} label={l} extra={p ? `+${p}` : null} selected={options.egg === l}
          onClick={() => onChange({ ...options, egg: l, eggPrice: p })} />
      ))}
    </OptionRow>
  </>
);

// ── SIDES (Wings, Fries, Hotdog) ─────────────────────────────────
const SidesOptions = ({ options, onChange }) => (
  <>
    <OptionRow label="Dip / Sauce">
      {['Garlic Mayo', 'BBQ Sauce', 'Dynamite', 'Honey Mustard', 'None'].map(s => (
        <Chip key={s} label={s} selected={options.sauce === s}
          onClick={() => onChange({ ...options, sauce: s })} />
      ))}
    </OptionRow>
    <OptionRow label="Size">
      {[{ l: 'Regular', p: 0 }, { l: 'Large', p: '+80' }].map(({ l, p }) => (
        <Chip key={l} label={l} extra={p || null} selected={options.size === l}
          onClick={() => onChange({ ...options, size: l, sizePrice: p ? 80 : 0 })} />
      ))}
    </OptionRow>
  </>
);

// ── MAINS (Sandwiches, Pasta, Chef's) ────────────────────────────
const MainsOptions = ({ options, onChange }) => (
  <>
    <OptionRow label="Sauce">
      {['Original', 'Mushroom Sauce', 'Peppercorn', 'Extra Sauce +50'].map((s) => {
        const [label, priceStr] = s.split(' +');
        const p = priceStr ? parseInt(priceStr) : 0;
        return (
          <Chip key={label} label={label} extra={priceStr ? `+${priceStr}` : null}
            selected={options.sauce === label}
            onClick={() => onChange({ ...options, sauce: label, saucePrice: p })} />
        );
      })}
    </OptionRow>
    <OptionRow label="Side">
      {[{ l: 'No Side', p: 0 }, { l: 'Fries', p: 200 }, { l: 'Mashed Potato', p: 150 }].map(({ l, p }) => (
        <Chip key={l} label={l} extra={p ? `+${p}` : null} selected={options.side === l}
          onClick={() => onChange({ ...options, side: l, sidePrice: p })} />
      ))}
    </OptionRow>
  </>
);

// ── MAIN EXPORT ──────────────────────────────────────────────────
const CustomizationPanel = ({ type, options, onChange, item }) => {
  if (type === 'coffee')    return <CoffeeOptions options={options} onChange={onChange} />;
  if (type === 'burger')    return <BurgerOptions options={options} onChange={onChange} item={item} />;
  if (type === 'drinks')    return <DrinksOptions options={options} onChange={onChange} />;
  if (type === 'seafood')   return <SeafoodOptions options={options} onChange={onChange} />;
  if (type === 'breakfast') return <BreakfastOptions options={options} onChange={onChange} />;
  if (type === 'sides')     return <SidesOptions options={options} onChange={onChange} />;
  if (type === 'mains')     return <MainsOptions options={options} onChange={onChange} />;
  return null;
};

export default CustomizationPanel;