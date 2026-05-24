import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Menu, X, ShoppingCart, Sparkles } from 'lucide-react';
import { products } from '../../data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';

export const Navbar = ({ 
  onCartClick, 
  onPageChange, 
  onSearch, 
  searchQuery, 
}: { 
  onCartClick: () => void, 
  onPageChange: (page: 'home' | 'shop' | 'about' | 'contact' | 'profile' | 'cart' | 'promotions') => void,
  onSearch: (query: string) => void,
  searchQuery: string,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const { totalItems } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = products.filter(p => 
    searchQuery && (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchBox(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav id="main-navigation" className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div id="main-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-4 sm:gap-8">
          {/* Logo */}
          <button 
            id="nav-logo"
            onClick={() => onPageChange('home')}
            className="flex-shrink-0 flex items-center gap-2.5"
            aria-label="Nexus Home"
          >
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-gray-900">NEXUS</span>
          </button>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => onPageChange('home')} className="text-sm font-semibold text-gray-600 hover:text-black transition-colors" aria-label="Navigate to Home">Accueil</button>
            <button onClick={() => onPageChange('shop')} className="text-sm font-semibold text-gray-600 hover:text-black transition-colors" aria-label="Navigate to Shop">Boutique</button>
            <button onClick={() => onPageChange('promotions')} className="text-sm font-semibold text-gray-600 hover:text-black transition-colors" aria-label="Browse Categories">Catégories</button>
            <button onClick={() => onPageChange('about')} className="text-sm font-semibold text-gray-600 hover:text-black transition-colors" aria-label="Learn About Us">À Propos</button>
            <button onClick={() => onPageChange('contact')} className="text-sm font-semibold text-gray-600 hover:text-black transition-colors" aria-label="Contact Us">Contact</button>
          </div>

          {/* Search Bar */}
          <div id="nav-search-container" className="flex-1 max-w-md hidden md:block" ref={searchRef}>
            <div className="relative">
              <input
                id="nav-search-input"
                type="text"
                value={searchQuery}
                onFocus={() => setShowSearchBox(true)}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Rechercher des produits..."
                aria-label="Search items"
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-5 pr-12 focus:ring-1 focus:ring-black focus:bg-white transition-all text-sm outline-none"
              />
              <button 
                id="nav-search-submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                aria-label="Submit Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showSearchBox && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
                  >
                    <div className="space-y-2">
                      {searchResults.length > 0 ? (
                        searchResults.map(p => (
                          <button 
                            key={p.id}
                            onClick={() => {
                              onSearch(p.name);
                              setShowSearchBox(false);
                              onPageChange('shop');
                            }}
                            className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                            aria-label={`Search for ${p.name}`}
                          >
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" loading="lazy" />
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900">{p.name}</p>
                              <p className="text-[10px] text-gray-400 uppercase">{p.category}</p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 p-2">Aucun résultat trouvé</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => onPageChange('profile')}
              className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-50"
              aria-label="Account Profile"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-50 relative"
              aria-label={`Shopping Cart, ${totalItems} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-full"
              aria-label="Toggle Mobile Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => { onPageChange('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-base font-semibold text-gray-900">Accueil</button>
              <button onClick={() => { onPageChange('shop'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-base font-semibold text-gray-900">Boutique</button>
              <button onClick={() => { onPageChange('promotions'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-base font-semibold text-gray-900">Catégories</button>
              <button onClick={() => { onPageChange('about'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-base font-semibold text-gray-900">À Propos</button>
              <button onClick={() => { onPageChange('contact'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-base font-semibold text-gray-900">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
