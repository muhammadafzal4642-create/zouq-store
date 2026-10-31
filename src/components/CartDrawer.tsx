import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Check } from 'lucide-react';
import { CartItem } from '../types/store.ts';
import { Language, translations } from '../lib/translations.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, variation?: string) => void;
  onRemoveItem: (productId: string, variation?: string) => void;
  onCheckout: () => void;
  lang: Language;
  appliedCoupon: { code: string; discountAmount: number } | null;
  onApplyCoupon: (code: string) => Promise<{ success: boolean; error?: string }>;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  lang,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon
}) => {
  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  if (!isOpen) return null;

  // Math
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 3500;
  const standardShipping = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : standardShipping;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    const res = await onApplyCoupon(couponInput.trim().toUpperCase());
    setCouponLoading(false);
    if (!res.success) {
      setCouponError(res.error || 'Invalid coupon code');
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col h-full border-l border-[#E8E0D3] overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-6 bg-white border-b border-[#E8E0D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#141312]" />
            <h2 className="font-serif text-xl font-medium text-[#141312]">
              {t.cart} ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B63] hover:text-[#141312] rounded-full hover:bg-[#F4EFE7] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-3.5 bg-[#F4EFE7]/80 border-b border-[#E8E0D3] text-xs">
          <div className="flex items-center justify-between font-medium text-[#141312] mb-1.5">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C5A059]" />
              <span>
                {isFreeShipping ? (
                  <span className="text-[#2E7D32] font-semibold">
                    {lang === 'en' ? 'Unlocked Free Express Delivery!' : 'مفت ایکسپریس ترسیل فعال ہو گئی!'}
                  </span>
                ) : (
                  <span>
                    {lang === 'en'
                      ? `Add PKR ${amountNeededForFreeShipping.toLocaleString()} more for FREE Delivery`
                      : `مفت ترسیل کیلئے مزید ${amountNeededForFreeShipping.toLocaleString()} روپے کی اشیاء شامل کریں`}
                  </span>
                )}
              </span>
            </div>
            <span className="font-mono tabular-nums text-[11px] text-[#736B63]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E8E0D3] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5A059] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-16 h-16 bg-[#F4EFE7] rounded-full mx-auto flex items-center justify-center text-[#8C827A]">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#141312]">
                {lang === 'en' ? 'Your Bag is Empty' : 'آپ کا خریداری تھیلا خالی ہے'}
              </h3>
              <p className="text-xs text-[#736B63] max-w-xs mx-auto">
                {lang === 'en'
                  ? 'Explore our combed cotton socks, 22K gold vermeil jewellery, or mountain spices.'
                  : 'ہمارے پریمیم موزے، نفیس زیورات اور خالص دیسی مصالحے ملاحظہ فرمائیں۔'}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#141312] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2C2926]"
              >
                {t.backToShop}
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedVariation || idx}`}
                className="bg-white border border-[#E8E0D3] p-3.5 rounded-xs flex gap-3.5"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xs bg-[#F4EFE7]"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#141312] line-clamp-1">
                        {isUrdu ? item.product.nameUrdu : item.product.name}
                      </h4>
                      {item.selectedVariation && (
                        <p className="text-[11px] text-[#8C827A] mt-0.5">
                          {item.selectedVariation}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedVariation)}
                      className="text-[#8C827A] hover:text-red-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#E8E0D3] rounded-xs bg-[#FAF8F5]">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedVariation)
                        }
                        className="px-2 py-0.5 text-xs text-[#736B63] hover:text-[#141312]"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono font-semibold tabular-nums text-[#141312]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedVariation)
                        }
                        className="px-2 py-0.5 text-xs text-[#736B63] hover:text-[#141312]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#141312] tabular-nums">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon Code Strip */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E8E0D3]">
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xs text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">{appliedCoupon.code}</span>
                  <span>(-PKR {appliedCoupon.discountAmount.toLocaleString()})</span>
                </div>
                <button
                  onClick={onRemoveCoupon}
                  className="text-xs text-emerald-900 underline hover:no-underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder={t.promoPlaceholder}
                    className="flex-1 bg-[#FAF8F5] border border-[#E8E0D3] text-xs px-3 py-2 rounded-xs uppercase tracking-wider text-[#141312] placeholder-[#8C827A] focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading || !couponInput.trim()}
                    className="px-4 py-2 bg-[#141312] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2C2926] disabled:opacity-50 cursor-pointer"
                  >
                    {couponLoading ? '...' : t.apply}
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                <p className="text-[10px] text-[#8C827A]">
                  Try code: <span className="font-mono font-semibold text-[#C5A059]">ZOUQ10</span> for 10% off
                </p>
              </form>
            )}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8E0D3] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5A544E]">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-mono tabular-nums text-[#141312]">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>{t.discount}</span>
                  <span className="font-mono tabular-nums">-PKR {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t.shippingFee}</span>
                <span className="font-mono tabular-nums text-[#141312]">
                  {shippingFee === 0 ? t.shippingFree : `PKR ${shippingFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F4EFE7] flex justify-between text-sm font-semibold text-[#141312]">
                <span>{t.total}</span>
                <span className="font-mono text-base tabular-nums">
                  {isUrdu ? `${total.toLocaleString()} روپے` : `PKR ${total.toLocaleString()}`}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-4 bg-[#141312] hover:bg-[#2C2926] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.checkout}</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
