import React from 'react';
import { Language, translations } from '../lib/translations.ts';
import { ShieldCheck, Truck, MessageCircle } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onSelectCategory: (cat: string) => void;
  onOpenInfo: (page: string) => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectCategory,
  onOpenInfo,
  onOpenTracking
}) => {
  const t = translations[lang];
  const isUrdu = lang === 'ur';

  return (
    <footer className="bg-[#141312] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2C2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white block uppercase">
              {lang === 'en' ? 'ZOUQ HERITAGE' : 'ذوق ہیریٹیج'}
            </span>
            <p className="text-xs text-[#A9823B] tracking-widest uppercase font-medium">
              {t.brandTagline}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-sm">
              {t.footerAbout}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A059]">
              <MessageCircle className="w-4 h-4" />
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-mono"
              >
                +92 300 1234567 (WhatsApp Concierge)
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Atelier Collections' : 'مجموعہ جات'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('socks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navSocks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('jewellery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navJewellery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('spices')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navSpices}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navShop}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onOpenInfo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navTrackOrder}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'FAQs & Delivery Time' : 'عمومی سوالات'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              {t.customerCare}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onOpenInfo('shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.shippingPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.returnPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.terms}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Partners & Payment Strip */}
        <div className="pt-8 border-t border-[#2C2926] space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
            <div>
              <p className="font-medium text-stone-300 mb-2">
                {lang === 'en' ? 'Official Pakistan Delivery Couriers' : 'باضابطہ پاکستانی کوریئر پارٹنرز'}
              </p>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xs font-mono font-bold text-white tracking-wider">
                  TCS EXPRESS
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xs font-mono font-bold text-white tracking-wider">
                  LEOPARDS
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xs font-mono font-bold text-white tracking-wider">
                  POSTEX
                </span>
              </div>
            </div>

            <div>
              <p className="font-medium text-stone-300 mb-2 text-center md:text-right">
                {lang === 'en' ? 'Supported Payment Methods' : 'طریقہ ہائے ادائیگی'}
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 rounded-xs font-bold text-[10px]">
                  CASH ON DELIVERY (COD)
                </span>
                <span className="px-2.5 py-1 bg-red-950/80 border border-red-700/50 text-red-300 rounded-xs font-bold text-[10px]">
                  JAZZCASH
                </span>
                <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 rounded-xs font-bold text-[10px]">
                  EASYPAISA
                </span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-stone-200 rounded-xs font-bold text-[10px]">
                  VISA / MASTERCARD
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-[#22201E] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
            <p>{t.copyright}</p>
            <p className="text-[#C5A059]">Lahore · Karachi · Islamabad</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
