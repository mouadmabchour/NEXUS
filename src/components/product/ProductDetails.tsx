import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight, 
  Minus, 
  Plus,
  Check,
  Headset,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useNotifications } from '../../context/NotificationContext';
import { ProductCard } from './ProductCard';
import { TrustBadges } from '../common/TrustBadges';
import { SEO } from '../common/SEO';
import { formatPrice } from '../../lib/formatters';

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export const ProductDetails = ({ product, relatedProducts, onBack, onProductClick }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image);
  const [selectedSize, setSelectedSize] = useState(product.variants?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'shipping'>('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transformOrigin: '0% 0%' });

  const { addToCart } = useCart();
  const { showNotification } = useNotifications();

  // Create Product Schema for SEO
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image, ...(product.gallery || [])],
    "description": product.description,
    "sku": `NEXUS-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "NEXUS PRODUCTS"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Verified Buyer"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "MAD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockStatus === 'in-stock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(product.gallery?.[0] || product.image);
    setQuantity(1);
  }, [product]);

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    showNotification('success', 'Ajouté au Panier', `${product.name} a été ajouté à votre panier.`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showNotification(
      !isWishlisted ? 'success' : 'info', 
      !isWishlisted ? 'Ajouté aux Favoris' : 'Retiré des Favoris',
      `${product.name} a été ${!isWishlisted ? 'ajouté à' : 'retiré de'} votre liste de souhaits.`
    );
  };

  const stockColorClass = product.stockStatus === 'in-stock' 
    ? 'text-emerald-500' 
    : product.stockStatus === 'low-stock' 
    ? 'text-amber-500' 
    : 'text-rose-500';

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <SEO 
        title={`${product.name} | NEXUS PRODUCTS`} 
        description={`${product.name} au Maroc. Découvrez ce produit exclusif de notre collection streetwear premium avec livraison express.`} 
        image={product.image}
        type="product"
        schema={productSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12">
          <button onClick={onBack} className="hover:text-black transition-colors">Accueil</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={onBack} className="hover:text-black transition-colors">{product.category}</button>
          <ChevronRight className="w-3 h-3 text-gray-200" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          
          {/* Product Gallery */}
          <div className="space-y-6">
            <div 
              className="relative aspect-square rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 cursor-zoom-in group"
              onMouseMove={handleImageHover}
              onMouseLeave={() => setZoomStyle({ ...zoomStyle, display: 'none' })}
            >
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-150"
                style={{ transformOrigin: zoomStyle.transformOrigin }}
                loading="eager"
              />
              
              {product.discountBadge && (
                <div className="absolute top-8 left-8 bg-black text-white text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">
                  {product.discountBadge}
                </div>
              )}
            </div>

            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-5 gap-4">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-black scale-95' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <img src={img} alt={`${product.name} Gallery Image ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">{product.category}</span>
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-[10px] font-bold text-gray-500 ml-1">({product.reviews} avis)</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className={`text-[10px] font-bold uppercase tracking-widest ml-4 flex items-center gap-1.5 ${stockColorClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  {product.stockStatus === 'in-stock' ? 'En Stock' : product.stockStatus === 'low-stock' ? 'Stock Limité' : 'Rupture de Stock'}
                </span>
              </div>

              <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">
                {product.description}
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-8 mb-12">
              {product.variants?.colors && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-4">Couleur: {selectedColor}</h4>
                  <div className="flex gap-4">
                    {product.variants.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all p-1 group relative ${selectedColor === color.name ? 'border-black' : 'border-transparent'}`}
                      >
                        <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants?.sizes && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-4">Taille: {selectedSize}</h4>
                  <div className="flex gap-3">
                    {product.variants.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] h-12 rounded-xl text-xs font-bold transition-all border ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-4">Quantité</h4>
                  <div className="flex items-center p-1 bg-gray-50 border border-gray-100 rounded-2xl w-fit">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'out-of-stock'}
                className="flex-[2] h-16 bg-black text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10"
              >
                <ShoppingCart className="w-5 h-5" /> Ajouter au panier
              </button>
              <button 
                onClick={() => {
                  handleAddToCart();
                  onBack(); // Simulate going to checkout/back
                }}
                className="flex-1 h-16 bg-gray-50 text-black font-bold rounded-2xl text-sm flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition-all active:scale-95"
              >
                Acheter Maintenant
              </button>
              <button 
                onClick={handleWishlist}
                className={`w-16 h-16 flex items-center justify-center rounded-2xl border transition-all ${isWishlisted ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-white border-gray-100 text-gray-400 hover:text-black'}`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features/Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-gray-100">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 transition-colors group-hover:bg-black group-hover:text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Livraison Gratuite</h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Commandes +1500 MAD</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 transition-colors group-hover:bg-black group-hover:text-white">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Retours Faciles</h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Garantie 7 Jours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 transition-colors group-hover:bg-black group-hover:text-white">
                  <Headset className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Support 7j/7 Rapide</h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WhatsApp & Email</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 transition-colors group-hover:bg-black group-hover:text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Paiement Sécurisé</h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Paiement à la livraison</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 transition-colors group-hover:bg-black group-hover:text-white">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-black transition-colors"><Facebook className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <TrustBadges />
        </div>

        {/* Detailed Tabs */}
        <div className="mt-24">
          <div className="flex border-b border-gray-100 mb-12">
            {(['description', 'spécifications', 'avis', 'livraison'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab === 'spécifications' ? 'specifications' : tab === 'avis' ? 'reviews' : tab === 'livraison' ? 'shipping' : 'description')}
                className={`pb-6 text-xs font-bold uppercase tracking-[0.2em] transition-all relative mr-12 last:mr-0 ${activeTab === (tab === 'spécifications' ? 'specifications' : tab === 'avis' ? 'reviews' : tab === 'livraison' ? 'shipping' : 'description') ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                {tab}
                {activeTab === (tab === 'spécifications' ? 'specifications' : tab === 'avis' ? 'reviews' : tab === 'livraison' ? 'shipping' : 'description') && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
             <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-4xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">L'Histoire du Produit</h3>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
                      {product.fullDescription || product.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                       <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
                          <Check className="w-6 h-6 text-black mb-4" />
                          <h4 className="font-bold text-gray-900 mb-2">Sources Durables</h4>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">Nous croyons en une production éthique et utilisons uniquement les meilleurs matériaux de sources responsables.</p>
                       </div>
                       <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
                          <Check className="w-6 h-6 text-black mb-4" />
                          <h4 className="font-bold text-gray-900 mb-2">Conception Artisanale</h4>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">Chaque pièce subit un contrôle qualité rigoureux pour garantir qu'elle répond à nos standards d'élite.</p>
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'specifications' && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-2xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Détails Techniques</h3>
                    <div className="space-y-1">
                      {product.specifications ? Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex py-4 border-b border-gray-50 last:border-0">
                          <span className="w-1/3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{key}</span>
                          <span className="w-2/3 text-sm font-semibold text-gray-900">{value}</span>
                        </div>
                      )) : <p className="text-gray-500">Aucune spécification fournie.</p>}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="rev"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex flex-col md:flex-row gap-16">
                       <div className="md:w-1/3">
                          <div className="p-10 bg-gray-50 rounded-[40px] border border-gray-100 text-center">
                             <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Note Globale</h4>
                             <div className="text-6xl font-bold text-gray-900 mb-4">{product.rating.toFixed(1)}</div>
                             <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-4">
                               {[...Array(5)].map((_, i) => (
                                 <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                               ))}
                             </div>
                             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Basé sur {product.reviews} avis</p>
                          </div>
                       </div>
                       
                       <div className="md:w-2/3 space-y-12">
                          {[
                            { name: 'Sarah J.', initial: 'SJ', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', text: 'Qualité et style exceptionnels. A dépassé mes attentes !' },
                            { name: 'Marcus W.', initial: 'MW', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', text: 'Le souci du détail sur ce produit est remarquable. Très confortable pour un usage quotidien.' }
                          ].map((review, i) => (
                            <div key={review.name} className="space-y-4">
                               <div className="flex items-center gap-1.5 text-amber-500">
                                 {[...Array(5)].map((_, j) => (
                                   <Star key={j} className={`w-3 h-3 ${j < 5 ? 'fill-current' : 'text-gray-200'}`} />
                                 ))}
                               </div>
                               <h5 className="font-bold text-gray-900 italic text-lg leading-snug">"{review.text}"</h5>
                               <div className="flex items-center gap-3 pt-4">
                                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                     <img src={review.img} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{review.name}</span>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Acheteur Vérifié</span>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'shipping' && (
                  <motion.div
                    key="ship"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-2xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Livraison & Retours</h3>
                    <div className="space-y-8">
                       <div>
                          <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <Truck className="w-4 h-4" /> Livraison Standard
                          </h4>
                          <p className="text-sm text-gray-500 font-medium leading-relaxed">
                             Livraison partout au Maroc. Gratuite pour toutes les commandes supérieures à 1,500 MAD. Délai estimé : 24h à 72h ouvrables.
                          </p>
                       </div>
                       <div>
                          <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <Plus className="w-4 h-4" /> Livraison Express
                          </h4>
                          <p className="text-sm text-gray-500 font-medium leading-relaxed">
                             Livraison prioritaire sous 24h pour les commandes passées avant 14h. Tarif fixe de 100 MAD sur tout le Maroc.
                          </p>
                       </div>
                       <div>
                          <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <RotateCcw className="w-4 h-4" /> Politique de Retour
                          </h4>
                          <p className="text-sm text-gray-500 font-medium leading-relaxed">
                             Si vous n'êtes pas 100% satisfait de votre achat, vous pouvez le retourner sous 7 jours pour un remboursement complet ou un échange, à condition que le produit soit dans son état d'origine.
                          </p>
                       </div>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-32 pt-24 border-t border-gray-100">
          <div className="flex items-end justify-between mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-none mb-4">
                Complétez la <span className="text-gray-400 font-medium italic">Collection</span>
              </h2>
              <p className="text-gray-500 font-medium tracking-tight">
                Produits recommandés qui s'associent parfaitement avec {product.name}.
              </p>
            </div>
            <button onClick={onBack} className="hidden sm:flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">
              Voir le Catalogue
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onClick={() => onProductClick(p)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
