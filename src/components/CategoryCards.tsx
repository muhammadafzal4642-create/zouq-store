import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from '../lib/translations.ts';

interface CategoryCardsProps {
  lang: Language;
  onSelectCategory: (category: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ lang, onSelectCategory }) => {
  const t = translations[lang];

  const categories = [
    {
      id: 'socks',
      title: t.catSocksTitle,
      desc: t.catSocksDesc,
      image: '/src/assets/images/product_luxury_egyptian_socks_1793436063612.jpg',
      count: lang === 'en' ? 'Egyptian Cotton & Cashmere' : 'کُمبڈ کاٹن و پشمینہ'
    },
    {
      id: 'jewellery',
      title: t.catJewelleryTitle,
      desc: t.catJewelleryDesc,
      image: '/src/assets/images/product_polki_kundan_jewellery_1793436065109.jpg',
      count: lang === 'en' ? '22K Gold Vermeil & Polki' : '۲۲ قیراط سونا و پولکی'
    },
    {
      id: 'spices',
      title: t.catSpicesTitle,
      desc: t.catSpicesDesc,
      image: '/src/assets/images/product_authentic_pakistani_spices_1793436064277.jpg',
      count: lang === 'en' ? 'Single-Origin Mountain Harvest' : 'خالص پہاڑی پیداوار'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            {lang === 'en' ? 'Curated Masterpieces' : 'منتخب شاہکار کلیکشن'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#141312] tracking-tight">
            {lang === 'en' ? 'Three Pillars of Pakistani Refinement' : 'پاکستانی نفاست کے تین بنیادی ستون'}
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer bg-white border border-[#E8E0D3] rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFE7]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur text-[#141312] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-xs">
                  {cat.count}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#141312] group-hover:text-[#C5A059] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#736B63] line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4EFE7] flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-[#141312] group-hover:text-[#C5A059] transition-colors">
                  <span>{t.shopCategory}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
