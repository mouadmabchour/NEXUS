import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShoppingCart, 
  Ticket, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotifications } from '../../context/NotificationContext';
import { formatPrice } from '../../lib/formatters';

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export const CartPage = ({ onBack, onCheckout }: CartPageProps) => {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { showNotification } = useNotifications();
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const subtotal = totalPrice;
  const shipping = subtotal > 1500 ? 0 : (subtotal === 0 ? 0 : 100.00);
  const total = subtotal + shipping;

  const handleApplyPromo = () => {
    if (!promoCode) return;
    setIsApplyingPromo(true);
    setTimeout(() => {
      setIsApplyingPromo(false);
      showNotification('info', 'Promo Code', 'This promo code is currently inactive or expired.');
    }, 1000);
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    showNotification('info', 'Item Removed', `${productName} has been removed from your cart.`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
              <ShoppingCart className="w-10 h-10 text-gray-200" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Your cart is empty</h1>
            <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our curated collections to find your elite picks.
            </p>
            <button
              onClick={onBack}
              className="px-10 py-4 bg-black text-white font-bold rounded-2xl text-sm hover:bg-gray-800 transition-all flex items-center gap-3 active:scale-95 shadow-xl shadow-black/10"
            >
              <ArrowLeft className="w-5 h-5" /> Start Shopping
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 selection:bg-black selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              <button onClick={onBack} className="hover:text-black">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900">Cart</span>
            </nav>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Shopping <span className="text-gray-400 font-medium italic">Cart</span>
            </h1>
          </div>
          <button 
            onClick={onBack}
            className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20">
          {/* Cart List */}
          <div className="lg:col-span-8">
            <div className="space-y-1">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-white border-b border-gray-100 last:border-0 group hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[32px] overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">{item.category}</span>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-500 font-medium line-clamp-1">{item.description}</p>
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {formatPrice(item.price * (item.quantity || 1))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                        <div className="flex items-center p-1 bg-white border border-gray-100 rounded-2xl shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-gray-900">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button 
                          onClick={() => handleRemove(item.id, item.name)}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Remove Item
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-12 p-8 bg-gray-50 rounded-[40px] border border-gray-100">
               <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 w-full">
                     <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Have a promo code?</h4>
                     <div className="relative">
                        <Ticket className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                        <input 
                          type="text" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="ENTER CODE" 
                          className="w-full h-16 pl-14 pr-32 bg-white border border-gray-100 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:border-black transition-colors"
                        />
                        <button 
                          onClick={handleApplyPromo}
                          disabled={isApplyingPromo}
                          className="absolute right-3 top-3 bottom-3 px-6 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all"
                        >
                          {isApplyingPromo ? 'Applying...' : 'Apply'}
                        </button>
                     </div>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                  <div className="flex-1 w-full grid grid-cols-2 gap-6">
                     <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Free Shipping Over 1,500 MAD</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Secure Checkout</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="p-10 bg-black text-white rounded-[40px] shadow-2xl overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-gray-800 rounded-full blur-3xl opacity-50"></div>
                
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-gray-400 relative z-10">Order Summary</h2>
                                <div className="space-y-6 mb-10 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
                    <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Shipping</span>
                    <span className="text-lg font-bold">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-bold">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <button 
                    onClick={onCheckout}
                    className="w-full h-16 bg-white text-black font-bold rounded-2xl text-sm flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95"
                  >
                    Proceed to Checkout <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-[9px] font-bold text-center text-gray-500 uppercase tracking-[0.2em] px-4 leading-relaxed">
                    Taxes and duties are calculated at checkout. Free 30-day returns on all elite orders.
                  </p>
                </div>
              </div>

              <div className="p-8 border border-gray-100 rounded-[32px] space-y-6">
                 <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">We Accept</h4>
                 <div className="flex gap-4">
                    <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center border border-gray-100"><CreditCard className="w-5 h-5 text-gray-400" /></div>
                    <div className="w-12 h-8 bg-gray-50 rounded border border-gray-100"></div>
                    <div className="w-12 h-8 bg-gray-50 rounded border border-gray-100"></div>
                    <div className="w-12 h-8 bg-gray-50 rounded border border-gray-100"></div>
                 </div>
                 <div className="pt-6 border-t border-gray-50">
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                       Your data is protected by industry-leading 256-bit SSL encryption for a safe and secure shopping experience.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
