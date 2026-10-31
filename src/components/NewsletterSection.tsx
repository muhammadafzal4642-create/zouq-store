import React, { useState } from 'react';
import { Mail, Check, Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '../lib/translations.ts';

interface NewsletterSectionProps {
  lang: Language;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#141312] text-white border-b border-[#2C2926] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block">
          {isUrdu ? 'شاہی کلب میں شمولیت' : 'The ZOUQ Private Circle'}
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
          {isUrdu
            ? 'نئے مجموعہ جات اور نایاب مصالحہ جات کی پیشگی خبریں'
            : 'Receive First Access to Limited Edition Collections'}
        </h2>

        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto font-sans leading-relaxed">
          {isUrdu
            ? 'ابھی سبسکرائب کریں اور اپنے پہلے آرڈر پر ۵۰۰ روپے کی فوری رعایت حاصل کریں۔'
            : 'Subscribe today and enjoy a complimentary PKR 500 voucher on your inaugural order, plus seasonal spice harvest alerts.'}
        </p>

        {subscribed ? (
          <div className="bg-[#FAF8F5]/10 border border-[#C5A059] p-6 rounded-xs max-w-md mx-auto space-y-2 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 text-[#C5A059]">
              <Sparkles className="w-5 h-5" />
              <span className="font-serif font-bold text-base">
                {isUrdu ? 'خوش آمدید! آپ کا واؤچر کوڈ:' : 'Welcome! Your Voucher Code:'}
              </span>
            </div>
            <p className="font-mono text-2xl font-bold tracking-widest text-white">
              KHUSHAMDEED
            </p>
            <p className="text-[11px] text-stone-300">
              {isUrdu
                ? 'چیک آؤٹ پر کوڈ درج کریں اور ۵۰۰ روپے فوری رعایت پائیں۔'
                : 'Enter code at checkout for PKR 500 flat discount.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isUrdu ? 'اپنا ای میل درج کریں...' : 'Enter your email address...'}
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-stone-400 text-xs px-4 py-3.5 rounded-xs focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#A9823B] text-[#141312] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              {isUrdu ? 'شامل ہوں' : 'Subscribe'}
            </button>
          </form>
        )}

        <div className="pt-4 flex items-center justify-center gap-6 text-[11px] text-stone-400">
          <span>✓ {isUrdu ? 'کوئی فالتو ای میل نہیں' : 'Zero Spam Guarantee'}</span>
          <span>·</span>
          <span>✓ {isUrdu ? 'کسی بھی وقت منسوخ کریں' : 'Unsubscribe Anytime'}</span>
        </div>
      </div>
    </section>
  );
};
