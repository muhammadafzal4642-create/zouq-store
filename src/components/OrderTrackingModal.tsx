import React, { useState, useEffect } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, AlertCircle, Package } from 'lucide-react';
import { Language, translations } from '../lib/translations.ts';
import { trackConsignment } from '../lib/api.ts';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialQuery?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialQuery = ''
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState('');

  const executeTrack = async (searchStr: string) => {
    if (!searchStr.trim()) return;
    setLoading(true);
    setError('');
    const res = await trackConsignment(searchStr.trim());
    setLoading(false);

    if (res.success && res.data) {
      setTrackingData(res.data);
    } else {
      setTrackingData(null);
      setError(
        res.error ||
          (lang === 'en'
            ? 'No consignment found. Please verify your order number (e.g. ZQ-8902) or phone.'
            : 'کوئی پارسل نہیں ملا۔ براہ کرم آرڈر نمبر یا موبائل نمبر دوبارہ چیک کریں۔')
      );
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      executeTrack(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeTrack(query);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-sm shadow-2xl border border-[#E8E0D3] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E0D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-serif text-xl font-medium text-[#141312]">
              {t.trackingTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8C827A] hover:text-[#141312] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-xs text-[#736B63] mb-3">
              {t.trackingSubtitle}
            </p>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.trackingInputPlaceholder}
                className="flex-1 bg-white border border-[#E8E0D3] text-xs px-3.5 py-3 rounded-xs text-[#141312] placeholder-[#8C827A] focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-3 bg-[#141312] hover:bg-[#2C2926] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? '...' : t.trackButton}</span>
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Pill helpers */}
          {!trackingData && (
            <div className="p-4 bg-white border border-[#E8E0D3] rounded-xs text-xs space-y-2">
              <p className="font-semibold text-[#141312]">
                {lang === 'en' ? 'Quick Sample Tracking Numbers to Try:' : 'آزمائشی ٹریکنگ نمبرز:'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['ZQ-8902', 'ZQ-8903', '0300-8452190'].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setQuery(num);
                      executeTrack(num);
                    }}
                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E8E0D3] text-[#141312] font-mono text-[11px] rounded-xs hover:border-[#C5A059]"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tracking Results View */}
          {trackingData && (
            <div className="space-y-6 pt-2 animate-fadeIn">
              {/* Partner Card */}
              <div className="bg-white p-5 rounded-xs border border-[#E8E0D3] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F4EFE7]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                      {t.consignmentNo}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#141312]">
                      {trackingData.trackingNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase px-2.5 py-1 bg-[#141312] text-[#C5A059] font-bold tracking-widest rounded-xs">
                      {trackingData.courier.toUpperCase()} EXPRESS
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#5A544E]">
                  <div>
                    <span className="text-[#8C827A] block">{lang === 'en' ? 'Recipient' : 'گاہک'}</span>
                    <span className="font-semibold text-[#141312]">{trackingData.customerName}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{lang === 'en' ? 'Destination' : 'منزل'}</span>
                    <span className="font-semibold text-[#141312]">{trackingData.destination}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{lang === 'en' ? 'Payable on Delivery' : 'واجب الادا رقم'}</span>
                    <span className="font-mono font-semibold text-[#141312]">
                      PKR {trackingData.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline Milestones */}
              <div className="bg-white p-5 rounded-xs border border-[#E8E0D3]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#141312] mb-4">
                  {t.journeyHistory}
                </h4>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#E8E0D3]">
                  {trackingData.timeline.map((mile: any, idx: number) => (
                    <div key={idx} className="relative group">
                      {/* Milestone marker */}
                      <span
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          mile.completed
                            ? 'bg-[#141312] border-[#C5A059] text-white'
                            : 'bg-white border-[#8C827A] text-[#8C827A]'
                        }`}
                      >
                        {mile.completed && <CheckCircle2 className="w-2.5 h-2.5 text-[#C5A059]" />}
                      </span>

                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-xs font-semibold text-[#141312]">
                            {isUrdu && mile.statusUrdu ? mile.statusUrdu : mile.status}
                          </p>
                          <span className="text-[11px] font-mono text-[#8C827A]">
                            {mile.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#736B63] mt-0.5">
                          <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
                          <span>{isUrdu && mile.locationUrdu ? mile.locationUrdu : mile.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
