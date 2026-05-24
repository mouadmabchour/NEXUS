import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  ChevronRight,
  Plus,
  Check,
  Package,
  ReceiptText,
  Clock,
  RotateCcw,
  MessagesSquare
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotifications } from '../../context/NotificationContext';
import { SEO } from '../common/SEO';
import { formatPrice } from '../../lib/formatters';
import { orderService } from '../../services/orderService';

interface CheckoutPageProps {
  onBack: () => void;
  onOrderComplete: () => void;
}

export const CheckoutPage = ({ onBack, onOrderComplete }: CheckoutPageProps) => {
  const { cart, totalPrice, clearCart } = useCart();
  const { showNotification } = useNotifications();

  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Morocco',
    city: '',
    address: '',
    zip: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cod'>('cod');
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = totalPrice;
  const shippingFee = deliveryMethod === 'express' ? 100.00 : (subtotal > 1500 ? 0 : 50.00);
  const total = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.address || !formData.phone) {
      showNotification('error', 'Incomplete Information', 'Please fill in all required fields including phone number.');
      return;
    }

    setIsProcessing(true);
    
    try {
      await orderService.createOrder({
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        items: cart,
        subtotal,
        shippingFee,
        total,
        paymentMethod
      });

      clearCart();
      showNotification('success', 'Order Placed!', 'Your order has been successfully placed. Check your email for details.');
      onOrderComplete();
    } catch (error) {
      console.error('Order failed:', error);
      showNotification('error', 'Order Failed', 'Something went wrong while processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-24 selection:bg-black selection:text-white">
      <SEO 
        title="Paiement Sécurisé | Nexus Products" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              <button onClick={onBack} className="hover:text-black">Cart</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900">Checkout</span>
            </nav>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Paiement <span className="text-gray-400 font-medium italic">Sécurisé</span> Nexus
            </h1>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au panier
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Customer Info */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Informations Client</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nom Complet</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Votre nom complet" 
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Adresse Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com" 
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Numéro de Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="06 00 00 00 00" 
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 2. Shipping Address */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Adresse de Livraison</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Pays / Région</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:border-black transition-colors appearance-none"
                  >
                    <option>Maroc</option>
                    <option>France</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Adresse</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Numéro de rue et nom de la rue" 
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Ville</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Ville" 
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Code Postal</label>
                  <input 
                    type="text" 
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="Code Postal" 
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>
            </motion.section>

            {/* 3. Delivery Method */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Méthode de Livraison</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <button 
                  type="button"
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-start gap-4 p-6 rounded-[32px] border transition-all text-left group ${deliveryMethod === 'standard' ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50'}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${deliveryMethod === 'standard' ? 'border-white' : 'border-gray-300'}`}>
                    {deliveryMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Livraison Standard</h3>
                    <p className={`text-xs ${deliveryMethod === 'standard' ? 'text-gray-400' : 'text-gray-500'}`}>24h à 72h ouvrables</p>
                    <div className="mt-4 font-bold">{subtotal > 1500 ? 'GRATUIT' : '50.00 MAD'}</div>
                  </div>
                </button>

                <button 
                  type="button"
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-start gap-4 p-6 rounded-[32px] border transition-all text-left group ${deliveryMethod === 'express' ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50'}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${deliveryMethod === 'express' ? 'border-white' : 'border-gray-300'}`}>
                    {deliveryMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Livraison Express</h3>
                    <p className={`text-xs ${deliveryMethod === 'express' ? 'text-gray-400' : 'text-gray-500'}`}>Sous 24h Prioritaire</p>
                    <div className="mt-4 font-bold">100.00 MAD</div>
                  </div>
                </button>
              </div>
            </motion.section>

            {/* 4. Payment Method */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Méthode de Paiement</h2>
              </div>

              <div className="space-y-4">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between w-full p-6 rounded-[32px] border transition-all ${paymentMethod === 'card' ? 'border-black ring-2 ring-black/5 bg-gray-50' : 'border-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-black' : 'border-gray-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-black"></div>}
                    </div>
                    <span className="font-bold text-sm">Carte Bancaire (Bientôt disponible)</span>
                  </div>
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between w-full p-6 rounded-[32px] border transition-all ${paymentMethod === 'cod' ? 'border-black ring-2 ring-black/5 bg-gray-50' : 'border-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-black"></div>}
                    </div>
                    <span className="font-bold text-sm">Paiement à la Livraison (Cash on Delivery)</span>
                  </div>
                </button>
              </div>
            </motion.section>
          </div>

          {/* Sidebar / Order Summary */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 overflow-hidden"
              >
                <div className="p-8 border-b border-gray-50">
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Order Summary</h2>
                  
                  {/* Item Mini List */}
                  <div className="max-h-60 overflow-y-auto mb-8 pr-2 space-y-4 custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow pt-1">
                          <h4 className="text-xs font-bold text-gray-900 group-hover:text-gray-600 transition-colors">{item.name}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                            <span className="text-xs font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Input */}
                  <div className="relative mb-8">
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="PROMO CODE" 
                      className="w-full h-12 pl-4 pr-24 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest outline-none focus:border-black transition-colors"
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-2 bottom-2 px-4 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded-lg"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Calculation */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sous-total</span>
                      <span className="text-sm font-bold text-gray-900">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Livraison</span>
                      <span className="text-sm font-bold text-gray-900">{shippingFee === 0 ? 'GRATUIT' : formatPrice(shippingFee)}</span>
                    </div>
                    {promoCode === 'WELCOME10' && (
                      <div className="flex justify-between items-center text-emerald-500">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Réduction (10%)</span>
                        <span className="text-sm font-bold">-{formatPrice(subtotal * 0.1)}</span>
                      </div>
                    )}
                    <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest mb-1">Total Général</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">TVA incluse</span>
                      </div>
                      <span className="text-3xl font-bold text-gray-900 tracking-tight">{formatPrice(total)}</span>
                    </div>
                  </div>
                      <div className="p-8 bg-gray-50/50">
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-16 bg-black text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 disabled:bg-gray-400 shadow-xl shadow-black/10 group"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Confirmer la Commande <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-[9px] font-bold text-center text-gray-400 uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" /> Paiement Sécurisé SSL 256-Bit
                  </p>
                </div>             </div>
              </motion.div>

              {/* Trust Section */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white border border-gray-100 rounded-3xl flex flex-col items-center text-center gap-2 group hover:border-black transition-colors">
                    <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-black" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-900">Garantie 30 Jours</span>
                 </div>
                 <div className="p-4 bg-white border border-gray-100 rounded-3xl flex flex-col items-center text-center gap-2 group hover:border-black transition-colors">
                    <Clock className="w-5 h-5 text-gray-400 group-hover:text-black" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-900">Support 24/7</span>
                 </div>
                 <div className="p-4 bg-white border border-gray-100 rounded-3xl flex flex-col items-center text-center gap-2 group hover:border-black transition-colors">
                    <RotateCcw className="w-5 h-5 text-gray-400 group-hover:text-black" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-900">Retours 7 Jours</span>
                 </div>
                 <div className="p-4 bg-white border border-gray-100 rounded-3xl flex flex-col items-center text-center gap-2 group hover:border-black transition-colors">
                    <MessagesSquare className="w-5 h-5 text-gray-400 group-hover:text-black" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-900">Chat en Direct</span>
                 </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
