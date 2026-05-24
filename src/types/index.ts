export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  category: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isLimitedEdition?: boolean;
  stockStatus?: 'in-stock' | 'low-stock' | 'out-of-stock';
  specifications?: Record<string, string>;
  variants?: {
    sizes?: string[];
    colors?: { name: string; hex: string }[];
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'user' | 'admin';
  createdAt: any;
}

export interface Conversation {
  id: string;
  userId: string;
  status: 'active' | 'closed' | 'archived';
  lastMessageAt: any;
  unreadCount: number;
  customerName?: string;
  customerEmail?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderRole: 'user' | 'ai' | 'admin';
  text: string;
  createdAt: any;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'card' | 'paypal' | 'cod';
  status: OrderStatus;
  createdAt: any;
  updatedAt: any;
}
