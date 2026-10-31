import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Language, translations } from '../lib/translations.ts';

interface HeroSectionProps {
  lang: Language;
  onExplore: (category?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onExplore }) => {
  const t = translations[lang];

  return (
    <section className="relative bg-[#FAF8F5] overflow-hidden border-b border-[#E8E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
              <span className="w-6 h-[1px] bg-[#C5A059]"></span>
              <span>{t.heroPretitle}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#141312] leading-[1.15] text-balance">
              {lang === 'en' ? (
                <>
                  Discover Quality.<br />
                  <span className="italic font-normal text-[#C5A059]">Experience Elegance.</span>
                </>
              ) : (
                <>
                  معیار کا انتخاب۔<br />
                  <span className="text-[#C5A059]">نفاست کا احساس۔</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#5A544E] leading-relaxed max-w-xl font-sans">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onExplore('all')}
                className="px-8 py-4 bg-[#141312] hover:bg-[#2C2926] text-[#FAF8F5] text-xs font-semibold tracking-[0.18em] uppercase transition-all shadow-sm hover:shadow flex items-center gap-3 cursor-pointer group"
              >
                <span>{lang === 'en' ? 'Shop Collections' : 'خریداری شروع کریں'}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExplore('jewellery')}
                className="px-6 py-4 bg-transparent border border-[#C5A059] hover:bg-[#F4EFE7] text-[#141312] text-xs font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer"
              >
                <span>{lang === 'en' ? 'Fine Jewellery' : 'روایتی زیورات'}</span>
              </button>
            </div>

            {/* Micro Highlights strip */}
            <div className="pt-6 border-t border-[#E8E0D3] grid grid-cols-3 gap-4 text-[#4A4540]">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#141312] tabular-nums">22K</p>
                <p className="text-[11px] text-[#736B63] uppercase tracking-wider">{lang === 'en' ? 'Gold Vermeil' : 'طلائی ملمع'}</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#141312] tabular-nums">200N</p>
                <p className="text-[11px] text-[#736B63] uppercase tracking-wider">{lang === 'en' ? 'Combed Weave' : 'کاٹن بنائی'}</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#141312] tabular-nums">100%</p>
                <p className="text-[11px] text-[#736B63] uppercase tracking-wider">{lang === 'en' ? 'Pure Saffron' : 'خالص زعفران'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Resolution Lifestyle Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-sm overflow-hidden bg-[#EFEBE4] shadow-xl border border-[#E8E0D3] group">
              <img
                src="/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg"
                alt="ZOUQ Heritage Atelier Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle floating editorial label */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] block font-medium">
                    {lang === 'en' ? 'Direct From Generational Artisans' : 'نسل در نسل کاریگروں کی تخلیق'}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                    {lang === 'en' ? 'Lahore · Gilgit · Kunri' : 'لاہور · گلگت · کنری'}
                  </span>
                </div>
                <div className="bg-[#FAF8F5]/90 backdrop-blur text-[#141312] text-xs font-semibold px-3 py-1.5 rounded-sm tracking-wider uppercase">
                  {lang === 'en' ? 'Nationwide COD' : 'کیش آن ڈیلیوری'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
