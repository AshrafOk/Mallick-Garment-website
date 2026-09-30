/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FitGuideModal } from './components/FitGuideModal';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Check } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activePage, selectedProduct, setSelectedProduct, toastMessage } = useShop();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-top-3 fade-in duration-300">
          <div className="px-4 py-2.5 bg-zinc-900 border border-[#d4af37]/40 shadow-2xl rounded-xl flex items-center gap-2.5 text-xs text-white">
            <span className="w-5 h-5 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-bold">
              <Check className="w-3 h-3" />
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <Navbar />

      {/* Main Body View */}
      <main className="flex-grow">{renderPage()}</main>

      {/* Luxury Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Cart & Checkout Drawer */}
      <CartDrawer />

      {/* Wishlist Drawer */}
      <WishlistDrawer />

      {/* Interactive Fit & Measurement Guide */}
      <FitGuideModal />

      {/* Predictive Instant Search Modal */}
      <SearchModal />

      {/* Floating Concierge Action */}
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
