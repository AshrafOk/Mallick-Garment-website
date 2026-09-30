import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, FIT_DESCRIPTIONS, FitType } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Logo } from '../components/Logo';
import { STORE_INFO } from '../data/storeInfo';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
  CheckCircle,
  Instagram,
  Youtube,
  Phone,
  Ruler,
  Compass,
  Flame,
  TrendingUp,
  Layers,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateToShopWithFilter, setSelectedProduct, setActivePage } = useShop();

  const latestArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const trendingFashion = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);

  // Spotlights for Baggy, Oversized, and Straight Fit
  const baggyItems = PRODUCTS.filter((p) => p.fit === 'Baggy Fit').slice(0, 3);
  const oversizedItems = PRODUCTS.filter((p) => p.fit === 'Oversized Fit').slice(0, 3);
  const straightFitItems = PRODUCTS.filter((p) => p.fit === 'Straight Fit').slice(0, 3);

  const reviews = [
    {
      name: 'Vikramaditya Roy',
      location: 'Sector 4, Bokaro Steel City',
      role: 'Corporate Executive',
      comment:
        'Mallick Garments has completely elevated men’s fashion in Bokaro. Their Italian cotton formal shirts and tailored trousers rival Zara and Raymond. Impeccable fit and on-spot alteration service.',
      rating: 5,
      date: 'September 2026',
    },
    {
      name: 'Amanpreet Singh',
      location: 'Cooperative Colony, Bokaro',
      role: 'Architect & Creator',
      comment:
        'Finding authentic 90s baggy jeans and heavyweight 260 GSM oversized tees in Jharkhand used to require ordering online and hoping for the best. The Siwandih outlet has the finest streetwear drape.',
      rating: 5,
      date: 'August 2026',
    },
    {
      name: 'MD. Tariq Anwar',
      location: 'Siwandih, Bokaro Steel City',
      role: 'Entrepreneur',
      comment:
        'Been shopping with Mallick Garments for years. Their growth from a local favorite to modern luxury flagships in both Siwandih and Harshvardhan Plaza Sector 4 is well-deserved. Outstanding fabric durability.',
      rating: 5,
      date: 'July 2026',
    },
  ];

  const instagramPosts = [
    {
      id: 'ig-1',
      title: 'Monochrome Oversized Editorial',
      category: 'Streetwear 2026',
      img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ig-2',
      title: 'Skate Baggy Denim & Chunky Soles',
      category: 'Denim Bar',
      img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ig-3',
      title: 'Executive Italian Wool Drape',
      category: 'Formals Studio',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ig-4',
      title: 'Tactical Parachute Track Series',
      category: 'Active Drop',
      img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. LARGE FASHION HERO BANNER */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Cinematic Backdrop Image with Luxury Dark Scrim */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1920&q=85"
            alt="Mallick Garments Men's Fashion Campaign Bokaro"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-transparent to-[#09090b]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center py-20 flex flex-col items-center">
          {/* Subtle Lead-in badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#d4af37]/30 backdrop-blur-md mb-6 animate-in fade-in duration-700">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-300 font-medium">
              Bokaro's Flagship Men's Wear · Autumn / Winter 2026
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white uppercase max-w-4xl leading-[0.95]">
            Bokaro's Ultimate Destination <br />
            <span className="gold-gradient-text">For Men's Fashion</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed text-wrap">
            Premium Shirts, T-Shirts, Jeans, Trousers, Joggers, Track Pants and Trendy Streetwear for Every Occasion.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigateToShopWithFilter({})}
              className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#d4af37]/20 hover:scale-105"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-950/80 hover:bg-white/10 text-white border border-white/20 font-medium text-xs uppercase tracking-widest rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>Visit Store Outlets</span>
            </button>
          </div>

          {/* Trust Stat Tickers (Clean, unboxed) */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-3xl">
            <div>
              <span className="font-editorial text-2xl md:text-3xl text-white tracking-wide">
                26+
              </span>
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 mt-0.5">
                Curated Categories
              </p>
            </div>
            <div>
              <span className="font-editorial text-2xl md:text-3xl text-[#d4af37] tracking-wide">
                2 OUTLETS
              </span>
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 mt-0.5">
                Siwandih & Sector 4
              </p>
            </div>
            <div>
              <span className="font-editorial text-2xl md:text-3xl text-white tracking-wide">
                28 TO 48
              </span>
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 mt-0.5">
                Complete Waist Sizes
              </p>
            </div>
            <div>
              <span className="font-editorial text-2xl md:text-3xl text-white tracking-wide">
                S TO 4XL
              </span>
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 mt-0.5">
                Full Tops Spectrum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LATEST ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Just Unboxed</span>
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl tracking-wide text-white mt-1">
              LATEST ARRIVALS
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Fresh weekly consignments arriving at our Bokaro flagship showrooms.
            </p>
          </div>

          <button
            onClick={() => navigateToShopWithFilter({})}
            className="text-xs uppercase tracking-widest text-zinc-300 hover:text-[#d4af37] flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All New Drops</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. SHOP BY FIT SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Ruler className="w-3.5 h-3.5" />
            <span>Engineered Silhouettes</span>
          </div>
          <h2 className="font-editorial text-3xl md:text-5xl tracking-wide text-white">
            SHOP BY FIT
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            From precision slim contouring to relaxed 90s streetwear drapes. Pick your ideal profile.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {(
            [
              {
                fit: 'Slim Fit' as FitType,
                image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
                count: '14 Styles',
              },
              {
                fit: 'Regular Fit' as FitType,
                image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80',
                count: '18 Styles',
              },
              {
                fit: 'Straight Fit' as FitType,
                image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
                count: '12 Styles',
              },
              {
                fit: 'Relaxed Fit' as FitType,
                image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
                count: '16 Styles',
              },
              {
                fit: 'Baggy Fit' as FitType,
                image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
                count: '15 Styles',
              },
              {
                fit: 'Oversized Fit' as FitType,
                image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
                count: '14 Styles',
              },
            ] as const
          ).map((item) => (
            <div
              key={item.fit}
              onClick={() => navigateToShopWithFilter({ fit: item.fit })}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#d4af37] transition-all"
            >
              <img
                src={item.image}
                alt={item.fit}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#d4af37] block">
                  {item.count}
                </span>
                <h3 className="font-editorial text-lg text-white tracking-wide group-hover:text-[#d4af37] transition-colors">
                  {item.fit}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Most Wanted</span>
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl tracking-wide text-white mt-1">
              BEST SELLERS
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              The iconic pieces Bokaro gentlemen return for time and again.
            </p>
          </div>

          <button
            onClick={() => navigateToShopWithFilter({})}
            className="text-xs uppercase tracking-widest text-zinc-300 hover:text-[#d4af37] flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Explore All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. SHOP BY CATEGORY: Visual Editorial Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Comprehensive Wardrobe</span>
          </div>
          <h2 className="font-editorial text-3xl md:text-5xl tracking-wide text-white">
            SHOP BY CATEGORY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            From executive formal shirts to tactical cargo track pants across all 26 collections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Block 1: Shirts Universe */}
          <div
            onClick={() => navigateToShopWithFilter({ category: 'Formal Shirts' })}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80"
              alt="Shirts Collection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-6 inset-x-6">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">
                Formal · Casual · Printed · Oversized
              </span>
              <h3 className="font-editorial text-3xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                SHIRTS COLLECTION
              </h3>
              <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                Pure Egyptian cottons, French linens, baroque silk party shirts, and boxy poplins.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#d4af37]">
                <span>Browse 6 Shirt Categories</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Block 2: Denim & Jeans Bar */}
          <div
            onClick={() => navigateToShopWithFilter({ category: 'Baggy Jeans' })}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
              alt="Jeans Collection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-6 inset-x-6">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">
                Baggy · Straight · Slim · Relaxed
              </span>
              <h3 className="font-editorial text-3xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                DENIM ARCHIVE
              </h3>
              <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                Heavyweight 13.5 oz selvedge, authentic vintage whisker washes, and skater puddles.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#d4af37]">
                <span>Browse 6 Denim Fits (28–48)</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Block 3: Trousers & Streetwear Activewear */}
          <div
            onClick={() => navigateToShopWithFilter({ category: 'Cargo Track Pants' })}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80"
              alt="Trousers & Track Pants"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-6 inset-x-6">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">
                Chinos · Wool Trousers · Cargo Tracks
              </span>
              <h3 className="font-editorial text-3xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                TROUSERS & ACTIVEWEAR
              </h3>
              <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                Bespoke single-pleat wool blends, stretch micro-twill chinos, and tactical jogger tracks.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#d4af37]">
                <span>Browse Trousers & Track Pants</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CURATED SPOTLIGHT: BAGGY & OVERSIZED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="p-8 md:p-12 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                <Compass className="w-4 h-4" />
                <span>The Bokaro Streetwear Vanguard</span>
              </div>
              <h2 className="font-editorial text-3xl md:text-5xl text-white tracking-wide">
                BAGGY & OVERSIZED REVOLUTION
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Step away from restrictive fast-fashion cuts. Our baggy denim and 260 GSM drop-shoulder oversized tees are designed with intentional Japanese streetwear proportions.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => navigateToShopWithFilter({ fit: 'Baggy Fit' })}
                  className="px-6 py-3 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Shop Baggy Denim
                </button>
                <button
                  onClick={() => navigateToShopWithFilter({ fit: 'Oversized Fit' })}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Shop Oversized Tees
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {baggyItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedProduct(item)}
                  className="group bg-zinc-950/80 rounded-xl overflow-hidden border border-white/5 hover:border-[#d4af37] transition-all cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.images.front}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] text-[#d4af37] uppercase font-semibold">
                      {item.fit}
                    </span>
                    <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">Sizes 28–48 · In Stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRENDING FASHION CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>In High Demand</span>
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl tracking-wide text-white mt-1">
              TRENDING IN BOKARO
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Styles being tried, reviewed, and purchased across our Siwandih and Sector 4 outlets.
            </p>
          </div>

          <button
            onClick={() => navigateToShopWithFilter({})}
            className="text-xs uppercase tracking-widest text-zinc-300 hover:text-[#d4af37] flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Explore All Trending</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingFashion.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. BOKARO GENTLEMEN REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
            <span>Community Voice</span>
          </div>
          <h2 className="font-editorial text-3xl md:text-5xl tracking-wide text-white">
            WHAT BOKARO SAYS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Read authentic feedback from stylish gentlemen across Bokaro Steel City.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="p-6 md:p-8 bg-zinc-950/70 border border-white/5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <h4 className="text-sm font-semibold text-white">{rev.name}</h4>
                <div className="text-xs text-zinc-500 mt-0.5">
                  <span>{rev.role}</span>
                  <span className="mx-1.5">·</span>
                  <span>{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INSTAGRAM LOOKBOOK & YOUTUBE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="p-8 md:p-12 bg-zinc-950/60 rounded-3xl border border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                <Instagram className="w-4 h-4" />
                <span>Social Feeds</span>
              </div>
              <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wide mt-1">
                INSTAGRAM GALLERY & YOUTUBE
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Follow @mallickgarments_online_bokaro_ for everyday styling drops and video reels.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow Instagram</span>
              </a>

              <a
                href={STORE_INFO.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span>Watch YouTube</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-3 inset-x-3 text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
                    {post.category}
                  </span>
                  <h4 className="text-xs font-medium text-white truncate mt-0.5">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400 mt-1">
                    <Instagram className="w-3 h-3 text-[#d4af37]" />
                    <span>View on Instagram</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. STORE LOCATIONS IN BOKARO */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Physical Flagships</span>
          </div>
          <h2 className="font-editorial text-3xl md:text-5xl tracking-wide text-white">
            VISIT OUR BOKARO OUTLETS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Experience the garments in person with spacious private fitting suites and dedicated master tailoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STORE_INFO.outlets.map((outlet) => (
            <div
              key={outlet.id}
              className="p-8 bg-zinc-950/80 rounded-2xl border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="inline-block px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
                  {outlet.badge}
                </div>
                <h3 className="font-editorial text-2xl md:text-3xl text-white tracking-wide">
                  {outlet.name}
                </h3>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                  {outlet.addressLine1}, {outlet.addressLine2},
                  <br />
                  {outlet.city}, {outlet.state} – {outlet.pincode}
                </p>

                <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs text-zinc-400">
                  <p>
                    <strong className="text-zinc-200">Store Hours:</strong> {outlet.timings}
                  </p>
                  <p>
                    <strong className="text-zinc-200">Phone Assistance:</strong> {outlet.phone}
                  </p>
                </div>

                <div className="mt-5 space-y-1.5">
                  <h5 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Store Amenities:
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                    {outlet.features.map((feat, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <a
                  href={outlet.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Navigate On Google Maps</span>
                </a>
                <a
                  href={`tel:${outlet.phoneRaw}`}
                  className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
