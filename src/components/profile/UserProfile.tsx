import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Bell, 
  ChevronRight, 
  Star,
  ExternalLink,
  Clock,
  Bookmark,
  MessageSquare,
  BarChart3,
  Sparkles,
  ReceiptText,
  Package,
  Truck,
  MapPin,
  ShieldCheck,
  Mail
} from 'lucide-react';

import { useNotifications } from '../../context/NotificationContext';
import { UserProfile as UserProfileType } from '../../types';
import { formatPrice } from '../../lib/formatters';

type ProfileTab = 'overview' | 'orders' | 'tracking' | 'wishlist' | 'settings';

export const UserProfile = ({ 
  userProfile, 
  onAdminClick, 
  onAdminSupportClick,
  onLogout 
}: { 
  userProfile: UserProfileType | null,
  onAdminClick?: () => void, 
  onAdminSupportClick?: () => void,
  onLogout?: () => void 
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const { showNotification } = useNotifications();

  const handleSaveSettings = () => {
    showNotification('success', 'Profile Updated', 'Your account preferences have been saved securely.');
  };

  const mockOrders = [
    { id: 'ORD-882941', date: 'Oct 12, 2023', total: 4295.00, status: 'delivered', items: 2 },
    { id: 'ORD-991024', date: 'Nov 05, 2023', total: 1890.00, status: 'shipped', items: 1 },
    { id: 'ORD-102931', date: 'Dec 02, 2023', total: 5499.99, status: 'processing', items: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 selection:bg-black selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm sticky top-32">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-black/10">
                    {userProfile?.displayName?.[0] || 'U'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 leading-none mb-1">
                      {userProfile?.displayName || 'Elite Member'}
                    </h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Shield className="w-3 h-3 text-emerald-500" />
                      {userProfile?.role === 'admin' ? 'Alpha Admin' : 'Verified Member'}
                    </p>
                  </div>
                </div>

              <nav className="space-y-1.5">
                <NavButton 
                  icon={User} 
                  label="Overview" 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')} 
                />
                <NavButton 
                  icon={ReceiptText} 
                  label="My Orders" 
                  active={activeTab === 'orders'} 
                  onClick={() => setActiveTab('orders')} 
                />
                <NavButton 
                  icon={Package} 
                  label="Order Tracking" 
                  active={activeTab === 'tracking'} 
                  onClick={() => setActiveTab('tracking')} 
                />
                <NavButton 
                  icon={Bookmark} 
                  label="Wishlist" 
                  active={activeTab === 'wishlist'} 
                  onClick={() => setActiveTab('wishlist')} 
                />
                <NavButton 
                  icon={Settings} 
                  label="Account Settings" 
                  active={activeTab === 'settings'} 
                  onClick={() => setActiveTab('settings')} 
                />
                <div className="pt-6 mt-6 border-t border-gray-50">
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all font-sans"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                     <div>
                       <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">Welcome Back,</h1>
                       <p className="text-gray-400 font-medium italic text-2xl tracking-tight">{userProfile?.displayName || 'Nexus Member'}</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-center">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
                           <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <div className="px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-center">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Elite Credits</p>
                           <p className="text-2xl font-bold text-emerald-500">840</p>
                        </div>
                     </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard 
                      icon={Star} 
                      label="Loyalty Tier" 
                      value="Platinum" 
                      subtext="Next Tier: 5,000 pts"
                      color="text-amber-500"
                    />
                    <StatCard 
                      icon={MessageSquare} 
                      label="Reviews Left" 
                      value="8" 
                      subtext="Helpful Rank: #420"
                      color="text-blue-500"
                    />
                     <StatCard 
                      icon={Sparkles} 
                      label="Member Since" 
                      value="2023" 
                      subtext="Tier: Anniversary"
                      color="text-purple-500"
                    />
                  </div>

                  {userProfile?.role === 'admin' && (
                    <div className="p-8 bg-gray-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight mb-2">Alpha Command Center</h4>
                        <p className="text-gray-400 text-xs font-medium max-w-sm">Access the central command for inventory, orders, and platform analytics.</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={onAdminClick}
                          className="px-8 py-4 bg-white text-black font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-gray-100 transition shadow-2xl flex items-center justify-center gap-2"
                        >
                          Dashboard <BarChart3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={onAdminSupportClick}
                          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-2xl flex items-center justify-center gap-2"
                        >
                          Messages <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-[40px] p-8 sm:p-10 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xl font-bold text-gray-900 tracking-tight">Active Shipments</h3>
                       <button onClick={() => setActiveTab('tracking')} className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors">See Tracking</button>
                    </div>
                    <div className="space-y-4">
                      {mockOrders.filter(o => o.status !== 'delivered').map((order, i) => (
                        <div key={order.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[32px] border border-gray-100 hover:border-black transition-colors group">
                           <div className="flex items-center gap-5">
                              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-black">
                                 <Truck className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-gray-900 leading-none mb-1">Order {order.id}</p>
                                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{order.status}</p>
                              </div>
                           </div>
                           <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Purchase <span className="text-gray-400 font-medium italic">History</span></h3>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-gray-200 transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-gray-50 rounded-[24px] flex items-center justify-center text-gray-300">
                              <Package className="w-8 h-8" />
                           </div>
                           <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-gray-900">{order.id}</h4>
                                <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                                  order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 
                                  order.status === 'shipped' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.date} • {order.items} Items</p>
                           </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-10">
                           <div className="text-right">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                              <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                           </div>
                           <button className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                              <ChevronRight className="w-5 h-5" />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'tracking' && (
                <motion.div
                  key="tracking"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                   <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Active <span className="text-gray-400 font-medium italic">Shipments</span></h3>
                   
                   <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-12">
                      <div className="flex flex-col md:flex-row justify-between gap-8 pb-10 border-b border-gray-50">
                         <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Currently Tracking</p>
                            <h4 className="text-3xl font-bold text-gray-900 tracking-tight">ORD-991024</h4>
                            <div className="flex items-center gap-3 mt-4">
                               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">In Transit to Destination</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="text-right">
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
                               <p className="text-xl font-bold text-gray-900">May 15, 2024</p>
                            </div>
                         </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative">
                         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
                         <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-black -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"></div>
                         
                         <div className="relative flex justify-between">
                            {[
                              { icon: Package, label: 'Packed' },
                              { icon: Truck, label: 'Shipped' },
                              { icon: ShieldCheck, label: 'Hub' },
                              { icon: MapPin, label: 'Local' }
                            ].map((step, i) => (
                              <div key={step.label} className="flex flex-col items-center gap-4">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative z-10 ${
                                   i < 3 ? 'bg-black text-white' : 'bg-white border border-gray-100 text-gray-200'
                                 }`}>
                                    <step.icon className="w-5 h-5" />
                                 </div>
                                 <span className={`text-[9px] font-bold uppercase tracking-widest ${i < 3 ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</span>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="pt-10 border-t border-gray-50 grid sm:grid-cols-2 gap-8 text-[10px] font-bold uppercase tracking-widest">
                         <div className="space-y-4">
                            <div className="flex justify-between">
                               <span className="text-gray-400">Courier</span>
                               <span className="text-gray-900">Elite Global Express</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-gray-400">Tracking ID</span>
                               <span className="text-gray-900">EGE-882200-XX-43</span>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="flex justify-between">
                               <span className="text-gray-400">Shipping Weight</span>
                               <span className="text-gray-900">1.25 KG</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-gray-400">Destination</span>
                               <span className="text-gray-900">San Francisco, CA</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Your <span className="text-gray-400 font-medium italic">Favorites</span></h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { id: '1', name: 'Nexus Audio Gen 2', price: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', category: 'Electronics' },
                      { id: '2', name: 'Elite Watch Series', price: 3999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600', category: 'Accessories' }
                    ].map(item => (
                      <div key={item.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-black transition-all">
                        <div className="w-24 h-24 bg-gray-50 rounded-[20px] overflow-hidden">
                           <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">{item.category}</span>
                          <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-sm font-bold text-gray-900 mb-3">{formatPrice(item.price)}</p>
                          <div className="flex gap-4">
                             <button className="text-[9px] font-bold text-black uppercase tracking-widest hover:underline">Add to Cart</button>
                             <button className="text-[9px] font-bold text-rose-500 uppercase tracking-widest hover:underline">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Security & Notifications</h3>
                    <div className="space-y-6">
                       <SecurityRow icon={Shield} title="Two-Factor Authentication" status="Active & Secure" />
                       <SecurityRow icon={Bell} title="System Alerts" status="All critical alerts on" />
                       <SecurityRow icon={Mail} title="Marketing Emails" status="Nexus Weekly only" />
                    </div>
                    
                    <div className="mt-12 space-y-6">
                       <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Edit Master Identity</h4>
                       <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1">Display Name</label>
                             <input type="text" defaultValue={userProfile?.displayName || ''} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:border-black transition-colors" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1">Primary Email</label>
                             <input type="email" readOnly value={userProfile?.email || ''} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-400 outline-none cursor-not-allowed" />
                          </div>
                       </div>
                    </div>

                    <button 
                      onClick={handleSaveSettings}
                      className="mt-10 w-full py-4 bg-black text-white font-bold rounded-2xl uppercase tracking-widest text-[10px] hover:bg-gray-800 transition shadow-xl shadow-black/10 active:scale-[0.98]"
                    >
                      Update Security Protocol
                    </button>
                  </div>

                  <div className="p-8 bg-rose-50 rounded-[40px] border border-rose-100 flex flex-col items-center text-center gap-4">
                     <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Self Destruct</p>
                     <p className="text-xs font-medium text-rose-900 max-w-sm">Permanently deactivate your Nexus identity and remove all associated telemetry data from our secure clusters.</p>
                     <button className="text-[9px] font-bold text-rose-500 uppercase tracking-[0.2em] hover:underline underline-offset-4">Terminate Account</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${active ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-500 hover:bg-gray-50'}`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);

const StatCard = ({ icon: Icon, label, value, subtext, color }: { icon: any, label: string, value: string, subtext: string, color: string }) => (
  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-6">
    <div className={`w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center ${color} shadow-inner`}>
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className={`text-3xl font-bold tracking-tight mb-0.5 ${color}`}>{value}</h4>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{subtext}</p>
    </div>
  </div>
);

const SecurityRow = ({ icon: Icon, title, status }: { icon: any, title: string, status: string }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{status}</p>
      </div>
    </div>
    <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition">Update</button>
  </div>
);
