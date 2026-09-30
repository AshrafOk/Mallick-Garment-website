export type FitType =
  | 'Slim Fit'
  | 'Regular Fit'
  | 'Straight Fit'
  | 'Relaxed Fit'
  | 'Baggy Fit'
  | 'Oversized Fit';

export type ParentCategory =
  | 'shirts'
  | 'tshirts'
  | 'jeans'
  | 'trousers'
  | 'trackpants';

export interface ProductImages {
  front: string;
  back: string;
  side: string;
  zoom: string;
}

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  parentCategory: ParentCategory;
  fit: FitType;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  images: ProductImages;
  colorVariants: ColorVariant[];
  availableSizes: string[];
  fabric: string;
  gsm?: string;
  description: string;
  washCare: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  modelSpecs?: string;
}

export const WAIST_SIZES = [
  '28',
  '30',
  '32',
  '34',
  '36',
  '38',
  '40',
  '42',
  '44',
  '46',
  '48',
];
export const SHIRT_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

export const FIT_DESCRIPTIONS: Record<
  FitType,
  { short: string; details: string }
> = {
  'Slim Fit': {
    short: 'Contoured & Tapered',
    details:
      'Cut close to the chest, torso, and legs with ergonomic tapering for a sharp, sleek silhouette.',
  },
  'Regular Fit': {
    short: 'Classic & Balanced',
    details:
      'Traditional tailoring providing balanced comfort with standard ease across shoulders and hem.',
  },
  'Straight Fit': {
    short: 'Even Hip-to-Hem Line',
    details:
      'Straight through the body and thigh with uniform width down to the ankle. Timeless and versatile.',
  },
  'Relaxed Fit': {
    short: 'Airy & Non-Restrictive',
    details:
      'Generous room around chest, thighs, and seat for effortless movement and all-day comfort.',
  },
  'Baggy Fit': {
    short: 'Voluminous & Street-Ready',
    details:
      'Exaggerated wide-leg drape inspired by 90s skateboarding and modern Japanese streetwear.',
  },
  'Oversized Fit': {
    short: 'Drop-Shoulder Boxy Silhouette',
    details:
      'Dropped shoulder seams, broad chest width, and extended sleeves for an effortless high-fashion drape.',
  },
};

