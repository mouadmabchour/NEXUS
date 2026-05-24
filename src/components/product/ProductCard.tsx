import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';

import { useNotifications } from '../../context/NotificationContext';
import { formatPrice } from '../../lib/formatters';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotifications();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="bg-white rounded-[32px] border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full flex flex-col cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 m-2 rounded-[28px]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.discountBadge && (
            <span className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg">
              {product.discountBadge}
            </span>
          )}
          {product.isNew && (
            <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em] border border-gray-200">
              Nouveauté
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg flex items-center gap-1.5">
              <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
              Édition Limitée
            </span>
          )}
        </div>
      </div>

      <div className="p-6 pt-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-200'}`} 
            />
          ))}
          <span className="text-[10px] font-bold text-gray-400 ml-1">({product.reviews})</span>
        </div>

        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em] mb-1">
          {product.category}
        </span>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 font-medium line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                showNotification('success', 'Ajouté au Panier', `${product.name} a été ajouté à votre panier.`);
              }}
              className="flex items-center justify-center gap-2 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all active:scale-95"
            >
              <ShoppingCart className="w-3 h-3" /> Ajouter
            </button>
            <button 
              className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-900 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all border border-gray-100 active:scale-95"
            >
              <Eye className="w-3 h-3" /> Détails
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
