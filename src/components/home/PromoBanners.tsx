import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const PromoBanners = ({ onViewPromotions }: { onViewPromotions: () => void }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Banner 1: Collection Capsule */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={onViewPromotions}
            className="group relative h-[250px] rounded-[40px] overflow-hidden bg-emerald-900 shadow-2xl shadow-emerald-900/20 cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800" 
              alt="Promotion" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative h-full p-10 flex flex-col justify-center">
              <span className="bg-emerald-400 text-emerald-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit mb-4">Stocke & Économise</span>
              <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">PACK CAPSULE<br/><span className="text-emerald-400">RÉDUCTIONS MASSIVES</span></h3>
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-6">Streetwear premium à prix de gros</p>
              <button className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform">
                Explorer les Packs <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Banner 2: Weekend Fest */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={onViewPromotions}
            className="group relative h-[250px] rounded-[40px] overflow-hidden bg-red-900 shadow-2xl shadow-red-900/20 cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800" 
              alt="Promotion" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative h-full p-10 flex flex-col justify-center">
              <span className="bg-red-400 text-red-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit mb-4">Événement Limité</span>
              <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">MEMBRES UNIQUEMENT<br/><span className="text-red-400">WEEKEND FEST</span></h3>
              <p className="text-red-100 text-xs font-bold uppercase tracking-widest mb-6">Gagnez des points doubles sur vos achats</p>
              <button className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform">
                Rejoindre HyperElite <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
