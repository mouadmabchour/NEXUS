import React from 'react';
import { 
  Sparkles, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin,
  MessageCircle,
  Globe,
  ArrowRight,
  Music
} from 'lucide-react';

export const Footer = ({ onPageChange }: { onPageChange: (page: any) => void }) => {
  return (
    <footer className="bg-black text-white pt-32 pb-12 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & About Highlight */}
        <div className="grid lg:grid-cols-12 gap-16 pb-24 border-b border-white/5">
           <div className="lg:col-span-5 space-y-8">
              <button 
                onClick={() => onPageChange('home')}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-black w-6 h-6 fill-current" />
                </div>
              <span className="text-3xl font-black tracking-tighter text-white">NEXUS</span>
            </button>
            <p className="text-gray-400 text-lg leading-relaxed font-medium max-w-sm italic">
              "Redefining urban apparatus. Curating premium streetwear for the kinetic nomad."
            </p>
            <div className="flex gap-4">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Music, label: 'TikTok' },
                  { icon: Facebook, label: 'Facebook' }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    aria-label={social.label}
                    className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition-all duration-500 hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
           </div>

           <div className="lg:col-span-7">
              <div className="bg-white/5 rounded-[40px] p-8 sm:p-12 border border-white/5">
                 <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Newsletter Exclusive</h3>
                 <p className="text-gray-500 font-medium mb-8">Recevez un accès anticipé aux nouveaux drops et aux mises à jour.</p>
                 <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex-1 relative group">
                       <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
                       <input 
                         type="email" 
                         placeholder="VOTRE@EMAIL.COM" 
                         className="w-full bg-black border border-white/10 rounded-[20px] py-5 px-14 text-white text-[10px] font-bold uppercase tracking-widest outline-none focus:border-white transition-all"
                       />
                    </div>
                    <button className="px-10 py-5 bg-white text-black font-black rounded-[20px] text-[10px] hover:bg-gray-200 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 group">
                       S'inscrire <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </form>
              </div>
           </div>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-24">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white/40">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold tracking-tight text-gray-400">
              <li><button onClick={() => onPageChange('home')} className="hover:text-white transition-colors">Accueil</button></li>
              <li><button onClick={() => onPageChange('shop')} className="hover:text-white transition-colors">Boutique</button></li>
              <li><button onClick={() => onPageChange('promotions')} className="hover:text-white transition-colors">Catégories</button></li>
              <li><button onClick={() => onPageChange('about')} className="hover:text-white transition-colors">À Propos</button></li>
              <li><button onClick={() => onPageChange('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white/40">Aide & Légal</h4>
            <ul className="space-y-4 text-sm font-bold tracking-tight text-gray-400">
              <li><button onClick={() => onPageChange('about')} className="hover:text-white transition-colors">FAQ</button></li>
              <li><button onClick={() => onPageChange('about')} className="hover:text-white transition-colors">Politique de Confidentialité</button></li>
              <li><button onClick={() => onPageChange('about')} className="hover:text-white transition-colors">Conditions Générales</button></li>
              <li><button onClick={() => onPageChange('contact')} className="hover:text-white transition-colors">Support Client</button></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-span-1 lg:ml-auto">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white/40">Nexus Contact</h4>
            <ul className="space-y-6 text-sm font-bold tracking-tight">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <p>Chichaoua, Morocco</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-600">Centre Ville</p>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <p>0702593114 (WhatsApp)</p>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <p>mouadmabchour21@gmail.com</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-600">Disponibilité 7j/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Fine Print */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
             <Globe className="w-3 h-3 text-emerald-500" />
             <p>© 2026 NEXUS PRODUCTS ENTITY. All telemetry secured.</p>
          </div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Law</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
