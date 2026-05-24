import React from 'react';
import { motion } from 'motion/react';
import { categories } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

export const FeaturedCategories = ({ onCategoryClick }: { onCategoryClick: (id: string) => void }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-none mb-4">
              Collections <span className="text-gray-400 font-medium italic">Vedettes</span>
            </h2>
            <p className="text-gray-500 font-medium tracking-tight">
              Explorez notre sélection rigoureuse d'articles premium parmi nos meilleures catégories.
            </p>
          </div>
          <button onClick={() => onCategoryClick('all')} className="hidden sm:flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">
            Voir Tout <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onCategoryClick(category.id)}
              className="relative group cursor-pointer aspect-square rounded-[40px] overflow-hidden"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{category.name}</h3>
                <div className="flex items-center gap-2 text-white/70 font-semibold text-xs uppercase tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Acheter <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
