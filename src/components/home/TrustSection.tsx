import React from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  CheckCircle2, 
  Quote, 
  CreditCard,
  Lock,
  Heart
} from 'lucide-react';

const testimonials = [
  {
    name: "Alexander Sterling",
    role: "Elite Member",
    content: "The quality of service and products at Nexus is unparalleled. Every order feels like a bespoke experience.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander"
  },
  {
    name: "Sophia Vance",
    role: "Verified Buyer",
    content: "Their 24/7 support actually means 24/7. I had a question at 3 AM and it was resolved in minutes. Simply elite.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia"
  },
  {
    name: "Marcus Thorne",
    role: "Nexus Curator",
    content: "Minimalism meets functionality. Nexus isn't just a store, it's a statement of digital excellence.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  }
];

const features = [
  {
    icon: Truck,
    title: "Priorité Nationale",
    desc: "Livraison partout au Maroc entre 24h et 72h",
    detail: "Livraison Rapide"
  },
  {
    icon: ShieldCheck,
    title: "Protocole Sécurisé",
    desc: "Paiement à la livraison 100% sécurisé",
    detail: "Cash on Delivery"
  },
  {
    icon: RotateCcw,
    title: "Retours Sans Effort",
    desc: "7 jours pour changer d'avis (si le produit est en bon état)",
    detail: "Remboursement Simple"
  },
  {
    icon: Headphones,
    title: "Support Concierge",
    desc: "Support 24/7 via WhatsApp et Email",
    detail: "Réponse Rapide"
  }
];

export const TrustSection = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics & Headline */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
           <div className="max-w-xl text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full mb-6"
              >
                <Lock className="w-3 h-3 text-black" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-900">Cryptage de bout en bout actif</span>
              </motion.div>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-none">
                 Approuvé par <span className="text-gray-400 italic font-medium">des Milliers</span>
              </h2>
              <p className="text-gray-500 font-medium text-lg max-w-lg mx-auto lg:mx-0">
                 Rejoignez une communauté de passionnés qui exigent le meilleur de la mode urbaine au Maroc.
              </p>
           </div>

           <div className="flex gap-8 sm:gap-12">
              <StatItem value="12K+" label="Membres Actifs" />
              <div className="w-px h-16 bg-gray-100 self-center"></div>
              <StatItem value="99.9%" label="Indice Sécurité" />
              <div className="w-px h-16 bg-gray-100 self-center"></div>
              <StatItem value="24H" label="Moy. Support" />
           </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
           {features.map((feature, i) => (
             <motion.div
               key={feature.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group p-8 bg-gray-50 rounded-[40px] border border-gray-100 hover:border-black transition-all duration-500"
             >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm mb-8 transition-transform group-hover:scale-110 group-hover:bg-black group-hover:text-white">
                   <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{feature.detail}</h3>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">{feature.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
           {testimonials.map((t, i) => (
             <motion.div
               key={t.name}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
             >
                <div className="absolute top-10 right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <Quote className="w-20 h-20 fill-black" />
                </div>
                
                <div className="flex items-center gap-1 mb-8">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                   ))}
                </div>

                <p className="text-gray-600 font-medium italic text-lg leading-relaxed mb-10">
                   "{t.content}"
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
                   <div className="w-12 h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h5 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
                         {t.name} <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </h5>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{t.role}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-32 pt-16 border-t border-gray-100">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 text-center md:text-left">Guaranteed Safe Checkout</p>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 opacity-40 grayscale group hover:opacity-100 transition-all duration-700">
                    <PaymentLogo name="VISA" />
                    <PaymentLogo name="MASTERCARD" />
                    <PaymentLogo name="STRIPE" />
                    <PaymentLogo name="AMEX" />
                    <PaymentLogo name="APPLE PAY" />
                 </div>
              </div>
              <div className="flex items-center gap-4 px-8 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <ShieldCheck className="w-5 h-5 text-emerald-500" />
                 <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">PCI-DSS Compliant Infrastructure</p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
     <div className="text-4xl font-bold tracking-tighter text-gray-900 mb-1">{value}</div>
     <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</div>
  </div>
);

const PaymentLogo = ({ name }: { name: string }) => (
  <span className="text-xs font-black tracking-tighter text-gray-900 hover:text-black transition-colors cursor-default">
    {name}
  </span>
);
