import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MessageCircle, X, MapPin, Sparkles, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${STORE_INFO.whatsappRaw}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#0d0d11] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-5 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h4 className="text-xs font-semibold text-white">Mallick Garments Concierge</h4>
                <p className="text-[10px] text-zinc-400">Bokaro Steel City · Online Now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-300 my-3 leading-relaxed">
            Namaste! How may our styling team assist you today?
          </p>

          <div className="space-y-2">
            <button
              onClick={() =>
                handleSend('Hello! I would like to check current in-store stock for baggy jeans & oversized shirts at your Bokaro outlets.')
              }
              className="w-full text-left p-2.5 rounded-lg bg-zinc-950 hover:bg-white/5 border border-white/5 hover:border-emerald-500/40 text-xs text-zinc-300 transition-colors"
            >
              🛍️ Inquire about Current Stock & Sizing
            </button>

            <button
              onClick={() =>
                handleSend('Hi! I want to visit the Sector 4 Harshvardhan Plaza outlet. Could you share directions and landmark details?')
              }
              className="w-full text-left p-2.5 rounded-lg bg-zinc-950 hover:bg-white/5 border border-white/5 hover:border-emerald-500/40 text-xs text-zinc-300 transition-colors"
            >
              📍 Store Location & Directions
            </button>

            <button
              onClick={() =>
                handleSend('Hello, do you offer customized fitting and length alteration for formal trousers at your Siwandih store?')
              }
              className="w-full text-left p-2.5 rounded-lg bg-zinc-950 hover:bg-white/5 border border-white/5 hover:border-emerald-500/40 text-xs text-zinc-300 transition-colors"
            >
              ✂️ Fitting & Custom Alteration Query
            </button>
          </div>

          {/* Custom Message Input */}
          <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customMsg.trim()) {
                  handleSend(customMsg);
                }
              }}
              className="flex-1 bg-zinc-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => customMsg.trim() && handleSend(customMsg)}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/80 transition-all hover:scale-105 cursor-pointer border border-emerald-400/30"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline-block">
          WhatsApp Store Concierge
        </span>
      </button>
    </div>
  );
};
