import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Hero } from './components/home/Hero';
import { FeaturedCategories } from './components/home/FeaturedCategories';
import { PopularProducts } from './components/home/PopularProducts';
import { FlashOffer } from './components/home/FlashOffer';
import { TrustSection } from './components/home/TrustSection';
import { Newsletter } from './components/home/Newsletter';
import { LimitedCollection } from './components/home/LimitedCollection';
import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import { UserProfile } from './components/profile/UserProfile';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Shop } from './components/shop/Shop';
import { Auth } from './components/auth/Auth';
import { PromotionsPage } from './components/promotions/PromotionsPage';
import { TrustBadges } from './components/common/TrustBadges';
import { Footer } from './components/layout/Footer';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/cart/CheckoutPage';
import { ChatWidget } from './components/support/ChatWidget';
import { SupportDashboard } from './components/admin/SupportDashboard';
import { Product } from './types';
import { products } from './data/mockData';
import { ProductDetails } from './components/product/ProductDetails';
import { NotificationProvider, useNotifications } from './context/NotificationContext';

export default function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeDatabase } from './services/dbInit';
import { collection, onSnapshot, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile as UserProfileType } from './types';

function AppContent() {
  const { showNotification } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'profile' | 'shop' | 'promotions' | 'admin' | 'admin-support' | 'login' | 'signup' | 'cart' | 'checkout'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [dbProducts, setDbProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    initializeDatabase();

    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as any);
      if (items.length > 0) {
        setDbProducts(items);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });

    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const profileRef = doc(db, 'users', currentUser.uid);
        
        try {
          const profileSnap = await getDoc(profileRef);
          if (!profileSnap.exists()) {
            const newProfile: UserProfileType = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Nexus Member',
              role: 'user',
              createdAt: serverTimestamp()
            };
            await setDoc(profileRef, newProfile);
          }

          unsubscribeProfile = onSnapshot(profileRef, (snap) => {
            if (snap.exists()) {
              setUserProfile(snap.data() as UserProfileType);
            }
          }, (error) => {
            handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
          });

        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
        }

      } else {
        setUserProfile(null);
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
      }
    });

    return () => {
      unsubscribeProducts();
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const handleAuthSuccess = () => {
    showNotification('success', 'Bienvenue', 'Vous vous êtes connecté avec succès à NEXUS PRODUCTS.');
    setCurrentPage('home');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification('info', 'Déconnexion', 'Vous avez été déconnecté.');
      setCurrentPage('home');
    } catch (err: any) {
      showNotification('warning', 'Erreur', err.message);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && currentPage !== 'shop') {
      setCurrentPage('shop');
    }
  };

  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategory(categoryId === 'all' ? null : categoryId);
    setSelectedProduct(null);
    if (currentPage !== 'shop') {
      setCurrentPage('shop');
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-black selection:text-white">
        <AnnouncementBar onAction={() => setCurrentPage('promotions')} />
        <Navbar 
          onCartClick={() => {
            setCurrentPage('cart');
            setSelectedProduct(null);
          }} 
          onPageChange={(page) => {
            setCurrentPage(page as any);
            setSelectedProduct(null);
          }}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />

        <main className="flex-grow">
          {currentPage === 'cart' ? (
            <CartPage 
              onBack={() => setCurrentPage('shop')} 
              onCheckout={() => setCurrentPage('checkout')} 
            />
          ) : currentPage === 'checkout' ? (
            <CheckoutPage 
              onBack={() => setCurrentPage('cart')} 
              onOrderComplete={() => setCurrentPage('home')} 
            />
          ) : selectedProduct ? (
            <ProductDetails 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)} 
              onProductClick={handleProductSelect}
              relatedProducts={dbProducts.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
            />
          ) : currentPage === 'home' ? (
            <>
              <Hero onShopNow={() => setCurrentPage('shop')} />
              <TrustBadges />
              <FeaturedCategories onCategoryClick={handleCategorySelection} />
              <PopularProducts 
                products={dbProducts} 
                onVisitCatalog={() => setCurrentPage('shop')} 
                onProductClick={handleProductSelect}
              />
              <FlashOffer onShopNow={() => setCurrentPage('shop')} />
              <LimitedCollection 
                onProductClick={(p) => setSelectedProduct(p)} 
                onShopNow={() => setCurrentPage('shop')} 
              />
              <TrustSection />
              <Newsletter />
            </>
          ) : currentPage === 'about' ? (
            <About />
          ) : currentPage === 'contact' ? (
            <Contact />
          ) : currentPage === 'shop' ? (
            <Shop 
              initialCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory}
              onProductClick={handleProductSelect}
              searchQuery={searchQuery}
              products={dbProducts}
            />
          ) : currentPage === 'profile' ? (
            <UserProfile 
              userProfile={userProfile}
              onAdminClick={() => setCurrentPage('admin')} 
              onAdminSupportClick={() => setCurrentPage('admin-support')}
              onLogout={handleLogout}
            />
          ) : currentPage === 'admin' ? (
            <AdminDashboard />
          ) : currentPage === 'admin-support' ? (
            <SupportDashboard />
          ) : currentPage === 'login' ? (
            <Auth 
              mode="login" 
              onSwitchMode={(mode) => setCurrentPage(mode as any)} 
              onSuccess={handleAuthSuccess}
              onBack={() => setCurrentPage('home')}
            />
          ) : currentPage === 'signup' ? (
            <Auth 
              mode="signup" 
              onSwitchMode={(mode) => setCurrentPage(mode as any)} 
              onSuccess={handleAuthSuccess}
              onBack={() => setCurrentPage('home')}
            />
          ) : currentPage === 'promotions' ? (
            <PromotionsPage onShopNow={() => setCurrentPage('shop')} />
          ) : null}
        </main>

        <Footer onPageChange={setCurrentPage} />
        <ChatWidget />
      </div>
  );
}
