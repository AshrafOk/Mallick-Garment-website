import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeInfo';
import { Logo } from '../components/Logo';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  TrendingUp,
  Tag,
  Scissors,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useShop();

  const brandPillars = [
    {
      title: 'Uncompromising Quality',
      subtitle: 'Materials That Endure',
      icon: ShieldCheck,
      description:
        'We reject flimsy fast-fashion fabrics. Every piece at Mallick Garments is sourced from certified mills—featuring 120s two-ply Egyptian cotton, 13.5 oz ring-spun selvedge denim, and breathable French Terry knits.',
    },
    {
      title: 'Ergonomic Comfort',
      subtitle: 'All-Day Mobility',
      icon: Heart,
      description:
        'A garment is only as good as how you feel in it throughout an Indian summer or a formal evening. We calibrate our sleeve pitch, waistband elasticity, and shoulder lines for natural freedom of movement.',
    },
    {
      title: 'Elevated Style',
      subtitle: 'Modern Runway Language',
      icon: Sparkles,
      description:
        'Drawing direct inspiration from Milan, Tokyo, and modern streetwear brands like Zara and Snitch, our cuts bring contemporary high-fashion silhouettes directly to Bokaro Steel City.',
    },
    {
      title: 'Honest Affordability',
      subtitle: 'Direct Mill Transparency',
      icon: Tag,
      description:
        'Luxury aesthetics should not require absurd markups. By managing direct relationships with specialized textile manufacturers, we deliver international craftsmanship at genuine fair prices.',
    },
    {
      title: 'Ahead of Modern Trends',
      subtitle: 'Continuous Consignments',
      icon: TrendingUp,
      description:
        'Whether it is the resurgence of 90s baggy skater denim, boxy drop-shoulder tees, or tactile parachute cargo pants, our showrooms refresh weekly so Bokaro gentlemen are always ahead of the curve.',
    },
  ];

  return (
    <div className="space-y-24 py-8 md:py-16">
      {/* 1. HERO STORY BANNER */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 text-center space-y-6 flex flex-col items-center">
        <div className="mb-2">
          <Logo size="lg" showText={true} />
        </div>

        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Mallick Garments Chronicle · Bokaro Steel City</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-white tracking-wide uppercase leading-tight">
          CRAFTING STYLE, COMFORT & CONFIDENCE
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Founded with a clear conviction: men in Bokaro Steel City deserve access to the same world-class tailoring, contemporary fits, and refined aesthetics found in the premier fashion capitals.
        </p>
      </section>

      {/* 2. SPLIT NARRATIVE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80"
              alt="Mallick Garments Menswear Heritage Bokaro"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-zinc-950/80 backdrop-blur-md rounded-2xl border border-white/10">
              <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
                Two Outlets Across Bokaro
              </span>
              <h3 className="font-editorial text-2xl text-white mt-1">
                Siwandih Main Road & Sector 4
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                From our foundational flagship opposite Bank of India to our high-fashion boutique at Harshvardhan Plaza.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm text-zinc-300 leading-relaxed">
            <div className="border-l-2 border-[#d4af37] pl-4">
              <h2 className="font-editorial text-3xl text-white tracking-wide">
                BOKARO’S BENCHMARK FOR MENSWEAR
              </h2>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">
                Established with Passion
              </span>
            </div>

            <p>
              For years, gentlemen living in Jharkhand had two choices: settling for old-fashioned local tailoring or ordering sight-unseen from online brands and hoping the fit and fabric matched expectations.
            </p>

            <p>
              Mallick Garments was established to bridge that divide. We envisioned an experiential men’s clothing sanctuary where you can feel the weight of a 260 GSM Supima cotton tee, run your hand across brushed Japanese denim, and stand in front of three-way mirrors with complimentary master tailoring adjustments.
            </p>

            <p>
              Today, with our two strategic outlets in Siwandih and Sector 4, Mallick Garments has evolved into Bokaro’s premier menswear destination. We cater to corporate leaders preparing for boardroom discussions, students curating streetwear fits, and groomsmen dressing for festive celebrations.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-zinc-950 rounded-xl border border-white/5">
                <span className="font-editorial text-2xl text-white">100K+</span>
                <p className="text-zinc-400 mt-1">Bokaro Gentlemen Styled</p>
              </div>
              <div className="p-4 bg-zinc-950 rounded-xl border border-white/5">
                <span className="font-editorial text-2xl text-[#d4af37]">100%</span>
                <p className="text-zinc-400 mt-1">Authentic Mill Fabrics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 5 CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Our Guiding Philosophy
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl text-white tracking-wide mt-1">
            THE 5 PILLARS OF MALLICK GARMENTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-zinc-950/80 rounded-2xl border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-editorial text-2xl text-white tracking-wide mt-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Master Alteration Highlight Card */}
          <div className="p-8 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-[#d4af37]/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#d4af37] mb-6">
                <Scissors className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold block">
                Complimentary Service
              </span>
              <h3 className="font-editorial text-2xl text-white tracking-wide mt-1">
                Bespoke In-Store Alteration
              </h3>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                Trouser hems too long? Sleeves need tapering? Our master tailors at both Siwandih and Sector 4 provide immediate fitting adjustments while you wait.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-[11px] text-zinc-300 font-medium">
                Included with every garment purchase
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INVITATION CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 text-center bg-zinc-950 p-12 rounded-3xl border border-white/10">
        <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wide">
          EXPERIENCE THE FIT IN BOKARO TODAY
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
          Visit our showrooms at Siwandih or Sector 4 Harshvardhan Plaza and experience the garments firsthand.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
          >
            Explore Wardrobe
          </button>
          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-medium text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
          >
            Locate Outlets
          </button>
        </div>
      </section>
    </div>
  );
};
