import React from 'react';
import { motion } from 'motion/react';
import { products } from '../../data/mockData';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';

export const LimitedCollection = ({ onProductClick, onShopNow }: { 
  onProductClick: (product: any) => void,
  onShopNow: () => void 
}) => {
  const limitedEditionProducts = products.filter(p => p.isLimitedEdition);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full mb-6"
            >
              <Lock className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Série Limitée</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6">
              Collection <br />
              <span className="text-blue-600">Exclusive 1/100</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Des pièces d'exception produites en quantités ultra-limitées. Une fois épuisées, ces pièces ne seront jamais rééditées. 
            </p>
          </div>
          
          <button 
            onClick={onShopNow}
            className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-900 border-b-2 border-black pb-2 hover:text-blue-600 hover:border-blue-600 transition-all"
          >
            Voir la Suite <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {limitedEditionProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden bg-white mb-6 border border-gray-100 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-black/90 backdrop-blur-md text-white p-3 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                      <span className="text-[7px] font-black uppercase tracking-[0.2em]">Drop Rare</span>
                    </div>
                    <div className="text-sm font-black tracking-tighter">00{idx + 1} / 100</div>
                  </div>
                </div>

                {/* Quick Add Button Mob */}
                <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-black transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="px-2">
                <h3 className="text-sm font-black text-gray-900 tracking-tight uppercase mb-1 line-clamp-1">{product.name}</h3>
                <div className="text-lg font-bold text-blue-600">{product.price} DH</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
