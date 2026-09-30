export interface StoreLocation {
  id: string;
  name: string;
  badge: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  timings: string;
  googleMapsUrl: string;
  features: string[];
}

export const STORE_INFO = {
  name: "Mallick Garments",
  tagline: "Style. Comfort. Confidence.",
  city: "Bokaro Steel City",
  state: "Jharkhand",
  phone: "+91 91223 34455",
  phoneRaw: "+919122334455",
  whatsapp: "+91 91223 34455",
  whatsappRaw: "919122334455",
  email: "support@mallickgarments.com",
  instagramUrl: "https://www.instagram.com/mallickgarments_online_bokaro_/",
  instagramHandle: "@mallickgarments_online_bokaro_",
  youtubeUrl: "https://www.youtube.com/@MALLICKGarments",
  youtubeHandle: "@MALLICKGarments",
  googleMapsUrl: "https://share.google/5G1447DFUHOw5kuWl",
  outlets: [
    {
      id: "outlet-1",
      name: "Outlet 1 — Siwandih Main Road",
      badge: "Flagship Menswear Store",
      addressLine1: "Siwandih Main Road",
      addressLine2: "Opposite Bank of India",
      city: "Bokaro Steel City",
      state: "Jharkhand",
      pincode: "827010",
      phone: "+91 91223 34455",
      phoneRaw: "+919122334455",
      whatsapp: "+91 91223 34455",
      whatsappRaw: "919122334455",
      timings: "10:30 AM – 9:30 PM (Open 7 Days)",
      googleMapsUrl: "https://share.google/5G1447DFUHOw5kuWl",
      features: [
        "Complete Denim & Baggy Fitting Studio",
        "Formal & Casual Shirts Section",
        "Activewear & Track Pants Bar",
        "On-spot Fitting & Alterations",
      ],
    },
    {
      id: "outlet-2",
      name: "Outlet 2 — Harshvardhan Plaza (Sector 4)",
      badge: "Premium Streetwear & Formals",
      addressLine1: "1st Floor, Harshvardhan Plaza",
      addressLine2: "Sector 4 Commercial Zone",
      city: "Bokaro Steel City",
      state: "Jharkhand",
      pincode: "827004",
      phone: "+91 98351 22344",
      phoneRaw: "+919835122344",
      whatsapp: "+91 98351 22344",
      whatsappRaw: "919835122344",
      timings: "11:00 AM – 10:00 PM (Open 7 Days)",
      googleMapsUrl: "https://share.google/5G1447DFUHOw5kuWl",
      features: [
        "Oversized Streetwear & Graphic Tees",
        "Luxury Cotton & Linen Trousers",
        "Executive Formals & Party Wear",
        "VIP Personal Styling Lounge",
      ],
    },
  ] as StoreLocation[],
};
