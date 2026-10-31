import React from 'react';
import { X, MessageCircle, MapPin, Phone, Mail, Clock, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Language, translations } from '../lib/translations.ts';

interface InfoPagesModalProps {
  page: string | null;
  onClose: () => void;
  lang: Language;
}

export const InfoPagesModal: React.FC<InfoPagesModalProps> = ({ page, onClose, lang }) => {
  if (!page) return null;

  const t = translations[lang];
  const isUrdu = lang === 'ur';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-3xl rounded-sm shadow-2xl border border-[#E8E0D3] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E0D3] flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium text-[#141312]">
            {page === 'about'
              ? (isUrdu ? 'ہماری روایت اور کہانی' : 'Our Heritage & Philosophy')
              : page === 'contact'
              ? (isUrdu ? 'رابطہ و شو روم' : 'Contact Us & Showroom')
              : page === 'faq'
              ? (isUrdu ? 'عمومی سوالات (FAQ)' : 'Frequently Asked Questions')
              : page === 'shipping'
              ? (isUrdu ? 'ترسیل کی پالیسی' : 'Nationwide Shipping Policy')
              : (isUrdu ? 'واپسی اور تبدیلی کی پالیسی' : 'Return & Exchange Policy')}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-[#8C827A] hover:text-[#141312]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto text-xs sm:text-sm text-[#5A544E] leading-relaxed space-y-6">
          
          {/* ABOUT US */}
          {page === 'about' && (
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-xs overflow-hidden mb-4">
                <img
                  src="/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg"
                  alt="ZOUQ Heritage Atelier"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-serif text-xl font-medium text-[#141312]">
                {isUrdu ? 'لاہور کے دل سے جنم لینے والی نفاست' : 'Born From the Living Artisanal Heritage of Pakistan'}
              </h3>

              <p>
                {isUrdu
                  ? 'ذوق ہیریٹیج کا آغاز ایک سادہ مگر مضبوط خواب کے ساتھ ہوا: پاکستان کی لازوال دستکاری—اندرونِ لاہور کے صرافہ بازاروں کے کندن و پولکی زیورات سے لے کر فیصل آباد کے ٹیکسٹائل ماہرین کی ۲۰۰ سوئی کاٹن اور گلگت بلتستان کے اونچے پہاڑوں کے خالص زعفران تک—کو ایک پروقار اور بین الاقوامی معیار کے ساتھ پیش کرنا۔'
                  : 'ZOUQ Heritage was established with an uncompromising singular mission: to unite the three great historic crafts of Pakistan into one premier digital destination. We believe true luxury lies in authentic origin, generational mastery, and honest materials.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E0D3]">
                <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs">
                  <h4 className="font-serif font-bold text-[#141312] text-sm mb-1">
                    {isUrdu ? 'موزے (Socks)' : 'Artisan Weaves'}
                  </h4>
                  <p className="text-xs text-[#736B63]">
                    {isUrdu
                      ? 'فیصل آباد کی قدیم ملوں کے مصری کاٹن اور ہاتھ کی ہموار سلائی۔'
                      : 'Egyptian combed cotton & cashmere blended for zero chafing.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs">
                  <h4 className="font-serif font-bold text-[#141312] text-sm mb-1">
                    {isUrdu ? 'زیورات (Jewellery)' : 'Heirloom Jewels'}
                  </h4>
                  <p className="text-xs text-[#736B63]">
                    {isUrdu
                      ? 'لاہور اور کراچی کے روایتی کاریگروں کے ۲۲ قیراط طلائی شاہکار۔'
                      : '22K gold-plated Polki & Kundan with Basra cultured pearls.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs">
                  <h4 className="font-serif font-bold text-[#141312] text-sm mb-1">
                    {isUrdu ? 'مصالحہ جات (Spices)' : 'Pure Spices'}
                  </h4>
                  <p className="text-xs text-[#736B63]">
                    {isUrdu
                      ? 'گلگت، سوات اور کنری سے بغیر کیمیائی ملاوٹ کے خالص پیداوار۔'
                      : 'Lab-certified mountain saffron, turmeric, and Dandicut chilies.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT US */}
          {page === 'contact' && (
            <div className="space-y-6">
              <p>
                {isUrdu
                  ? 'ہماری کسٹمر کیئر ٹیم اور لاہور شو روم آپ کی خدمت کیلئے ہمہ وقت تیار ہے۔'
                  : 'Our atelier concierge is available to assist you with bespoke bridal jewellery sizing, bulk corporate sock gifting, or spice harvest inquiries.'}
              </p>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-[#E8E0D3] rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A059]">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold text-[#141312]">
                      {isUrdu ? 'لاہور شو روم' : 'Lahore Showroom & Atelier'}
                    </span>
                  </div>
                  <p className="text-xs text-[#736B63]">
                    42-C, M.M. Alam Road, Gulberg III, Lahore, Pakistan.
                  </p>
                  <p className="text-[11px] text-[#8C827A]">
                    {isUrdu ? 'اوقات: پیر تا ہفتہ (صبح ۱۰ تا رات ۹ بجے)' : 'Hours: Mon - Sat (10:00 AM - 9:00 PM PKT)'}
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#E8E0D3] rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-semibold text-[#141312]">
                      {isUrdu ? 'براہ راست واٹس ایپ رابطہ' : 'WhatsApp Concierge'}
                    </span>
                  </div>
                  <p className="text-xs text-[#736B63]">
                    Instant response for orders, sizing, and payment support.
                  </p>
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xs"
                  >
                    +92 300 1234567 (Chat Now)
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <div>
                    <p className="font-medium text-[#141312]">Direct Line</p>
                    <p className="text-xs text-[#736B63]">+92 42 3578 9012</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A059]" />
                  <div>
                    <p className="font-medium text-[#141312]">Email Concierge</p>
                    <p className="text-xs text-[#736B63]">concierge@zouqheritage.pk</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {page === 'faq' && (
            <div className="space-y-4">
              <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs space-y-1">
                <h4 className="font-serif font-semibold text-[#141312]">
                  {isUrdu ? 'کیا کیش آن ڈیلیوری (COD) پورے پاکستان میں دستیاب ہے؟' : 'Is Cash on Delivery (COD) available across Pakistan?'}
                </h4>
                <p className="text-xs text-[#736B63]">
                  {isUrdu
                    ? 'جی ہاں! آپ کراچی، لاہور، اسلام آباد، پشاور، کوئٹہ سمیت پاکستان کے تمام بڑے اور چھوٹے شہروں میں پارسل وصول کرنے کے بعد نقد ادائیگی کر سکتے ہیں۔'
                    : 'Yes, we provide 100% Cash on Delivery across all cities, towns, and postal codes in Pakistan via our courier partners TCS, Leopards, and PostEx.'}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs space-y-1">
                <h4 className="font-serif font-semibold text-[#141312]">
                  {isUrdu ? 'پارسل پہنچنے میں کتنا وقت لگتا ہے؟' : 'How long does delivery take?'}
                </h4>
                <p className="text-xs text-[#736B63]">
                  {isUrdu
                    ? 'لاہور میں ۱ سے ۲ دن، جبکہ کراچی، اسلام آباد، راولپنڈی اور دیگر شہروں میں ۲ سے ۴ کاروباری دنوں میں ترسیل مکمل ہو جاتی ہے۔'
                    : 'Orders within Lahore typically arrive in 1-2 business days. Major metro cities (Karachi, Islamabad, Rawalpindi, Faisalabad, Peshawar) take 2-3 business days. Regional areas take 3-4 days.'}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs space-y-1">
                <h4 className="font-serif font-semibold text-[#141312]">
                  {isUrdu ? 'کیا میں جاز کیش یا ایزی پیسہ سے ادائیگی کر سکتا ہوں؟' : 'Can I pay via JazzCash or Easypaisa?'}
                </h4>
                <p className="text-xs text-[#736B63]">
                  {isUrdu
                    ? 'جی ہاں، چیک آؤٹ کے وقت جاز کیش یا ایزی پیسہ منتخب کریں، آپ کو فوری کنفرمیشن ملے گی۔'
                    : 'Yes! We support direct JazzCash and Easypaisa mobile account payments, as well as Visa and Mastercard with 3D Secure bank OTP verification.'}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs space-y-1">
                <h4 className="font-serif font-semibold text-[#141312]">
                  {isUrdu ? 'اگر سائز یا کوالٹی پسند نہ آئے تو کیا واپس ہو سکتا ہے؟' : 'What is your return policy?'}
                </h4>
                <p className="text-xs text-[#736B63]">
                  {isUrdu
                    ? 'ہمارے ہاں ۷ دن میں بلا جھجھک تبدیلی اور واپسی کی سہولت موجود ہے۔'
                    : 'We offer an unconditional 7-day return and exchange guarantee. If you are not completely satisfied, our courier will arrange a reverse pickup.'}
                </p>
              </div>
            </div>
          )}

          {/* SHIPPING POLICY */}
          {page === 'shipping' && (
            <div className="space-y-4">
              <p>
                {isUrdu
                  ? 'ہم پاکستان کی سب سے قابل اعتماد کوریئر کمپنیوں ٹی سی ایس (TCS)، لیپرڈز کوریئر (Leopards)، اور پوسٹ ایکس (PostEx) کے ساتھ باضابطہ معاہدے کے تحت کام کرتے ہیں۔'
                  : 'All ZOUQ orders are dispatched directly from our temperature-controlled central fulfillment atelier in Lahore using certified express partners.'}
              </p>

              <div className="p-4 bg-[#F4EFE7]/60 border border-[#E8E0D3] rounded-xs space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#E8E0D3]">
                  <span className="font-medium text-[#141312]">Free Express Shipping</span>
                  <span className="font-mono font-semibold text-emerald-700">Orders over PKR 3,500</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E0D3]">
                  <span className="font-medium text-[#141312]">Standard Nationwide Courier Fee</span>
                  <span className="font-mono font-semibold">PKR 250 flat</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-[#141312]">Cash on Delivery Handling</span>
                  <span className="font-mono font-semibold text-emerald-700">FREE / Included</span>
                </div>
              </div>
            </div>
          )}

          {/* RETURN POLICY */}
          {page === 'returns' && (
            <div className="space-y-4">
              <h3 className="font-serif text-base font-semibold text-[#141312]">
                {isUrdu ? '۷ روزہ گارنٹی اور واپسی کی شرائط' : '7-Day Connoisseur Exchange Guarantee'}
              </h3>
              <p>
                {isUrdu
                  ? 'آپ پارسل موصول ہونے کے بعد ۷ دنوں کے اندر کسی بھی چیز کی تبدیلی یا واپسی کی درخواست کر سکتے ہیں۔ مصنوعات کا اپنی اصل پیکنگ میں ہونا ضروری ہے۔'
                  : 'We want every patron to feel complete confidence in our craft. If your socks do not fit seamlessly, or if your jewellery does not match your bridal attire, contact our WhatsApp support within 7 days for an immediate exchange or full refund.'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
