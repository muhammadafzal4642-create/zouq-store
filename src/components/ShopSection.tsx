import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { Product } from '../types/store.ts';
import { Language, translations } from '../lib/translations.ts';
import { ProductCard } from './ProductCard.tsx';

interface ShopSectionProps {
  products: Product[];
  lang: Language;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  lang,
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  searchQuery
}) => {
  const t = translations[lang];
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory && activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameUrdu.includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    if (inStockOnly) {
      list = list.filter((p) => p.inStock && p.stockQuantity > 0);
    }

    list = list.filter((p) => p.price <= maxPrice);

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, searchQuery, inStockOnly, maxPrice, sortBy]);

  const categories = [
    { id: 'all', label: t.allProducts },
    { id: 'socks', label: t.navSocks },
    { id: 'jewellery', label: t.navJewellery },
    { id: 'spices', label: t.navSpices },
  ];

  return (
    <section id="shop-section" className="py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E8E0D3] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-1">
              <span>{lang === 'en' ? 'Online Catalog' : 'آن لائن کیٹلاگ'}</span>
              <span>·</span>
              <span className="font-mono tabular-nums text-[#8C827A]">{filteredProducts.length} {t.itemsCount}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#141312]">
              {activeCategory === 'socks'
                ? t.catSocksTitle
                : activeCategory === 'jewellery'
                ? t.catJewelleryTitle
                : activeCategory === 'spices'
                ? t.catSpicesTitle
                : t.allProducts}
            </h2>
          </div>

          {/* Controls toolbar */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-[#E8E0D3] rounded-sm px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8C827A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[#141312] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">{t.sortFeatured}</option>
                <option value="price-low">{t.sortPriceLow}</option>
                <option value="price-high">{t.sortPriceHigh}</option>
                <option value="rating">{t.sortRating}</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 bg-white border border-[#E8E0D3] rounded-sm px-3 py-2 text-xs font-medium text-[#141312]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{lang === 'en' ? 'Filters' : 'فلٹرز'}</span>
            </button>
          </div>
        </div>

        {/* Category Segmented Selector */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#141312] text-white shadow-xs'
                  : 'bg-white border border-[#E8E0D3] text-[#4A4540] hover:text-[#141312] hover:border-[#C5A059]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:block ${mobileFiltersOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6 bg-white p-6 rounded-sm border border-[#E8E0D3] h-fit`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#F4EFE7]">
              <h3 className="font-serif text-lg font-medium text-[#141312]">
                {lang === 'en' ? 'Refine Selection' : 'فلٹرز کی ترتیب'}
              </h3>
              {mobileFiltersOpen && (
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden p-1 text-[#8C827A]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312]">
                {t.filterPrice}
              </label>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#736B63] font-mono tabular-nums">
                <span>PKR 1,000</span>
                <span className="font-semibold text-[#141312]">Up to PKR {maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-4 border-t border-[#F4EFE7]">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium text-[#141312]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#C5A059] rounded-xs cursor-pointer"
                />
                <span>{t.filterAvailability}</span>
              </label>
            </div>

            {/* Pakistani Trust Note */}
            <div className="pt-6 border-t border-[#F4EFE7] text-xs text-[#736B63] space-y-2">
              <p className="font-semibold text-[#141312]">
                {lang === 'en' ? 'Nationwide Shipping' : 'پورے پاکستان میں ترسیل'}
              </p>
              <p className="leading-relaxed text-[11px]">
                {lang === 'en'
                  ? 'All items dispatched securely from our Lahore Atelier via TCS & PostEx with active SMS tracking.'
                  : 'تمام پارسل لاہور سینٹرل ہب سے ٹی سی ایس اور پوسٹ ایکس کے ذریعے ترسیل کیے جاتے ہیں۔'}
              </p>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E8E0D3] rounded-sm p-8 space-y-4">
                <p className="text-base text-[#736B63] font-serif">{t.noProductsFound}</p>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setMaxPrice(25000);
                    setInStockOnly(false);
                  }}
                  className="px-6 py-2.5 bg-[#141312] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#2C2926]"
                >
                  {lang === 'en' ? 'Reset All Filters' : 'تمام فلٹرز ری سیٹ کریں'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    onSelect={onSelectProduct}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
