import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import {
  PRODUCTS,
  CATEGORIES_LIST,
  FitType,
  ParentCategory,
  WAIST_SIZES,
  SHIRT_SIZES,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedFitFilter,
    setSelectedFitFilter,
    searchQuery,
    setSearchQuery,
    setIsFitGuideOpen,
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
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
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

      // 2. Parent Category
      if (selectedParentCategory !== 'all') {
        if (product.parentCategory !== selectedParentCategory) {
          return false;
        }
      }

      // 3. Specific Category
      if (selectedCategoryFilter !== 'All') {
        if (product.category !== selectedCategoryFilter) {
          return false;
        }
      }

      // 4. Fit Filter
      if (selectedFitFilter !== 'All') {
        if (product.fit !== selectedFitFilter) {
          return false;
        }
      }

      // 5. Size Filter
      if (selectedSizeFilter !== 'all') {
        if (!product.availableSizes.includes(selectedSizeFilter)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [
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
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
              <span>The Full Wardrobe Archive</span>
              <span>·</span>
              <span>Bokaro Steel City</span>
            </div>
            <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wide mt-1">
              MEN'S COLLECTION
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-xl">
              Discover all 26 garment categories tailored in premium cottons, raw selvedge denim, luxury linen, and technical activewear.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFitGuideOpen(true)}
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] border border-white/10 rounded-lg px-3.5 py-2.5 bg-zinc-950/80 transition-colors"
            >
              Interactive Sizing Guide
            </button>
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="md:hidden flex items-center gap-2 text-xs uppercase tracking-wider text-white bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Parent Category Tabs (Segmented control) */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {parentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedParentCategory(cat.id);
                setSelectedCategoryFilter('All');
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap rounded-lg border transition-all cursor-pointer ${
                selectedParentCategory === cat.id
                  ? 'bg-white text-black border-white shadow'
                  : 'bg-zinc-950 text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filters Sidebar (Desktop) + Product Grid */}
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
                className="text-[11px] text-[#d4af37] hover:underline cursor-pointer"
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
                Try resetting your filters or switching silhouettes to discover more styles.
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