export const CATEGORIES_LIST = [
  // Shirts
  'Formal Shirts',
  'Casual Shirts',
  'Printed Shirts',
  'Checked Shirts',
  'Party Wear Shirts',
  'Oversized Shirts',
  // T-Shirts
  'Polo T-Shirts',
  'Round Neck T-Shirts',
  'Graphic T-Shirts',
  'Oversized T-Shirts',
  // Jeans
  'Straight Fit Jeans',
  'Slim Fit Jeans',
  'Regular Fit Jeans',
  'Relaxed Fit Jeans',
  'Baggy Jeans',
  'Stretchable Jeans',
  // Trousers
  'Formal Trousers',
  'Casual Trousers',
  'Cotton Trousers',
  'Chinos',
  'Baggy Trousers',
  'Straight Fit Trousers',
  // Track Pants
  "Men's Track Pants",
  'Gym Track Pants',
  'Joggers',
  'Cargo Track Pants',
] as const;

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. FORMAL SHIRTS
  // ==========================================
  {
    id: 'formal-shirt-01',
    name: 'Sartorial Pure Egyptian Cotton Formal Shirt',
    sku: 'MG-FS-010',
    category: 'Formal Shirts',
    parentCategory: 'shirts',
    fit: 'Slim Fit',
    price: 1899,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 48,
    images: {
      front:
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'French Sky Blue', hex: '#A7C7E7' },
      { name: 'Charcoal Black', hex: '#1C1C1E' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    fabric: '100% Superfine Egyptian Compact Cotton (120s Two-Ply)',
    gsm: '135 GSM',
    description:
      'Impeccably tailored with German fused spread collars and mother-of-pearl buttons. Designed for boardroom presence and celebratory evenings in Bokaro.',
    washCare: [
      'Machine wash gentle in cold water',
      'Do not bleach',
      'Warm steam iron with collar stays in place',
      'Hang dry immediately after wash',
    ],
    isBestSeller: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'1" wearing size L (Chest 40")',
  },
  {
    id: 'formal-shirt-02',
    name: 'Executive Twill Spread Collar Shirt',
    sku: 'MG-FS-012',
    category: 'Formal Shirts',
    parentCategory: 'shirts',
    fit: 'Regular Fit',
    price: 1699,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 32,
    images: {
      front:
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Dusty Slate', hex: '#708090' },
      { name: 'Pure White', hex: '#FAFAFA' },
      { name: 'Navy Midnight', hex: '#0B1B3D' },
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    fabric: '100% Giza Cotton Twill Weave with Wrinkle-Resistant Finish',
    gsm: '140 GSM',
    description:
      'A dense twill weave with lustrous sheen and all-day drape. Structured collar bands prevent curling under suit jackets.',
    washCare: [
      'Machine wash cold with like colors',
      'Medium heat iron',
      'Tumble dry low or air dry',
    ],
    modelSpecs: 'Model is 5\'11" wearing size M',
  },

  // ==========================================
  // 2. CASUAL SHIRTS
  // ==========================================
  {
    id: 'casual-shirt-01',
    name: 'Washed Indigo Oxford Button-Down Shirt',
    sku: 'MG-CS-021',
    category: 'Casual Shirts',
    parentCategory: 'shirts',
    fit: 'Relaxed Fit',
    price: 1499,
    originalPrice: 2299,
    rating: 4.8,
    reviewCount: 65,
    images: {
      front:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Indigo Blue', hex: '#3F51B5' },
      { name: 'Olive Drab', hex: '#556B2F' },
      { name: 'Stone Grey', hex: '#808080' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    fabric: 'Heavyweight Garment-Dyed Cotton Oxford',
    gsm: '165 GSM',
    description:
      'Classic Ivy League aesthetic with soft garment-wash treatment. Features rolled button-down collar and rear locker loop.',
    washCare: [
      'Machine wash 30°C',
      'Do not wring',
      'Line dry in shade to preserve wash depth',
    ],
    isBestSeller: true,
    modelSpecs: 'Model is 6\'0" wearing size L',
  },

  // ==========================================
  // 3. PRINTED SHIRTS
  // ==========================================
  {
    id: 'printed-shirt-01',
    name: 'Abstract Botanical Resort Collar Shirt',
    sku: 'MG-PS-033',
    category: 'Printed Shirts',
    parentCategory: 'shirts',
    fit: 'Relaxed Fit',
    price: 1599,
    originalPrice: 2399,
    rating: 4.9,
    reviewCount: 42,
    images: {
      front:
        'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Onyx Botanical', hex: '#1B1B1B' },
      { name: 'Earthy Terracotta', hex: '#A0522D' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: '100% Breathable Viscose Rayon Fabric',
    gsm: '125 GSM',
    description:
      'Silky handfeel with open Cuban camp collar. Bold monochromatic botanical illustration designed for weekend parties and elevated casual outings.',
    washCare: [
      'Gentle hand wash or delicate machine cycle',
      'Cool iron inside out',
    ],
    isTrending: true,
    modelSpecs: 'Model is 6\'0" wearing size M',
  },

  // ==========================================
  // 4. CHECKED SHIRTS
  // ==========================================
  {
    id: 'checked-shirt-01',
    name: 'Heritage Buffalo Shadow Check Flannel Shirt',
    sku: 'MG-CHS-044',
    category: 'Checked Shirts',
    parentCategory: 'shirts',
    fit: 'Regular Fit',
    price: 1699,
    originalPrice: 2599,
    rating: 4.7,
    reviewCount: 51,
    images: {
      front:
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Burgundy & Black', hex: '#581845' },
      { name: 'Forest Green Plaid', hex: '#1E4D2B' },
      { name: 'Smoke & Slate', hex: '#37474F' },
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    fabric: '100% Brushed Double-Faced Cotton Flannel',
    gsm: '190 GSM',
    description:
      'Substantial brushed cotton flannel built for winter layered looks over graphic tees or standalone with straight denim.',
    washCare: [
      'Wash inside out in cold water',
      'Do not tumble dry',
      'Warm iron',
    ],
    modelSpecs: 'Model is 6\'2" wearing size XL',
  },

  // ==========================================
  // 5. PARTY WEAR SHIRTS
  // ==========================================
  {
    id: 'partywear-shirt-01',
    name: 'Satin Lustre Nocturne Black Shirt',
    sku: 'MG-PWS-055',
    category: 'Party Wear Shirts',
    parentCategory: 'shirts',
    fit: 'Slim Fit',
    price: 1999,
    originalPrice: 2999,
    rating: 4.9,
    reviewCount: 57,
    images: {
      front:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Pitch Midnight', hex: '#0A0A0A' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Emerald Velvet Tone', hex: '#0F52BA' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'High-Density Mercerized Silk-Cotton Blend',
    gsm: '145 GSM',
    description:
      'Deep luminous sheen with concealed placket and structured cutaway collar. Designed for red-carpet, wedding receptions, and celebratory evenings.',
    washCare: [
      'Dry clean recommended or gentle hand wash',
      'Low temperature steam',
    ],
    isTrending: true,
    isBestSeller: true,
    modelSpecs: 'Model is 6\'1" wearing size L',
  },

  // ==========================================
  // 6. OVERSIZED SHIRTS
  // ==========================================
  {
    id: 'oversized-shirt-01',
    name: 'Minimalist Boxy Drop-Shoulder Heavy Poplin Shirt',
    sku: 'MG-OS-066',
    category: 'Oversized Shirts',
    parentCategory: 'shirts',
    fit: 'Oversized Fit',
    price: 1799,
    originalPrice: 2699,
    rating: 4.9,
    reviewCount: 68,
    images: {
      front:
        'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Chalk White', hex: '#F0F0F0' },
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Washed Khaki', hex: '#8F8B66' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    fabric: 'Dense 100% Poplin Cotton with Peached Surface',
    gsm: '160 GSM',
    description:
      'Zara & Snitch inspired boxy drape with extended low drop shoulders, clean square hem, and chest utility envelope pocket.',
    washCare: [
      'Machine wash cold on gentle cycle',
      'Air dry flat',
      'Warm iron',
    ],
    isNewArrival: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'0" wearing size M (Oversized Cut)',
  },

  // ==========================================
  // 7. POLO T-SHIRTS
  // ==========================================
  {
    id: 'polo-tshirt-01',
    name: 'Mercerized Piqué Milano Knit Polo',
    sku: 'MG-PL-071',
    category: 'Polo T-Shirts',
    parentCategory: 'tshirts',
    fit: 'Slim Fit',
    price: 1399,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 74,
    images: {
      front:
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Midnight Charcoal', hex: '#1C1C1E' },
      { name: 'Racing Green', hex: '#0B3B24' },
      { name: 'Oatmeal Heather', hex: '#D2B48C' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    fabric: '100% Combed Compact Cotton Honeycomb Piqué',
    gsm: '230 GSM',
    description:
      'Engineered knit collar that never rolls or curls with 3-button placket and ribbed arm bands.',
    washCare: [
      'Machine wash 30°C',
      'Do not wring collar',
      'Dry flat in shade',
    ],
    isBestSeller: true,
    modelSpecs: 'Model is 6\'1" wearing size L',
  },

  // ==========================================
  // 8. ROUND NECK T-SHIRTS
  // ==========================================
  {
    id: 'round-neck-01',
    name: 'Heavyweight Supima Cotton Essential Tee',
    sku: 'MG-RN-082',
    category: 'Round Neck T-Shirts',
    parentCategory: 'tshirts',
    fit: 'Regular Fit',
    price: 899,
    originalPrice: 1399,
    rating: 4.9,
    reviewCount: 110,
    images: {
      front:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Pure Chalk', hex: '#FFFFFF' },
      { name: 'Washed Anthracite', hex: '#2C2C2E' },
      { name: 'Vintage Mocha', hex: '#4A3728' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    fabric: '100% Long-Staple Supima Cotton',
    gsm: '220 GSM',
    description:
      'Dense, opaque fabric that holds its shape wash after wash. Seamless tubular sides with Lycra-reinforced rib neckband.',
    washCare: [
      'Machine wash cold',
      'Wash with similar colors',
      'Do not tumble dry',
    ],
    isBestSeller: true,
    modelSpecs: 'Model is 6\'0" wearing size L',
  },

  // ==========================================
  // 9. GRAPHIC T-SHIRTS
  // ==========================================
  {
    id: 'graphic-tshirt-01',
    name: 'Tokyo Underground Acid-Wash Graphic Tee',
    sku: 'MG-GT-093',
    category: 'Graphic T-Shirts',
    parentCategory: 'tshirts',
    fit: 'Relaxed Fit',
    price: 1199,
    originalPrice: 1799,
    rating: 4.8,
    reviewCount: 54,
    images: {
      front:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Washed Grey Marble', hex: '#48484A' },
      { name: 'Distressed Black', hex: '#1C1C1E' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    fabric: 'Heavy Mineral Wash French Cotton',
    gsm: '240 GSM',
    description:
      'High-density screen print with distressed vintage wash finish. High-fashion streetwear typography inspired by Shibuya fashion week.',
    washCare: [
      'Turn inside out before washing',
      'Do not iron directly on graphics',
      'Cold wash only',
    ],
    isTrending: true,
    modelSpecs: 'Model is 5\'11" wearing size L',
  },

  // ==========================================
  // 10. OVERSIZED T-SHIRTS
  // ==========================================
  {
    id: 'oversized-tshirt-01',
    name: 'Sculptural Heavyweight Drop-Shoulder Oversized Tee',
    sku: 'MG-OST-104',
    category: 'Oversized T-Shirts',
    parentCategory: 'tshirts',
    fit: 'Oversized Fit',
    price: 1299,
    originalPrice: 1899,
    rating: 4.9,
    reviewCount: 96,
    images: {
      front:
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Core Jet Black', hex: '#0B0B0C' },
      { name: 'Raw Bone White', hex: '#EAE6DF' },
      { name: 'Sage Moss', hex: '#657062' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    fabric: '260 GSM Heavyweight French Terry Cotton',
    gsm: '260 GSM',
    description:
      'Premium boxy oversized drape that does not cling to body. Pairs effortlessly with baggy denim and cargo joggers.',
    washCare: [
      'Machine wash gentle in cold water',
      'Dry flat in shade',
      'Steam iron',
    ],
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'1" wearing size L (Authentic Oversized Fit)',
  },

  // ==========================================
  // 11. STRAIGHT FIT JEANS
  // ==========================================
  {
    id: 'straight-fit-jeans-01',
    name: 'Raw Vintage Wash Straight-Leg Selvedge Jeans',
    sku: 'MG-SFJ-111',
    category: 'Straight Fit Jeans',
    parentCategory: 'jeans',
    fit: 'Straight Fit',
    price: 2499,
    originalPrice: 3799,
    rating: 4.9,
    reviewCount: 88,
    images: {
      front:
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Vintage Indigo', hex: '#1C2E4A' },
      { name: 'Washed Charcoal', hex: '#2B2B2B' },
      { name: 'Classic Bleached Blue', hex: '#5B7C99' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: '13.5 oz Rigid Authentic Ring-Spun Cotton Denim',
    description:
      'Straight from thigh to hem with subtle whiskering and hand-scraped abrasions. Copper rivets and signature brass shank buttons.',
    washCare: [
      'Wash inside out in cold water',
      'Wash infrequently to preserve denim patina',
      'Hang dry in shade',
    ],
    isBestSeller: true,
    modelSpecs: 'Model is 6\'1" wearing waist size 32 with 32" Inseam',
  },

  // ==========================================
  // 12. SLIM FIT JEANS
  // ==========================================
  {
    id: 'slim-fit-jeans-01',
    name: 'Hyper-Flex Deep Midnight Slim Jeans',
    sku: 'MG-SMJ-122',
    category: 'Slim Fit Jeans',
    parentCategory: 'jeans',
    fit: 'Slim Fit',
    price: 2299,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 79,
    images: {
      front:
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Midnight Raw Blue', hex: '#0F1A2C' },
      { name: 'Pitch Black', hex: '#000000' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40'],
    fabric: '98% Combed Cotton, 2% High-Recovery Elastane',
    description:
      'Precision contoured leg with maximum 4-way flexibility. Maintains shape throughout the day without bagging at knees.',
    washCare: [
      'Machine wash cold with like colors',
      'Do not tumble dry',
      'Iron on reverse',
    ],
    modelSpecs: 'Model is 6\'0" wearing waist size 32',
  },

  // ==========================================
  // 13. REGULAR FIT JEANS
  // ==========================================
  {
    id: 'regular-fit-jeans-01',
    name: 'All-Day Comfort Heritage Regular Denim',
    sku: 'MG-RFJ-133',
    category: 'Regular Fit Jeans',
    parentCategory: 'jeans',
    fit: 'Regular Fit',
    price: 2199,
    originalPrice: 3199,
    rating: 4.7,
    reviewCount: 64,
    images: {
      front:
        'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Dark Stone Wash', hex: '#263852' },
      { name: 'Mid Acid Wash', hex: '#4F6D8A' },
    ],
    availableSizes: ['30', '32', '34', '36', '38', '40', '42', '44', '46', '48'],
    fabric: '100% Breathable Ringspun Denim',
    description:
      'Classic mid-rise with standard leg room. Specially designed for daily work and active lifestyle in Bokaro.',
    washCare: ['Machine wash cold', 'Warm iron', 'Line dry in shade'],
    modelSpecs: 'Model is 5\'11" wearing waist size 34',
  },

  // ==========================================
  // 14. RELAXED FIT JEANS
  // ==========================================
  {
    id: 'relaxed-fit-jeans-01',
    name: 'Downtown 90s Relaxed Stonewashed Denim',
    sku: 'MG-RXJ-144',
    category: 'Relaxed Fit Jeans',
    parentCategory: 'jeans',
    fit: 'Relaxed Fit',
    price: 2399,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 52,
    images: {
      front:
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Light Cloud Wash', hex: '#7E9EB8' },
      { name: 'Faded Black Smoke', hex: '#2B2B2B' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40'],
    fabric: '12.8 oz Soft-Handfeel Washed Cotton Denim',
    description:
      'Generous cut through seat and thigh with an easy taper to hem. Vintage 90s wash character that pairs seamlessly with bulky sneakers.',
    washCare: ['Cold machine wash', 'Do not bleach', 'Tumble dry low'],
    isTrending: true,
    modelSpecs: 'Model is 6\'1" wearing waist size 32',
  },

  // ==========================================
  // 15. BAGGY JEANS
  // ==========================================
  {
    id: 'baggy-jeans-01',
    name: 'Extreme Wide-Leg Skate Baggy Denim',
    sku: 'MG-BGJ-155',
    category: 'Baggy Jeans',
    parentCategory: 'jeans',
    fit: 'Baggy Fit',
    price: 2599,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 142,
    images: {
      front:
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Washed Ice Blue', hex: '#9BB8D3' },
      { name: 'Faded Charcoal Grey', hex: '#3A3A3C' },
      { name: 'Dirty Indigo Mud Wash', hex: '#3E4957' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: '13.5 oz Pure Heavyweight Slub Cotton Denim',
    description:
      'Bokaro’s #1 bestselling baggy cut. Exaggerated wide silhouette from hip to pooled puddle hem. Authentic streetwear vibe matching Zara & Snitch catalogues.',
    washCare: [
      'Machine wash cold inside out',
      'Air dry to protect puddle hem finish',
      'Low iron if needed',
    ],
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'0" wearing waist size 32 (Stacked Hem Look)',
  },

  // ==========================================
  // 16. STRETCHABLE JEANS
  // ==========================================
  {
    id: 'stretchable-jeans-01',
    name: 'Infinite Flex 360 Dynamic Stretch Denim',
    sku: 'MG-STJ-166',
    category: 'Stretchable Jeans',
    parentCategory: 'jeans',
    fit: 'Slim Fit',
    price: 2199,
    originalPrice: 3299,
    rating: 4.8,
    reviewCount: 61,
    images: {
      front:
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Dark Indigo Resin', hex: '#142033' },
      { name: 'Jet Black Carbon', hex: '#111111' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
    fabric: '85% Cotton, 11% Poly, 4% Lycra DualFX Elastane',
    description:
      'Engineered for ultimate mobility. You can squat, drive, and travel for hours without feeling restricted.',
    washCare: ['Gentle cycle cold', 'Do not bleach', 'Warm iron'],
    modelSpecs: 'Model is 5\'11" wearing waist size 32',
  },

  // ==========================================
  // 17. FORMAL TROUSERS
  // ==========================================
  {
    id: 'formal-trouser-01',
    name: 'Bespoke Single-Pleat Italian Wool-Blend Trouser',
    sku: 'MG-FTR-171',
    category: 'Formal Trousers',
    parentCategory: 'trousers',
    fit: 'Straight Fit',
    price: 1999,
    originalPrice: 2999,
    rating: 4.9,
    reviewCount: 45,
    images: {
      front:
        'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Graphite Charcoal', hex: '#2C2D30' },
      { name: 'Midnight Navy', hex: '#101B2B' },
      { name: 'Taupe Khaki', hex: '#8B8579' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
    fabric: 'Poly-Viscose Wool Touch with Natural Crease Retention',
    description:
      'Sharp pressed front center crease, tailored waistband with internal rubberized shirt grip. Unfinished hem available for on-the-spot custom alteration at our Bokaro outlets.',
    washCare: [
      'Dry clean preferable or delicate cold wash',
      'Steam press on medium setting',
    ],
    isBestSeller: true,
    modelSpecs: 'Model is 6\'1" wearing waist size 32',
  },

  // ==========================================
  // 18. CASUAL TROUSERS
  // ==========================================
  {
    id: 'casual-trouser-01',
    name: 'Smart Casual Drawstring Elastic-Waist Trouser',
    sku: 'MG-CTR-182',
    category: 'Casual Trousers',
    parentCategory: 'trousers',
    fit: 'Relaxed Fit',
    price: 1699,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 38,
    images: {
      front:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Slate Olive', hex: '#4B5320' },
      { name: 'Sand Beige', hex: '#C2B280' },
      { name: 'Raven Black', hex: '#161616' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: 'Brushed Cotton-Linen Canvas Weave',
    description:
      'Hybrid styling blending formal trousers and casual jogger comfort. Hidden inner drawstring with faux fly and clean front pockets.',
    washCare: ['Machine wash cold', 'Hang dry', 'Medium iron'],
    modelSpecs: 'Model is 6\'0" wearing size 32',
  },

  // ==========================================
  // 19. COTTON TROUSERS
  // ==========================================
  {
    id: 'cotton-trouser-01',
    name: 'Premium Mercerized Cotton Flat-Front Trouser',
    sku: 'MG-KTR-193',
    category: 'Cotton Trousers',
    parentCategory: 'trousers',
    fit: 'Straight Fit',
    price: 1799,
    originalPrice: 2599,
    rating: 4.8,
    reviewCount: 49,
    images: {
      front:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Tobacco Camel', hex: '#7B3F00' },
      { name: 'Pure Khaki', hex: '#C3B091' },
      { name: 'Steel Navy', hex: '#1E2A38' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
    fabric: '100% Long-Staple Combed Mercerized Cotton',
    description:
      'Smooth satin touch with breathable summer cotton structure. Perfect companion for linen shirts and formal oxfords.',
    washCare: ['Cold machine wash', 'Warm iron on reverse', 'Line dry'],
    modelSpecs: 'Model is 6\'1" wearing waist size 34',
  },

  // ==========================================
  // 20. CHINOS
  // ==========================================
  {
    id: 'chinos-01',
    name: 'Smart Stretch Tailored Chino Trousers',
    sku: 'MG-CHN-204',
    category: 'Chinos',
    parentCategory: 'trousers',
    fit: 'Slim Fit',
    price: 1699,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 83,
    images: {
      front:
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'British Tan', hex: '#9C661F' },
      { name: 'Washed Olive', hex: '#4B5320' },
      { name: 'Dark Navy', hex: '#000080' },
      { name: 'Soft Ecru', hex: '#F5F5DC' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: '97% Micro-Twill Cotton, 3% Elastane',
    description:
      'Sleek tapered fit, coin pocket detail, and herringbone pocket linings. The ultimate smart-casual staple for office to dining.',
    washCare: ['Machine wash 30°C', 'Do not tumble dry', 'Iron warm'],
    isBestSeller: true,
    modelSpecs: 'Model is 6\'0" wearing waist size 32',
  },

  // ==========================================
  // 21. BAGGY TROUSERS
  // ==========================================
  {
    id: 'baggy-trouser-01',
    name: 'Double-Pleated Wide-Leg Editorial Trousers',
    sku: 'MG-BTR-215',
    category: 'Baggy Trousers',
    parentCategory: 'trousers',
    fit: 'Baggy Fit',
    price: 2199,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 71,
    images: {
      front:
        'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Espresso Brown', hex: '#3B2F2F' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Pinstripe Charcoal', hex: '#2F3542' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40'],
    fabric: 'Drapey Viscose-Blend Suiting Serge',
    description:
      'Dramatic sartorial drape with deep double front pleats and fluid wide hem. Designed for oversized tailoring and runway-inspired styling.',
    washCare: ['Delicate wash or dry clean', 'Steam press'],
    isNewArrival: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'2" wearing waist size 32 (Full Break Hem)',
  },

  // ==========================================
  // 22. STRAIGHT FIT TROUSERS
  // ==========================================
  {
    id: 'straight-trouser-01',
    name: 'Modern Minimal Straight-Leg Wool-Touch Trouser',
    sku: 'MG-STR-226',
    category: 'Straight Fit Trousers',
    parentCategory: 'trousers',
    fit: 'Straight Fit',
    price: 1899,
    originalPrice: 2799,
    rating: 4.8,
    reviewCount: 39,
    images: {
      front:
        'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Steel Grey', hex: '#4A5568' },
      { name: 'Coffee Brown', hex: '#4A3728' },
    ],
    availableSizes: ['30', '32', '34', '36', '38', '40', '42'],
    fabric: 'Wrinkle-Resistant Crepe Twill',
    description:
      'Straight architecture without any tapering. Uncompromising sharpness for professional and semi-formal occasions.',
    washCare: ['Gentle cycle wash', 'Do not tumble dry', 'Medium heat press'],
    modelSpecs: 'Model is 6\'0" wearing waist size 32',
  },

  // ==========================================
  // 23. MEN'S TRACK PANTS
  // ==========================================
  {
    id: 'mens-track-pant-01',
    name: 'Premium Street Heavyweight Track Pants',
    sku: 'MG-MTP-231',
    category: "Men's Track Pants",
    parentCategory: 'trackpants',
    fit: 'Relaxed Fit',
    price: 1399,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 84,
    images: {
      front:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Matte Jet Black', hex: '#121212' },
      { name: 'Heather Grey', hex: '#7F8C8D' },
      { name: 'Deep Forest', hex: '#1B4D3E' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
    fabric: '280 GSM Interlock Cotton Terry with Brushed Fleece Back',
    description:
      'Refined loungewear made for street walks and travel comfort. Concealed zipper pockets and heavy drawstring with gunmetal tips.',
    washCare: ['Cold machine wash', 'Line dry in shade', 'Do not bleach'],
    isBestSeller: true,
    modelSpecs: 'Model is 6\'1" wearing size L',
  },

  // ==========================================
  // 24. GYM TRACK PANTS
  // ==========================================
  {
    id: 'gym-track-pant-01',
    name: 'AeroDry Performance Training Gym Track Pants',
    sku: 'MG-GTP-242',
    category: 'Gym Track Pants',
    parentCategory: 'trackpants',
    fit: 'Slim Fit',
    price: 1299,
    originalPrice: 1899,
    rating: 4.8,
    reviewCount: 67,
    images: {
      front:
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Carbon Black', hex: '#18181A' },
      { name: 'Slate Blue', hex: '#2C3E50' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40'],
    fabric: 'Quick-Dry 4-Way Moisture-Wicking Poly-Spandex Mesh',
    description:
      'Gusseted crotch and ankle zippers for lightning shoe changes. Engineered breathability zones along calves and thighs.',
    washCare: [
      'Machine wash cold',
      'No fabric softener',
      'Dries in under 20 minutes',
    ],
    modelSpecs: 'Model is 6\'0" wearing size M',
  },

  // ==========================================
  // 25. JOGGERS
  // ==========================================
  {
    id: 'joggers-01',
    name: 'Urban Cuffed Heavy Cotton Joggers',
    sku: 'MG-JOG-253',
    category: 'Joggers',
    parentCategory: 'trackpants',
    fit: 'Slim Fit',
    price: 1499,
    originalPrice: 2199,
    rating: 4.9,
    reviewCount: 92,
    images: {
      front:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Pitch Black', hex: '#0A0A0A' },
      { name: 'Military Khaki', hex: '#5B5335' },
      { name: 'Washed Ash', hex: '#9E9E9E' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: '100% Ring-Spun French Terry (300 GSM)',
    gsm: '300 GSM',
    description:
      'Heavyweight cotton with deep slash pockets and an extra phone slip pocket. Tight ribbed ankle cuffs that showcase high-top sneakers cleanly.',
    washCare: ['Machine wash cold', 'Wash inside out', 'Tumble dry low'],
    isBestSeller: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'1" wearing size L',
  },

  // ==========================================
  // 26. CARGO TRACK PANTS
  // ==========================================
  {
    id: 'cargo-track-pant-01',
    name: 'Tactical Multi-Pocket Cargo Track Pants',
    sku: 'MG-CTP-264',
    category: 'Cargo Track Pants',
    parentCategory: 'trackpants',
    fit: 'Relaxed Fit',
    price: 1799,
    originalPrice: 2699,
    rating: 4.9,
    reviewCount: 118,
    images: {
      front:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Shadow Black', hex: '#141414' },
      { name: 'Urban Army Green', hex: '#3B4D36' },
      { name: 'Storm Grey', hex: '#4B5563' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: 'Ripstop Stretch Cotton with DWR Water Repellent Treatment',
    description:
      '6 functional tactical pockets with snap closures and strap adjusters. Adjustable bungee toggle hems to convert from wide straight to tapered jogger.',
    washCare: ['Machine wash 30°C', 'Do not bleach', 'Do not dry clean'],
    isNewArrival: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'0" wearing size M',
  },

  // ==========================================
  // ADDITIONAL PRODUCTS (To complete 40+ unique items across categories)
  // ==========================================
  {
    id: 'formal-shirt-03',
    name: 'Sovereign White Wingtip Tuxedo Formal Shirt',
    sku: 'MG-FS-015',
    category: 'Formal Shirts',
    parentCategory: 'shirts',
    fit: 'Slim Fit',
    price: 2199,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 37,
    images: {
      front:
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [{ name: 'Snow White', hex: '#FFFFFF' }],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Fine Piqué Bib Front Cotton 140s',
    gsm: '140 GSM',
    description:
      'Features French double cuffs and removable black stud buttons for tuxedo styling.',
    washCare: ['Dry clean only', 'Starch if crisp bib desired'],
    modelSpecs: 'Model is 6\'1" wearing size L',
  },
  {
    id: 'casual-shirt-02',
    name: 'Pure French Linen Safari Shirt',
    sku: 'MG-CS-023',
    category: 'Casual Shirts',
    parentCategory: 'shirts',
    fit: 'Relaxed Fit',
    price: 1899,
    originalPrice: 2799,
    rating: 4.8,
    reviewCount: 44,
    images: {
      front:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Natural Flax', hex: '#EEDC82' },
      { name: 'Olive Sage', hex: '#708238' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    fabric: '100% Normandy Pure Linen',
    gsm: '150 GSM',
    description:
      'Naturally cooling fabric with authentic linen slub texture. Twin chest flap pockets and roll-up sleeve tabs.',
    washCare: ['Hand wash or gentle cycle', 'Damp iron'],
    modelSpecs: 'Model is 6\'0" wearing size L',
  },
  {
    id: 'printed-shirt-02',
    name: 'Nocturnal Baroque Monogram Cuban Shirt',
    sku: 'MG-PS-035',
    category: 'Printed Shirts',
    parentCategory: 'shirts',
    fit: 'Relaxed Fit',
    price: 1699,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 50,
    images: {
      front:
        'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Black & Antique Gold', hex: '#C5A059' },
      { name: 'Silver Slate', hex: '#A8A9AD' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Silky Modal Rayon Weave',
    gsm: '130 GSM',
    description:
      'Intricate baroque ornamental print in gold on obsidian base. Camp collar with straight square hem.',
    washCare: ['Cold gentle hand wash', 'Hang dry'],
    isTrending: true,
    modelSpecs: 'Model is 6\'0" wearing size M',
  },
  {
    id: 'checked-shirt-02',
    name: 'Micro Tartan Smart Casual Shirt',
    sku: 'MG-CHS-047',
    category: 'Checked Shirts',
    parentCategory: 'shirts',
    fit: 'Slim Fit',
    price: 1599,
    originalPrice: 2299,
    rating: 4.7,
    reviewCount: 39,
    images: {
      front:
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Navy & Rust Check', hex: '#1C2951' },
      { name: 'Forest Green', hex: '#1B4D3E' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    fabric: '100% Compact Combed Cotton Yarn-Dyed Check',
    gsm: '140 GSM',
    description:
      'Sophisticated micro check pattern for boardroom to dinner transitions.',
    washCare: ['Machine wash 30°C', 'Warm iron'],
    modelSpecs: 'Model is 6\'1" wearing size L',
  },
  {
    id: 'partywear-shirt-02',
    name: 'Metallic Lurex Shimmer Party Shirt',
    sku: 'MG-PWS-058',
    category: 'Party Wear Shirts',
    parentCategory: 'shirts',
    fit: 'Slim Fit',
    price: 2299,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 61,
    images: {
      front:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Starlight Black', hex: '#0B0B0C' },
      { name: 'Gilded Bronze', hex: '#8C6239' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Fine Metallic Poly-Rayon Blend',
    gsm: '135 GSM',
    description:
      'Subtle metallic interwoven thread catches ambient venue lights brilliantly. Perfect for club nights and party gatherings in Bokaro.',
    washCare: ['Hand wash cold inside out', 'Do not tumble dry'],
    isTrending: true,
    modelSpecs: 'Model is 6\'0" wearing size M',
  },
  {
    id: 'oversized-shirt-02',
    name: 'Corduroy Oversized Shacket Over-Shirt',
    sku: 'MG-OS-069',
    category: 'Oversized Shirts',
    parentCategory: 'shirts',
    fit: 'Oversized Fit',
    price: 2199,
    originalPrice: 3299,
    rating: 4.8,
    reviewCount: 47,
    images: {
      front:
        'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Caramel Rust', hex: '#A75D28' },
      { name: 'Dark Spruce', hex: '#1C3B2B' },
      { name: 'Charcoal', hex: '#2C2C2E' },
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    fabric: '8-Wale Heavyweight Cotton Corduroy',
    gsm: '290 GSM',
    description:
      'Acts as both an overshirt and lightweight jacket. Wear unbuttoned over a round neck tee.',
    washCare: ['Cold machine wash', 'Line dry inside out'],
    isNewArrival: true,
    modelSpecs: 'Model is 6\'2" wearing size L',
  },
  {
    id: 'polo-tshirt-02',
    name: 'Zip-Neck Textured Rib Knit Polo',
    sku: 'MG-PL-075',
    category: 'Polo T-Shirts',
    parentCategory: 'tshirts',
    fit: 'Slim Fit',
    price: 1599,
    originalPrice: 2299,
    rating: 4.9,
    reviewCount: 58,
    images: {
      front:
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Charcoal Grey', hex: '#333333' },
      { name: 'Off White', hex: '#F5F5F0' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Textured Cotton-Modal Vertical Rib Knit',
    gsm: '240 GSM',
    description:
      'Modern metallic quarter-zip front without traditional buttons. European luxury polo styling.',
    washCare: ['Delicate wash 30°C', 'Dry flat'],
    isTrending: true,
    modelSpecs: 'Model is 6\'1" wearing size M',
  },
  {
    id: 'graphic-tshirt-02',
    name: 'Metropolis Cybernetic Heavy Graphic Tee',
    sku: 'MG-GT-096',
    category: 'Graphic T-Shirts',
    parentCategory: 'tshirts',
    fit: 'Oversized Fit',
    price: 1299,
    originalPrice: 1899,
    rating: 4.8,
    reviewCount: 77,
    images: {
      front:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Washed Black', hex: '#181818' },
      { name: 'Dirty Clay', hex: '#634832' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    fabric: '250 GSM Pure Carded Heavy Cotton',
    gsm: '250 GSM',
    description:
      'Front chest and bold back oversized puff-print graphic artwork.',
    washCare: ['Cold machine wash', 'Do not iron on print'],
    modelSpecs: 'Model is 6\'0" wearing size L',
  },
  {
    id: 'baggy-jeans-02',
    name: 'Vintage Destroyed Carpenter Baggy Jeans',
    sku: 'MG-BGJ-158',
    category: 'Baggy Jeans',
    parentCategory: 'jeans',
    fit: 'Baggy Fit',
    price: 2699,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 105,
    images: {
      front:
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Distressed Vintage Blue', hex: '#4A6B82' },
      { name: 'Washed Charcoal', hex: '#2F2F2F' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: '14 oz Heavyweight Rigid Cotton Denim',
    description:
      'Features carpenter hammer loop, dual utility leg pockets, and subtle distressed wash detailing.',
    washCare: ['Wash cold inside out', 'Line dry'],
    isBestSeller: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'1" wearing waist size 32',
  },
  {
    id: 'straight-fit-jeans-02',
    name: 'Dark Indigo Clean Edge Straight Jeans',
    sku: 'MG-SFJ-116',
    category: 'Straight Fit Jeans',
    parentCategory: 'jeans',
    fit: 'Straight Fit',
    price: 2399,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 56,
    images: {
      front:
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Deep Indigo', hex: '#102030' },
      { name: 'True Jet Black', hex: '#000000' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42', '44', '46'],
    fabric: '13 oz Ringspun Cotton with 1% Lycra',
    description:
      'Unwashed rinse effect with contrasting tobacco stitching. Can be dressed up with a blazer or dressed down with a polo.',
    washCare: ['Machine wash cold', 'Wash separately initial 3 washes'],
    modelSpecs: 'Model is 6\'0" wearing waist size 34',
  },
  {
    id: 'relaxed-fit-jeans-02',
    name: 'Acid Bleached Relaxed Taper Denim',
    sku: 'MG-RXJ-148',
    category: 'Relaxed Fit Jeans',
    parentCategory: 'jeans',
    fit: 'Relaxed Fit',
    price: 2499,
    originalPrice: 3699,
    rating: 4.8,
    reviewCount: 41,
    images: {
      front:
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Glacier Blue', hex: '#87CEEB' },
      { name: 'Faded Carbon', hex: '#333333' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40'],
    fabric: '100% Breathable Cotton Denim',
    description:
      'High rise with roomy thigh area tapering smoothly to a 15-inch leg opening.',
    washCare: ['Cold wash', 'Do not tumble dry'],
    modelSpecs: 'Model is 6\'1" wearing waist size 32',
  },
  {
    id: 'formal-trouser-02',
    name: 'Windowpane Check Executive Formal Trouser',
    sku: 'MG-FTR-176',
    category: 'Formal Trousers',
    parentCategory: 'trousers',
    fit: 'Slim Fit',
    price: 2099,
    originalPrice: 3199,
    rating: 4.9,
    reviewCount: 53,
    images: {
      front:
        'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Charcoal with Silver Check', hex: '#363636' },
      { name: 'Navy Windowpane', hex: '#162238' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: 'Poly-Viscose Wool Blend with Stretch',
    description:
      'Sophisticated subtle windowpane check pattern for corporate meetings and formal functions in Bokaro.',
    washCare: ['Delicate wash or dry clean', 'Steam press'],
    modelSpecs: 'Model is 6\'0" wearing size 32',
  },
  {
    id: 'chinos-02',
    name: 'Relaxed Fit Pleated Chinos',
    sku: 'MG-CHN-209',
    category: 'Chinos',
    parentCategory: 'trousers',
    fit: 'Relaxed Fit',
    price: 1799,
    originalPrice: 2599,
    rating: 4.8,
    reviewCount: 46,
    images: {
      front:
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Cream Chalk', hex: '#EAE6DF' },
      { name: 'Smoked Walnut', hex: '#5C4033' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: '100% Crisp Cotton Twill',
    description:
      'High-waisted silhouette with single front pleat and roomy leg. Clean cuff at hem.',
    washCare: ['Machine wash cold', 'Warm iron'],
    isNewArrival: true,
    modelSpecs: 'Model is 6\'1" wearing size 32',
  },
  {
    id: 'cargo-track-pant-02',
    name: 'Parachute Tech Cargo Track Pants',
    sku: 'MG-CTP-268',
    category: 'Cargo Track Pants',
    parentCategory: 'trackpants',
    fit: 'Baggy Fit',
    price: 1899,
    originalPrice: 2799,
    rating: 4.9,
    reviewCount: 89,
    images: {
      front:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Desert Sand', hex: '#C2B280' },
      { name: 'Steel Slate', hex: '#4A5568' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: 'Ultralight Nylon Taslan with Matt Finish',
    description:
      'Airy parachute volume with knee dart articulation, drawstring ankle cinches, and magnetic snap cargo flaps.',
    washCare: ['Machine wash cold', 'Do not iron on hot'],
    isTrending: true,
    isBestSeller: true,
    modelSpecs: 'Model is 6\'0" wearing size M (Voluminous Silhouette)',
  },
  {
    id: 'joggers-02',
    name: 'Minimalist Raw Seam French Terry Jogger',
    sku: 'MG-JOG-257',
    category: 'Joggers',
    parentCategory: 'trackpants',
    fit: 'Regular Fit',
    price: 1399,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 51,
    images: {
      front:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Oatmeal Melange', hex: '#D2B48C' },
      { name: 'Washed Charcoal', hex: '#2B2B2B' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    fabric: '280 GSM Unbrushed French Terry Cotton',
    gsm: '280 GSM',
    description:
      'Exposed raw stitch seam down the center front of leg gives an architectural streetwear edge.',
    washCare: ['Machine wash cold', 'Tumble dry low'],
    modelSpecs: 'Model is 6\'1" wearing size L',
  },
  {
    id: 'gym-track-pant-02',
    name: 'Pro-Compress Hybrid Training Tights & Track Pant',
    sku: 'MG-GTP-249',
    category: 'Gym Track Pants',
    parentCategory: 'trackpants',
    fit: 'Slim Fit',
    price: 1399,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 43,
    images: {
      front:
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Black Onyx', hex: '#141414' },
      { name: 'Graphite Grey', hex: '#374151' },
    ],
    availableSizes: ['28', '30', '32', '34', '36', '38', '40'],
    fabric: '88% Poly, 12% Spandex High-Compression Knit',
    description:
      'Towel loop at back waistband, water-resistant phone pocket, and reflective safety accents for night runs.',
    washCare: ['Cold machine wash', 'Air dry only'],
    modelSpecs: 'Model is 5\'11" wearing size M',
  },
  {
    id: 'oversized-tshirt-02',
    name: 'Acid Washed Raw-Edge Boxy Heavyweight Tee',
    sku: 'MG-OST-109',
    category: 'Oversized T-Shirts',
    parentCategory: 'tshirts',
    fit: 'Oversized Fit',
    price: 1399,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 82,
    images: {
      front:
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
      back: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
      zoom: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    },
    colorVariants: [
      { name: 'Vintage Acid Charcoal', hex: '#262626' },
      { name: 'Faded Forest', hex: '#2E3A2F' },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    fabric: '280 GSM Heavy Cotton Single Jersey',
    gsm: '280 GSM',
    description:
      'Mineral bleached wash with relaxed drop shoulder and substantial neck ribbing that never sags.',
    washCare: ['Cold gentle wash', 'Dry flat in shade'],
    isBestSeller: true,
    isTrending: true,
    modelSpecs: 'Model is 6\'1" wearing size L',
  },
];
