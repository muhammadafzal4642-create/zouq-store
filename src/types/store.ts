export type Category = 'socks' | 'jewellery' | 'spices';

export interface ProductVariation {
  id: string;
  name: string;
  nameUrdu: string;
  options: string[];
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  commentUrdu?: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUrdu: string;
  category: Category;
  categoryName: string;
  categoryNameUrdu: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  images: string[];
  badges?: string[];
  badgesUrdu?: string[];
  shortDescription: string;
  shortDescriptionUrdu: string;
  description: string;
  descriptionUrdu: string;
  specs: {
    origin: string;
    originUrdu: string;
    material: string;
    materialUrdu: string;
    care: string;
    careUrdu: string;
    packaging: string;
    packagingUrdu: string;
  };
  variations?: ProductVariation[];
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariation?: string;
}

export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'card';
export type CourierService = 'tcs' | 'leopards' | 'postex';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface TrackingMilestone {
  timestamp: string;
  status: string;
  statusUrdu: string;
  location: string;
  locationUrdu: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    province: string;
    city: string;
    address: string;
    orderNotes?: string;
  };
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    variation?: string;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'cod_pending';
  status: OrderStatus;
  courier?: CourierService;
  trackingNumber?: string;
  trackingTimeline?: TrackingMilestone[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  minOrderValue: number;
  description: string;
  descriptionUrdu: string;
  active: boolean;
}
