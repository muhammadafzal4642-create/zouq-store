import { Product, Order, Coupon, Category } from '../types/store.ts';

export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  inStock?: boolean;
  sort?: string;
}): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.inStock) query.append('inStock', 'true');
    if (params?.sort) query.append('sort', params.sort);

    const res = await fetch(`/api/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('API error, falling back to local seed:', err);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    return null;
  }
}

export async function createOrder(payload: {
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
    quantity: number;
    variation?: string;
    price: number;
  }[];
  paymentMethod: string;
  couponCode?: string;
}): Promise<{ success: boolean; data?: Order; error?: string }> {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || 'Failed to place order.' };
    }
    return { success: true, data: json.data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error while placing order.' };
  }
}

export async function validateCoupon(code: string, subtotal: number): Promise<{
  success: boolean;
  data?: { code: string; discountAmount: number; description: string; descriptionUrdu: string };
  error?: string;
}> {
  try {
    const res = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal })
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || 'Invalid coupon code.' };
    }
    return { success: true, data: json.data };
  } catch (err: any) {
    return { success: false, error: 'Could not validate coupon.' };
  }
}

export async function trackConsignment(query: string) {
  try {
    const res = await fetch(`/api/tracking/${encodeURIComponent(query)}`);
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || 'Tracking details not found.' };
    }
    return { success: true, data: json.data };
  } catch (err: any) {
    return { success: false, error: 'Failed to connect to tracking server.' };
  }
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/session');
    const json = await res.json();
    return res.ok && json.authenticated === true;
  } catch {
    return false;
  }
}

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
    return res.ok ? { success: true } : { success: false, error: json.error || 'Admin login failed.' };
  } catch {
    return { success: false, error: 'Could not connect to the server.' };
  }
}

export async function logoutAdmin(): Promise<void> {
  await fetch('/api/admin/logout', { method: 'POST' });
}

export async function fetchAdminStats() {
  try {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to load stats');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const res = await fetch('/api/orders');
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    return [];
  }
}

export async function updateOrderStatus(id: string, payload: {
  status?: string;
  courier?: string;
  trackingNumber?: string;
  newMilestone?: any;
}) {
  try {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
}

export async function saveProduct(product: Partial<Product>): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    const method = product.id ? 'PUT' : 'POST';
    const url = product.id ? `/api/products/${product.id}` : '/api/products';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    const json = await res.json();
    if (!res.ok) return { success: false, error: json.error || 'Failed to save product' };
    return { success: true, data: json.data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
}
