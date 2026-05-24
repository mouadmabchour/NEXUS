import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';

export const FlashOffer = ({ onShopNow }: { onShopNow?: () => void }) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[56px] overflow-hidden bg-black py-20 px-8 sm:px-20 text-center text-white"
        >
          {/* Abstract background light */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
               <Zap className="w-4 h-4 text-amber-400 fill-current" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Offre à temps limité</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8 max-w-2xl leading-none">
              Jusqu'à <span className="text-gray-400 italic">-50%</span> – Ventes Exclusives de Saison
            </h2>
            
            <p className="text-gray-400 font-medium mb-12 max-w-lg mx-auto">
              Élevez votre style avec notre plus grande vente de l'année. Saisissez vos articles favoris avant qu'ils ne disparaissent.
            </p>

            <button 
              onClick={onShopNow}
              className="px-12 py-5 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-all shadow-2xl flex items-center gap-3 group"
            >
              Profiter des Soldes <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
