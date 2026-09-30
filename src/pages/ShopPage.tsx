import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import {
  CATEGORIES_LIST,
  FitType,
  ParentCategory,
  WAIST_SIZES,
  SHIRT_SIZES,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, Sparkles, Flame, Plus } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedFitFilter,
    setSelectedFitFilter,
    searchQuery,
    setSearchQuery,
    setIsFitGuideOpen,
    showOnlyWeekendOffers,
    setShowOnlyWeekendOffers,
    openAddProductModal,
  } = useShop();

  const [selectedParentCategory, setSelectedParentCategory] = useState<string>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'rating'>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const parentCategories: { label: string; id: string }[] = [
    { label: 'All Items', id: 'all' },
    { label: 'Shirts', id: 'shirts' },
    { label: 'T-Shirts', id: 'tshirts' },
    { label: 'Jeans & Denim', id: 'jeans' },
    { label: 'Trousers & Chinos', id: 'trousers' },
    { label: 'Track Pants & Joggers', id: 'trackpants' },
  ];

  const fits: string[] = [
    'All',
    'Slim Fit',
    'Regular Fit',
    'Straight Fit',
    'Relaxed Fit',
    'Baggy Fit',
    'Oversized Fit',
  ];

  const resetAllFilters = () => {
    setSelectedParentCategory('all');
    setSelectedCategoryFilter('All');
    setSelectedFitFilter('All');
    setSelectedSizeFilter('all');
    setSearchQuery('');
    setShowOnlyWeekendOffers(false);
  };

  const weekendOffersCount = useMemo(() => {
    return products.filter((p) => p.isWeekendOffer).length;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Weekend Offers Only Toggle
        if (showOnlyWeekendOffers && !product.isWeekendOffer) {
          return false;
        }

        // 2. Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesCategory = product.category.toLowerCase().includes(q);
          const matchesFit = product.fit.toLowerCase().includes(q);
          const matchesFabric = product.fabric.toLowerCase().includes(q);
          if (!matchesName && !matchesCategory && !matchesFit && !matchesFabric) {
            return false;
          }
        }

        // 3. Parent Category
        if (selectedParentCategory !== 'all') {
          if (product.parentCategory !== selectedParentCategory) {
            return false;
          }
        }

        // 4. Specific Category
        if (selectedCategoryFilter !== 'All') {
          if (product.category !== selectedCategoryFilter) {
            return false;
          }
        }

        // 5. Fit Filter
        if (selectedFitFilter !== 'All') {
          if (product.fit !== selectedFitFilter) {
            return false;
          }
        }

        // 6. Size Filter
        if (selectedSizeFilter !== 'all') {
          if (!product.availableSizes?.includes(selectedSizeFilter)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [
    products,
    showOnlyWeekendOffers,
    searchQuery,
    selectedParentCategory,
    selectedCategoryFilter,
    selectedFitFilter,
    selectedSizeFilter,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedParentCategory !== 'all' ||
    selectedCategoryFilter !== 'All' ||
    selectedFitFilter !== 'All' ||
    selectedSizeFilter !== 'all' ||
    showOnlyWeekendOffers ||
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Catalogue · Bokaro Flagship</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wide mt-1">
            MEN'S COLLECTION
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Browse our complete range of 26 menswear categories. Select any piece to view sizing, fabric specifications, color swatches, or reserve for in-store fitting.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => openAddProductModal('offer')}
            className="px-4 py-2.5 bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/10 hover:scale-105 cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-black" />
            <span>+ Post Offer / Product</span>
          </button>

          <button
            onClick={() => setIsFitGuideOpen(true)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Fit & Size Guide
          </button>

          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="md:hidden px-4 py-2 bg-[#d4af37] text-black rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>
        </div>
      </div>

      {/* Top Filter Bar: Parent Categories & Weekend Deals Tab */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {/* Weekend Special Deals Chip */}
        <button
          onClick={() => setShowOnlyWeekendOffers(!showOnlyWeekendOffers)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0 ${
            showOnlyWeekendOffers
              ? 'bg-gradient-to-r from-red-600 to-amber-500 text-black shadow-lg shadow-red-600/20 border border-amber-300'
              : 'bg-red-950/40 text-amber-300 border border-amber-500/30 hover:border-amber-400'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${showOnlyWeekendOffers ? 'fill-black' : 'text-red-400'}`} />
          <span>⚡ Weekend Offers ({weekendOffersCount})</span>
        </button>

        {parentCategories.map((cat) => {
          const active = selectedParentCategory === cat.id && !showOnlyWeekendOffers;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setShowOnlyWeekendOffers(false);
                setSelectedParentCategory(cat.id);
                setSelectedCategoryFilter('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                active
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active Weekend Filter Alert Banner */}
      {showOnlyWeekendOffers && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-amber-950/40 to-zinc-950 border border-amber-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Viewing Active Weekend Offers Only
              </h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Special promotional deals applicable at both Siwandih & Sector 4 Bokaro showrooms.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowOnlyWeekendOffers(false)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-white rounded-lg transition-colors font-semibold"
          >
            Show All Products
          </button>
        </div>
      )}

      {/* Main Catalog Viewport Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            isMobileFiltersOpen ? 'block' : 'hidden'
          } md:block md:col-span-1 space-y-6 bg-zinc-950/60 p-5 rounded-2xl border border-white/10 h-fit sticky top-28`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs uppercase tracking-widest text-white font-semibold flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
              Filter Catalog
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-[#d4af37] hover:underline cursor-pointer font-medium"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search query in filter */}
          {searchQuery && (
            <div className="p-2.5 bg-zinc-900 rounded-lg flex items-center justify-between text-xs">
              <span className="text-zinc-300 truncate">Search: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="text-zinc-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Fit Selector */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
              By Silhouette / Fit
            </h4>
            <div className="flex flex-col space-y-1 text-xs">
              {fits.map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFitFilter(fit)}
                  className={`text-left py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    selectedFitFilter === fit
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Selector */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
              All 26 Garment Categories
            </h4>
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1 text-xs">
              <button
                onClick={() => setSelectedCategoryFilter('All')}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                  selectedCategoryFilter === 'All'
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer truncate ${
                    selectedCategoryFilter === cat
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
              Waist & Shirt Sizes
            </h4>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => setSelectedSizeFilter('all')}
                className={`py-1 text-[11px] font-medium rounded border transition-colors ${
                  selectedSizeFilter === 'all'
                    ? 'bg-[#d4af37] text-black border-[#d4af37]'
                    : 'border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              {['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '40'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSizeFilter(sz)}
                  className={`py-1 text-[11px] font-medium rounded border transition-colors ${
                    selectedSizeFilter === sz
                      ? 'bg-[#d4af37] text-black border-[#d4af37]'
                      : 'border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid Area */}
        <main className="md:col-span-3 lg:col-span-4 space-y-6">
          {/* Controls Bar: Count & Sorting */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs text-zinc-400">
            <div>
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> luxury garments in Bokaro
              {showOnlyWeekendOffers && (
                <span className="text-amber-400 font-bold ml-1.5">(Weekend Offers Active)</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="featured">Featured / Editorial</option>
                <option value="newest">Newest Consignments</option>
                <option value="rating">Top Rated by Customers</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950/40 rounded-2xl border border-white/5 space-y-4">
              <p className="text-base text-zinc-300 font-medium">
                No garments matched the selected filter criteria.
              </p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try resetting your filters, turning off offer filter, or exploring different silhouettes.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#c5a028] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
