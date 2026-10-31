import React from 'react';
import { CheckCircle2, Truck, Package, Printer, ArrowRight, X } from 'lucide-react';
import { Order } from '../types/store.ts';
import { Language, translations } from '../lib/translations.ts';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  lang: Language;
  onOpenTracking: (orderNumber: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  lang,
  onOpenTracking
}) => {
  if (!order) return null;

  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-sm shadow-2xl border border-[#E8E0D3] overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-white border-b border-[#E8E0D3] text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059] block">
            {lang === 'en' ? 'Order Confirmed' : 'آرڈر کی تصدیق مکمل'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#141312]">
            {lang === 'en' ? 'Thank You For Your Patronage' : 'ذوق ہیریٹیج پر اعتماد کا شکریہ'}
          </h2>
          <p className="text-xs sm:text-sm text-[#736B63] max-w-md mx-auto">
            {lang === 'en'
              ? `Your order ${order.orderNumber} has been successfully recorded. An SMS confirmation will be sent to ${order.customer.phone}.`
              : `آپ کا آرڈر نمبر ${order.orderNumber} بک ہو چکا ہے۔ آپ کے فون نمبر ${order.customer.phone} پر کوریئر تصدیقی ایس ایم ایس موصول ہو گا۔`}
          </p>
        </div>

        {/* Consignment & Shipping Strip */}
        <div className="p-6 bg-[#F4EFE7]/80 border-b border-[#E8E0D3] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-[#8C827A] uppercase tracking-wider text-[10px]">{lang === 'en' ? 'Order Number' : 'آرڈر نمبر'}</p>
            <p className="font-mono font-bold text-sm text-[#141312] mt-0.5">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-[#8C827A] uppercase tracking-wider text-[10px]">{t.courierPartner}</p>
            <p className="font-medium text-sm text-[#141312] uppercase mt-0.5">{order.courier || 'TCS'}</p>
          </div>
          <div>
            <p className="text-[#8C827A] uppercase tracking-wider text-[10px]">{t.consignmentNo}</p>
            <p className="font-mono text-xs font-semibold text-[#141312] mt-0.5 truncate">{order.trackingNumber}</p>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Destination */}
          <div className="text-xs text-[#5A544E] bg-white p-4 rounded-xs border border-[#E8E0D3] space-y-1">
            <p className="font-semibold text-[#141312] text-sm">{order.customer.fullName}</p>
            <p>{order.customer.address}, {order.customer.city}, {order.customer.province}</p>
            <p className="font-mono">{order.customer.phone}</p>
            <p className="pt-2 text-[11px] text-[#8C827A]">
              {order.paymentMethod === 'cod' ? (
                <span className="text-[#C5A059] font-medium">
                  {lang === 'en' ? 'Payment Method: Cash on Delivery (Pay rider upon arrival)' : 'طریقہ ادائیگی: کیش آن ڈیلیوری (پارسل وصولی پر نقد ادائیگی)'}
                </span>
              ) : (
                <span className="text-emerald-700 font-medium">
                  {lang === 'en' ? `Paid via ${order.paymentMethod.toUpperCase()}` : `ادائیگی بذریعہ ${order.paymentMethod.toUpperCase()}`}
                </span>
              )}
            </p>
          </div>

          {/* Items summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#141312]">
              {lang === 'en' ? 'Purchased Items' : 'آرڈر کردہ اشیاء'}
            </h4>
            <div className="bg-white border border-[#E8E0D3] divide-y divide-[#F4EFE7] rounded-xs">
              {order.items.map((it, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt={it.productName} className="w-10 h-10 object-cover rounded-xs" />
                    <div>
                      <p className="font-medium text-[#141312]">{it.productName}</p>
                      <p className="text-[#8C827A] text-[11px]">Qty: {it.quantity} {it.variation ? `· ${it.variation}` : ''}</p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-[#141312]">
                    PKR {(it.price * it.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-baseline pt-2 border-t border-[#E8E0D3]">
            <span className="font-serif text-base font-semibold text-[#141312]">
              {t.total}
            </span>
            <span className="font-mono text-xl font-bold text-[#141312]">
              PKR {order.total.toLocaleString()}
            </span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenTracking(order.orderNumber);
              }}
              className="w-full py-3.5 bg-[#141312] hover:bg-[#2C2926] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Truck className="w-4 h-4 text-[#C5A059]" />
              <span>{lang === 'en' ? 'Track Live Consignment' : 'پارسل کی صورتحال دیکھیں'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-white border border-[#E8E0D3] hover:bg-[#F4EFE7] text-[#141312] text-xs font-semibold uppercase tracking-[0.18em] rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.backToShop}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
