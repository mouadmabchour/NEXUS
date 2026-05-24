import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  MessageSquare,
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import { Order, OrderStatus } from '../../types';
import { format } from 'date-fns';
import { formatPrice } from '../../lib/formatters';

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsubscribe = orderService.subscribeToAllOrders((data) => {
      setOrders(data);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    setIsUpdating(true);
    try {
      await orderService.updateOrderStatus(orderId, status);
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'confirmed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'processing': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'shipped': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const stats = [
    { label: 'Total Commandes', value: orders.length, icon: Package, color: 'text-blue-500' },
    { label: 'Revenu Total', value: `${formatPrice(orders.reduce((acc, o) => acc + o.total, 0))}`, icon: DollarSign, color: 'text-emerald-500' },
    { label: 'En Attente', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'text-amber-500' },
    { label: 'Livrées', value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle, color: 'text-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-gray-400 selection:bg-blue-500 selection:text-white pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#141416] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-lg">+12%</div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Orders List Section */}
          <div className="lg:col-span-8 bg-[#141416] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
                    <Inbox className="w-6 h-6 text-blue-500" />
                    Gestion des Commandes
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Flux en temps réel • Nexus OS</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Rechercher Id, Nom..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold uppercase tracking-widest outline-none focus:border-blue-500 focus:bg-white/10 transition-all w-64 placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex gap-2">
                    {['all', 'pending', 'confirmed', 'delivered'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilterStatus(s as any)}
                        className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          filterStatus === s ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">ID Commande</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Client</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Statut</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map(order => (
                    <tr 
                      key={order.id} 
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`group cursor-pointer transition-colors ${selectedOrderId === order.id ? 'bg-blue-500/5' : 'hover:bg-white/[0.03]'}`}
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${order.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-transparent'}`} />
                          <span className="text-xs font-black text-white">#{order.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{order.customerName}</span>
                          <span className="text-[10px] text-gray-500">{order.city}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-xs font-bold text-gray-400">
                          {order.createdAt ? format(order.createdAt?.toDate?.() || new Date(), 'dd MMM, HH:mm') : '-'}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm font-black text-blue-500">{formatPrice(order.total)}</span>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-3 bg-white/5 text-gray-500 rounded-xl hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Sidebar Section */}
          <div className="lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              {!selectedOrder ? (
                <motion.div
                  key="no-selection"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#141416] p-10 rounded-[40px] border border-white/5 text-center flex flex-col items-center justify-center min-h-[500px]"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-10 h-10 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight mb-2">Sélectionner une commande</h3>
                  <p className="text-sm text-gray-600 max-w-[200px]">Cliquez sur une commande pour voir les détails complets et agir.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedOrder.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#141416] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl flex flex-col"
                >
                  {/* Header */}
                  <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Détails Commande</h3>
                      <div className="text-xl font-black text-white tracking-tighter">#{selectedOrder.id.slice(0, 10).toUpperCase()}</div>
                    </div>
                    <button 
                      onClick={() => setSelectedOrderId(null)}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Customer Block */}
                  <div className="p-8 space-y-8 flex-1 overflow-y-auto max-h-[calc(100vh-400px)] custom-scrollbar">
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Client & Livraison</h4>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{selectedOrder.customerName}</p>
                            <p className="text-xs text-gray-500">{selectedOrder.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                            <Phone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{selectedOrder.phone}</p>
                            <a href={`https://wa.me/${selectedOrder.phone.replace(/\s/g, '')}`} target="_blank" className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">WhatsApp Direct</a>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white leading-relaxed">{selectedOrder.address}</p>
                            <p className="text-xs text-gray-500">{selectedOrder.city}, {selectedOrder.country} {selectedOrder.zip}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Produits Commandés</h4>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-xs font-bold text-white mb-1">{item.name}</h5>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-500">Qté: {item.quantity}</span>
                                <span className="text-xs font-black text-white">{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-white/[0.03] p-6 rounded-3xl space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-500 uppercase">Sous-total</span>
                        <span className="text-white font-bold">{formatPrice(selectedOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-500 uppercase">Livraison</span>
                        <span className="text-white font-bold">{formatPrice(selectedOrder.shippingFee)}</span>
                      </div>
                      <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                        <span className="text-sm font-black text-white uppercase tracking-tighter">Total MAD</span>
                        <span className="text-2xl font-black text-blue-500 tracking-tighter">{formatPrice(selectedOrder.total)}</span>
                      </div>
                    </section>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-8 bg-black border-t border-white/5 flex flex-col gap-4">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">Actions Commande</h4>
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => handleUpdateStatus(selectedOrder.id, 'confirmed')}
                          className="py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20"
                        >
                          Confirmer
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
                          className="py-4 bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition"
                        >
                          Expédier
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')}
                          className="py-4 bg-emerald-600/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600/20 transition"
                        >
                          Livreur
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                          className="py-4 bg-red-600/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-600/20 transition"
                        >
                          Annuler
                        </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Tools */}
            <div className="bg-[#141416] p-8 rounded-[40px] border border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Outils Rapides</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Imprimer Bordereaux</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>
                <button className="w-full flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-500 group-hover:text-emerald-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Export Rapports CSV</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
