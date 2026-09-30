import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, FitType, ColorVariant, CATEGORIES_LIST } from '../data/products';
import { uploadImageApi } from '../services/api';
import {
  X,
  Upload,
  Check,
  Flame,
  Palette,
  Layers,
  Image as ImageIcon,
  Tag,
  Save,
  Trash2,
  AlertCircle,
  Copy,
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

export const AdminEditProductModal: React.FC = () => {
  const {
    adminEditingProduct,
    setAdminEditingProduct,
    updateProduct,
    deleteProduct,
    isAdminLoggedIn,
    showToast,
  } = useShop();

  if (!isAdminLoggedIn || !adminEditingProduct) return null;

  return (
    <AdminEditModalInner
      product={adminEditingProduct}
      onClose={() => setAdminEditingProduct(null)}
      onSave={async (updated) => {
        await updateProduct(updated);
        setAdminEditingProduct(null);
      }}
      onDelete={async (id) => {
        await deleteProduct(id);
        setAdminEditingProduct(null);
      }}
    />
  );
};

interface InnerProps {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const AdminEditModalInner: React.FC<InnerProps> = ({
  product,
  onClose,
  onSave,
  onDelete,
}) => {
  const { showToast } = useShop();

  // Basic Info
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [fit, setFit] = useState<FitType>(product.fit);
  const [fabric, setFabric] = useState(product.fabric);
  const [description, setDescription] = useState(product.description);

  // Images
  const [frontImage, setFrontImage] = useState(product.images.front || '');
  const [backImage, setBackImage] = useState(product.images.back || '');
  const [sideImage, setSideImage] = useState(product.images.side || '');
  const [zoomImage, setZoomImage] = useState(product.images.zoom || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sizes
  const [availableSizes, setAvailableSizes] = useState<string[]>(
    product.availableSizes || ['M', 'L', 'XL']
  );
  const [customSizeInput, setCustomSizeInput] = useState('');

  // Colors
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>(
    product.colorVariants || [{ name: 'Standard', hex: '#111111' }]
  );
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#2C3E50');

  // Weekend & Combo Offer
  const [isWeekendOffer, setIsWeekendOffer] = useState<boolean>(!!product.isWeekendOffer);
  const [offerType, setOfferType] = useState<'standard' | 'combo'>(
    product.weekendOfferDetails?.offerType || 'standard'
  );
  const [offerBadge, setOfferBadge] = useState<string>(
    product.weekendOfferDetails?.badge || 'WEEKEND SPECIAL'
  );
  const [offerTitle, setOfferTitle] = useState<string>(
    product.weekendOfferDetails?.offerTitle || 'Special Weekend Deal on all sizes & colors'
  );
  const [comboItems, setComboItems] = useState<string>(
    product.weekendOfferDetails?.comboItems || 'Buy 2 Items + Get 1 Free In-Store'
  );
  const [validUntil, setValidUntil] = useState<string>(
    product.weekendOfferDetails?.validUntil || 'Sunday 10 PM'
  );
  const [outletLocation, setOutletLocation] = useState<string>(
    product.weekendOfferDetails?.outletLocation || 'Both Siwandih & Sector 4 Outlets'
  );

  const [activeTab, setActiveTab] = useState<'images' | 'details' | 'offer'>('images');
  const [isSaving, setIsSaving] = useState(false);

  // Handle local file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      if (typeof reader.result === 'string') {
        const dataUrl = reader.result;
        // Try uploading to server
        const res = await uploadImageApi(dataUrl);
        if (res.success && res.url) {
          setFrontImage(res.url);
          showToast('Image uploaded and saved to server!');
        } else {
          // fallback to base64
          setFrontImage(dataUrl);
          showToast('Image updated (local preview ready)');
        }
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyFrontToAll = () => {
    if (!frontImage) return;
    setBackImage(frontImage);
    setSideImage(frontImage);
    setZoomImage(frontImage);
    showToast('Applied front image to all camera angles');
  };

  const handleToggleSize = (size: string) => {
    setAvailableSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleAddCustomSize = () => {
    const trimmed = customSizeInput.trim().toUpperCase();
    if (trimmed && !availableSizes.includes(trimmed)) {
      setAvailableSizes((prev) => [...prev, trimmed]);
      setCustomSizeInput('');
    }
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setColorVariants((prev) => [...prev, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  const handleRemoveColor = (idx: number) => {
    if (colorVariants.length <= 1) return;
    setColorVariants((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updated: Product = {
      ...product,
      name: name.trim(),
      category,
      fit,
      fabric: fabric.trim(),
      description: description.trim(),
      images: {
        front: frontImage.trim() || product.images.front,
        back: backImage.trim() || frontImage.trim() || product.images.back,
        side: sideImage.trim() || frontImage.trim() || product.images.side,
        zoom: zoomImage.trim() || frontImage.trim() || product.images.zoom,
      },
      availableSizes: availableSizes.length > 0 ? availableSizes : ['M', 'L', 'XL'],
      colorVariants: colorVariants.length > 0 ? colorVariants : product.colorVariants,
      isWeekendOffer,
      weekendOfferDetails: isWeekendOffer
        ? {
            badge: offerBadge.trim() || (offerType === 'combo' ? 'WEEKEND COMBO' : 'WEEKEND SPECIAL'),
            offerType,
            offerTitle: offerTitle.trim(),
            comboItems: offerType === 'combo' ? comboItems.trim() : undefined,
            validUntil: validUntil.trim(),
            highlightText:
              offerType === 'combo'
                ? `Combo Deal · Available in sizes ${availableSizes.join(', ')}`
                : `Available across all sizes (${availableSizes.join(', ')}) & ${colorVariants.length} color variants`,
            outletLocation,
          }
        : undefined,
    };

    await onSave(updated);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl border border-[#d4af37]/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-600 text-black">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded">
                  Admin Edit
                </span>
                <span className="text-xs text-zinc-400 font-mono">SKU: {product.sku}</span>
              </div>
              <h2 className="font-editorial text-2xl text-white tracking-wide truncate max-w-lg mt-0.5">
                {product.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 bg-zinc-900/40 text-xs font-semibold px-6">
          <button
            onClick={() => setActiveTab('images')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'images'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Product Images (Change Photo)</span>
          </button>

          <button
            onClick={() => setActiveTab('offer')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'offer'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Weekend & Combo Offers</span>
            {isWeekendOffer && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'details'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Specifications & Variants</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: PRODUCT IMAGES */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              {/* Primary Image Upload Banner */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>Primary Catalog Image (Front View)</span>
                      <span className="text-[10px] text-[#d4af37] uppercase font-bold tracking-wider">
                        Main Display
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Upload from your phone or PC, or paste any direct web image link.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyFrontToAll}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Apply Front Image to All Angles</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left: Upload and URL controls */}
                  <div className="md:col-span-8 space-y-3">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 hover:border-[#d4af37]/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-2"
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
                      <span className="text-xs font-semibold text-white">
                        {isUploading ? 'Uploading & saving...' : 'Click to Upload New Image From Device'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Supports JPG, PNG, WEBP (Saved to Ubuntu server storage)
                      </span>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                        Or Paste Direct Image URL
                      </label>
                      <input
                        type="url"
                        value={frontImage}
                        onChange={(e) => setFrontImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  {/* Right: Live Preview */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 mb-2">
                      Live Catalog Preview
                    </span>
                    <div className="relative w-36 aspect-[3/4] rounded-xl overflow-hidden bg-black border border-white/15 shadow-xl">
                      <img
                        src={frontImage}
                        alt="Front Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 text-[9px] bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-white font-mono">
                        FRONT
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Multi-Angle Images */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                  Additional Angles (Side, Back & Zoom)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Side */}
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-300 font-medium">Side Angle Photo URL</label>
                    <input
                      type="url"
                      value={sideImage}
                      onChange={(e) => setSideImage(e.target.value)}
                      placeholder="Side photo URL"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black border border-white/10">
                      <img src={sideImage || frontImage} alt="Side" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Back */}
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-300 font-medium">Back Angle Photo URL</label>
                    <input
                      type="url"
                      value={backImage}
                      onChange={(e) => setBackImage(e.target.value)}
                      placeholder="Back photo URL"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black border border-white/10">
                      <img src={backImage || frontImage} alt="Back" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Zoom */}
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-300 font-medium">Zoom Fabric Detail URL</label>
                    <input
                      type="url"
                      value={zoomImage}
                      onChange={(e) => setZoomImage(e.target.value)}
                      placeholder="Zoom photo URL"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black border border-white/10">
                      <img src={zoomImage || frontImage} alt="Zoom" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEEKEND & COMBO OFFERS */}
          {activeTab === 'offer' && (
            <div className="space-y-6">
              {/* Offer Activation Toggle */}
              <div
                onClick={() => setIsWeekendOffer(!isWeekendOffer)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isWeekendOffer
                    ? 'bg-gradient-to-r from-red-950/50 via-amber-950/30 to-zinc-900 border-amber-500/50 shadow-lg'
                    : 'bg-zinc-900/50 border-white/10'
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
                      <span>Weekend Offer Status</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          isWeekendOffer ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {isWeekendOffer ? 'ACTIVE ON WEBSITE' : 'OFF'}
                      </span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      When active, this product appears in the "Weekend Special Deals" showcase and displays promotional banners.
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

              {isWeekendOffer && (
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-amber-500/40 space-y-5 animate-in fade-in duration-200">
                  {/* Offer Type Selection (Combo vs Standard) */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-2">
                      Select Offer Category
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setOfferType('standard');
                          setOfferBadge('WEEKEND SPECIAL');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          offerType === 'standard'
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-white font-semibold'
                            : 'bg-zinc-900 border-white/10 text-zinc-400'
                        }`}
                      >
                        <span className="text-xs font-bold block text-white">Standard Weekend Deal</span>
                        <span className="text-[11px] text-zinc-400">
                          Single product discount or free styling gift
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOfferType('combo');
                          setOfferBadge('WEEKEND COMBO');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          offerType === 'combo'
                            ? 'bg-red-600/20 border-red-500 text-white font-semibold'
                            : 'bg-zinc-900 border-white/10 text-zinc-400'
                        }`}
                      >
                        <span className="text-xs font-bold block text-amber-300 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-red-400" />
                          <span>🔥 Weekend Combo Offer</span>
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          Multi-item bundle (e.g. Buy 2 Get 1, Shirt + Chino combo)
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                        Offer Badge Text
                      </label>
                      <input
                        type="text"
                        value={offerBadge}
                        onChange={(e) => setOfferBadge(e.target.value)}
                        placeholder="e.g. WEEKEND COMBO, BUY 2 GET 1, FLAT 30% OFF"
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
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
                        placeholder="e.g. Sunday 10 PM, This Weekend Only"
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                        Offer Headline / Promotional Title
                      </label>
                      <input
                        type="text"
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                        placeholder="e.g. Buy Any 2 Heavyweight Cotton Tees, Get 1 Streetwear Beanie Free!"
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                      />
                    </div>

                    {offerType === 'combo' && (
                      <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                          Combo Bundle Items & Terms
                        </label>
                        <input
                          type="text"
                          value={comboItems}
                          onChange={(e) => setComboItems(e.target.value)}
                          placeholder="e.g. 2 Formal Shirts + 1 Chino Trousers + Complimentary Cufflinks"
                          className="w-full bg-zinc-900 border border-red-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                        Outlet Availability
                      </label>
                      <select
                        value={outletLocation}
                        onChange={(e) => setOutletLocation(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Both Siwandih & Sector 4 Outlets">Both Siwandih & Sector 4</option>
                        <option value="Siwandih Main Road Flagship">Siwandih Outlet Only</option>
                        <option value="Sector 4 Harshvardhan Plaza">Sector 4 Outlet Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DETAILS & VARIANTS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Silhouette / Fit
                  </label>
                  <select
                    value={fit}
                    onChange={(e) => setFit(e.target.value as FitType)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
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
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Garment Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Fabric & Composition
                  </label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Description & Styling Notes
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                    Available Sizes ({availableSizes.length})
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAvailableSizes(COMMON_SHIRT_SIZES)}
                      className="px-2.5 py-1 text-[11px] bg-white/5 hover:bg-white/10 text-zinc-300 rounded border border-white/10"
                    >
                      Tops (S-4XL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvailableSizes(COMMON_WAIST_SIZES)}
                      className="px-2.5 py-1 text-[11px] bg-white/5 hover:bg-white/10 text-zinc-300 rounded border border-white/10"
                    >
                      Bottoms (28-44)
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {[...new Set([...COMMON_SHIRT_SIZES, ...COMMON_WAIST_SIZES, ...availableSizes])].map((s) => {
                    const isSelected = availableSizes.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleToggleSize(s)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4af37] text-black border-[#d4af37]'
                            : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 pt-2 max-w-xs">
                  <input
                    type="text"
                    placeholder="Custom size"
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSize}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-white rounded"
                  >
                    + Add Size
                  </button>
                </div>
              </div>

              {/* Color Variants */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                  Color Variants ({colorVariants.length})
                </h4>

                <div className="flex flex-wrap gap-2 pt-1">
                  {colorVariants.map((col, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-lg border border-white/10 text-xs text-white"
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: col.hex }} />
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

                <div className="flex items-center gap-2 pt-2 max-w-sm">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    placeholder="New color name"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-white rounded"
                  >
                    + Add Color
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {product.id.startsWith('custom-') ? (
              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Product</span>
              </button>
            ) : (
              <div className="text-[11px] text-zinc-500 font-mono">
                Store ID: {product.id}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-7 py-2.5 bg-gradient-to-r from-[#d4af37] to-amber-500 hover:from-[#c5a028] hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Changes...' : 'Save Product & Image'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
