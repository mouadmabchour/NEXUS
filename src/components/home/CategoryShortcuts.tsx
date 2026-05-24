import React from 'react';
import { Apple, Beef, Coffee, Home, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryShortcutsProps {
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryShortcuts = ({ onCategoryClick }: CategoryShortcutsProps) => {
  const categories = [
    { id: 'fresh', name: 'Fresh Food', icon: Beef, color: 'bg-red-50 text-red-600', border: 'border-red-100' },
    { id: 'fresh', name: 'Fruits & Veggies', icon: Apple, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
    { id: 'beverages', name: 'Beverages', icon: Coffee, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
    { id: 'household', name: 'Household', icon: Home, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Quick Access</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Jump to your favorite departments</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryClick(cat.id)}
              className={`flex flex-col items-center justify-center p-8 rounded-[32px] border ${cat.border} ${cat.color} transition-all hover:shadow-xl hover:shadow-slate-200/50 group`}
            >
              <cat.icon className="w-10 h-10 mb-4 transition-transform group-hover:scale-110" />
              <span className="font-black italic uppercase tracking-tighter text-sm whitespace-nowrap">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
