import React from 'react';
import { ShieldCheck, Zap, Layers, Award, Users, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../common/SEO';

export const About = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="À Propos de NEXUS | Modern Streetwear & Style" 
        description="Découvrez l'histoire de NEXUS PRODUCTS. Nous sélectionnons le meilleur du streetwear premium pour la communauté urbaine au Maroc."
      />
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1552061011-588397293b22?auto=format&fit=crop&q=80&w=1200" 
          alt="Streetwear Culture" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/30 border border-emerald-400/30 rounded-full mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-emerald-100" />
            <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">Fondé en 2024 • Casablanca Collection</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold text-white tracking-tight leading-none mb-8"
          >
            Définir le <span className="text-emerald-500">Futur</span> du Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-300 font-medium max-w-2xl mx-auto"
          >
            Nous offrons une sélection pointue d'articles streetwear premium, alliant design moderne et qualité exceptionnelle.
          </motion.p>
        </div>
      </section>

      {/* Concept Description */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">Notre Mission</div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
                Le Curateur de la Mode Urbaine au Maroc
              </h2>
              <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg">
                <p>
                  Nexus Products est né d'une passion pour le streetwear authentique. Notre mission est de rendre accessible les pièces les plus convoitées avec une expérience d'achat fluide et sécurisée.
                </p>
                <p>
                  Chaque article de notre collection est rigoureusement authentifié et sélectionné pour son esthétique et sa durabilité. Nous ne vendons pas seulement des vêtements, nous bâtissons une culture.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
                <StatItem number="1000+" label="Articles Livrés" />
                <StatItem number="5k+" label="Abonnés Nexus" />
                <StatItem number="24h" label="Délai de Préparation" />
                <StatItem number="100%" label="Satisfaction Client" />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" 
                  alt="Clothing Style" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-emerald-600 p-10 rounded-[40px] text-white shadow-2xl hidden sm:block">
                < Award className="w-12 h-12 mb-6" />
                <p className="font-bold text-2xl tracking-tight">Voté Boutique <br/>de l'Année</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Notre engagement</span>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Les Standards Nexus</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ValueCard 
              icon={ShieldCheck} 
              title="Authenticité Garantie" 
              desc="Chaque article est vérifié par nos experts. Retours acceptés sous 7 jours si le produit est en parfait état."
              color="text-emerald-600"
              bgColor="bg-emerald-100"
            />
            <ValueCard 
              icon={Zap} 
              title="Logistique Rapide" 
              desc="Nous expédions vos commandes sous 24h à 72h avec un support 7j/7 via WhatsApp et Email."
              color="text-blue-600"
              bgColor="bg-blue-100"
            />
            <ValueCard 
              icon={Layers} 
              title="Style Exclusif" 
              desc="Nous sélectionnons uniquement des pièces limitées et des tendances mondiales pour votre garde-robe."
              color="text-amber-600"
              bgColor="bg-amber-100"
            />
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-emerald-600 rounded-[64px] p-12 sm:p-24 relative text-white">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[64px]">
             <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-400 rounded-full blur-[100px] opacity-20"></div>
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold tracking-tight mb-8 leading-tight">
                Construisons le <br/>
                <span className="text-emerald-100">Style de Demain</span>
              </h2>
              <p className="text-emerald-100 font-medium mb-10 text-xl leading-relaxed">
                Nexus Products est plus qu'une boutique ; c'est un mouvement vers une mode plus expressive. Rejoignez notre communauté au Maroc dès aujourd'hui.
              </p>
              <div className="flex gap-4">
                <button className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-2xl text-sm shadow-xl hover:bg-gray-50 transition-all">
                  Voir la Collection
                </button>
                <button className="px-10 py-4 bg-emerald-700 text-white font-bold rounded-2xl text-sm border border-emerald-500 hover:bg-emerald-800 transition-all">
                  Nous Contacter
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-emerald-500/30 rounded-3xl p-8 backdrop-blur-md border border-emerald-400/30 text-center">
                  <Users className="w-10 h-10 mb-4 mx-auto text-emerald-100" />
                  <span className="font-bold text-lg">Communauté</span>
               </div>
               <div className="bg-emerald-500/30 rounded-3xl p-8 backdrop-blur-md border border-emerald-400/30 text-center translate-y-8">
                  <Search className="w-10 h-10 mb-4 mx-auto text-emerald-100" />
                  <span className="font-bold text-lg">Découverte</span>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ number, label }: { number: string, label: string }) => (
  <div>
    <div className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{number}</div>
    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
  </div>
);

const ValueCard = ({ icon: Icon, title, desc, color, bgColor }: { icon: any, title: string, desc: string, color: string, bgColor: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-12 rounded-[48px] shadow-2xl shadow-blue-500/5 border border-gray-100"
  >
    <div className={`${bgColor} ${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);
