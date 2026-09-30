import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d11] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="font-editorial text-2xl tracking-wide text-white">
                SAVED FAVORITES
              </h2>
              <span className="text-xs text-zinc-400 font-mono">({wishlistedProducts.length})</span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-zinc-600">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="text-sm text-zinc-400 font-medium">No saved garments yet</p>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                  Click the heart icon on any product card to create your personal wardrobe wishlist.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 bg-zinc-950/70 border border-white/5 rounded-xl flex gap-3.5 group hover:border-white/15 transition-all"
                >
                  <div
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images.front}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-medium">
                          {product.fit}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-semibold text-white hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                      >
                        {product.name}
                      </h4>

                      <p className="text-[11px] text-zinc-400 mt-1">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(
                            product,
                            product.availableSizes[0] || 'M',
                            product.colorVariants[0]?.name || 'Standard',
                            1
                          );
                        }}
                        className="flex-1 py-1.5 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-[11px] rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Selection</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
