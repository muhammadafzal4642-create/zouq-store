import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Globe, Shield, Menu, X, ArrowRight } from 'lucide-react';
import { Language, translations } from '../lib/translations.ts';
import { Category } from '../types/store.ts';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onOpenInfo: (page: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onOpenAdmin,
  onOpenInfo,
  searchQuery,
  onSearchChange
}) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { id: 'all', label: t.navShop },
    { id: 'socks', label: t.navSocks },
    { id: 'jewellery', label: t.navJewellery },
    { id: 'spices', label: t.navSpices },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E0D3] transition-all">
      {/* Top 1-row Bar conforming to Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1E1C1A] hover:text-[#C5A059] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-[#141312] group-hover:text-[#C5A059] transition-colors uppercase">
              {lang === 'en' ? 'ZOUQ' : 'ذوق'}
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-[#8C827A] font-sans font-medium uppercase -mt-1">
              {lang === 'en' ? 'HERITAGE · PAKISTAN' : 'ہیریٹیج · پاکستان'}
            </span>
          </button>
        </div>

        {/* Zone 2: Concise Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.15em] font-medium text-[#4A4540]">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectCategory(item.id);
                const el = document.getElementById('shop-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`whitespace-nowrap transition-colors relative py-1 hover:text-[#141312] cursor-pointer ${
                activeCategory === item.id
                  ? 'text-[#141312] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C5A059]'
                  : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => onOpenInfo('about')}
            className="whitespace-nowrap hover:text-[#141312] transition-colors py-1 cursor-pointer"
          >
            {t.navAbout}
          </button>
          <button
            onClick={onOpenTracking}
            className="whitespace-nowrap text-[#8C827A] hover:text-[#C5A059] transition-colors py-1 cursor-pointer flex items-center gap-1.5"
          >
            <span>{t.navTrackOrder}</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-[#4A4540] hover:text-[#141312] transition-colors cursor-pointer"
            aria-label="Search store"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold tracking-wider text-[#1E1C1A] bg-[#F4EFE7] hover:bg-[#E8E0D3] rounded border border-[#E8E0D3] transition-colors cursor-pointer"
            title={lang === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="uppercase">{lang === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#4A4540] hover:text-[#141312] transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A059] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag (Cart) */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#141312] hover:text-[#C5A059] transition-colors cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#141312] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Switch */}
          <button
            onClick={onOpenAdmin}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#FAF8F5] bg-[#141312] hover:bg-[#2C2926] rounded transition-colors cursor-pointer tracking-wider"
            title="Open Admin Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{lang === 'en' ? 'Admin' : 'ایڈمن'}</span>
          </button>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="bg-[#FAF8F5] border-t border-[#E8E0D3] py-3 px-4 sm:px-6 animate-fadeIn">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-[#8C827A] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              autoFocus
              className="w-full bg-transparent border-none text-sm text-[#141312] placeholder-[#8C827A] focus:outline-none py-1"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-[#8C827A] hover:text-[#141312] px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[#8C827A] hover:text-[#141312] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-[#E8E0D3] px-6 py-6 space-y-4">
          <div className="space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById('shop-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block w-full text-left py-2 text-base font-serif font-medium text-[#141312] border-b border-[#E8E0D3]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm text-[#4A4540] flex items-center justify-between"
            >
              <span>{t.navTrackOrder}</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
            <button
              onClick={() => {
                onOpenInfo('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm text-[#4A4540] flex items-center justify-between"
            >
              <span>{t.navAbout}</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
            <button
              onClick={() => {
                onOpenInfo('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm text-[#4A4540] flex items-center justify-between"
            >
              <span>{t.navContact}</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm text-[#C5A059] font-medium flex items-center justify-between border-t border-[#E8E0D3] pt-3"
            >
              <span>{t.navAdmin}</span>
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
