import React from 'react';

const Privacy = () => {
  const sections = [
    { title: "Data Collection", content: "We collect your name, phone number, and address solely for the purpose of order fulfillment and delivery." },
    { title: "Security", content: "Your payment details are processed through secure gateways. We do not store your credit card information on our servers." },
    { title: "Cookies", content: "We use local storage to remember your cart items and preferences for a seamless experience." }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <header className="mb-20">
        <h1 className="font-black text-4xl italic uppercase text-zinc-900">Privacy Policy</h1>
        <p className="text-[#C5A267] font-bold text-[10px] tracking-[0.3em] uppercase mt-2">Updated May 2026</p>
      </header>

      <div className="space-y-16">
        {sections.map((sec, i) => (
          <section key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <h2 className="font-black uppercase text-xs tracking-[0.2em] text-zinc-400">{sec.title}</h2>
            <div className="md:col-span-2">
              <p className="text-zinc-800 leading-loose font-medium">{sec.content}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 p-10 bg-zinc-50 rounded-[40px] text-center border border-zinc-100">
        <p className="text-sm text-zinc-500 font-medium">Questions about your data? Reach out to <span className="text-zinc-900 font-bold underline">privacy@mercado.com</span></p>
      </div>
    </div>
  );
};

export default Privacy;