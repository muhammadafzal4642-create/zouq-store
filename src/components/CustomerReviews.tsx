import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Language } from '../lib/translations.ts';

interface CustomerReviewsProps {
  lang: Language;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  const reviews = [
    {
      author: 'Fatima Zubair',
      city: 'Karachi, Clifton',
      rating: 5,
      date: 'October 2026',
      title: 'Exquisite Polki Choker for Sister’s Wedding',
      titleUrdu: 'بہن کی شادی کیلئے لاجواب پولکی چوکر',
      comment:
        'I ordered the Nizam-ul-Mulk choker with some hesitation about online jewellery, but the craft blew me away! The 22K gold dip looks identical to real bridal gold, and delivery via PostEx to Karachi took barely 3 days.',
      commentUrdu:
        'آن لائن زیورات کے بارے میں تھوڑا سا ڈر تھا لیکن پارسل ملنے پر حیران رہ گئی۔ ۲۲ قیراط کی پالش اور اصلی موتیوں کا کام ہو بہو سونے جیسا ہے۔ کراچی میں ۳ دن میں پہنچ گیا۔'
    },
    {
      author: 'Bilal Chaudhry',
      city: 'Lahore, Gulberg',
      rating: 5,
      date: 'October 2026',
      title: 'Best Combed Cotton Socks in Pakistan',
      titleUrdu: 'پاکستان کے بہترین کاٹن موزے',
      comment:
        'As an architect wearing dress shoes for 10 hours daily, standard socks leave marks and get sweaty. These 200-needle socks are game changing. The seamless toe prevents any rubbing inside oxfords.',
      commentUrdu:
        'دفتر میں ۱۰ گھنٹے جوتے پہننے والوں کیلئے نعمت ہیں۔ بناوٹ انتہائی ملائم ہے اور انگلیوں پر بالکل کوئی نشان نہیں پڑتا۔'
    },
    {
      author: 'Dr. Sameen Jahangir',
      city: 'Islamabad, F-7',
      rating: 5,
      date: 'October 2026',
      title: 'Genuine Mountain Saffron & Kunri Chili',
      titleUrdu: 'خالص پہاڑی زعفران اور کنری کی مرچ',
      comment:
        'You can immediately smell the difference with Gilgit saffron. Just 3 strands gave my saffron tea a glowing amber hue. The Kunri chili has that authentic Pakistani karahi aroma without chemical red dyes.',
      commentUrdu:
        'گلگت کے زعفران کی مہک اور رنگ لاجواب ہے۔ صرف تین ریشوں سے پورا قہوہ سنہری ہو گیا۔ مصنوعی رنگوں کے بغیر خالص دیسی ذائقہ۔'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            {isUrdu ? 'صارفین کا اعتماد' : 'Patron Testimonials'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#141312]">
            {isUrdu ? 'پورے پاکستان سے گاہکوں کی آراء' : 'Voices of Discerning Patrons'}
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-sm border border-[#E8E0D3] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#C5A059]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h3 className="font-serif text-lg font-medium text-[#141312]">
                  {isUrdu ? rev.titleUrdu : rev.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#736B63] leading-relaxed">
                  "{isUrdu ? rev.commentUrdu : rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F4EFE7] flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#141312]">{rev.author}</p>
                  <p className="text-[#8C827A] text-[11px]">{rev.city}</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'تصدیق شدہ خریدار' : 'Verified Buyer'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
