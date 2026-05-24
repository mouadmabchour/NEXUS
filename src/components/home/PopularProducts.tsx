import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight } from 'lucide-react';

interface PopularProductsProps {
  products: Product[];
  onVisitCatalog: () => void;
  onProductClick: (product: Product) => void;
}

export const PopularProducts = ({ products, onVisitCatalog, onProductClick }: PopularProductsProps) => {
  return (
    <section id="popular-products-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-none mb-4">
              Les <span className="text-gray-400 font-medium italic">Incontournables</span>
            </h2>
            <p className="text-gray-500 font-medium tracking-tight">
              Nos articles les plus populaires basés sur les ventes et la satisfaction client.
            </p>
          </div>
          <button 
            onClick={onVisitCatalog}
            className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-gray-500 transition-colors"
          >
            Voir la Boutique <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
