import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Youtube,
  ExternalLink,
  ShieldCheck,
  Scissors,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    navigateToShopWithFilter,
    setActivePage,
    isAdminLoggedIn,
    setIsAdminLoginModalOpen,
  } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterStatus('Welcome to the Mallick Garments Private Members Club. Lookbook updates will be delivered to your inbox.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#070709] border-t border-white/10 text-zinc-400 pt-16 pb-12">
      {/* Brand Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-zinc-950/60 border border-white/5 rounded-2xl backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#d4af37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Finest Fabrics Only</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Superfine Egyptian cottons, selvedge ring-spun denim, and durable tactical ripstops.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#d4af37]">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">On-Spot Alterations</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Complimentary master tailor alterations and cuffing at both Bokaro outlets.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#d4af37]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">2 Flagship Outlets</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Prime locations at Siwandih Main Road and Sector 4 Harshvardhan Plaza.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#d4af37]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">WhatsApp Concierge</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Real-time stock checking, size holds, and personalized styling assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Outlets */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/5">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-5">
          <Logo size="lg" showText={true} />
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            Bokaro Steel City’s benchmark for modern menswear. Bridging the gap between runway aesthetics, streetwear culture, and impeccable everyday luxury.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={STORE_INFO.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-red-500 hover:bg-red-500/10 transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsappRaw}?text=Hello%20Mallick%20Garments,%20I%20would%20like%20to%20inquire%20about%20your%20collection`}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
              aria-label="Google Maps"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-4">
            <h5 className="text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-2">
              Join The Private Members Club
            </h5>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-zinc-900 border border-white/10 rounded-l-lg px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] flex-grow"
              />
              <button
                type="submit"
                className="bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs px-4 py-2.5 rounded-r-lg transition-colors flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {newsletterStatus && (
              <p className="text-xs text-[#d4af37] mt-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {newsletterStatus}
              </p>
            )}
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-semibold uppercase tracking-widest">
            Key Collections
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => navigateToShopWithFilter({ category: 'Formal Shirts' })}
                className="hover:text-white transition-colors"
              >
                Formal & Oxford Shirts
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToShopWithFilter({ fit: 'Baggy Fit' })}
                className="hover:text-white transition-colors"
              >
                Baggy Jeans & Streetwear
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToShopWithFilter({ fit: 'Oversized Fit' })}
                className="hover:text-white transition-colors"
              >
                Oversized Heavyweight Tees
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToShopWithFilter({ category: 'Straight Fit Jeans' })}
                className="hover:text-white transition-colors"
              >
                Raw Selvedge Straight Jeans
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToShopWithFilter({ category: 'Chinos' })}
                className="hover:text-white transition-colors"
              >
                Smart Chinos & Trousers
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToShopWithFilter({ category: 'Cargo Track Pants' })}
                className="hover:text-white transition-colors"
              >
                Tactical Cargo Track Pants
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToShopWithFilter({ category: 'Party Wear Shirts' })}
                className="hover:text-white transition-colors"
              >
                Lustre Party Wear Shirts
              </button>
            </li>
          </ul>
        </div>

        {/* Outlet 1 Siwandih Details */}
        <div className="space-y-3">
          <div className="inline-block text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold border-b border-[#d4af37]/30 pb-0.5">
            Outlet 1 (Flagship)
          </div>
          <h5 className="text-white text-sm font-medium">Siwandih Main Road</h5>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Opposite Bank of India,
            <br />
            Bokaro Steel City, Jharkhand 827010
          </p>
          <div className="pt-1 text-xs space-y-1.5">
            <p className="text-zinc-500">
              Hours: <span className="text-zinc-300">10:30 AM – 9:30 PM</span>
            </p>
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#d4af37] hover:underline"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Outlet 2 Sector 4 Details */}
        <div className="space-y-3">
          <div className="inline-block text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold border-b border-[#d4af37]/30 pb-0.5">
            Outlet 2 (Sector 4)
          </div>
          <h5 className="text-white text-sm font-medium">Harshvardhan Plaza</h5>
          <p className="text-xs text-zinc-400 leading-relaxed">
            1st Floor, Harshvardhan Plaza,
            <br />
            Sector 4, Bokaro Steel City 827004
          </p>
          <div className="pt-1 text-xs space-y-1.5">
            <p className="text-zinc-500">
              Hours: <span className="text-zinc-300">11:00 AM – 10:00 PM</span>
            </p>
            <a
              href="tel:+919835122344"
              className="flex items-center gap-1.5 text-zinc-300 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>+91 98351 22344</span>
            </a>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#d4af37] hover:underline"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
        <div>
          © {new Date().getFullYear()} Mallick Garments Bokaro. All rights reserved. Designed for Style, Comfort, and Confidence.
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              setActivePage('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-zinc-400 transition-colors"
          >
            Brand Heritage
          </button>
          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-zinc-400 transition-colors"
          >
            Store Locator
          </button>
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-400 transition-colors"
          >
            Instagram Lookbook
          </a>
          <button
            onClick={() => setIsAdminLoginModalOpen(true)}
            className="text-zinc-500 hover:text-[#d4af37] transition-colors flex items-center gap-1 font-mono text-[11px] cursor-pointer"
            title="Administrator Portal: asharafalik1@gmail.com"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{isAdminLoggedIn ? 'Admin Active' : 'Admin Portal'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
