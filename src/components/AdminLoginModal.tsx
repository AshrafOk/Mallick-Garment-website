import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ADMIN_EMAIL } from '../services/api';
import { ShieldCheck, X, KeyRound, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginModalOpen,
    setIsAdminLoginModalOpen,
    loginAdmin,
    isAdminLoggedIn,
    logoutAdmin,
    adminEmail,
  } = useShop();

  const [emailInput, setEmailInput] = useState(ADMIN_EMAIL);
  const [passcodeInput, setPasscodeInput] = useState('bokaro@2026');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const trimmed = emailInput.trim().toLowerCase();
    if (trimmed !== ADMIN_EMAIL.toLowerCase()) {
      setErrorMsg(`Access denied: Only ${ADMIN_EMAIL} is authorized as store administrator.`);
      setIsLoading(false);
      return;
    }

    const success = await loginAdmin(trimmed, passcodeInput);
    setIsLoading(false);
    if (success) {
      setIsAdminLoginModalOpen(false);
    } else {
      setErrorMsg('Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-zinc-950 rounded-2xl border border-[#d4af37]/30 shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-600 text-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-xl text-white tracking-wide">
                STORE ADMINISTRATOR
              </h3>
              <p className="text-[11px] text-zinc-400">
                Mallick Garments · Bokaro Management Portal
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminLoginModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isAdminLoggedIn ? (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Logged in as Administrator</p>
                <p className="text-[11px] text-emerald-400 font-mono mt-0.5">{adminEmail}</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              You currently have full administrative access. You can edit any product image, adjust specifications, and post weekend and combo offers across the store.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsAdminLoginModalOpen(false)}
                className="flex-1 py-2.5 bg-[#d4af37] hover:bg-[#c5a028] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Close & Continue Editing
              </button>
              <button
                onClick={() => {
                  logoutAdmin();
                  setIsAdminLoginModalOpen(false);
                }}
                className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[11px] text-[#d4af37] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>
                Authorized Administrator Email: <strong>{ADMIN_EMAIL}</strong>
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="asharafalik1@gmail.com"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-amber-500 hover:from-[#c5a028] hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLoading ? 'Verifying...' : 'Sign In As Store Admin'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
