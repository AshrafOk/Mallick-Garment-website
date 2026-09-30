import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeInfo';
import {
  X,
  Trash2,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartCount,
    setSelectedProduct,
  } = useShop();

  const [selectedOutlet, setSelectedOutlet] = useState<'siwandih' | 'sector4' | 'delivery'>('siwandih');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let itemsSummary = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}*\n   Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}\n   Fit: ${item.product.fit} (SKU: ${item.product.sku})`
      )
      .join('\n\n');

    let outletChoice =
      selectedOutlet === 'siwandih'
        ? 'Siwandih Main Road Outlet (Opposite Bank of India)'
        : selectedOutlet === 'sector4'
        ? 'Harshvardhan Plaza Outlet (Sector 4)'
        : 'Home Delivery in Bokaro Steel City';

    const message = encodeURIComponent(
      `Hello Mallick Garments Bokaro! 👋\nI would like to check availability and reserve the following garments for fitting/trial:\n\n${itemsSummary}\n\n*Preferred Outlet:* ${outletChoice}${customerName ? `\n*Customer Name:* ${customerName}` : ''}${customerPhone ? `\n*Phone:* ${customerPhone}` : ''}\n\nPlease confirm if these sizes are ready for trial!`
    );

    window.open(`https://wa.me/${STORE_INFO.whatsappRaw}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d11] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="font-editorial text-2xl tracking-wide text-white">
                FITTING & SELECTION LIST
              </h2>
              <span className="text-xs text-zinc-400 font-mono">({cartCount})</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm text-zinc-400 font-medium">Your shopping bag is empty</p>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                  Explore our premium shirts, baggy denim, oversized graphic tees, and luxury trousers.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#c5a028] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-zinc-500 pb-1">
                  <span>Selected Garments</span>
                  <button
                    onClick={clearCart}
                    className="hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-zinc-950/70 border border-white/5 rounded-xl flex gap-3.5 group hover:border-white/15 transition-all"
                  >
                    <div
                      onClick={() => {
                        setSelectedProduct(item.product);
                        setIsCartOpen(false);
                      }}
                      className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={item.product.images.front}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setSelectedProduct(item.product);
                              setIsCartOpen(false);
                            }}
                            className="text-xs font-semibold text-white hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                          <span>Size: <strong className="text-zinc-200">{item.size}</strong></span>
                          <span>·</span>
                          <span>Color: <strong className="text-zinc-200">{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                        <div className="flex items-center bg-zinc-900 border border-white/10 rounded">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-[11px] font-bold text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-[#d4af37]">
                          {item.product.fit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Outlet Preference Choice */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 block font-medium">
                    Order Pickup / Delivery Location:
                  </span>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <label
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                        selectedOutlet === 'siwandih'
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                          : 'border-white/10 bg-zinc-950 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="outlet"
                          checked={selectedOutlet === 'siwandih'}
                          onChange={() => setSelectedOutlet('siwandih')}
                          className="accent-[#d4af37]"
                        />
                        <span>Siwandih Main Road Outlet</span>
                      </div>
                      <span className="text-[10px] text-[#d4af37]">Opp. BOI</span>
                    </label>

                    <label
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                        selectedOutlet === 'sector4'
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                          : 'border-white/10 bg-zinc-950 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="outlet"
                          checked={selectedOutlet === 'sector4'}
                          onChange={() => setSelectedOutlet('sector4')}
                          className="accent-[#d4af37]"
                        />
                        <span>Sector 4 (Harshvardhan Plaza)</span>
                      </div>
                      <span className="text-[10px] text-[#d4af37]">1st Floor</span>
                    </label>

                    <label
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                        selectedOutlet === 'delivery'
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                          : 'border-white/10 bg-zinc-950 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="outlet"
                          checked={selectedOutlet === 'delivery'}
                          onChange={() => setSelectedOutlet('delivery')}
                          className="accent-[#d4af37]"
                        />
                        <span>Home Delivery (Bokaro City)</span>
                      </div>
                      <span className="text-[10px] text-emerald-400">Fast Local</span>
                    </label>
                  </div>
                </div>

                {/* Optional Customer Contact */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-zinc-950 border border-white/10 rounded-lg p-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile / WhatsApp"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="bg-zinc-950 border border-white/10 rounded-lg p-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Reservation & In-Store Trial */}
          {cart.length > 0 && (
            <div className="p-6 bg-zinc-950 border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Selected Garments</span>
                  <span className="text-white font-semibold">
                    {cartCount} items
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>In-Store Alterations</span>
                  <span className="text-[#d4af37] font-medium">Complimentary</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
                  <span>Private Fitting Suite</span>
                  <span className="text-emerald-400 font-medium">Included</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reserve Selected Fits Via WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Immediate Confirmation with Bokaro Store Manager</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
