import React, { useState } from 'react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, toggleWishlist, isWishlisted, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const displayImage = isHovered && product.images.side ? product.images.side : product.images.front;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes[0] || 'M';
    const defaultColor = product.colorVariants[0]?.name || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-zinc-900/40 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
    >
      {/* Visual Asset Container (65-75% height) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
        {!imgError ? (
          <img
            src={displayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
            <span className="font-editorial text-xl text-zinc-600 tracking-wider">
              MALLICK GARMENTS
            </span>
            <span className="text-xs text-zinc-400 mt-2 font-medium">{product.name}</span>
          </div>
        )}

        {/* Subtle Dark Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges / Indicators: Quiet inline text */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#d4af37] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded">
              New Drop
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded">
              Bokaro Favorite
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20'
              : 'bg-black/50 text-white hover:bg-black/80 hover:text-[#d4af37]'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 py-2.5 bg-zinc-950/90 backdrop-blur-md hover:bg-white hover:text-black text-white text-xs font-medium tracking-wider uppercase transition-colors rounded-lg flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            aria-label="Quick add to bag"
            className="p-2.5 bg-[#d4af37] hover:bg-[#c5a028] text-black rounded-lg transition-colors"
            title="Quick Add"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-zinc-950/40">
        <div>
          {/* Metadata Line: Zero-Pill discipline */}
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium tracking-wider uppercase">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-[#d4af37]">{product.fit}</span>
          </div>

          <h3 className="text-sm font-semibold text-zinc-100 mt-1 line-clamp-1 group-hover:text-[#d4af37] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Size Availability & Variants Baseline (No price) */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
            <span className="text-[#d4af37]">Sizes:</span>
            <span>
              {product.parentCategory === 'shirts' || product.parentCategory === 'tshirts'
                ? 'S to 4XL'
                : '28 to 48'}
            </span>
          </div>

          {/* Color swatch dots preview */}
          <div className="flex items-center -space-x-1">
            {product.colorVariants.slice(0, 3).map((col) => (
              <span
                key={col.name}
                title={col.name}
                className="w-3 h-3 rounded-full border border-zinc-950 shadow-sm inline-block"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.colorVariants.length > 3 && (
              <span className="text-[10px] text-zinc-500 pl-1.5">
                +{product.colorVariants.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
