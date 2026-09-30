import React, { useState } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeInfo';
import {
  X,
  Heart,
  Share2,
  MessageCircle,
  ShoppingBag,
  Ruler,
  Check,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  ZoomIn,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, toggleWishlist, isWishlisted, setSelectedProduct, setIsFitGuideOpen, showToast } =
    useShop();

  const [activeAngle, setActiveAngle] = useState<'front' | 'back' | 'side' | 'zoom'>('front');
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colorVariants[0]?.name || 'Default');
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const wishlisted = isWishlisted(product.id);

  const relatedProducts = PRODUCTS.filter(
    (p) => (p.category === product.category || p.fit === product.fit) && p.id !== product.id
  ).slice(0, 4);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${product.name} at Mallick Garments Bokaro Steel City: ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | Mallick Garments`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(`${product.name} at Mallick Garments Bokaro: ${shareUrl}`);
      showToast('Product link copied to clipboard');
    } catch {
      showToast('Product link ready to share');
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Mallick Garments Bokaro! 👋\nI am interested in:\n\n*Product:* ${product.name}\n*SKU:* ${product.sku}\n*Selected Size:* ${selectedSize}\n*Color:* ${selectedColor}\n\nIs this currently in stock at the Siwandih or Sector 4 outlet?`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const currentImage = product.images[activeAngle] || product.images.front;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl min-h-screen md:min-h-0 bg-[#0d0d11] md:rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-white text-zinc-300 hover:text-black transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow">
          {/* LEFT: Multi-Angle Interactive Gallery (7 cols) */}
          <div className="lg:col-span-7 p-4 md:p-8 bg-zinc-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Main Stage Image */}
            <div
              className={`relative aspect-[3/4] w-full max-h-[580px] rounded-xl overflow-hidden bg-black flex items-center justify-center group ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={currentImage}
                alt={`${product.name} - ${activeAngle} view`}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                  isZoomed ? 'scale-150' : 'group-hover:scale-105'
                }`}
              />

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[11px] text-zinc-300 flex items-center gap-1.5 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="capitalize">{activeAngle} View</span>
                <span className="text-zinc-500">· Click to {isZoomed ? 'reset' : 'zoom'}</span>
              </div>
            </div>

            {/* Thumbnail Angle Selectors: Front, Back, Side, Zoom */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {(['front', 'back', 'side', 'zoom'] as const).map((angle) => (
                <button
                  key={angle}
                  onClick={() => {
                    setActiveAngle(angle);
                    setIsZoomed(false);
                  }}
                  className={`relative aspect-[3/4] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    activeAngle === angle
                      ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.images[angle] || product.images.front}
                    alt={`${product.name} thumbnail ${angle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 inset-x-1 text-[9px] uppercase tracking-wider text-center bg-black/75 py-0.5 text-zinc-200">
                    {angle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div className="space-y-6">
              {/* Category & Fit Header */}
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d4af37] font-semibold">{product.fit}</span>
                    <span>·</span>
                    <span>{product.category}</span>
                  </div>
                  <span className="text-zinc-500 font-mono text-[11px]">SKU: {product.sku}</span>
                </div>

                <h1 className="font-editorial text-2xl md:text-3xl tracking-wide text-white mt-1.5 leading-tight">
                  {product.name}
                </h1>

                {/* Stock & Fitting Assurance Baseline (No price) */}
                <div className="flex flex-wrap items-center gap-2.5 mt-3">
                  <span className="text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
                    Bokaro Flagship Collection
                  </span>
                  <span className="text-xs text-zinc-400">
                    Complimentary In-Store Fitting & Alterations
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-400 uppercase tracking-wider">Color Variant:</span>
                  <span className="text-white font-medium">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colorVariants.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor === col.name
                          ? 'border-[#d4af37] scale-110 shadow-md shadow-[#d4af37]/20'
                          : 'border-white/20 hover:border-white/60'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor === col.name && (
                        <Check
                          className={`w-4 h-4 ${
                            col.hex === '#FFFFFF' || col.hex === '#FAFAFA' || col.hex === '#F0F0F0'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-400 uppercase tracking-wider">Select Size:</span>
                  <button
                    onClick={() => setIsFitGuideOpen(true)}
                    className="text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Fit Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-semibold tracking-wider rounded-lg border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#d4af37] text-black border-[#d4af37]'
                          : 'bg-zinc-900/80 text-zinc-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {product.modelSpecs && (
                  <p className="text-[11px] text-zinc-500 mt-2 italic">{product.modelSpecs}</p>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-zinc-400">Quantity:</span>
                <div className="flex items-center bg-zinc-900 border border-white/10 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#d4af37]/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Wardrobe & Fitting Selection</span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp In-Store Availability Check</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`py-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      wishlisted
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-400'
                        : 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-400' : ''}`} />
                    <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Product</span>
                  </button>
                </div>
              </div>

              {/* Fabric Description & Wash Care Specifications */}
              <div className="pt-4 border-t border-white/10 space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider mb-1">
                    Fabric & Material
                  </h4>
                  <p className="text-zinc-400 leading-relaxed">{product.fabric}</p>
                  {product.gsm && (
                    <span className="inline-block mt-1 text-[11px] text-[#d4af37] font-medium">
                      Weight Specification: {product.gsm}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider mb-1">
                    Silhouette & Design
                  </h4>
                  <p className="text-zinc-400 leading-relaxed">{product.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider mb-1">
                    Wash Care Instructions
                  </h4>
                  <ul className="list-disc list-inside text-zinc-400 space-y-0.5">
                    {product.washCare.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
                  Pairs Well With / Similar Fits
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        setSelectedProduct(rel);
                        setActiveAngle('front');
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-[#d4af37] transition-colors">
                        <img
                          src={rel.images.front}
                          alt={rel.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-300 font-medium truncate mt-1">
                        {rel.name}
                      </p>
                      <p className="text-[10px] text-[#d4af37] font-medium">{rel.fit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
