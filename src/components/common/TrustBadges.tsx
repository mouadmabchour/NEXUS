import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  "Livraison rapide",
  "Paiement sécurisé",
  "Produits premium",
  "Support 24/7",
  "Retours faciles"
];

export const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-4 border-y border-gray-100 bg-gray-50/50">
      {benefits.map((benefit, index) => (
        <motion.div 
          key={benefit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
            {benefit}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
