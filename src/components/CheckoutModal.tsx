import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CreditCard, Wallet, Banknote, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { CartItem, Order, PaymentMethod } from '../types/store.ts';
import { Language, translations } from '../lib/translations.ts';
import { PAKISTAN_PROVINCES, PAKISTAN_CITIES } from '../data/initialProducts.ts';
import { createOrder } from '../lib/api.ts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  lang: Language;
  appliedCoupon: { code: string; discountAmount: number } | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  lang,
  appliedCoupon,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const isUrdu = lang === 'ur';

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState(PAKISTAN_PROVINCES[0]);
  const [city, setCity] = useState(PAKISTAN_CITIES[PAKISTAN_PROVINCES[0]][0]);
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Digital Payment specific inputs
  const [walletPhone, setWalletPhone] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing & Error states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Math
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 3500;
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 250;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  // Pakistani phone validation helper
  const cleanPhone = phone.replace(/[\s-]/g, '');
  const isValidPkPhone = /^(\+92|92|0)?3\d{9}$/.test(cleanPhone);

  const handleProvinceChange = (prov: string) => {
    setProvince(prov);
    const citiesForProv = PAKISTAN_CITIES[prov] || ['Other City'];
    setCity(citiesForProv[0]);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(lang === 'en' ? 'Please provide your full name.' : 'براہ کرم اپنا پورا نام درج کریں۔');
      return;
    }

    if (!isValidPkPhone) {
      setErrorMessage(
        lang === 'en'
          ? 'Please enter a valid Pakistani mobile number (e.g. 0300-1234567).'
          : 'براہ کرم درست پاکستانی موبائل نمبر درج کریں (مثال: 03001234567)'
      );
      return;
    }

    if (!address.trim() || address.trim().length < 8) {
      setErrorMessage(
        lang === 'en'
          ? 'Please provide a complete street address and house number.'
          : 'براہ کرم مکمل پتہ بمعہ مکان یا گلی نمبر درج کریں۔'
      );
      return;
    }

    setLoading(true);

    const payload = {
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        province,
        city,
        address: address.trim(),
        orderNotes: orderNotes.trim()
      },
      items: items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        variation: i.selectedVariation,
        price: i.product.price
      })),
      paymentMethod,
      couponCode: appliedCoupon?.code
    };

    const res = await createOrder(payload);
    setLoading(false);

    if (res.success && res.data) {
      onOrderSuccess(res.data);
    } else {
      setErrorMessage(res.error || 'Failed to place order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-sm shadow-2xl border border-[#E8E0D3] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E0D3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 text-[#8C827A] hover:text-[#141312] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-serif text-xl font-medium text-[#141312]">
              {t.checkoutTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8C827A] hover:text-[#141312]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Shipping & Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Details */}
              <div className="bg-white p-5 rounded-xs border border-[#E8E0D3] space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#141312] pb-2 border-b border-[#F4EFE7]">
                  {t.shippingDetails}
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full bg-[#FAF8F5] border border-[#E8E0D3] text-xs px-3 py-2.5 rounded-xs text-[#141312] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Phone with Pakistani validation */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneTouched(true);
                    }}
                    placeholder={t.phonePlaceholder}
                    className={`w-full bg-[#FAF8F5] border text-xs px-3 py-2.5 rounded-xs text-[#141312] focus:outline-none ${
                      phoneTouched && !isValidPkPhone
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#E8E0D3] focus:border-[#C5A059]'
                    }`}
                  />
                  <p className="text-[11px] text-[#8C827A] mt-1">
                    {t.phoneHelp}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-[#FAF8F5] border border-[#E8E0D3] text-xs px-3 py-2.5 rounded-xs text-[#141312] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Province & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                      {t.province} *
                    </label>
                    <select
                      value={province}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E0D3] text-xs px-3 py-2.5 rounded-xs text-[#141312] focus:outline-none focus:border-[#C5A059] cursor-pointer"
                    >
                      {PAKISTAN_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                      {t.city} *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E0D3] text-xs px-3 py-2.5 rounded-xs text-[#141312] focus:outline-none focus:border-[#C5A059] cursor-pointer"
                    >
                      {(PAKISTAN_CITIES[province] || ['Other City']).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Complete Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                    {t.address} *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.addressPlaceholder}
                    className="w-full bg-[#FAF8F5] border border-[#E8E0D3] text-xs px-3 py-2 rounded-xs text-[#141312] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Order Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                    {t.orderNotes}
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder={t.orderNotesPlaceholder}
                    className="w-full bg-[#FAF8F5] border border-[#E8E0D3] text-xs px-3 py-2 rounded-xs text-[#141312] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white p-5 rounded-xs border border-[#E8E0D3] space-y-3">
                <h3 className="font-serif text-base font-semibold text-[#141312] pb-2 border-b border-[#F4EFE7]">
                  {t.paymentMethod}
                </h3>

                <div className="space-y-2">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xs border cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#C5A059] bg-[#FAF8F5]'
                        : 'border-[#E8E0D3] hover:border-[#C5A059]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 accent-[#C5A059]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-semibold text-[#141312]">{t.payCod}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 font-medium rounded-xs">
                          {lang === 'en' ? 'Most Popular' : 'سب سے زیادہ مقبول'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#736B63] mt-0.5">{t.payCodDesc}</p>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xs border cursor-pointer transition-colors ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#C5A059] bg-[#FAF8F5]'
                        : 'border-[#E8E0D3] hover:border-[#C5A059]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="jazzcash"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="mt-0.5 accent-[#C5A059]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-semibold text-[#141312]">{t.payJazzCash}</span>
                      </div>
                      <p className="text-[11px] text-[#736B63] mt-0.5">{t.payJazzCashDesc}</p>
                      
                      {paymentMethod === 'jazzcash' && (
                        <div className="mt-3 pt-3 border-t border-[#E8E0D3] space-y-2">
                          <label className="block text-[11px] font-medium text-[#141312]">
                            {lang === 'en' ? 'JazzCash Account Mobile Number' : 'جاز کیش موبائل نمبر'}
                          </label>
                          <input
                            type="tel"
                            placeholder="030X-XXXXXXX"
                            value={walletPhone}
                            onChange={(e) => setWalletPhone(e.target.value)}
                            className="w-full bg-white border border-[#E8E0D3] text-xs px-2.5 py-1.5 rounded-xs"
                          />
                          <p className="text-[10px] text-[#8C827A]">
                            {lang === 'en'
                              ? 'You will receive an MPIN confirmation prompt on your phone.'
                              : 'آرڈر کی توثیق پر آپ کے فون پر فوری ایم پن تصدیق کا پیغام موصول ہو گا۔'}
                          </p>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Easypaisa */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xs border cursor-pointer transition-colors ${
                      paymentMethod === 'easypaisa'
                        ? 'border-[#C5A059] bg-[#FAF8F5]'
                        : 'border-[#E8E0D3] hover:border-[#C5A059]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="easypaisa"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={() => setPaymentMethod('easypaisa')}
                      className="mt-0.5 accent-[#C5A059]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-[#141312]">{t.payEasypaisa}</span>
                      </div>
                      <p className="text-[11px] text-[#736B63] mt-0.5">{t.payEasypaisaDesc}</p>

                      {paymentMethod === 'easypaisa' && (
                        <div className="mt-3 pt-3 border-t border-[#E8E0D3] space-y-2">
                          <label className="block text-[11px] font-medium text-[#141312]">
                            {lang === 'en' ? 'Easypaisa Account Number' : 'ایزی پیسہ اکاؤنٹ نمبر'}
                          </label>
                          <input
                            type="tel"
                            placeholder="03XX-XXXXXXX"
                            value={walletPhone}
                            onChange={(e) => setWalletPhone(e.target.value)}
                            className="w-full bg-white border border-[#E8E0D3] text-xs px-2.5 py-1.5 rounded-xs"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Debit/Credit Card */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xs border cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#C5A059] bg-[#FAF8F5]'
                        : 'border-[#E8E0D3] hover:border-[#C5A059]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-0.5 accent-[#C5A059]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-semibold text-[#141312]">{t.payCard}</span>
                      </div>
                      <p className="text-[11px] text-[#736B63] mt-0.5">{t.payCardDesc}</p>

                      {paymentMethod === 'card' && (
                        <div className="mt-3 pt-3 border-t border-[#E8E0D3] space-y-2.5">
                          <input
                            type="text"
                            placeholder="Cardholder Name"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full bg-white border border-[#E8E0D3] text-xs px-2.5 py-1.5 rounded-xs"
                          />
                          <input
                            type="text"
                            placeholder="16-Digit Card Number (Visa / Mastercard / PayPak)"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-white border border-[#E8E0D3] text-xs px-2.5 py-1.5 rounded-xs"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-white border border-[#E8E0D3] text-xs px-2.5 py-1.5 rounded-xs"
                            />
                            <input
                              type="password"
                              placeholder="CVV"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full bg-white border border-[#E8E0D3] text-xs px-2.5 py-1.5 rounded-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-5 rounded-xs border border-[#E8E0D3] space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#141312] pb-2 border-b border-[#F4EFE7]">
                  {t.orderSummary} ({items.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                {/* Items preview */}
                <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-xs bg-[#F4EFE7]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#141312] line-clamp-1">
                          {isUrdu ? item.product.nameUrdu : item.product.name}
                        </p>
                        <p className="text-[#8C827A] text-[11px]">
                          Qty: {item.quantity} {item.selectedVariation ? `· ${item.selectedVariation}` : ''}
                        </p>
                        <p className="font-mono font-semibold text-[#141312] mt-0.5">
                          PKR {(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost breakdown */}
                <div className="pt-3 border-t border-[#F4EFE7] space-y-2 text-xs text-[#5A544E]">
                  <div className="flex justify-between">
                    <span>{t.subtotal}</span>
                    <span className="font-mono tabular-nums text-[#141312]">
                      PKR {subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>{t.discount} ({appliedCoupon?.code})</span>
                      <span className="font-mono tabular-nums">-PKR {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>{t.shippingFee}</span>
                    <span className="font-mono tabular-nums text-[#141312]">
                      {shipping === 0 ? t.shippingFree : `PKR ${shipping}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#F4EFE7] flex justify-between text-base font-semibold text-[#141312]">
                    <span>{t.total}</span>
                    <span className="font-mono tabular-nums">
                      {isUrdu ? `${total.toLocaleString()} روپے` : `PKR ${total.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                {/* Confirmation Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#141312] hover:bg-[#2C2926] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50 mt-4"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                      <span>{lang === 'en' ? 'Verifying & Booking...' : 'آرڈر کی توثیق جاری ہے...'}</span>
                    </span>
                  ) : (
                    <span>{t.placeOrder}</span>
                  )}
                </button>

                {/* Security badges */}
                <div className="pt-4 border-t border-[#F4EFE7] space-y-2 text-[11px] text-[#736B63]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{lang === 'en' ? 'Dispatched via TCS / PostEx with SMS tracking' : 'ٹی سی ایس اور پوسٹ ایکس کے ذریعے محفوظ ترسیل'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{lang === 'en' ? '100% Cash on Delivery protection guarantee' : 'گھر پر پارسل چیک کر کے رقم ادا کریں'}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
