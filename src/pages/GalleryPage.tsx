import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { Sparkles, ArrowRight, Eye, Camera, Edit3 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const {
    setSelectedProduct,
    navigateToShopWithFilter,
    isAdminLoggedIn,
    openAdminEditModal,
    products,
  } = useShop();

  const [activeTab, setActiveTab] = useState<
    | 'all'
    | 'shirts'
    | 'tshirts'
    | 'jeans'
    | 'trousers'
    | 'trackpants'
    | 'baggy'
    | 'streetwear'
    | 'oversized'
  >('all');

  const galleryTabs = [
    { id: 'all', label: 'All Curations' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'tshirts', label: 'T-Shirts' },
    { id: 'jeans', label: 'Jeans' },
    { id: 'trousers', label: 'Trousers' },
    { id: 'trackpants', label: 'Track Pants' },
    { id: 'baggy', label: 'Baggy Collection' },
    { id: 'streetwear', label: 'Streetwear Collection' },
    { id: 'oversized', label: 'Oversized Collection' },
  ] as const;

  const galleryItems = [
    {
      id: 'g-1',
      title: 'Obsidian Monolith Boxy Silhouette',
      section: ['all', 'shirts', 'oversized', 'streetwear'],
      categoryLabel: 'Oversized Shirts · Editorial Drop',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
      productId: 'oversized-shirt-01',
      details: 'Dense 160 GSM peached poplin cut with extreme low drop shoulder.',
    },
    {
      id: 'g-2',
      title: 'Skater 90s Puddle Baggy Denim',
      section: ['all', 'jeans', 'baggy', 'streetwear'],
      categoryLabel: 'Baggy Jeans · Vintage Wash',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      productId: 'baggy-jeans-01',
      details: '13.5 oz heavy slub denim pooling naturally over chunky silhouettes.',
    },
    {
      id: 'g-3',
      title: 'Sartorial Italian Wool Suiting',
      section: ['all', 'trousers'],
      categoryLabel: 'Formal Trousers · Bespoke Fit',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      productId: 'formal-trouser-01',
      details: 'Single front pleat in charcoal with unbroken razor-sharp crease.',
    },
    {
      id: 'g-4',
      title: 'Acid Wash Heavyweight 260 GSM Tee',
      section: ['all', 'tshirts', 'oversized', 'streetwear'],
      categoryLabel: 'Oversized T-Shirts · French Terry',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
      productId: 'oversized-tshirt-01',
      details: 'Boxy non-clinging profile engineered for warm Bokaro days.',
    },
    {
      id: 'g-5',
      title: 'Tactical Parachute Bungee Pants',
      section: ['all', 'trackpants', 'streetwear'],
      categoryLabel: 'Cargo Track Pants · Utility Active',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      productId: 'cargo-track-pant-01',
      details: 'Ripstop stretch weave with magnetic cargo flaps and cinch ankles.',
    },
    {
      id: 'g-6',
      title: 'Pure Egyptian Two-Ply Formal Shirt',
      section: ['all', 'shirts'],
      categoryLabel: 'Formal Shirts · 120s Compact',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      productId: 'formal-shirt-01',
      details: 'German fused collar bands with lustrous mother-of-pearl buttons.',
    },
    {
      id: 'g-7',
      title: 'Authentic Selvedge Straight Leg',
      section: ['all', 'jeans'],
      categoryLabel: 'Straight Fit Jeans · Ring-Spun',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      productId: 'straight-fit-jeans-01',
      details: 'Even line from thigh to hem with hand-scraped abrasions.',
    },
    {
      id: 'g-8',
      title: 'Milano Knit Quarter-Zip Polo',
      section: ['all', 'tshirts'],
      categoryLabel: 'Polo T-Shirts · Micro Piqué',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80',
      productId: 'polo-tshirt-01',
      details: 'Engineered non-rolling collar with gunmetal metallic zip.',
    },
    {
      id: 'g-9',
      title: 'Double-Pleated Wide Suiting Serge',
      section: ['all', 'trousers', 'baggy'],
      categoryLabel: 'Baggy Trousers · Fluid Serge',
      image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      productId: 'baggy-trouser-01',
      details: 'Dramatic fluid runway volume crafted for evening occasions.',
    },
  ];

  const filteredGallery = galleryItems.filter((item) =>
    item.section.includes(activeTab as any)
  );

  const handleOpenProduct = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
          <Camera className="w-4 h-4" />
          <span>Autumn / Winter Lookbook 2026</span>
        </div>
        <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wide">
          EDITORIAL GALLERY
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2">
          High-fashion campaigns shot in contemporary studio lighting. Explore seasonal looks and view the exact products.
        </p>
      </div>

      {/* Gallery Section Filter Pills (Buttons with click handlers) */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12 border-b border-white/5">
        {galleryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                : 'bg-zinc-950 text-zinc-400 border border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="group bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                  {item.categoryLabel}
                </span>
              </div>

              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    const prod = products.find((p) => p.id === item.productId) || products[0];
                    if (prod) openAdminEditModal(prod);
                  }}
                  title="Edit this lookbook image (Admin)"
                  className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-amber-400 text-black font-extrabold text-[11px] uppercase tracking-wider shadow-2xl transition-all cursor-pointer hover:scale-105"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Image</span>
                </button>
              )}
            </div>

            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="font-editorial text-2xl text-white tracking-wide group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleOpenProduct(item.productId)}
                  className="text-xs uppercase tracking-wider font-semibold text-[#d4af37] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Garment Details</span>
                </button>
                <button
                  onClick={() => navigateToShopWithFilter({})}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <span>In Store</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
