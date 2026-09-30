import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES_LIST } from '../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    products,
    isSearchOpen,
    setIsSearchOpen,
    setSelectedProduct,
    navigateToShopWithFilter,
  } = useShop();

  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = term.trim()
    ? products.filter((p) => {
        const query = term.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.fit.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
        );
      }).slice(0, 6)
    : [];

  const popularSearches = [
    'Baggy Jeans',
    'Oversized T-Shirts',
    'Formal Shirts',
    'Chinos',
    'Cargo Track Pants',
    'Party Wear Shirts',
    'Polo T-Shirts',
    'Straight Fit Jeans',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-16 md:pt-24 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d0d11] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6">
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 pb-4">
          <Search className="w-5 h-5 text-[#d4af37] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search by category, fit, fabric, or keyword (e.g. Baggy, Formal, Supima)..."
            className="w-full bg-transparent text-white text-base md:text-lg placeholder-zinc-500 focus:outline-none pr-8"
          />
          {term && (
            <button
              onClick={() => setTerm('')}
              className="text-zinc-500 hover:text-white text-xs mr-8"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results or Suggestions */}
        <div className="mt-6">
          {term.trim() ? (
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                <span>Matching Products ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={() => {
                      navigateToShopWithFilter({ search: term });
                      setIsSearchOpen(false);
                    }}
                    className="text-[#d4af37] hover:underline flex items-center gap-1"
                  >
                    <span>View all in store</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No garments matching "{term}". Try searching "Jeans", "Oversized", "Formal", or "Cargo".
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsSearchOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-all flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-14 h-16 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                        <img
                          src={product.images.front}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-[#d4af37] uppercase font-semibold">
                          {product.fit} · {product.category}
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate mt-0.5 group-hover:text-[#d4af37] transition-colors">
                          {product.name}
                        </h4>
                        <div className="text-[11px] text-zinc-400 mt-1 truncate">
                          {product.fabric}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Trending Searches in Bokaro</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setTerm(keyword);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-[#d4af37] text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
