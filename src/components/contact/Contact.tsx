import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Send, 
  Headset, 
  MessageSquare, 
  Sparkles, 
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  MapPin,
  ChevronDown,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../common/SEO';

export const Contact = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How fast is Nexus delivery?",
      a: "Our standard shipping takes 3-5 business days. Priority drop shipping is available for next-day arrival in most metropolitan areas."
    },
    {
      q: "What is your return policy?",
      a: "Vous pouvez retourner un produit sous 7 jours après réception si le produit est en bon état. Les étiquettes doivent rester attachées."
    },
    {
      q: "Are the drops limited?",
      a: "Yes, many of our pieces are part of limited edition drops and once sold out, are rarely restocked to maintain exclusivity."
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Globe, label: 'TikTok', href: '#' }
  ];

  return (
    <div className="bg-white selection:bg-black selection:text-white">
      <SEO 
        title="Contactez Support NEXUS | Concierge Urbain" 
      />
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full mb-8"
            >
              <Sparkles className="w-3 h-3 text-black" />
              <span className="text-black text-[9px] font-bold uppercase tracking-[0.2em]">Support Specialists Available</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl sm:text-8xl font-bold tracking-tight mb-8 leading-none"
            >
              Get in <span className="text-gray-400 font-medium italic">Touch</span>
            </motion.h1>
            <p className="text-gray-500 font-medium text-xl leading-relaxed">
              Experience personalized support tailored to the streetwear community. Whether you have questions about our latest drop or need order assistance, our specialists are here to guide you.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 translate-x-1/4 skew-x-12 opacity-50"></div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-20">
            
            {/* Left: Contact Info & Map */}
            <div className="lg:col-span-5 space-y-16">
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-10">Channels & Direct Lines</h3>
                <div className="grid gap-6">
                  <ContactCard 
                    icon={Mail} 
                    title="Client Support" 
                    detail="mouadmabchour21@gmail.com" 
                    subDetail="Priority Inbox: < 2hrs response"
                  />
                  <ContactCard 
                    icon={Phone} 
                    title="Nexus Concierge" 
                    detail="0702593114" 
                    subDetail="Disponible 7j/7, Réponse Instantanée"
                  />
                  <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[32px] flex items-center justify-between group hover:bg-emerald-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-50 shadow-sm">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">WhatsApp Business</h4>
                        <p className="text-lg font-bold text-gray-900 tracking-tight">Support 7j/7 Rapide</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 transition-transform group-hover:translate-x-1">
                      <Send className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Our Headquarters</h3>
                <div className="relative h-64 bg-gray-100 rounded-[40px] overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                    className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110" 
                    alt="Map Location" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl relative">
                       <MapPin className="w-6 h-6 text-black" />
                       <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200">
                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest text-center">Chichaoua, Morocco</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Join the Nexus Circle</h3>
                <div className="grid grid-cols-4 gap-4">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      className="h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all group"
                    >
                      <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Specialized Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[56px] shadow-2xl shadow-black/5 border border-gray-100 p-8 sm:p-14 lg:p-16 sticky top-32">
                <div className="mb-12">
                   <div className="flex items-center gap-3 text-emerald-500 mb-2">
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Specialists Online Now</span>
                   </div>
                  <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Direct Message</h2>
                  <p className="text-gray-500 font-medium">Your inquiry will be routed to a dedicated streetwear specialist.</p>
                </div>

                <form className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <FormInput label="Full Identity" placeholder="Votre Nom" type="text" />
                    <FormInput label="Digital Email" placeholder="votre@email.com" type="email" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Inquiry Thread</label>
                    <select className="bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:border-black transition-all accent-black">
                      <option>Drop Authentication Request</option>
                      <option>Order Tracking Specialist</option>
                      <option>Returns & Exchanges</option>
                      <option>VIP Early Access Inquiry</option>
                      <option>Technical Platform Support</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Message Detail</label>
                    <textarea 
                      rows={5} 
                      placeholder="Share your requirements or order number..."
                      className="bg-gray-50 border border-gray-100 rounded-3xl py-6 px-6 text-sm font-bold outline-none focus:border-black transition-all resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-col gap-6 pt-4">
                    <button type="submit" className="w-full h-16 bg-black text-white font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-gray-800 transition shadow-xl shadow-black/10 flex items-center justify-center gap-3 active:scale-95 group">
                      Initialize Signal <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Support 7j/7 Rapide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Secure 256-bit Sync</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">Intelligence Base</h2>
              <h3 className="text-4xl font-bold text-gray-900 tracking-tight italic">Frequently <span className="text-gray-400 font-medium not-italic">Anticipated Questions</span></h3>
           </div>

           <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                   <button 
                     onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                     className="w-full px-8 py-6 flex items-center justify-between text-left group"
                   >
                     <span className="text-sm font-bold text-gray-900 group-hover:text-gray-600 transition-colors">{faq.q}</span>
                     <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-300 ${activeFaq === index ? 'rotate-180 bg-black text-white' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                     </div>
                   </button>
                   <AnimatePresence>
                     {activeFaq === index && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                       >
                         <div className="px-8 pb-8 text-gray-500 text-sm font-medium leading-relaxed">
                            {faq.a}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              ))}
           </div>
           
           <div className="mt-16 text-center">
              <button className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors flex items-center gap-2 mx-auto decoration-2 underline-offset-8 hover:underline">
                 <Globe className="w-4 h-4" /> View Full Documentation
              </button>
           </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                     <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Support 7j/7 Rapide</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[240px]">Nos spécialistes sont disponibles via WhatsApp et Email tous les jours pour une assistance immédiate.</p>
                  </div>
               </div>
               <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                     <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Kinetic Experience</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[240px]">Every interaction is handled with precision to ensure your urban aesthetic is perfectly curated.</p>
                  </div>
               </div>
               <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                     <Headset className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Live Support Chat</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[240px]">Access real-time guidance directly within your dashboard for instant order modifications.</p>
                  </div>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
};

const ContactCard = ({ icon: Icon, title, detail, subDetail }: { icon: any, title: string, detail: string, subDetail: string }) => {
  return (
    <div className="flex gap-6 items-center p-8 bg-white rounded-[32px] border border-gray-100 hover:border-black transition-all group shadow-sm hover:shadow-xl hover:shadow-black/5">
      <div className="bg-gray-50 text-gray-900 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-100 transition-all group-hover:bg-black group-hover:text-white">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-xl font-bold text-gray-900 tracking-tight mb-0.5">{detail}</p>
        <p className="text-xs text-gray-500 font-medium">{subDetail}</p>
      </div>
    </div>
  );
};

const FormInput = ({ label, placeholder, type }: { label: string, placeholder: string, type: string }) => (
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:border-black transition-all placeholder:text-gray-300"
    />
  </div>
);

