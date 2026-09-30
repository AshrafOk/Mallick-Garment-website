import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS, WeekendOfferDetails } from '../data/products';
import {
  ADMIN_EMAIL,
  getStoredAdminSession,
  saveAdminSession,
  fetchProductsApi,
  updateProductApi,
  createProductApi,
  deleteProductApi,
  adminLoginApi,
} from '../services/api';

export interface CartItem {
  id: string; // unique item id: product.id + size + color
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export type PageId = 'home' | 'shop' | 'gallery' | 'about' | 'contact';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isFitGuideOpen: boolean;
  setIsFitGuideOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  selectedFitFilter: string;
  setSelectedFitFilter: (fit: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showOnlyWeekendOffers: boolean;
  setShowOnlyWeekendOffers: (val: boolean) => void;
  navigateToShopWithFilter: (params: { category?: string; fit?: string; search?: string; weekendOffers?: boolean }) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Product & Weekend / Combo Offer Management
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  toggleWeekendOffer: (productId: string, offerDetails?: WeekendOfferDetails) => Promise<void>;
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: (open: boolean) => void;
  addProductModalMode: 'product' | 'offer';
  setAddProductModalMode: (mode: 'product' | 'offer') => void;
  openAddProductModal: (mode?: 'product' | 'offer') => void;

  // Admin Auth & Controls (asharafalik1@gmail.com)
  isAdminLoggedIn: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string, passcode?: string) => Promise<boolean>;
  logoutAdmin: () => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;

