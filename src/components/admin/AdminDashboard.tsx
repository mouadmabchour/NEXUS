import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  TrendingUp, 
  Users, 
  MoreVertical,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  LayoutDashboard,
  Settings,
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { products } from '../../data/mockData';
import { OrderManagement } from './OrderManagement';
import { SupportDashboard } from './SupportDashboard';

type AdminTab = 'overview' | 'orders' | 'support' | 'catalog' | 'settings';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [localProducts, setLocalProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');

  const formatPrice = (price: string | number) => {
    const num = typeof price === 'string' ? parseFloat(price.replace(/[^\d.]/g, '')) : price;
    return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(num || 0);
  };

  const stats = [
    { label: 'Visites Nexus', value: '12,840', trend: '+18.5%', isUp: true, icon: Zap, color: 'text-blue-500' },
    { label: 'Nouveaux Clients', value: '1,240', trend: '+5.2%', isUp: true, icon: Users, color: 'text-emerald-500' },
    { label: 'Taux de Conversion', value: '4.2%', trend: '+0.8%', isUp: true, icon: BarChart3, color: 'text-blue-500' },
    { label: 'Revenu Nexus', value: '84.2K DH', trend: '+12.1%', isUp: true, icon: TrendingUp, color: 'text-indigo-500' },
  ];

  const filteredProducts = localProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string | number) => {
    if (confirm('Are you sure you want to remove this tool from the directory?')) {
      setLocalProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-24 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-500">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Administrator Command</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">
              Nexus <span className="text-blue-500">Admin</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl overflow-x-auto scroller-hide max-w-full">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Overview" icon={LayoutDashboard} />
            <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} label="Orders" icon={Inbox} />
            <TabButton active={activeTab === 'support'} onClick={() => setActiveTab('support')} label="Support" icon={MessageSquare} />
            <TabButton active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} label="Catalog" icon={Package} />
            <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="Settings" icon={Settings} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-[#141416] p-8 rounded-[40px] border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 leading-none">{stat.label}</p>
                    <h4 className="text-3xl font-black tracking-tight text-white">{stat.value}</h4>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Items */}
                <div className="lg:col-span-2 bg-[#141416] rounded-[40px] border border-white/5 p-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight text-white">Activité Récente</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-1">Commandes <ChevronRight className="w-3 h-3" /></button>
                  </div>
                  <div className="space-y-4">
                    {/* Simplified order feed could go here */}
                    <p className="text-sm text-gray-600 italic">Aucune activité récente enregistrée.</p>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="bg-blue-600 rounded-[40px] p-10 text-white flex flex-col justify-between shadow-2xl shadow-blue-600/20">
                   <div>
                      <h3 className="text-2xl font-black tracking-tighter mb-4">Nexus Growth</h3>
                      <p className="text-sm text-blue-100 mb-8 font-medium">Les revenus ont augmenté de 8.5% ce mois-ci.</p>
                      <div className="h-32 flex items-end gap-2 px-2">
                        {[30, 50, 40, 80, 60, 90, 70].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t-lg bg-white/20 relative">
                             <div 
                                style={{ height: `${h}%` }}
                                className="w-full bg-white rounded-t-lg absolute bottom-0 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                             ></div>
                          </div>
                        ))}
                      </div>
                   </div>
                   <button className="w-full py-5 bg-white text-blue-600 font-bold rounded-2xl text-xs uppercase tracking-widest mt-8 hover:bg-black hover:text-white transition shadow-xl">Exporter Rapport</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="rounded-[40px] overflow-hidden">
                <OrderManagement />
              </div>
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="rounded-[40px] overflow-hidden">
                <SupportDashboard />
              </div>
            </motion.div>
          )}

          {activeTab === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Product Catalog Content */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Rechercher dans le catalogue..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-semibold outline-none focus:bg-white focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition"><Filter className="w-5 h-5" /></button>
                    <button className="px-8 h-12 bg-blue-600 text-white font-bold rounded-2xl uppercase tracking-widest text-xs shadow-xl flex items-center gap-3 active:scale-95 transition">
                      <Plus className="w-5 h-5" /> Ajouter
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Produit</th>
                          <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catégorie</th>
                          <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prix</th>
                          <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Note</th>
                          <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredProducts.map(product => (
                          <tr key={product.id} className="group hover:bg-gray-50 transition-colors">
                            <td className="py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-gray-50">
                                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-bold text-gray-900">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-6">
                               <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                 {product.category}
                               </span>
                            </td>
                            <td className="py-6 font-bold text-gray-900">{formatPrice(product.price)}</td>
                            <td className="py-6">
                               <div className="flex items-center gap-1 text-amber-500">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                               </div>
                            </td>
                            <td className="py-6 text-right">
                               <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                  <button className="p-2.5 bg-white text-gray-400 hover:text-blue-600 rounded-xl border border-gray-100 shadow-sm"><Edit3 className="w-4 h-4" /></button>
                                  <button 
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2.5 bg-white text-gray-400 hover:text-red-600 rounded-xl border border-gray-100 shadow-sm"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               <CircleCard 
                  title="Nexus System" 
                  memberCount="v1.0.4" 
                  growth="Stable" 
                  icon={Settings}
                  color="bg-gray-900"
               />
               <button className="bg-white rounded-[40px] p-10 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center group hover:border-blue-600 transition-all hover:bg-blue-50/50">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-6 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                     <Plus className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Add Admin</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 max-w-[200px]">Invite new administrators to the Nexus Command Center</p>
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label, icon: Icon }: { active: boolean, onClick: () => void, label: string, icon: any }) => (
  <button 
    onClick={onClick}
    className={`px-6 h-12 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'text-gray-500 hover:text-white'}`}
  >
    <Icon className="w-4 h-4" />
    <span className={active ? 'block' : 'hidden md:block'}>{label}</span>
  </button>
);

const CircleCard = ({ title, memberCount, growth, icon: Icon, color }: { title: string, memberCount: string, growth: string, icon: any, color: string }) => (
  <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm group hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
     <div className="flex justify-between items-center mb-8">
        <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
           <Icon className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{growth} Growth</span>
     </div>
     <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">{title}</h3>
     <div className="flex items-center gap-2 mb-8">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-bold text-gray-600">{memberCount}</span>
     </div>
     <div className="flex gap-3">
        <button className="flex-1 py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition shadow-lg">View Members</button>
        <button className="p-4 bg-gray-50 text-gray-400 rounded-xl hover:text-gray-900 transition"><Settings className="w-5 h-5" /></button>
     </div>
  </div>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
