import React, { useState } from 'react';
import { useShop, PageId } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeInfo';
import { Logo } from './Logo';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  MapPin,
  Ruler,
  Instagram,
  Youtube,
  Phone,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsFitGuideOpen,
    activePage,
    setActivePage,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topBannerVisible, setTopBannerVisible] = useState(true);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Collection', page: 'shop' },
    { label: 'Fits & Styles', page: 'shop' },
    { label: 'Lookbook', page: 'gallery' },
    { label: 'Brand Story', page: 'about' },
    { label: 'Outlets & Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Top Luxury Announcement Bar */}
      {topBannerVisible && (
        <div className="bg-zinc-950 border-b border-white/5 text-[11px] uppercase tracking-widest text-zinc-400 py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
              <span className="font-medium text-zinc-300">
                Bokaro Flagship Menswear · 2 Outlets (Siwandih & Sector 4)
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-zinc-400">
              <button
                onClick={() => setIsFitGuideOpen(true)}
                className="hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Ruler className="w-3 h-3 text-[#d4af37]" />
                <span>Fit & Size Guide</span>
              </button>
              <span className="text-zinc-700">|</span>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d4af37] transition-colors flex items-center gap-1"
              >
                <Instagram className="w-3 h-3 text-[#d4af37]" />
                <span>Instagram</span>
              </a>
              <span className="text-zinc-700">|</span>
              <a
                href={STORE_INFO.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d4af37] transition-colors flex items-center gap-1"
              >
                <Youtube className="w-3 h-3 text-red-500" />
                <span>YouTube</span>
              </a>
            </div>
            <button
              onClick={() => setTopBannerVisible(false)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors ml-2"
              aria-label="Close notification"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Top Bar Contract: 3 zones */}
      <div className="bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto h-20 md:h-24 flex items-center justify-between gap-4">
          {/* Zone 1: Official MG Logo & Wordmark - Large and Prominent */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none flex-shrink-0"
            aria-label="Mallick Garments Home"
          >
            <Logo size="md" showText={true} />
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider uppercase text-zinc-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-white py-1 relative ${
                activePage === 'home' ? 'text-[#d4af37]' : 'text-zinc-400'
              }`}
            >
              Home
              {activePage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page)}
                className={`transition-colors hover:text-white py-1 relative ${
                  activePage === link.page ? 'text-[#d4af37]' : 'text-zinc-400'
                }`}
              >
                {link.label}
                {activePage === link.page && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Functional interactive affordances */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              aria-label="Search clothing"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors relative cursor-pointer"
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors relative cursor-pointer"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-zinc-950/98 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between border-t border-white/10 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            <div className="pb-4 border-b border-white/10">
              <Logo size="md" showText={true} />
            </div>
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left text-xl font-display uppercase tracking-wider ${
                activePage === 'home' ? 'text-[#d4af37]' : 'text-zinc-300'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page)}
                className={`text-left text-xl font-display uppercase tracking-wider ${
                  activePage === link.page ? 'text-[#d4af37]' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsFitGuideOpen(true);
                }}
                className="flex items-center gap-3 text-sm text-zinc-300 hover:text-[#d4af37]"
              >
                <Ruler className="w-4 h-4 text-[#d4af37]" />
                <span>Interactive Fit & Size Guide</span>
              </button>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-300 hover:text-[#d4af37]"
              >
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Locate Outlets on Google Maps</span>
              </a>
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="flex items-center gap-3 text-sm text-zinc-300 hover:text-[#d4af37]"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>Call Store: {STORE_INFO.phone}</span>
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-zinc-500 text-xs">
            <span>Mallick Garments · Bokaro</span>
            <div className="flex items-center gap-4">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                Instagram
              </a>
              <a
                href={STORE_INFO.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
