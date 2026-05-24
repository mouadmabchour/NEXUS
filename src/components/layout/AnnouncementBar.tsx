import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AnnouncementBar = ({ onAction }: { onAction: () => void }) => {
  return (
    <div className="bg-black text-white py-2.5 relative overflow-hidden group cursor-pointer" onClick={onAction}>
      <motion.div 
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-white/5 to-blue-600/20"
      />
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            Offre de Saison : <span className="text-blue-400">Jusqu'à -50%</span> sur tout le shop
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full group-hover:bg-blue-600 transition-colors">
          En profiter <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
