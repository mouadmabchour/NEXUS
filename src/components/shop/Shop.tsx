import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, List, SlidersHorizontal, Search, X, Check, ArrowUpDown, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { categories } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';
import { SEO } from '../common/SEO';

interface ShopProps {
  initialCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onProductClick: (product: Product) => void;
  searchQuery: string;
  products: Product[];
}

export const Shop = ({ initialCategory, onCategoryChange, onProductClick, searchQuery, products }: ShopProps) => {
  const [selectedDept, setSelectedDept] = useState<string | null>(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesDept = selectedDept 
        ? p.category === categories.find(c => c.id === selectedDept)?.name 
        : true;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFeatured = showOnlyFeatured ? p.isFeatured : true;
      const matchesNew = showOnlyNew ? p.isNew : true;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      
      return matchesDept && matchesSearch && matchesFeatured && matchesNew && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return a.isNew ? -1 : 1;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // Default: Popular
    });
  }, [selectedDept, searchQuery, sortBy, showOnlyFeatured, showOnlyNew, priceRange, products]);

  const handleDeptSelect = (deptId: string | null) => {
    setSelectedDept(deptId);
    onCategoryChange(deptId);
  };

  const clearAllFilters = () => {
    setSelectedDept(null);
    setShowOnlyFeatured(false);
    setShowOnlyNew(false);
    onCategoryChange(null);
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={selectedDept ? `${categories.find(c => c.id === selectedDept)?.name} | Collection NEXUS` : "Catalogue Complet | NEXUS PRODUCTS"} 
      />
      {/* Shop Header */}
      <div className="bg-gray-50 border-b border-gray-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4 text-gray-500">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Curated Collections</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-none mb-6">
                Product <span className="text-gray-400 font-medium italic">Catalog</span>
              </h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-lg">
                Discover our latest arrivals and timeless classics, curated for the modern minimalist.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-blue-600'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-blue-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <div className="w-px h-6 bg-gray-100 mx-2 hidden sm:block"></div>
              <div className="relative flex items-center gap-2 pr-4">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[11px] font-bold uppercase tracking-wider text-gray-700 outline-none cursor-pointer appearance-none"
                >
                  <option value="popular">Popularity</option>
                  <option value="newest">Newest Arrival</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-32 space-y-10">
              {/* Active & Clear Filters */}
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </h3>
                {(selectedDept || searchQuery || showOnlyFeatured || showOnlyNew) && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-[10px] font-bold text-red-600 uppercase tracking-widest hover:text-red-700 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Active Filters Tokens */}
              {(selectedDept || searchQuery || showOnlyFeatured || showOnlyNew) && (
                <div className="flex flex-wrap gap-2">
                  {selectedDept && (
                    <button 
                      onClick={() => handleDeptSelect(null)}
                      className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-[9px] font-bold text-blue-700 border border-blue-100 hover:bg-blue-100 transition"
                    >
                      {categories.find(c => c.id === selectedDept)?.name} <X className="w-3 h-3" />
                    </button>
                  )}
                  {showOnlyFeatured && (
                    <button 
                      onClick={() => setShowOnlyFeatured(false)}
                      className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full text-[9px] font-bold text-amber-700 border border-amber-100 hover:bg-amber-100 transition"
                    >
                      Featured <X className="w-3 h-3" />
                    </button>
                  )}
                  {showOnlyNew && (
                    <button 
                      onClick={() => setShowOnlyNew(false)}
                      className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full text-[9px] font-bold text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition"
                    >
                      New Tools <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Categories</h3>
                <div className="space-y-1">
                  <button 
                    onClick={() => handleDeptSelect(null)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${selectedDept === null ? 'bg-black text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    All Collections
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => handleDeptSelect(cat.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${selectedDept === cat.id ? 'bg-black text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Price Range</h3>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-gray-400">0 MAD</span>
                    <span className="text-[10px] font-bold text-black uppercase tracking-widest">Up to {priceRange[1]} MAD</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Status</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                    className="flex items-center gap-3 w-full group cursor-pointer"
                  >
                    <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${showOnlyFeatured ? 'bg-amber-500 border-amber-500' : 'bg-white border-gray-200 group-hover:border-amber-500'}`}>
                      {showOnlyFeatured && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-xs font-bold transition-colors ${showOnlyFeatured ? 'text-amber-600' : 'text-gray-600 group-hover:text-amber-600'}`}>
                      Featured Selection
                    </span>
                  </button>
                  <button 
                    onClick={() => setShowOnlyNew(!showOnlyNew)}
                    className="flex items-center gap-3 w-full group cursor-pointer"
                  >
                    <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${showOnlyNew ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-200 group-hover:border-emerald-500'}`}>
                      {showOnlyNew && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-xs font-bold transition-colors ${showOnlyNew ? 'text-emerald-600' : 'text-gray-600 group-hover:text-emerald-600'}`}>
                      New Integrations
                    </span>
                  </button>
                </div>
              </div>

              {/* Promo Widget */}
              <div className="p-8 bg-blue-600 rounded-3xl text-white relative overflow-hidden group shadow-xl shadow-blue-500/20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 text-center">
                  <h4 className="text-lg font-bold mb-2">Join Nexus Alpha</h4>
                  <p className="text-[10px] font-medium text-blue-100 uppercase tracking-widest mb-6 leading-tight italic">Get first access to beta tools</p>
                  <button className="w-full py-3 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-50 transition shadow-xl">Join Free</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                Showing <span className="text-gray-900">{filteredProducts.length}</span> Results
              </p>
            </div>

            {filteredProducts.length === 0 ? (
               <div className="py-24 text-center bg-gray-50 rounded-[48px] border border-gray-100">
                  <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                  <p className="text-gray-500 max-w-sm mx-auto font-medium">We couldn't find any products matching your criteria. Try adjusting your filters.</p>
                  <button 
                    onClick={clearAllFilters}
                    className="mt-8 px-10 py-4 bg-black text-white font-bold rounded-2xl text-sm hover:bg-gray-800 transition shadow-xl"
                  >
                    Reset All Filters
                  </button>
               </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" 
                : "flex flex-col gap-4"
              }>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => onProductClick(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