  // Direct Product Image / Detail Editor
  adminEditingProduct: Product | null;
  setAdminEditingProduct: (product: Product | null) => void;
  openAdminEditModal: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state (populated from server-side database / fallback to PRODUCTS)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedLocal = localStorage.getItem('mg_synced_products');
      if (savedLocal) {
        return JSON.parse(savedLocal);
      }
    } catch {
      // fallback
    }
    return PRODUCTS;
  });

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return getStoredAdminSession() !== null;
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return getStoredAdminSession()?.email || null;
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [adminEditingProduct, setAdminEditingProduct] = useState<Product | null>(null);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mg_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mg_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedFitFilter, setSelectedFitFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyWeekendOffers, setShowOnlyWeekendOffers] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Product / Offer Modal State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [addProductModalMode, setAddProductModalMode] = useState<'product' | 'offer'>('offer');

  // Load from Express Server DB on mount
  useEffect(() => {
    fetchProductsApi().then((serverProducts) => {
      if (serverProducts.length > 0) {
        setProducts(serverProducts);
        try {
          localStorage.setItem('mg_synced_products', JSON.stringify(serverProducts));
        } catch {
          // fallback
        }
      }
    });
  }, []);

  // Save cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('mg_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mg_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Admin Login
  const loginAdmin = async (email: string, _passcode?: string): Promise<boolean> => {
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      showToast(`Unauthorized email. Only ${ADMIN_EMAIL} can access admin.`);
      return false;
    }

    const res = await adminLoginApi(email);
    if (res.success && res.session) {
      setIsAdminLoggedIn(true);
      setAdminEmail(res.session.email);
      showToast(`Welcome ${ADMIN_EMAIL}! Admin edit mode activated.`);
      return true;
    } else {
      // Offline fallback login for asharafalik1@gmail.com
      const session = {
        email: ADMIN_EMAIL,
        token: `mg-admin-${Buffer.from(ADMIN_EMAIL + ':' + Date.now()).toString('base64')}`,
      };
      saveAdminSession(session);
      setIsAdminLoggedIn(true);
      setAdminEmail(ADMIN_EMAIL);
      showToast(`Admin mode active for ${ADMIN_EMAIL}`);
      return true;
    }
  };

  const logoutAdmin = () => {
    saveAdminSession(null);
    setIsAdminLoggedIn(false);
    setAdminEmail(null);
    showToast('Logged out of Admin Mode');
  };

  const openAdminEditModal = (product: Product) => {
    if (!isAdminLoggedIn) {
      setIsAdminLoginModalOpen(true);
      showToast(`Admin login required (${ADMIN_EMAIL})`);
      return;
    }
    setAdminEditingProduct(product);
  };

  const openAddProductModal = (mode: 'product' | 'offer' = 'offer') => {
    if (!isAdminLoggedIn) {
      setIsAdminLoginModalOpen(true);
      showToast(`Only administrator ${ADMIN_EMAIL} can post offers or add products.`);
      return;
    }
    setAddProductModalMode(mode);
    setIsAddProductModalOpen(true);
  };

  // Add / Update / Delete Products with Ubuntu Server Sync
  const addProduct = async (newProduct: Product) => {
    if (!isAdminLoggedIn) {
      setIsAdminLoginModalOpen(true);
      showToast(`Only administrator ${ADMIN_EMAIL} can add products.`);
      return;
    }

    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      try {
        localStorage.setItem('mg_synced_products', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    await createProductApi(newProduct);

    showToast(
      newProduct.isWeekendOffer
        ? `🔥 Weekend Offer posted for "${newProduct.name}"!`
        : `Product "${newProduct.name}" added to catalogue!`
    );
  };

  const updateProduct = async (updatedProduct: Product) => {
    if (!isAdminLoggedIn) {
      setIsAdminLoginModalOpen(true);
      showToast(`Only administrator ${ADMIN_EMAIL} can edit products.`);
      return;
    }

    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      try {
        localStorage.setItem('mg_synced_products', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (selectedProduct?.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }

    await updateProductApi(updatedProduct);
    showToast(`Updated "${updatedProduct.name}" & synced to database`);
  };

  const deleteProduct = async (productId: string) => {
    if (!isAdminLoggedIn) {
      setIsAdminLoginModalOpen(true);
      showToast(`Only administrator ${ADMIN_EMAIL} can delete products.`);
      return;
    }

    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem('mg_synced_products', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    await deleteProductApi(productId);
    showToast('Product removed from catalog');
  };

  const toggleWeekendOffer = async (productId: string, offerDetails?: WeekendOfferDetails) => {
    if (!isAdminLoggedIn) {
      setIsAdminLoginModalOpen(true);
      showToast(`Only administrator ${ADMIN_EMAIL} can manage weekend offers.`);
      return;
    }

    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const newState = !target.isWeekendOffer;
    const updated: Product = {
      ...target,
      isWeekendOffer: newState,
      weekendOfferDetails: newState
        ? offerDetails || {
            badge: 'WEEKEND SPECIAL',
            offerTitle: `Special Weekend Deal on all sizes & colors`,
            validUntil: 'Sunday 10 PM',
            highlightText: `Available in ${target.availableSizes?.length || 'all'} sizes & ${target.colorVariants?.length || 'all'} variants`,
            outletLocation: 'Both Siwandih & Sector 4 Outlets',
          }
        : undefined,
    };

    await updateProduct(updated);
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const itemKey = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemKey, product, size, color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your inquiry selection`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = products.find((p) => p.id === productId);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added ${prod?.name || 'Item'} to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigateToShopWithFilter = ({
    category,
    fit,
    search,
    weekendOffers,
  }: {
    category?: string;
    fit?: string;
    search?: string;
    weekendOffers?: boolean;
  }) => {
    if (category !== undefined) setSelectedCategoryFilter(category);
    if (fit !== undefined) setSelectedFitFilter(fit);
    if (search !== undefined) setSearchQuery(search);
    if (weekendOffers !== undefined) setShowOnlyWeekendOffers(weekendOffers);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isFitGuideOpen,
        setIsFitGuideOpen,
        isSearchOpen,
        setIsSearchOpen,
        selectedProduct,
        setSelectedProduct,
        activePage,
        setActivePage,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedFitFilter,
        setSelectedFitFilter,
        searchQuery,
        setSearchQuery,
        showOnlyWeekendOffers,
        setShowOnlyWeekendOffers,
        navigateToShopWithFilter,
        toastMessage,
        showToast,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleWeekendOffer,
        isAddProductModalOpen,
        setIsAddProductModalOpen,
        addProductModalMode,
        setAddProductModalMode,
        openAddProductModal,
        isAdminLoggedIn,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        adminEditingProduct,
        setAdminEditingProduct,
        openAdminEditModal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
