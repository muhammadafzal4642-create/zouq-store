import React from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types/store.ts';
import { Language } from '../lib/translations.ts';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const isUrdu = lang === 'ur';

  return (
    <div
      onClick={() => onSelect(product)}
      className="group cursor-pointer bg-white border border-[#E8E0D3] rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] bg-[#F4EFE7] overflow-hidden">
        <img
          src={product.images[0]}
          alt={isUrdu ? product.nameUrdu : product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted
              ? 'bg-red-50 text-red-600'
              : 'bg-white/80 backdrop-blur text-[#4A4540] hover:text-[#141312] hover:bg-white'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
        </button>

        {/* Subtle Single Text Tag */}
        {product.badges && product.badges.length > 0 && (
          <span className="absolute top-3 left-3 bg-[#141312]/80 backdrop-blur text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs">
            {isUrdu && product.badgesUrdu ? product.badgesUrdu[0] : product.badges[0]}
          </span>
        )}

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="w-full py-2 bg-[#FAF8F5] text-[#141312] hover:bg-[#C5A059] hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'تھیلے میں ڈالیں' : 'Quick Add'}</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#8C827A] mb-1">
            <span className="uppercase tracking-widest text-[11px] font-medium text-[#A9823B]">
              {isUrdu ? product.categoryNameUrdu : product.categoryName}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
              <span className="font-mono tabular-nums text-xs text-[#141312] font-semibold">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#141312] group-hover:text-[#C5A059] transition-colors line-clamp-1">
            {isUrdu ? product.nameUrdu : product.name}
          </h3>

          <p className="text-xs text-[#736B63] line-clamp-2 mt-1 font-sans leading-relaxed">
            {isUrdu ? product.shortDescriptionUrdu : product.shortDescription}
          </p>
        </div>

        {/* Price Baseline */}
        <div className="pt-2 border-t border-[#F4EFE7] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#141312] font-mono tabular-nums">
              {isUrdu ? `${product.price.toLocaleString()} روپے` : `PKR ${product.price.toLocaleString()}`}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#8C827A] line-through font-mono tabular-nums">
                {isUrdu ? `${product.originalPrice.toLocaleString()}` : `PKR ${product.originalPrice.toLocaleString()}`}
              </span>
            )}
          </div>

          <span className="text-[11px] text-[#2E7D32] font-medium tracking-wide">
            {product.inStock ? (isUrdu ? 'دستیاب ہے' : 'In Stock') : (isUrdu ? 'ختم' : 'Out of stock')}
          </span>
        </div>
      </div>
    </div>
  );
};
