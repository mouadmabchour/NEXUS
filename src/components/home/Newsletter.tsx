import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-black rounded-[48px] p-8 md:p-16 lg:p-24 overflow-hidden border border-white/10 group">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6"
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">Accès Exclusif</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-6">
                Restez à l'affût des <br />
                <span className="text-blue-600">Prochains Drops</span>
              </h2>
              
              <p className="text-gray-400 text-lg font-medium mb-8 max-w-md leading-relaxed">
                Inscrivez-vous pour recevoir des offres exclusives, des invitations aux ventes privées et un accès anticipé aux nouvelles collections.
              </p>

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: ShieldCheck, label: "Offres Réservées" },
                  { icon: Sparkles, label: "Nouveautés Flash" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/60">
                    <item.icon className="w-4 h-4 text-blue-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-[32px] p-12 text-center backdrop-blur-xl"
                >
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/20">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bienvenue au Nexus !</h3>
                  <p className="text-gray-400 font-medium">Vérifiez votre boîte mail pour confirmer votre inscription.</p>
                </motion.div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 sm:p-12 backdrop-blur-xl">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="VOTRE@EMAIL.COM"
                        className="w-full h-20 bg-black/50 border border-white/10 rounded-[24px] px-14 text-white text-xs font-bold uppercase tracking-widest outline-none focus:border-blue-600 transition-all placeholder:text-gray-700"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full h-20 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-[24px] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {status === 'loading' ? 'Traitement...' : (
                        <>
                          Rejoindre la Liste <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-gray-600 text-center font-bold uppercase tracking-widest mt-6">
                      En vous inscrivant, vous acceptez nos <span className="text-gray-400">Conditions</span> et notre <span className="text-gray-400">Confidentialité</span>.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
