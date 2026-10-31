import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Truck,
  FileText,
  Tag,
  RefreshCw,
  Search,
  LogOut,
  LockKeyhole
} from 'lucide-react';
import { Product, Order, Coupon, Category, OrderStatus } from '../types/store.ts';
import { Language, translations } from '../lib/translations.ts';
import {
  fetchAllOrders,
  fetchAdminStats,
  saveProduct,
  deleteProduct,
  updateOrderStatus,
  checkAdminSession,
  loginAdmin,
  logoutAdmin
} from '../lib/api.ts';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  products: Product[];
  onRefreshProducts: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  lang,
  products,
  onRefreshProducts
}) => {
  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'coupons'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Product Edit / Add form state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // Order status update state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    const [fetchedOrders, fetchedStats] = await Promise.all([
      fetchAllOrders(),
      fetchAdminStats()
    ]);
    setOrders(fetchedOrders);
    setStats(fetchedStats);
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    setCheckingAuth(true);
    checkAdminSession().then((isAuthenticated) => {
      if (!active) return;
      setAuthenticated(isAuthenticated);
      setCheckingAuth(false);
      if (isAuthenticated) loadData();
    });
    return () => { active = false; };
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    const result = await loginAdmin(loginUsername, loginPassword);
    setLoading(false);
    if (!result.success) {
      setLoginError(result.error || 'Admin login failed.');
      return;
    }
    setAuthenticated(true);
    setLoginPassword('');
    loadData();
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAuthenticated(false);
    setOrders([]);
    setStats(null);
  };

  if (!isOpen) return null;

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-fadeIn">
        <form onSubmit={handleLogin} className="w-full max-w-sm border border-[#C5A059] bg-[#FAF8F5] p-7 shadow-2xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xs bg-[#141312] text-sm font-bold text-[#C5A059]">ZQ</div>
              <h2 className="font-serif text-xl font-medium text-[#141312]">Admin sign in</h2>
              <p className="mt-1 text-xs text-[#736B63]">ZOUQ Heritage management</p>
            </div>
            <button type="button" onClick={onClose} className="p-1 text-[#736B63] hover:text-[#141312]" aria-label="Close admin login">
              <X className="h-5 w-5" />
            </button>
          </div>
          {checkingAuth ? (
            <p className="py-4 text-sm text-[#736B63]">Checking admin session...</p>
          ) : (
            <>
              <label className="mb-1 block text-xs font-medium text-[#141312]" htmlFor="admin-username">Username</label>
              <input id="admin-username" autoComplete="username" required value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="mb-4 w-full border border-[#E8E0D3] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C5A059]" />
              <label className="mb-1 block text-xs font-medium text-[#141312]" htmlFor="admin-password">Password</label>
              <input id="admin-password" type="password" autoComplete="current-password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="mb-4 w-full border border-[#E8E0D3] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C5A059]" />
              {loginError && <p role="alert" className="mb-3 text-xs text-red-700">{loginError}</p>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 bg-[#141312] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2C2926] disabled:opacity-60">
                <LockKeyhole className="h-4 w-4 text-[#C5A059]" />
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </>
          )}
        </form>
      </div>
    );
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price || !editingProduct?.category) return;

    setLoading(true);
    const res = await saveProduct(editingProduct);
    setLoading(false);
    if (res.success) {
      setShowProductForm(false);
      setEditingProduct(null);
      onRefreshProducts();
      loadData();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to remove this product from the atelier catalog?')) return;
    setLoading(true);
    await deleteProduct(id);
    setLoading(false);
    onRefreshProducts();
    loadData();
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus, courier?: string) => {
    setLoading(true);
    const trackingNum = `${(courier || 'tcs').toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}PK`;
    const res = await updateOrderStatus(orderId, {
      status: newStatus,
      courier: courier || 'tcs',
      trackingNumber: trackingNum,
      newMilestone: {
        status: `Order marked as ${newStatus.toUpperCase()} by Atelier Admin`,
        statusUrdu: `ایڈمن نے آرڈر کی صورتحال کو ${newStatus} میں تبدیل کیا`,
        location: 'ZOUQ Dispatch Desk, Lahore',
        locationUrdu: 'لاہور ڈسپیچ ڈیسک'
      }
    });
    setLoading(false);
    setStatusUpdateMessage(t.orderStatusUpdated);
    setTimeout(() => setStatusUpdateMessage(''), 3000);
    loadData();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-6xl rounded-sm shadow-2xl border border-[#E8E0D3] overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Top Navbar */}
        <div className="p-5 sm:p-6 bg-[#141312] text-white flex items-center justify-between border-b border-[#2C2926]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#C5A059] flex items-center justify-center text-[#141312] font-serif font-bold text-base">
              ZQ
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                {t.adminTitle}
              </h2>
              <p className="text-[11px] text-[#A9823B] tracking-wider uppercase">
                {t.adminSubtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400 hover:text-white"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 text-stone-400 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-[#E8E0D3] px-6 flex gap-6 text-xs font-semibold uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#C5A059] text-[#141312]'
                : 'border-transparent text-[#8C827A] hover:text-[#141312]'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#C5A059] text-[#141312]'
                : 'border-transparent text-[#8C827A] hover:text-[#141312]'
            }`}
          >
            {t.tabOrders} ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#C5A059] text-[#141312]'
                : 'border-transparent text-[#8C827A] hover:text-[#141312]'
            }`}
          >
            {t.tabProducts} ({products.length})
          </button>
        </div>

        {/* Status Toast */}
        {statusUpdateMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{statusUpdateMessage}</span>
          </div>
        )}

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xs border border-[#E8E0D3]">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C827A] block font-medium">
                    {t.totalRevenue}
                  </span>
                  <p className="font-mono text-2xl font-bold text-[#141312] mt-1 tabular-nums">
                    PKR {(stats?.totalRevenue || 0).toLocaleString()}
                  </p>
                  <span className="text-[10px] text-emerald-700 mt-1 block">Live nationwide sales</span>
                </div>

                <div className="bg-white p-5 rounded-xs border border-[#E8E0D3]">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C827A] block font-medium">
                    {t.totalOrders}
                  </span>
                  <p className="font-mono text-2xl font-bold text-[#141312] mt-1 tabular-nums">
                    {stats?.totalOrders || orders.length}
                  </p>
                  <span className="text-[10px] text-[#8C827A] mt-1 block">TCS, PostEx, Leopards</span>
                </div>

                <div className="bg-white p-5 rounded-xs border border-[#E8E0D3]">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C827A] block font-medium">
                    {t.pendingShipments}
                  </span>
                  <p className="font-mono text-2xl font-bold text-[#C5A059] mt-1 tabular-nums">
                    {stats?.pendingOrders || 0}
                  </p>
                  <span className="text-[10px] text-amber-700 mt-1 block">Require dispatch booking</span>
                </div>

                <div className="bg-white p-5 rounded-xs border border-[#E8E0D3]">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C827A] block font-medium">
                    {t.lowStockAlerts}
                  </span>
                  <p className="font-mono text-2xl font-bold text-red-600 mt-1 tabular-nums">
                    {products.filter((p) => p.stockQuantity < 15).length}
                  </p>
                  <span className="text-[10px] text-red-600 mt-1 block">Under 15 items remaining</span>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xs border border-[#E8E0D3]">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141312] mb-1">
                    Socks Atelier
                  </h4>
                  <p className="text-sm text-[#736B63]">
                    {products.filter((p) => p.category === 'socks').length} active models in catalog
                  </p>
                  <p className="text-xs text-[#C5A059] font-mono mt-2">Faisalabad Combed Cotton</p>
                </div>

                <div className="bg-white p-4 rounded-xs border border-[#E8E0D3]">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141312] mb-1">
                    Fine Jewellery
                  </h4>
                  <p className="text-sm text-[#736B63]">
                    {products.filter((p) => p.category === 'jewellery').length} handcrafted designs
                  </p>
                  <p className="text-xs text-[#C5A059] font-mono mt-2">22K Polki & Kundan</p>
                </div>

                <div className="bg-white p-4 rounded-xs border border-[#E8E0D3]">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141312] mb-1">
                    Authentic Spices
                  </h4>
                  <p className="text-sm text-[#736B63]">
                    {products.filter((p) => p.category === 'spices').length} regional harvest batches
                  </p>
                  <p className="text-xs text-[#C5A059] font-mono mt-2">Gilgit Saffron & Kunri Chili</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="overflow-x-auto bg-white border border-[#E8E0D3] rounded-xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F4EFE7] text-[#141312] uppercase tracking-wider text-[10px] border-b border-[#E8E0D3]">
                    <tr>
                      <th className="p-3">Order No.</th>
                      <th className="p-3">Customer & City</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total (PKR)</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Courier & Tracking</th>
                      <th className="p-3">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4EFE7]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 font-mono font-bold text-[#141312]">
                          {ord.orderNumber}
                          <span className="block text-[10px] text-[#8C827A] font-sans">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-3">
                          <p className="font-semibold text-[#141312]">{ord.customer.fullName}</p>
                          <p className="text-[11px] text-[#736B63]">{ord.customer.city}, {ord.customer.province}</p>
                          <p className="font-mono text-[10px] text-[#8C827A]">{ord.customer.phone}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-medium text-[#141312]">{ord.items.length} items</p>
                          <p className="text-[11px] text-[#8C827A] truncate max-w-xs">
                            {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                          </p>
                        </td>
                        <td className="p-3 font-mono font-semibold tabular-nums text-[#141312]">
                          PKR {ord.total.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span className="uppercase text-[10px] font-semibold px-2 py-0.5 rounded-xs bg-[#FAF8F5] border border-[#E8E0D3]">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3">
                          <p className="uppercase font-bold text-[10px] text-[#C5A059]">
                            {ord.courier || 'TCS'}
                          </p>
                          <p className="font-mono text-[11px] text-[#736B63]">
                            {ord.trackingNumber || 'Pending dispatch'}
                          </p>
                        </td>
                        <td className="p-3">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              handleUpdateStatus(ord.id, e.target.value as OrderStatus, ord.courier)
                            }
                            className="bg-[#FAF8F5] border border-[#E8E0D3] rounded-xs px-2 py-1 text-xs font-medium cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped (Dispatch)</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & INVENTORY */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#736B63]">
                  Showing all {products.length} products with real-time stock levels
                </span>
                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      nameUrdu: '',
                      category: 'socks',
                      price: 1500,
                      stockQuantity: 20,
                      inStock: true,
                      shortDescription: '',
                      description: '',
                      images: ['/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg']
                    });
                    setShowProductForm(true);
                  }}
                  className="px-4 py-2 bg-[#141312] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 hover:bg-[#2C2926] cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C5A059]" />
                  <span>{t.addNewProduct}</span>
                </button>
              </div>

              {/* Product Form Modal */}
              {showProductForm && editingProduct && (
                <div className="bg-white p-6 rounded-xs border-2 border-[#C5A059] space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-[#E8E0D3]">
                    <h3 className="font-serif text-base font-semibold text-[#141312]">
                      {editingProduct.id ? 'Edit Product' : 'Add New Artisan Product'}
                    </h3>
                    <button
                      onClick={() => setShowProductForm(false)}
                      className="p-1 text-[#8C827A]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-medium mb-1">Product Title (English)</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full border border-[#E8E0D3] p-2 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Product Title (Urdu)</label>
                      <input
                        type="text"
                        value={editingProduct.nameUrdu || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, nameUrdu: e.target.value })}
                        className="w-full border border-[#E8E0D3] p-2 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Category</label>
                      <select
                        value={editingProduct.category || 'socks'}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as Category })}
                        className="w-full border border-[#E8E0D3] p-2 rounded-xs"
                      >
                        <option value="socks">Socks</option>
                        <option value="jewellery">Jewellery</option>
                        <option value="spices">Spices</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Price in PKR</label>
                      <input
                        type="number"
                        required
                        value={editingProduct.price || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full border border-[#E8E0D3] p-2 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        required
                        value={editingProduct.stockQuantity ?? 15}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: Number(e.target.value) })}
                        className="w-full border border-[#E8E0D3] p-2 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">SKU Code</label>
                      <input
                        type="text"
                        value={editingProduct.sku || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                        placeholder="ZQ-XXX-000"
                        className="w-full border border-[#E8E0D3] p-2 rounded-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-medium mb-1">Short Description</label>
                      <input
                        type="text"
                        value={editingProduct.shortDescription || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                        className="w-full border border-[#E8E0D3] p-2 rounded-xs"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowProductForm(false)}
                        className="px-4 py-2 border border-[#E8E0D3] rounded-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-[#141312] text-white font-semibold rounded-xs hover:bg-[#2C2926]"
                      >
                        {loading ? 'Saving...' : 'Save Product to Store'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Product Table */}
              <div className="overflow-x-auto bg-white border border-[#E8E0D3] rounded-xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F4EFE7] text-[#141312] uppercase tracking-wider text-[10px] border-b border-[#E8E0D3]">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock Units</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4EFE7]">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 flex items-center gap-3">
                          <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 object-cover rounded-xs" />
                          <div>
                            <p className="font-semibold text-[#141312] line-clamp-1">{prod.name}</p>
                            <p className="text-[10px] text-[#8C827A]">{prod.nameUrdu}</p>
                          </div>
                        </td>
                        <td className="p-3 uppercase text-[10px] text-[#A9823B] font-semibold">
                          {prod.category}
                        </td>
                        <td className="p-3 font-mono font-semibold tabular-nums text-[#141312]">
                          PKR {prod.price.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span
                            className={`font-mono font-semibold px-2 py-0.5 rounded-xs ${
                              prod.stockQuantity < 10
                                ? 'bg-red-50 text-red-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {prod.stockQuantity} in stock
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[#736B63]">
                          {prod.sku}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setShowProductForm(true);
                              }}
                              className="p-1 text-[#736B63] hover:text-[#141312]"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1 text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
