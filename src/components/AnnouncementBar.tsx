import React, { useState } from 'react';
import { X, Sparkles, Truck } from 'lucide-react';
import { Language, translations } from '../lib/translations.ts';

interface AnnouncementBarProps {
  lang: Language;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ lang }) => {
  const [dismissed, setDismissed] = useState(false);
  const t = translations[lang];

  if (dismissed) return null;

  return (
    <div className="bg-[#141312] text-[#FAF8F5] text-xs font-medium border-b border-[#2C2926] relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-3 text-center">
          <Truck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          <span className="tracking-wide">
            {t.announcement}
          </span>
          <span className="hidden md:inline text-[#C5A059]">·</span>
          <span className="hidden md:inline text-[#C5A059] font-serif tracking-widest text-[13px]">
            {lang === 'en' ? 'CODE: ZOUQ10 FOR 10% OFF' : 'کوپن: ZOUQ10 پر ۱۰٪ چھوٹ'}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-stone-400 hover:text-white transition-colors p-1 shrink-0 ml-2"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
