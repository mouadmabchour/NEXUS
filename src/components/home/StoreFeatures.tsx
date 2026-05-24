import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Truck,
    title: "Livraison Rapide",
    desc: "Livraison partout au Maroc entre 24h et 72h"
  },
  {
    icon: ShieldCheck,
    title: "Paiement Sécurisé",
    desc: "Paiement à la livraison disponible et sécurisé"
  },
  {
    icon: RotateCcw,
    title: "Retours Faciles",
    desc: "Satisfait ou remboursé sous 7 jours"
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    desc: "Équipe dédiée via WhatsApp et Email"
  }
];

export const StoreFeatures = () => {
  return (
    <section className="py-20 bg-[#F8F8F8] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm border border-gray-100 mb-6 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">{f.title}</h3>
              <p className="text-[11px] font-medium text-gray-500 leading-relaxed max-w-[160px]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
