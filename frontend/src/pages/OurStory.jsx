import React from 'react';
import { motion } from 'framer-motion';

const OurStory = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="font-black text-5xl md:text-7xl italic uppercase text-zinc-900 tracking-tighter">
          Beyond the <span className="text-[#C5A267]">Bean</span>
        </h1>
        <div className="h-1.5 w-24 bg-zinc-900 mx-auto mt-6"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-xl font-bold leading-relaxed text-zinc-800">
            Mercado started with a simple obsession: finding the perfect balance between high-altitude coffee beans and local Karachi vibes.
          </p>
          <p className="text-zinc-500 leading-loose">
            We don't just serve caffeine; we serve a moment of clarity. Every bean is ethically sourced and roasted in small batches to ensure that the aroma you smell is as fresh as the morning dew. Our digital-first approach ensures you get your fix without the wait.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-100 rounded-[40px] aspect-square overflow-hidden border-8 border-white shadow-2xl"
        >
           <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Coffee craft" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {['Ethical Sourcing', 'Small Batches', 'Digital First'].map((pill, i) => (
          <div key={i} className="p-10 bg-zinc-50 rounded-4xl border border-zinc-100">
            <h3 className="font-black uppercase tracking-widest text-sm mb-2">{pill}</h3>
            <div className="h-0.5 w-10 bg-[#C5A267] mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStory;