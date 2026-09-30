import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Flame, Plus, LogOut, Edit3 } from 'lucide-react';

export const AdminBar: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminEmail,
    logoutAdmin,
    openAddProductModal,
    setIsAdminLoginModalOpen,
  } = useShop();

  if (!isAdminLoggedIn) return null;

  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-[#d4af37]/40 px-4 py-2 text-xs sticky top-0 z-40 backdrop-blur-md shadow-md animate-in slide-in-from-top-2 duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Admin Status Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-center gap-1.5 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span className="font-semibold text-white">Admin Mode:</span>
            <span className="font-mono text-zinc-300">{adminEmail}</span>
            <span className="hidden md:inline text-zinc-500 text-[11px]">
              (Hover/click any product to edit image & offer)
            </span>
          </div>
        </div>

        {/* Right: Quick Admin Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openAddProductModal('offer')}
            className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-extrabold text-[11px] uppercase tracking-wider rounded-lg flex items-center gap-1 shadow transition-all cursor-pointer"
          >
            <Flame className="w-3 h-3 fill-black" />
            <span>+ Post Weekend / Combo Offer</span>
          </button>

          <button
            onClick={() => openAddProductModal('product')}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] uppercase tracking-wider rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-white/10"
          >
            <Plus className="w-3 h-3" />
            <span>+ Add Product</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-2.5 py-1.5 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
            title="Log Out Admin"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
