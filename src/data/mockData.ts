import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'apparel', name: 'Apparel', icon: 'Shirt', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600' },
  { id: 'footwear', name: 'Footwear', icon: 'Zap', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600' },
  { id: 'accessories', name: 'Accessories', icon: 'Watch', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600' },
  { id: 'headwear', name: 'Headwear', icon: 'CheckCircle', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600' },
  { id: 'bags', name: 'Bags', icon: 'Layers', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized "Void" Hoodie',
    description: 'Heavyweight 500GSM cotton hoodie with a dropped shoulder silhouette.',
    fullDescription: 'The "Void" Hoodie is the cornerstone of the Nexus Core collection. Crafted from 500GSM ultra-soft loopback cotton, it features a double-layered hood, hidden side-seam pockets, and a structural oversized fit that holds its shape. Perfect for layering in any urban environment.',
    price: 850.00,
    originalPrice: 1200.00,
    discountBadge: 'ELITE DROP',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1556821921-25501d575974?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1556821957-674ca99388f8?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviews: 156,
    isFeatured: true,
    stockStatus: 'in-stock',
    specifications: {
      'Material': '100% Organic Cotton',
      'Weight': '500 GSM Heavyweight',
      'Fit': 'Oversized / Dropped Shoulder',
      'Details': 'High-density Screen Print',
      'Origin': 'Made in Morocco',
      'Care': 'Cold wash, Air dry'
    },
    variants: {
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Pitch Black', hex: '#000000' },
        { name: 'Slate Grey', hex: '#4a4a4a' }
      ]
    }
  },
  {
    id: '2',
    name: 'Phantom Tech Runners',
    description: 'High-performance urban sneakers with responsive cushioning and mesh mesh paneling.',
    fullDescription: 'Designed for the modern nomad, the Phantom Tech Runners combine futuristic aesthetics with elite comfort. Featuring a multi-layered mesh body, semi-translucent TPU overlays, and a high-rebound vulcanized sole. The speed-lacing system ensures a secure fit for rapid urban movement.',
    price: 1450.00,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8,
    reviews: 89,
    isNew: true,
    stockStatus: 'low-stock',
    specifications: {
      'Upper': 'Engineered Mesh & TPU',
      'Sole': 'Reactive EVA Midsole',
      'Traction': 'Geometric Rubber Outsole',
      'Weight': '320g per shoe',
      'Tech': 'Speed-Lace Integration'
    },
    variants: {
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: [
        { name: 'Core Black', hex: '#1a1a1a' },
        { name: 'Cyber White', hex: '#f8f8f8' }
      ]
    }
  },
  {
    id: '3',
    name: 'Minimalist Carbon Watch',
    description: 'Ultra-thin architectural time-piece with a sandblasted matte finish.',
    price: 2200.00,
    originalPrice: 2800.00,
    discountBadge: 'LIMITED',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    reviews: 42,
    isFeatured: true,
    isLimitedEdition: true
  },
  {
    id: '4',
    name: 'Cargo Utility Pants',
    description: 'Multi-pocket tactical trousers with adjustable hem and water-resistant finish.',
    price: 750.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1624371414361-e6e8ea029522?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 65,
    isLimitedEdition: true
  },
  {
    id: '5',
    name: 'Sling Crossbody Bag',
    description: 'Weatherproof ripstop nylon bag with magnetic Fidlock buckle.',
    price: 450.00,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 120,
    isNew: true
  },
  {
    id: '6',
    name: 'Cyberpunk Graphics Cap',
    description: 'Structured 5-panel cap with high-density embroidery and metal clip.',
    price: 250.00,
    category: 'Headwear',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviews: 210,
    isLimitedEdition: true
  },
  {
    id: '7',
    name: 'Industrial Metalic Parka',
    description: 'Chrome-finish weather-resistant parka with internal harness system.',
    price: 3500.00,
    originalPrice: 4200.00,
    discountBadge: 'ELITE',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1544022613-e87ce7526ed1?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: 28,
    isLimitedEdition: true
  }
];
