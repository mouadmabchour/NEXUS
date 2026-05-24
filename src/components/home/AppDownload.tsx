import React from 'react';
import { Smartphone, Download, ShieldCheck, Zap, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const AppDownload = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 mb-8">
              <Star className="w-4 h-4 text-emerald-400 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Fonctionnalités Exclusives</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-none">
              Achetez plus intelligemment avec l'app <span className="text-emerald-400 underline decoration-emerald-400/30">NEXUS</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium mb-10 max-w-lg">
              Recevez des alertes de stock en temps réel, des coupons exclusifs et suivez vos livraisons premium dans une expérience mobile haut de gamme.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <FeatureItem 
                icon={Zap} 
                title="Ultra Rapide" 
                desc="Paiement en moins de 30 secondes" 
              />
              <FeatureItem 
                icon={ShieldCheck} 
                title="Wallet Sécurisé" 
                desc="Transactions professionnelles sûres" 
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-emerald-400 transition shadow-2xl hover:text-white">
                <Smartphone className="w-6 h-6" /> App Store
              </button>
              <button className="flex items-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-slate-700 transition border border-slate-700 shadow-2xl">
                <Download className="w-6 h-6" /> Google Play
              </button>
            </div>
          </motion.div>

          <div className="relative">
             {/* Mock Phone UI */}
             <motion.div 
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative z-10 w-[280px] sm:w-[320px] mx-auto bg-slate-800 rounded-[50px] p-4 border-[8px] border-slate-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
             >
                <div className="bg-white rounded-[40px] h-[550px] overflow-hidden relative">
                   <div className="bg-emerald-600 h-32 p-6 text-white pt-10">
                      <p className="text-[10px] font-black uppercase opacity-60">Welcome back,</p>
                      <p className="text-xl font-black italic tracking-tighter uppercase">Hyper User</p>
                   </div>
                   <div className="p-6 -mt-10">
                      <div className="bg-white rounded-3xl shadow-xl p-4 border border-gray-100 mb-6">
                        <div className="flex justify-between items-center mb-4">
                           <p className="text-[8px] font-black uppercase text-gray-400">Total Points</p>
                           <Zap className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-2xl font-black text-slate-900 italic tracking-tighter">12,450 pts</p>
                      </div>
                      
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Recommended Products</p>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex flex-col p-2">
                           <div className="bg-emerald-100 w-full h-full rounded-xl mb-1"></div>
                           <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                         </div>
                         <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex flex-col p-2">
                           <div className="bg-red-100 w-full h-full rounded-xl mb-1"></div>
                           <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                         </div>
                      </div>
                   </div>
                   {/* Bottom App Nav */}
                   <div className="absolute bottom-4 left-4 right-4 bg-slate-900 rounded-2xl h-12 flex items-center justify-around px-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                   </div>
                </div>
             </motion.div>
             {/* Background glow */}
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-600/20 blur-[100px] rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex gap-4 items-start">
    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="font-black italic uppercase tracking-tighter text-lg leading-none mb-1">{title}</h4>
      <p className="text-gray-500 text-xs font-medium">{desc}</p>
    </div>
  </div>
);
