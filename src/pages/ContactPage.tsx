import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { useShop } from '../context/ShopContext';
import { Logo } from '../components/Logo';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Youtube,
  ExternalLink,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formOutlet, setFormOutlet] = useState<'siwandih' | 'sector4'>('siwandih');
  const [formInterest, setFormInterest] = useState('Baggy Jeans & Streetwear');
  const [formDate, setFormDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    const outletName =
      formOutlet === 'siwandih'
        ? 'Outlet 1 (Siwandih Main Road)'
        : 'Outlet 2 (Sector 4 Harshvardhan Plaza)';

    const message = encodeURIComponent(
      `Hello Mallick Garments Bokaro! 👋\nI would like to schedule a Store Visit / Personal Fitting:\n\n*Name:* ${formName}\n*Phone:* ${formPhone}\n*Preferred Outlet:* ${outletName}\n*Style Interest:* ${formInterest}${formDate ? `\n*Preferred Date/Time:* ${formDate}` : ''}\n\nPlease confirm availability!`
    );

    window.open(`https://wa.me/${STORE_INFO.whatsappRaw}?text=${message}`, '_blank');
    setSubmitted(true);
    showToast('Inquiry generated for WhatsApp concierge');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="mb-4">
          <Logo size="lg" showText={true} />
        </div>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
          <MapPin className="w-4 h-4" />
          <span>Bokaro Steel City Flagships</span>
        </div>
        <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wide">
          OUTLETS & CONTACT
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2">
          Two premier locations in Bokaro Steel City. Stop by for personal sizing, fabric evaluation, and on-spot tailor alterations.
        </p>
      </div>

      {/* Outlets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STORE_INFO.outlets.map((outlet) => (
          <div
            key={outlet.id}
            className="p-8 bg-zinc-950 rounded-2xl border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-wider rounded-full">
                  {outlet.badge}
                </span>
                <span className="text-xs text-zinc-500 font-mono">Bokaro Steel City</span>
              </div>

              <h2 className="font-editorial text-2xl md:text-3xl text-white tracking-wide">
                {outlet.name}
              </h2>

              <div className="mt-4 space-y-3 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">{outlet.addressLine1}</p>
                    <p className="text-zinc-400">{outlet.addressLine2}</p>
                    <p className="text-zinc-500">
                      {outlet.city}, {outlet.state} – {outlet.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <div>
                    <span className="text-zinc-400">Timings: </span>
                    <span className="font-medium text-white">{outlet.timings}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <div>
                    <span className="text-zinc-400">Direct Phone: </span>
                    <a
                      href={`tel:${outlet.phoneRaw}`}
                      className="font-medium text-white hover:text-[#d4af37] transition-colors"
                    >
                      {outlet.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-zinc-400">Store WhatsApp: </span>
                    <a
                      href={`https://wa.me/${outlet.whatsappRaw}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-emerald-400 hover:underline"
                    >
                      {outlet.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Outlet Highlights */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Showroom Amenities:
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                  {outlet.features.map((feat, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href={outlet.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${outlet.phoneRaw}`}
                className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store</span>
              </a>

              <a
                href={`https://wa.me/${outlet.whatsappRaw}?text=Hello%20${encodeURIComponent(
                  outlet.name
                )}%20Bokaro!`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Connect Bar */}
      <div className="p-8 bg-zinc-950 rounded-2xl border border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-editorial text-2xl text-white">
              CONNECT WITH MALLICK GARMENTS ON SOCIALS
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Watch new arrival unboxings on YouTube and daily outfit lookbooks on Instagram.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
              <span>{STORE_INFO.instagramHandle}</span>
            </a>

            <a
              href={STORE_INFO.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>{STORE_INFO.youtubeHandle}</span>
            </a>

            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#d4af37]" />
              <span>Google Reviews</span>
            </a>
          </div>
        </div>
      </div>

      {/* VIP Fitting / In-Store Appointment Booking Form */}
      <div className="max-w-3xl mx-auto p-8 md:p-10 bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-3xl border border-white/10">
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Styling Concierge</span>
          </div>
          <h2 className="font-editorial text-3xl text-white">
            SCHEDULE A STORE VISIT & PRIVATE TRIAL
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Reserve a fitting lounge with our senior stylist at your chosen Bokaro outlet.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-editorial text-2xl text-white">
              INQUIRY SENT TO WHATSAPP CONCIERGE
            </h3>
            <p className="text-xs text-zinc-300">
              Our store manager will confirm your fitting slot immediately. We look forward to welcoming you to Mallick Garments!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-[#d4af37] hover:underline"
            >
              Send another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Mobile / WhatsApp Number:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Select Bokaro Outlet:
                </label>
                <select
                  value={formOutlet}
                  onChange={(e) => setFormOutlet(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="siwandih">Outlet 1: Siwandih Main Road (Opp. BOI)</option>
                  <option value="sector4">Outlet 2: Sector 4 Harshvardhan Plaza (1st Floor)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Primary Style Interest:
                </label>
                <select
                  value={formInterest}
                  onChange={(e) => setFormInterest(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Baggy Jeans & Streetwear">Baggy Jeans & Streetwear</option>
                  <option value="Oversized Heavyweight Tees">Oversized Heavyweight Tees</option>
                  <option value="Executive Formal Shirts & Trousers">Executive Formal Shirts & Trousers</option>
                  <option value="Chinos & Casual Button-Downs">Chinos & Casual Button-Downs</option>
                  <option value="Cargo Track Pants & Gym Wear">Cargo Track Pants & Gym Wear</option>
                  <option value="Party Wear Silk Shirts">Party Wear Silk Shirts</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-1">
                Preferred Date / Approximate Time (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Tomorrow around 5:00 PM"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#d4af37]/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Store Visit Inquiry via WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
