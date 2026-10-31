import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Heart, Share2, Check } from 'lucide-react';
import { Product } from '../types/store.ts';
import { Language, translations } from '../lib/translations.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  lang: Language;
  onAddToCart: (product: Product, quantity: number, selectedVariation?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedVariation?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  lang,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  allProducts,
  onSelectProduct
}) => {
  if (!product) return null;

  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariation, setSelectedVariation] = useState<string>(
    product.variations && product.variations.length > 0 && product.variations[0].options.length > 0
      ? product.variations[0].options[0]
      : ''
  );
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);

  // Related items
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-sm shadow-2xl border border-[#E8E0D3] overflow-hidden my-8">
        
        {/* Sticky Close Bar */}
        <div className="sticky top-0 right-0 z-20 flex justify-between items-center px-6 py-4 bg-[#FAF8F5]/90 backdrop-blur border-b border-[#E8E0D3]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C827A]">
            {product.sku}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#141312] hover:text-[#C5A059] rounded-full hover:bg-[#F4EFE7] transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[4/3] bg-[#F4EFE7] rounded-sm overflow-hidden border border-[#E8E0D3] relative">
                <img
                  src={selectedImage}
                  alt={isUrdu ? product.nameUrdu : product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.badges && product.badges.length > 0 && (
                  <span className="absolute top-4 left-4 bg-[#141312] text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1">
                    {isUrdu && product.badgesUrdu ? product.badgesUrdu[0] : product.badges[0]}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-16 rounded-xs overflow-hidden border transition-all cursor-pointer ${
                        selectedImage === img
                          ? 'border-[#C5A059] ring-1 ring-[#C5A059]'
                          : 'border-[#E8E0D3] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Box */}
              <div className="bg-[#F4EFE7]/60 border border-[#E8E0D3] p-4 rounded-xs space-y-3 text-xs text-[#5A544E]">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{t.deliveryEstimate}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{t.codAvailable}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{lang === 'en' ? '7-Day Easy Exchange & Return' : '۷ دن میں آسان واپسی و تبدیلی کی سہولت'}</span>
                </div>
              </div>
            </div>

            {/* Purchase & Info Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059] block mb-1">
                  {isUrdu ? product.categoryNameUrdu : product.categoryName}
                </span>

                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#141312] leading-snug">
                  {isUrdu ? product.nameUrdu : product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-[#C5A059]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current'
                            : 'text-[#E8E0D3]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#141312] font-mono tabular-nums">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                  <span className="text-xs text-[#8C827A]">
                    ({product.reviewCount} {lang === 'en' ? 'verified reviews' : 'تصدیق شدہ آراء'})
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-[#E8E0D3]">
                <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#141312] tabular-nums">
                  {isUrdu ? `${product.price.toLocaleString()} روپے` : `PKR ${product.price.toLocaleString()}`}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-[#8C827A] line-through font-mono tabular-nums">
                    {isUrdu ? `${product.originalPrice.toLocaleString()}` : `PKR ${product.originalPrice.toLocaleString()}`}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs text-[#2E7D32] bg-[#E8F5E9] font-semibold px-2 py-0.5 rounded-xs uppercase tracking-wider">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Stock Indicator */}
              <div className="flex items-center gap-2 text-xs font-medium">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.inStock && product.stockQuantity > 0 ? 'bg-emerald-600' : 'bg-red-500'
                  }`}
                />
                <span className={product.inStock ? 'text-emerald-800' : 'text-red-700'}>
                  {product.inStock && product.stockQuantity > 0
                    ? `${t.stockIn} (${product.stockQuantity} ${lang === 'en' ? 'units remaining' : 'عدد باقی'})`
                    : t.stockOut}
                </span>
              </div>

              {/* Variations selector if applicable */}
              {product.variations && product.variations.length > 0 && (
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312]">
                    {isUrdu ? product.variations[0].nameUrdu : product.variations[0].name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variations[0].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariation(opt)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                          selectedVariation === opt
                            ? 'bg-[#141312] text-white border-[#141312]'
                            : 'bg-white border-[#E8E0D3] text-[#4A4540] hover:border-[#C5A059]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#E8E0D3] bg-white rounded-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm text-[#4A4540] hover:text-[#141312] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold font-mono tabular-nums text-[#141312]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="px-3 py-2 text-sm text-[#4A4540] hover:text-[#141312] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={(e) => onToggleWishlist(product.id, e)}
                    className={`p-2.5 border rounded-xs transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-[#E8E0D3] bg-white text-[#4A4540] hover:text-[#141312]'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2.5 border border-[#E8E0D3] bg-white text-[#4A4540] hover:text-[#141312] rounded-xs cursor-pointer"
                    title="Share"
                  >
                    {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                  </button>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => onAddToCart(product, quantity, selectedVariation)}
                    disabled={!product.inStock}
                    className="w-full py-3.5 bg-[#FAF8F5] border border-[#141312] hover:bg-[#F4EFE7] text-[#141312] text-xs font-semibold tracking-[0.18em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.addToCart}</span>
                  </button>

                  <button
                    onClick={() => onBuyNow(product, quantity, selectedVariation)}
                    disabled={!product.inStock}
                    className="w-full py-3.5 bg-[#141312] hover:bg-[#2C2926] text-white text-xs font-semibold tracking-[0.18em] uppercase transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{t.buyNow}</span>
                  </button>
                </div>
              </div>

              {/* Tabs: Description, Specs, Reviews */}
              <div className="pt-6 border-t border-[#E8E0D3]">
                <div className="flex border-b border-[#E8E0D3] gap-6 text-xs uppercase tracking-wider font-semibold">
                  <button
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'desc'
                        ? 'border-[#C5A059] text-[#141312]'
                        : 'border-transparent text-[#8C827A] hover:text-[#141312]'
                    }`}
                  >
                    {lang === 'en' ? 'Story & Detail' : 'تفصیل و روایت'}
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'border-[#C5A059] text-[#141312]'
                        : 'border-transparent text-[#8C827A] hover:text-[#141312]'
                    }`}
                  >
                    {t.specsTab}
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'reviews'
                        ? 'border-[#C5A059] text-[#141312]'
                        : 'border-transparent text-[#8C827A] hover:text-[#141312]'
                    }`}
                  >
                    {t.reviewsTab} ({product.reviewCount})
                  </button>
                </div>

                <div className="py-4 text-xs sm:text-sm text-[#5A544E] leading-relaxed">
                  {activeTab === 'desc' && (
                    <p>{isUrdu ? product.descriptionUrdu : product.description}</p>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2.5">
                      <div className="flex justify-between py-1 border-b border-[#F4EFE7]">
                        <span className="text-[#8C827A]">{t.origin}</span>
                        <span className="font-medium text-[#141312]">
                          {isUrdu ? product.specs.originUrdu : product.specs.origin}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F4EFE7]">
                        <span className="text-[#8C827A]">{t.material}</span>
                        <span className="font-medium text-[#141312]">
                          {isUrdu ? product.specs.materialUrdu : product.specs.material}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F4EFE7]">
                        <span className="text-[#8C827A]">{t.care}</span>
                        <span className="font-medium text-[#141312]">
                          {isUrdu ? product.specs.careUrdu : product.specs.care}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#8C827A]">{t.packaging}</span>
                        <span className="font-medium text-[#141312]">
                          {isUrdu ? product.specs.packagingUrdu : product.specs.packaging}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xs border border-[#E8E0D3] space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-[#141312]">Hamza Tariq (Lahore)</span>
                          <span className="text-emerald-700 font-medium">✓ {lang === 'en' ? 'Verified Buyer' : 'تصدیق شدہ خریدار'}</span>
                        </div>
                        <div className="flex text-[#C5A059]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-[#5A544E]">
                          {lang === 'en'
                            ? 'Exceptional packaging and fast delivery via TCS within 2 days in Lahore. Quality is genuinely on par with international luxury stores.'
                            : 'لاہور میں ٹی سی ایس کے ذریعے صرف دو دنوں میں پارسل موصول ہو گیا۔ نفاست اور پیکنگ بین الاقوامی معیار کے عین مطابق ہے۔'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E8E0D3]">
              <h3 className="font-serif text-xl font-medium text-[#141312] mb-6">
                {t.relatedProducts}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedImage(rel.images[0]);
                      setQuantity(1);
                    }}
                    className="group cursor-pointer bg-white border border-[#E8E0D3] p-3 rounded-xs flex items-center gap-3 hover:border-[#C5A059]"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-16 h-16 object-cover rounded-xs"
                    />
                    <div>
                      <p className="text-xs font-serif font-medium text-[#141312] line-clamp-1 group-hover:text-[#C5A059]">
                        {isUrdu ? rel.nameUrdu : rel.name}
                      </p>
                      <p className="text-xs font-mono font-semibold text-[#141312]">
                        PKR {rel.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
