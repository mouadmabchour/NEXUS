import React from 'react';
import { Home, Search, ShoppingBag, User, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: 'home' | 'about' | 'contact' | 'profile' | 'shop' | 'cart' | 'promotions';
  onTabChange: (tab: any) => void;
  onCartClick: () => void;
  itemsInCart: number;
}

export const BottomNav = ({ activeTab, onTabChange, onCartClick, itemsInCart }: BottomNavProps) => {
  return (
    <div id="mobile-bottom-nav" className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 z-50 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <NavButton 
          id="btn-nav-home"
          icon={Home} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => onTabChange('home')} 
        />
        <NavButton 
          id="btn-nav-shop"
          icon={Search} 
          label="Shop" 
          active={activeTab === 'shop'} 
          onClick={() => onTabChange('shop')} 
        />
        <button 
          id="btn-nav-cart"
          onClick={onCartClick}
          className="relative -mt-10 bg-emerald-600 p-4 rounded-full text-white shadow-xl shadow-emerald-500/40 border-4 border-white active:scale-90 transition-transform"
        >
          <ShoppingBag className="w-6 h-6" />
          {itemsInCart > 0 && (
            <span id="cart-badge-mobile" className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {itemsInCart}
            </span>
          )}
        </button>
        <NavButton 
          id="btn-nav-promos"
          icon={Tag} 
          label="Deals" 
          active={activeTab === 'promotions'} 
          onClick={() => onTabChange('promotions')} 
        />
        <NavButton 
          id="btn-nav-profile"
          icon={User} 
          label="Me" 
          active={activeTab === 'profile'} 
          onClick={() => onTabChange('profile')} 
        />
      </div>
    </div>
  );
};

const NavButton = ({ id, icon: Icon, label, active, onClick }: { id: string, icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    id={id}
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-emerald-600' : 'text-gray-400'}`}
  >
    <Icon className={`w-5 h-5 ${active ? 'fill-emerald-600/10' : ''}`} />
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);
