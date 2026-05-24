import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: "Omar El Fassi",
    role: "Acheteur Vérifié",
    content: "Très bonne qualité et livraison rapide ! Je suis impressionné par le service.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"
  },
  {
    name: "Yassine Benani",
    role: "Passionné Streetwear",
    content: "Le site est professionnel et les produits sont incroyables. Une référence au Maroc.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yassine"
  },
  {
    name: "Sofia Mansouri",
    role: "Acheteuse Fidèle",
    content: "Une expérience d'achat fluide. Le support WhatsApp est super réactif et les articles sont authentiques.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative side accent */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gray-50 -z-0 transform translate-x-1/2 rounded-l-[100px] hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 shadow-xl"
            >
              <ShieldCheck className="w-3 h-3" /> Autorité du Secteur
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-none mb-6">
              Approuvé par la <span className="text-blue-600">Communauté</span> <br />Streetwear
            </h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em] leading-relaxed max-w-lg">
              Découvrez les avis de nos clients qui font confiance à NEXUS pour leur style.
            </p>
          </div>

          <div className="flex items-center gap-8 bg-gray-900 p-10 rounded-[40px] text-white shadow-2xl">
             <div className="text-center px-4">
                <div className="text-4xl font-bold tracking-tighter mb-1">4.9/5</div>
                <div className="flex items-center gap-1 text-blue-400 mb-2">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-gray-500">Note Globale</div>
             </div>
             <div className="w-px h-12 bg-gray-800"></div>
             <div className="text-center px-4">
                <div className="text-4xl font-bold tracking-tighter mb-1">10K+</div>
                <div className="text-blue-400 mb-2 font-bold uppercase tracking-tighter">Vérifiés</div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-gray-500">Membres</div>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[56px] border border-gray-100 shadow-2xl shadow-blue-500/5 flex flex-col relative group"
            >
              <div className="absolute top-12 right-12 text-gray-100 group-hover:text-blue-50 transition-colors duration-500">
                <Quote className="w-16 h-16 fill-current" />
              </div>

              <div className="flex items-center gap-1 text-amber-400 mb-8 relative z-10">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-10 text-lg relative z-10">
                "{t.content}"
              </p>

              <div className="mt-auto flex items-center gap-4 border-t border-gray-50 pt-10 relative z-10">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-100">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
                    {t.name} <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  </h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Trust Wall */}
        <div className="mt-24 pt-16 border-t border-gray-100 flex flex-wrap items-center justify-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 font-bold tracking-tight uppercase text-2xl">
          <div>DevAtlas</div>
          <div>SaaSMode</div>
          <div>GrowthLab</div>
          <div>TechStack</div>
        </div>

      </div>
    </section>
  );
};
