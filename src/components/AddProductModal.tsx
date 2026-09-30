import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ParentCategory, FitType, ColorVariant, CATEGORIES_LIST } from '../data/products';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Flame,
  Sparkles,
  Check,
  Tag,
  Palette,
  Layers,
  Store,
  Calendar,
  AlertCircle,
} from 'lucide-react';

const COMMON_SHIRT_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
const COMMON_WAIST_SIZES = ['28', '30', '32', '34', '36', '38', '40', '42', '44'];

const QUICK_COLORS = [
  { name: 'Jet Black', hex: '#111111' },
  { name: 'Crisp White', hex: '#FFFFFF' },
  { name: 'Vintage Blue', hex: '#2C3E50' },
  { name: 'Olive Green', hex: '#4B5320' },
  { name: 'Khaki Tan', hex: '#C3B091' },
  { name: 'Charcoal Grey', hex: '#374151' },
  { name: 'Tobacco Camel', hex: '#7B3F00' },
  { name: 'Deep Maroon', hex: '#581845' },
];

export const AddProductModal: React.FC = () => {
  const {
    isAddProductModalOpen,
    setIsAddProductModalOpen,
    addProduct,
    products,
    deleteProduct,
    toggleWeekendOffer,
    addProductModalMode,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'create' | 'manage'>(
    addProductModalMode === 'offer' ? 'create' : 'create'
  );

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Formal Shirts');
  const [fit, setFit] = useState<FitType>('Regular Fit');
  const [fabric, setFabric] = useState('100% Premium Mercerized Cotton');
  const [description, setDescription] = useState('');

  // Images State
  const [frontImage, setFrontImage] = useState('');
  const [backImage, setBackImage] = useState('');
  const [sideImage, setSideImage] = useState('');
  const [sameImageForAll, setSameImageForAll] = useState(true);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Variants State: Sizes
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L', 'XL', 'XXL']);
  const [customSizeInput, setCustomSizeInput] = useState('');

  // Variants State: Colors
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([
    { name: 'Jet Black', hex: '#111111' },
    { name: 'Crisp White', hex: '#FFFFFF' },
  ]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#2C3E50');

  // Weekend Offer State
  const [isWeekendOffer, setIsWeekendOffer] = useState<boolean>(addProductModalMode === 'offer');
  const [offerBadge, setOfferBadge] = useState<string>('WEEKEND SPECIAL');
  const [offerTitle, setOfferTitle] = useState<string>('Special Weekend Offer on all sizes & color variants');
  const [validUntil, setValidUntil] = useState<string>('Sunday 10 PM');
  const [outletLocation, setOutletLocation] = useState<string>('Both Siwandih & Sector 4 Outlets');

  if (!isAddProductModalOpen) return null;

  // Derive parent category from category
  const getParentCategory = (cat: string): ParentCategory => {
    if (cat.includes('Shirt') && !cat.includes('T-Shirt')) return 'shirts';
    if (cat.includes('T-Shirt') || cat.includes('Tee') || cat.includes('Polo')) return 'tshirts';
    if (cat.includes('Jean')) return 'jeans';
    if (cat.includes('Trouser') || cat.includes('Chino')) return 'trousers';
    if (cat.includes('Track') || cat.includes('Jogger')) return 'trackpants';
    return 'shirts';
  };

  // Handle local file upload & base64 conversion
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFrontImage(reader.result);
        setImageError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleAddCustomSize = () => {
    const trimmed = customSizeInput.trim().toUpperCase();
    if (trimmed && !selectedSizes.includes(trimmed)) {
      setSelectedSizes((prev) => [...prev, trimmed]);
      setCustomSizeInput('');
    }
  };

  const handleAddColorVariant = () => {
    if (!newColorName.trim()) return;
    setColorVariants((prev) => [...prev, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  const handleRemoveColor = (index: number) => {
    if (colorVariants.length <= 1) return;
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuickAddColor = (preset: { name: string; hex: string }) => {
    if (!colorVariants.some((c) => c.name.toLowerCase() === preset.name.toLowerCase())) {
      setColorVariants((prev) => [...prev, preset]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const finalImage = frontImage.trim() || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80';
    const finalBack = sameImageForAll ? finalImage : backImage.trim() || finalImage;
    const finalSide = sameImageForAll ? finalImage : sideImage.trim() || finalImage;

    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      sku: `MG-CST-${Math.floor(100 + Math.random() * 900)}`,
      category,
      parentCategory: getParentCategory(category),
      fit,
      price: 1899,
      originalPrice: 2899,
      rating: 5.0,
      reviewCount: 1,
      images: {
        front: finalImage,
        back: finalBack,
        side: finalSide,
        zoom: finalImage,
      },
      colorVariants: colorVariants.length > 0 ? colorVariants : [{ name: 'Standard', hex: '#111111' }],
      availableSizes: selectedSizes.length > 0 ? selectedSizes : ['M', 'L', 'XL'],
      fabric: fabric.trim() || 'Superfine Mercerized Cotton',
      description:
        description.trim() ||
        `${name.trim()} crafted for modern gentlemen with bespoke tailoring and luxury comfort at Mallick Garments Bokaro.`,
      washCare: ['Cold machine wash', 'Iron on reverse', 'Line dry in shade'],
      isNewArrival: true,
      isTrending: true,
      isWeekendOffer,
      weekendOfferDetails: isWeekendOffer
        ? {
            badge: offerBadge.trim() || 'WEEKEND SPECIAL',
            offerTitle: offerTitle.trim() || 'Special Weekend Offer across all sizes and colors',
            validUntil: validUntil.trim() || 'Sunday 10 PM',
            highlightText: `Available across all sizes (${selectedSizes.join(', ')}) & ${colorVariants.length} color variants`,
            outletLocation,
          }
        : undefined,
    };

    addProduct(newProd);
    setIsAddProductModalOpen(false);

    // Reset Form
    setName('');
    setDescription('');
    setFrontImage('');
  };

  const customProducts = products.filter((p) => p.id.startsWith('custom-'));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-600 text-black">
              {isWeekendOffer ? <Flame className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-editorial text-2xl text-white tracking-wide flex items-center gap-2">
                <span>{activeTab === 'create' ? (isWeekendOffer ? 'POST WEEKEND OFFER' : 'ADD NEW PRODUCT') : 'MANAGE PRODUCTS'}</span>
                {isWeekendOffer && (
                  <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    WEEKEND DEAL
                  </span>
                )}
              </h2>
              <p className="text-xs text-zinc-400">
                Mallick Garments · Bokaro Flagship Inventory & Special Offers Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'create' ? 'manage' : 'create')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{activeTab === 'create' ? `View Added (${customProducts.length})` : 'Add Another Product'}</span>
            </button>
            <button
              onClick={() => setIsAddProductModalOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch for mobile */}
        <div className="sm:hidden flex border-b border-white/10 bg-zinc-900/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2.5 text-center transition-colors ${
              activeTab === 'create' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-zinc-400'
            }`}
          >
            Add Product / Offer
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex-1 py-2.5 text-center transition-colors ${
              activeTab === 'manage' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-zinc-400'
            }`}
          >
            Manage Added ({customProducts.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'create' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Offer Mode Switch Banner */}
              <div
                onClick={() => setIsWeekendOffer(!isWeekendOffer)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isWeekendOffer
                    ? 'bg-gradient-to-r from-red-950/40 via-amber-950/30 to-zinc-900 border-amber-500/50 shadow-lg shadow-amber-500/5'
                    : 'bg-zinc-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isWeekendOffer ? 'bg-red-600 text-white animate-pulse' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>Post as Weekend Special Offer</span>
                      {isWeekendOffer && (
                        <span className="text-[10px] bg-amber-400 text-black font-extrabold px-2 py-0.2 rounded uppercase">
                          Active
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Highlights this item in the "Weekend Special Offers" section and adds promotional tags.
                    </p>
                  </div>
                </div>
                <div
                  className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${
                    isWeekendOffer ? 'bg-amber-500 justify-end' : 'bg-zinc-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-black shadow-md" />
                </div>
              </div>

              {/* SECTION 1: Product Image Upload */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                  Product Image (All Variants) <span className="text-red-400">*</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left: Upload / URL Input */}
                  <div className="md:col-span-8 space-y-3">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 hover:border-[#d4af37]/60 rounded-xl p-5 text-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-2"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="p-3 bg-white/10 rounded-full text-[#d4af37]">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-white">
                        Click to upload product photo from your phone or PC
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Supports JPG, PNG, WEBP (Instant preview in all variants)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">OR</span>
                      <input
                        type="url"
                        placeholder="Paste image URL directly (e.g. https://...)"
                        value={frontImage}
                        onChange={(e) => {
                          setFrontImage(e.target.value);
                          setImageError(false);
                        }}
                        className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={sameImageForAll}
                        onChange={(e) => setSameImageForAll(e.target.checked)}
                        className="accent-[#d4af37] rounded"
                      />
                      <span>Use this primary image for all angles (front, back, side)</span>
                    </label>

                    {!sameImageForAll && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="text-[11px] text-zinc-400">Back Angle Image URL</label>
                          <input
                            type="url"
                            placeholder="Back photo URL"
                            value={backImage}
                            onChange={(e) => setBackImage(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-zinc-400">Side Angle Image URL</label>
                          <input
                            type="url"
                            placeholder="Side photo URL"
                            value={sideImage}
                            onChange={(e) => setSideImage(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Live Preview Box */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-zinc-900/60 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 mb-2">
                      Live Catalog Preview
                    </span>
                    <div className="relative w-36 aspect-[3/4] rounded-lg overflow-hidden bg-zinc-950 border border-white/10 shadow-lg">
                      {frontImage && !imageError ? (
                        <img
                          src={frontImage}
                          alt="Preview"
                          onError={() => setImageError(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-zinc-600">
                          <Tag className="w-6 h-6 mb-1 opacity-40" />
                          <span className="text-[10px]">Photo will preview here</span>
                        </div>
                      )}
                      {isWeekendOffer && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow">
                          {offerBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Basic Info & Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    Product Title / Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heavyweight Slub Baggy Skate Denim"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    Silhouette / Fit
                  </label>
                  <select
                    value={fit}
                    onChange={(e) => setFit(e.target.value as FitType)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Slim Fit">Slim Fit</option>
                    <option value="Regular Fit">Regular Fit</option>
                    <option value="Straight Fit">Straight Fit</option>
                    <option value="Relaxed Fit">Relaxed Fit</option>
                    <option value="Baggy Fit">Baggy Fit</option>
                    <option value="Oversized Fit">Oversized Fit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    Category / Garment Type
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {CATEGORIES_LIST.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    Fabric & Material
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Ring-Spun Cotton (280 GSM)"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    Outlet Availability
                  </label>
                  <select
                    value={outletLocation}
                    onChange={(e) => setOutletLocation(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Both Siwandih & Sector 4 Outlets">Both Siwandih & Sector 4</option>
                    <option value="Siwandih Main Road Flagship">Siwandih Outlet Only</option>
                    <option value="Sector 4 Harshvardhan Plaza">Sector 4 Outlet Only</option>
                  </select>
                </div>
              </div>

              {/* SECTION 3: SIZES FOR ALL VARIANTS */}
              <div className="space-y-3 p-4 bg-zinc-900/40 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                      Available Sizes (All Variants) <span className="text-red-400">*</span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Select which sizes customers can purchase or inquire for.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSizes(COMMON_SHIRT_SIZES)}
                      className="px-2.5 py-1 text-[11px] bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded border border-white/10"
                    >
                      All Tops (S-4XL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSizes(COMMON_WAIST_SIZES)}
                      className="px-2.5 py-1 text-[11px] bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded border border-white/10"
                    >
                      All Bottoms (28-44)
                    </button>
                  </div>
                </div>

                {/* Size Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[...new Set([...COMMON_SHIRT_SIZES, ...COMMON_WAIST_SIZES, ...selectedSizes])].map((s) => {
                    const isSelected = selectedSizes.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleToggleSize(s)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-sm'
                            : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Size Adder */}
                <div className="flex items-center gap-2 pt-2 max-w-xs">
                  <input
                    type="text"
                    placeholder="Add custom size (e.g. 46, Free Size)"
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSize}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium text-white rounded transition-colors"
                  >
                    + Add Size
                  </button>
                </div>
              </div>

              {/* SECTION 4: COLOR VARIANTS */}
              <div className="space-y-3 p-4 bg-zinc-900/40 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                      Color Variants ({colorVariants.length}) <span className="text-red-400">*</span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Add every color variant available for this garment design.
                    </p>
                  </div>
                </div>

                {/* Existing Color Chips */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {colorVariants.map((col, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-lg border border-white/10 text-xs text-white"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                      {colorVariants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(idx)}
                          className="text-zinc-500 hover:text-red-400 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Add Presets */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1.5">
                    Quick Color Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_COLORS.map((qc) => (
                      <button
                        key={qc.name}
                        type="button"
                        onClick={() => handleQuickAddColor(qc)}
                        className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[11px] text-zinc-300 border border-white/5"
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: qc.hex }} />
                        <span>{qc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-2 pt-2 max-w-sm">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer p-0.5"
                    title="Choose color shade"
                  />
                  <input
                    type="text"
                    placeholder="Color Name (e.g. Royal Maroon)"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddColorVariant}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium text-white rounded transition-colors"
                  >
                    + Add Color
                  </button>
                </div>
              </div>

              {/* SECTION 5: WEEKEND OFFER DETAILS (Conditional) */}
              {isWeekendOffer && (
                <div className="space-y-4 p-5 rounded-xl bg-gradient-to-br from-red-950/30 to-amber-950/20 border border-amber-500/40 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Flame className="w-4 h-4" />
                    <h4 className="text-xs uppercase tracking-widest font-bold">
                      Weekend Offer Customization
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                        Offer Badge Label
                      </label>
                      <input
                        type="text"
                        value={offerBadge}
                        onChange={(e) => setOfferBadge(e.target.value)}
                        placeholder="e.g. WEEKEND SPECIAL, BUY 2 GET 1, FLAT 25% OFF"
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                        Offer Validity Time
                      </label>
                      <input
                        type="text"
                        value={validUntil}
                        onChange={(e) => setValidUntil(e.target.value)}
                        placeholder="e.g. Sunday 10 PM, This Saturday & Sunday"
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                        Offer Title / Description
                      </label>
                      <input
                        type="text"
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                        placeholder="e.g. Weekend Flash Offer: Buy Any 2 and Get 1 Free on all sizes!"
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                    isWeekendOffer
                      ? 'bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-black hover:scale-105'
                      : 'bg-[#d4af37] text-black hover:bg-[#c5a028] hover:scale-105'
                  }`}
                >
                  {isWeekendOffer ? <Flame className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isWeekendOffer ? 'Post Weekend Offer Live' : 'Publish Product to Catalog'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Manage Added Products Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-sm font-semibold text-white">
                  Your Added Products ({customProducts.length})
                </h3>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-3 py-1.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Product</span>
                </button>
              </div>

              {customProducts.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 space-y-3">
                  <Tag className="w-10 h-10 mx-auto opacity-40 text-[#d4af37]" />
                  <p className="text-sm">You haven't added any custom products yet.</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white rounded-lg transition-colors"
                  >
                    + Add Your First Product & Weekend Offer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex items-start gap-4"
                    >
                      <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-black flex-shrink-0">
                        <img
                          src={p.images.front}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#d4af37] uppercase font-bold">
                            {p.fit} · {p.category}
                          </span>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="text-zinc-500 hover:text-red-400 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-sm font-semibold text-white truncate">{p.name}</h4>
                        <div className="text-xs text-zinc-400">
                          Sizes: {p.availableSizes?.join(', ')}
                        </div>

                        {/* Weekend Offer Toggle */}
                        <div className="pt-2 flex items-center justify-between">
                          <button
                            onClick={() => toggleWeekendOffer(p.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                              p.isWeekendOffer
                                ? 'bg-red-600/30 text-amber-300 border border-amber-500/40'
                                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                            }`}
                          >
                            <Flame className="w-3 h-3" />
                            <span>{p.isWeekendOffer ? 'Weekend Offer ON' : 'Turn Offer ON'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
