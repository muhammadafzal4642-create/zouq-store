import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, Category } from './types/store.ts';
import { Language, translations } from './lib/translations.ts';
import { fetchProducts, validateCoupon } from './lib/api.ts';
import { INITIAL_PRODUCTS } from './data/initialProducts.ts';

// Components
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CategoryCards } from './components/CategoryCards.tsx';
import { ShopSection } from './components/ShopSection.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { OrderTrackingModal } from './components/OrderTrackingModal.tsx';
import { AdminModal } from './components/AdminModal.tsx';
import { WhyUsSection } from './components/WhyUsSection.tsx';
import { CustomerReviews } from './components/CustomerReviews.tsx';
import { NewsletterSection } from './components/NewsletterSection.tsx';
import { InfoPagesModal } from './components/InfoPagesModal.tsx';
import { WishlistModal } from './components/WishlistModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  // Language & Direction
  const [lang, setLang] = useState<Language>('en');

  // Products & Categories
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zouq_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zouq_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingInitialQuery, setTrackingInitialQuery] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [infoPage, setInfoPage] = useState<string | null>(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync RTL / LTR on root document
  useEffect(() => {
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('zouq_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('zouq_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  // Load products from API
  const refreshProducts = async () => {
    const list = await fetchProducts();
    if (list && list.length > 0) {
      setProducts(list);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Language Toggle
  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  // Add to Cart
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    selectedVariation?: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedVariation === selectedVariation
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity, selectedVariation }];
      }
    });

    showToast(
      lang === 'en'
        ? `Added "${product.name}" to Bag`
        : `"${product.nameUrdu}" تھیلے میں شامل ہو گیا`
    );
    setCartOpen(true);
  };

  // Buy Now (Instant Checkout)
  const handleBuyNow = (
    product: Product,
    quantity: number = 1,
    selectedVariation?: string
  ) => {
    handleAddToCart(product, quantity, selectedVariation);
    setSelectedProduct(null);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    variation?: string
  ) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, variation);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => {
        if (it.product.id === productId && it.selectedVariation === variation) {
          return { ...it, quantity };
        }
        return it;
      })
    );
  };

  // Remove Cart Item
  const handleRemoveItem = (productId: string, variation?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (it) => !(it.product.id === productId && it.selectedVariation === variation)
      )
    );
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists
          ? (lang === 'en' ? 'Removed from Wishlist' : 'پسندیدہ فہرست سے ہٹا دیا گیا')
          : (lang === 'en' ? 'Added to Wishlist' : 'پسندیدہ فہرست میں شامل ہو گیا')
      );
      return next;
    });
  };

  // Coupon Validation
  const handleApplyCoupon = async (code: string) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const res = await validateCoupon(code, subtotal);
    if (res.success && res.data) {
      setAppliedCoupon({
        code: res.data.code,
        discountAmount: res.data.discountAmount
      });
      showToast(lang === 'en' ? 'Coupon Applied!' : 'کوپن لاگو ہو گیا!');
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order Placement Success
  const handleOrderSuccess = (order: Order) => {
    setCheckoutOpen(false);
    setCartItems([]);
    setAppliedCoupon(null);
    setSuccessOrder(order);
    refreshProducts(); // update inventory stock on frontend
  };

  // Wishlist Products list
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className={`min-h-screen bg-[#FAF8F5] text-[#1E1C1A] flex flex-col font-sans ${lang === 'ur' ? 'lang-ur' : ''}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141312] text-white text-xs px-4 py-3 rounded-xs shadow-xl border border-[#C5A059] animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Announcement Bar */}
      <AnnouncementBar lang={lang} />

      {/* 2. Top Bar Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenTracking={() => {
          setTrackingInitialQuery('');
          setTrackingOpen(true);
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenInfo={(page) => setInfoPage(page)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Hero Section */}
      <HeroSection
        lang={lang}
        onExplore={(cat) => {
          if (cat) setActiveCategory(cat);
          const el = document.getElementById('shop-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Three Pillars Category Cards */}
      <CategoryCards
        lang={lang}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('shop-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. Shop & Product Listing Section */}
      <ShopSection
        products={products}
        lang={lang}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onSelectProduct={setSelectedProduct}
        onAddToCart={(prod, e) => handleAddToCart(prod, 1, undefined, e)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        searchQuery={searchQuery}
      />

      {/* 6. Why Shop With Us Trust Pillars */}
      <WhyUsSection lang={lang} />

      {/* 7. Patron Customer Reviews */}
      <CustomerReviews lang={lang} />

      {/* 8. Newsletter & Voucher Signup */}
      <NewsletterSection lang={lang} />

      {/* 9. Comprehensive Footer */}
      <Footer
        lang={lang}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('shop-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInfo={(page) => setInfoPage(page)}
        onOpenTracking={() => {
          setTrackingInitialQuery('');
          setTrackingOpen(true);
        }}
      />

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        lang={lang}
        onAddToCart={(prod, qty, varOption) => handleAddToCart(prod, qty, varOption)}
        onBuyNow={(prod, qty, varOption) => handleBuyNow(prod, qty, varOption)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        allProducts={products}
        onSelectProduct={setSelectedProduct}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setCheckoutOpen(true)}
        lang={lang}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Pakistan Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        lang={lang}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Placement Success Confirmation */}
      <OrderSuccessModal
        order={successOrder}
        onClose={() => setSuccessOrder(null)}
        lang={lang}
        onOpenTracking={(orderNo) => {
          setTrackingInitialQuery(orderNo);
          setTrackingOpen(true);
        }}
      />

      {/* Real-time Order Tracking (TCS, Leopards, PostEx) */}
      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        lang={lang}
        initialQuery={trackingInitialQuery}
      />

      {/* Wishlist Drawer */}
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        lang={lang}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onAddToCart={(prod) => handleAddToCart(prod, 1)}
      />

      {/* Admin Atelier Portal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        lang={lang}
        products={products}
        onRefreshProducts={refreshProducts}
      />

      {/* Info Pages (About, Contact, FAQs, Shipping, Returns) */}
      <InfoPagesModal
        page={infoPage}
        onClose={() => setInfoPage(null)}
        lang={lang}
      />

    </div>
  );
}
