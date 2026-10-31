import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/store.ts';
import { Language, translations } from '../lib/translations.ts';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  lang,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const isUrdu = lang === 'ur';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col h-full border-l border-[#E8E0D3]">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8E0D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h2 className="font-serif text-xl font-medium text-[#141312]">
              {t.wishlist} ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B63] hover:text-[#141312] rounded-full hover:bg-[#F4EFE7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-16 h-16 bg-[#F4EFE7] rounded-full mx-auto flex items-center justify-center text-[#8C827A]">
                <Heart className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#141312]">
                {lang === 'en' ? 'Your Wishlist is Empty' : 'پسندیدہ فہرست خالی ہے'}
              </h3>
              <p className="text-xs text-[#736B63] max-w-xs mx-auto">
                {lang === 'en'
                  ? 'Click the heart icon on any piece to save it for your bridal trousseau or seasonal gift.'
                  : 'کسی بھی پروڈکٹ پر دل کے نشان کو دبا کر محفوظ کریں۔'}
              </p>
            </div>
          ) : (
            wishlistProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-[#E8E0D3] p-3.5 rounded-xs flex gap-3.5"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-20 h-20 object-cover rounded-xs bg-[#F4EFE7]"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#141312] line-clamp-1">
                      {isUrdu ? prod.nameUrdu : prod.name}
                    </h4>
                    <p className="font-mono text-xs font-semibold text-[#141312] mt-1 tabular-nums">
                      PKR {prod.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="px-3 py-1.5 bg-[#141312] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2C2926] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{t.addToCart}</span>
                    </button>

                    <button
                      onClick={() => onRemoveWishlist(prod.id)}
                      className="p-1 text-[#8C827A] hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
