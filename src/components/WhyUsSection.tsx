import React from 'react';
import { Award, Banknote, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { Language, translations } from '../lib/translations.ts';

interface WhyUsSectionProps {
  lang: Language;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const features = [
    {
      icon: <Award className="w-6 h-6 text-[#C5A059]" />,
      title: t.why1Title,
      desc: t.why1Desc,
    },
    {
      icon: <Banknote className="w-6 h-6 text-[#C5A059]" />,
      title: t.why2Title,
      desc: t.why2Desc,
    },
    {
      icon: <Truck className="w-6 h-6 text-[#C5A059]" />,
      title: t.why3Title,
      desc: t.why3Desc,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
      title: t.why4Title,
      desc: t.why4Desc,
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#C5A059]" />,
      title: t.why5Title,
      desc: t.why5Desc,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#E8E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            {lang === 'en' ? 'Authenticity & Trust' : 'اعتماد اور خالص پن'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#141312]">
            {t.whyTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#736B63]">
            {t.whySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="text-center space-y-3 p-4 rounded-xs border border-transparent hover:border-[#E8E0D3] hover:bg-[#FAF8F5] transition-all"
            >
              <div className="w-12 h-12 bg-[#FAF8F5] border border-[#E8E0D3] rounded-full mx-auto flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-serif text-base font-semibold text-[#141312]">
                {item.title}
              </h3>
              <p className="text-xs text-[#736B63] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
