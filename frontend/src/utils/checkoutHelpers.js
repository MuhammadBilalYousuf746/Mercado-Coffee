export const fmtCard = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

export const fmtExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  if (!d.length) return '';
  if (d.length <= 2) return d;
  let mm = d.slice(0, 2);
  if (parseInt(mm, 10) > 12) mm = '12';
  if (mm === '00') mm = '01';
  return mm + '/' + d.slice(2);
};

export const fmtPhone = (v) => v.replace(/\D/g, '').slice(0, 11);

// ─── Constants ────────────────────────────────────────────────
export const DELIVERY_CHARGES = 150;
export const GST_RATE = 0.13;

export const PAYMENT_METHODS = [
  { id: 'cash',      label: 'Cash on Delivery',   icon: '💵' },
  { id: 'easypaisa', label: 'EasyPaisa',           icon: '🟢' },
  { id: 'jazzcash',  label: 'JazzCash',            icon: '🔴' },
  { id: 'card',      label: 'Credit / Debit Card', icon: '💳' },
];

export const calcTotals = (cartTotal) => {
  const gst = Math.round(cartTotal * GST_RATE);
  const grandTotal = cartTotal + DELIVERY_CHARGES + gst;
  return { gst, grandTotal };
};