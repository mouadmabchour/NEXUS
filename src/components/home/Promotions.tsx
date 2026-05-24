import React from 'react';
import { motion } from 'motion/react';
import { Percent, Clock, Zap } from 'lucide-react';

const deals = [
  {
    id: 1,
    title: 'Édition Urbaine',
    subtitle: '-20% sur tous les Hoodies Premium',
    color: 'bg-emerald-600',
    icon: <Percent className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'Flash Footwear',
    subtitle: 'Sélection Sneakers jusqu\'à -50%',
    color: 'bg-red-600',
    icon: <Zap className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Style Archivé',
    subtitle: 'Offre 1 Acheter 1 Offert sur les Accessoires',
    color: 'bg-amber-500',
    icon: <Clock className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'
  }
];

export const Promotions = ({ onViewDeals }: { onViewDeals: () => void }) => {
  return (
    <section className="py-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
           <div className="bg-red-600 p-2 rounded-lg text-white">
             <Zap className="w-5 h-5 fill-current" />
           </div>
           <div>
             <h2 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter leading-tight">Offres de la Semaine</h2>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Offres limitées premium</p>
           </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              whileHover={{ y: -5 }}
              onClick={onViewDeals}
              className="flex-shrink-0 w-[300px] sm:w-[400px] aspect-[16/10] relative rounded-[32px] overflow-hidden group snap-start cursor-pointer shadow-lg shadow-gray-200"
            >
              <img 
                src={deal.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={deal.title}
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 ${deal.color}/80 mix-blend-multiply opacity-80`} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="mb-4 bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center border border-white/30">
                  {deal.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2 leading-none">{deal.title}</h3>
                <p className="text-sm font-bold opacity-90 mb-6">{deal.subtitle}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b border-white self-start pb-1">
                  Acheter Maintenant
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
