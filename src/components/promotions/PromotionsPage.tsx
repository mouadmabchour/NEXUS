import React from 'react';
import { motion } from 'motion/react';
import { Tag, Zap, Clock, ArrowRight, Sparkles, Percent, Gift } from 'lucide-react';
import { Product } from '../../types';
import { products } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';

interface PromotionsPageProps {
  onShopNow: () => void;
}

export const PromotionsPage = ({ onShopNow }: PromotionsPageProps) => {
  // Mocking some "deals"
  const deals = products.filter(p => p.isNew || p.isFeatured).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* Promo Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900 border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e3a8a_0%,transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 border border-blue-400/30 rounded-full mb-8 backdrop-blur-md"
            >
              <Zap className="w-4 h-4 text-blue-100" />
              <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">Offre Flash : Jusqu'à -50%</span>
            </motion.div>
            <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight leading-none mb-8">
              Style Premium. <span className="text-blue-500">Prix Imbattables.</span>
            </h1>
            <p className="text-lg text-gray-300 font-medium mb-12">
              Découvrez les meilleurs deals sur le streetwear, les sneakers et les accessoires tendance au Maroc. Des pièces exclusives à prix réduits pour une durée limitée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onShopNow}
                className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl text-sm shadow-2xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                Voir les Offres <ArrowRight className="w-5 h-5" />
              </button>
              <div className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 backdrop-blur-md">
                 <Clock className="w-5 h-5 text-blue-400" />
                 Expire dans : 14h : 22m : 11s
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories of Deals */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PromoCategoryCard 
                icon={Percent} 
                title="Dernières Ventes" 
                desc="Profitez de réductions massives sur les fins de collections."
                color="blue"
              />
              <PromoCategoryCard 
                icon={Sparkles} 
                title="Nouveautés Flash" 
                desc="Soyez le premier à porter nos nouveaux drops à prix spécial."
                color="purple"
              />
              <PromoCategoryCard 
                icon={Gift} 
                title="Bonus Nexus" 
                desc="Cadeaux exclusifs et accès prioritaire pour les membres."
                color="emerald"
              />
           </div>
        </div>
      </section>

      {/* Active Deals Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Ventes Flash Actives</h2>
              <p className="text-gray-500 font-medium mt-2">Disponibles pour les prochaines 24 heures seulement.</p>
            </div>
            <button onClick={onShopNow} className="px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gray-200 transition">Tout Voir</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {deals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Secret Deal CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-gray-900 rounded-[56px] p-12 sm:p-24 relative overflow-hidden text-center text-white">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#1d4ed8_0%,transparent_70%)] opacity-30"></div>
              <div className="relative z-10 max-w-2xl mx-auto">
                 <h2 className="text-4xl font-bold tracking-tight mb-8">Débloquez les Deals "Membres Uniquement"</h2>
                 <p className="text-gray-400 font-medium text-lg mb-12">
                   Certains drops sont réservés exclusivement à notre communauté. Rejoignez le Nexus pour accéder aux offres restreintes et aux sorties anticipées.
                 </p>
                 <button className="h-16 px-12 bg-white text-gray-900 font-bold rounded-2xl text-sm hover:bg-blue-400 hover:text-white transition shadow-2xl active:scale-95">
                    Devenir Membre NEXUS
                 </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const PromoCategoryCard = ({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  return (
    <div className={`p-10 rounded-[48px] border transition-all hover:scale-[1.02] hover:-translate-y-2 cursor-pointer bg-white group shadow-2xl shadow-gray-200/50`}>
       <div className={`${colorMap[color]} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-transform group-hover:rotate-12`}>
          <Icon className="w-8 h-8" />
       </div>
       <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
       <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
};
