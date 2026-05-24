import React from 'react';
import { motion } from 'motion/react';
import { Truck, Clock, MapPin, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';

export const DeliveryInfo = () => {
  const deliveryFeatures = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Livraison Nationale",
      description: "Livraison partout au Maroc, des grandes métropoles aux régions les plus reculées.",
      color: "emerald"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Vitesse Éclair",
      description: "Recevez votre colis entre 24h et 72h. Logistique optimisée pour le rythme urbain.",
      color: "blue"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Suivi en Temps Réel",
      description: "Suivez votre commande étape par étape jusqu'à votre porte avec notre système de tracking.",
      color: "amber"
    }
  ];

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-white rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gray-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-white/20"
          >
            <Truck className="w-3 h-3" /> Réseau de Livraison
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
            Expédition <br />Cinétique
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-medium text-sm leading-relaxed">
            Notre réseau est optimisé pour le rythme du streetwear. Suivez votre commande en temps réel à travers tout le royaume.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {deliveryFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-colors group cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 ${
                feature.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                feature.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                'bg-amber-500/20 text-amber-400'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">{feature.title}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Active Now
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Zone Map Placeholder / Visualization */}
        <div className="mt-20 p-1 bg-white/5 rounded-[48px] border border-white/10 overflow-hidden group">
          <div className="relative aspect-[21/9] bg-slate-950 rounded-[44px] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <MapPin className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
                    <h4 className="text-lg font-black uppercase tracking-widest mb-1">Réseau de distribution urbain</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Suivi en temps réel à travers tout le Maroc</p>
                </div>
             </div>
             {/* Simple grid pattern */}
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             
             {/* Floating dots representing hubs */}
             <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
             <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-gray-500 rounded-full shadow-[0_0_20px_rgba(100,100,100,0.5)]"></div>
             <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
