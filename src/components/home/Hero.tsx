import React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../common/SEO';

export const Hero = ({ onShopNow }: { onShopNow?: () => void }) => {
  return (
    <section id="hero-section" className="relative bg-black pt-40 pb-32 overflow-hidden selection:bg-white selection:text-black">
      <SEO 
        title="NEXUS PRODUCTS | Modern Streetwear & Trending Products in Morocco" 
        description="Découvrez les meilleurs produits tendance, streetwear et accessoires modernes au Maroc avec livraison rapide et paiement sécurisé."
      />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-12 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Le Standard Cinétique</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* Promotion Badge */}
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: -5, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-12 -right-4 sm:-right-20 z-20 bg-blue-600 text-white p-4 rounded-2xl shadow-2xl rotate-[-5deg]"
            >
              <div className="text-center">
                <span className="block text-[10px] font-black uppercase tracking-widest leading-none mb-1 text-blue-200">Offre Flash</span>
                <span className="block text-3xl font-black leading-none">-50%</span>
              </div>
            </motion.div>

            <h1 className="text-[110px] sm:text-[180px] lg:text-[260px] font-black text-white tracking-[-0.08em] leading-none mb-0 select-none">
              NEXUS
            </h1>
            <div className="mt-[-10px] sm:mt-[-25px] lg:mt-[-45px] flex flex-col items-center">
              <h2 className="text-[28px] sm:text-[50px] lg:text-[72px] font-black text-white/90 tracking-[0.4em] leading-none select-none ml-[0.4em]">
                PRODUCTS
              </h2>
            </div>
            
            {/* Visual accent line */}
            <motion.div 
               initial={{ width: 0, opacity: 0 }}
               animate={{ width: '100%', opacity: 1 }}
               transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
               className="h-px bg-white/20 absolute -bottom-12 left-0"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-20 text-center"
          >
            <p className="text-sm md:text-xl font-bold text-gray-400 uppercase tracking-[0.6em] mb-12">
              Expérience Streetwear Premium
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button 
                onClick={onShopNow}
                className="group relative px-12 py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-gray-200 active:scale-95 shadow-2xl shadow-white/5 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explorer la Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] hover:text-white transition-colors flex items-center gap-2 group"
              >
                Archive 01 <div className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-white transition-colors"></div>
              </button>
            </div>
          </motion.div>

          {/* Featured Image - Fashion Focused */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 w-full max-w-5xl group"
          >
            <div className="aspect-[21/9] rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative">
              <img 
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1600" 
                alt="Nexus Products Fashion Campaign" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-12">
                 <div className="flex items-center justify-between">
                    <div className="text-left">
                       <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-2">Appareillage de Base</p>
                       <h3 className="text-3xl font-black text-white tracking-tight uppercase">Édition Limitée Phantom</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                       <Zap className="w-6 h-6 fill-current" />
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Quick Metrics Bar */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
               <HeroStat value="80K+" label="Unités Globales" />
               <HeroStat value="-50%" label="Remise Maximale" />
               <HeroStat value="SÉCURISÉ" label="Paiement Synchro" />
               <HeroStat value="SUIVI" label="Drop Local" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HeroStat = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center md:text-left">
    <div className="text-2xl font-bold text-white tracking-tighter leading-none mb-1">{value}</div>
    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</div>
  </div>
);
