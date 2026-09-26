import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  X, 
  TrendingUp, 
  DollarSign, 
  Truck, 
  Package, 
  FileCheck, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { ExportProduct } from '../types/trade';

interface FinancialCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ExportProduct | null;
  onSendToAIChat: (query: string, mode: string) => void;
}

export const FinancialCalculatorModal: React.FC<FinancialCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  onSendToAIChat,
}) => {
  if (!isOpen) return null;

  const [productName, setProductName] = useState(initialProduct?.name || 'Yangi olma (Golden)');
  const [destinationCountry, setDestinationCountry] = useState(
    initialProduct?.targetMarkets[0]?.countryName || 'Rossiya Federatsiyasi'
  );
  const [volumeTons, setVolumeTons] = useState<number>(10);
  const [purchasePricePerKg, setPurchasePricePerKg] = useState<number>(
    initialProduct?.avgDomesticPrice || 0.45
  );
  const [sellingPricePerKg, setSellingPricePerKg] = useState<number>(
    initialProduct?.avgExportPrice || 1.25
  );
  const [packagingPerKg, setPackagingPerKg] = useState<number>(0.08);
  const [transportCost, setTransportCost] = useState<number>(2400);
  const [customsAndDocs, setCustomsAndDocs] = useState<number>(300);
  const [lossRiskPercent, setLossRiskPercent] = useState<number>(3);

  // Sync if initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setProductName(initialProduct.name);
      setPurchasePricePerKg(initialProduct.avgDomesticPrice);
      setSellingPricePerKg(initialProduct.avgExportPrice);
      if (initialProduct.targetMarkets.length > 0) {
        setDestinationCountry(initialProduct.targetMarkets[0].countryName);
        setSellingPricePerKg(initialProduct.targetMarkets[0].avgPriceInCountry);
      }
    }
  }, [initialProduct]);

  // Mathematical logic
  const totalWeightKg = volumeTons * 1000;
  const grossRevenue = totalWeightKg * sellingPricePerKg;
  const purchaseCost = totalWeightKg * purchasePricePerKg;
  const packagingCost = totalWeightKg * packagingPerKg;
  const lossCost = grossRevenue * (lossRiskPercent / 100);
  const totalOperatingCosts = purchaseCost + packagingCost + transportCost + customsAndDocs + lossCost;
  const netProfit = grossRevenue - totalOperatingCosts;
  const roi = totalOperatingCosts > 0 ? (netProfit / totalOperatingCosts) * 100 : 0;
  const breakEvenPerKg = totalWeightKg > 0 ? totalOperatingCosts / totalWeightKg : 0;

  const handleConsultWithAI = () => {
    const prompt = `${volumeTons} tonna ${productName} mahsulotini ${destinationCountry} davlatiga eksport qilish bo'yicha moliyaviy hisob-kitob qildim:
Xarid: $${purchasePricePerKg}/kg, Sotish: $${sellingPricePerKg}/kg.
Kutilayotgan sof foyda: $${Math.round(netProfit).toLocaleString()} (ROI: ${roi.toFixed(1)}%).
Menga transportni optimallashtirish, ST-1 orqali bojxona imtiyozi va xatarlarni kamaytirish bo'yicha maslahat ber.`;
    onSendToAIChat(prompt, 'calculator');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                B2B Eksport Moliyaviy Kalkulyatori
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  Real-time
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Hajm, xarid, transport, qadoqlash va bojxona xarajatlariga asoslangan sof foyda (ROI) prognozi.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Calculations */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Main Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Eksport Mahsuloti</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mo‘ljallangan Bozor (Davlat)</label>
              <input
                type="text"
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                placeholder="Rossiya, Germaniya, BAA..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Volume slider & input */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">
                  Eksport Partiyasi Hajmi (tonna):
                </span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {volumeTons} tonna ({volumeTons * 1000} kg)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={volumeTons}
                onChange={(e) => setVolumeTons(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1 t (Kichik partiya)</span>
                <span>20 t (Standart 1 Fura)</span>
                <span>50 t (Konteyner/Temir yo'l)</span>
                <span>100 t</span>
              </div>
            </div>

            {/* Pricing Parameters */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ichki xarid narxi ($ / kg):
              </label>
              <input
                type="number"
                step="0.05"
                min="0.1"
                value={purchasePricePerKg}
                onChange={(e) => setPurchasePricePerKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tashqi bozordagi sotish narxi ($ / kg):
              </label>
              <input
                type="number"
                step="0.05"
                min="0.2"
                value={sellingPricePerKg}
                onChange={(e) => setSellingPricePerKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Logistics & Packaging */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Xalqaro Logistika (Fura / Temir yo‘l) ($):
              </label>
              <input
                type="number"
                step="100"
                min="200"
                value={transportCost}
                onChange={(e) => setTransportCost(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Eksport Qadoqlash ($ / kg):
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={packagingPerKg}
                onChange={(e) => setPackagingPerKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
              <span>Moliyaviy Hisob-Kitob Natijasi</span>
              <span className="text-emerald-400 text-xs lowercase font-mono">
                {netProfit >= 0 ? 'Foydali Bitim' : 'Zararli Bitim'}
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Yalpi Tushum</span>
                <span className="text-base font-bold text-white font-mono">
                  ${Math.round(grossRevenue).toLocaleString()}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Jami Xarajat</span>
                <span className="text-base font-bold text-rose-400 font-mono">
                  ${Math.round(totalOperatingCosts).toLocaleString()}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-[11px] text-emerald-300 block">Kutilayotgan Sof Foyda</span>
                <span className={`text-base font-extrabold font-mono ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${Math.round(netProfit).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400/80 font-mono block mt-0.5">
                  ~{Math.round(netProfit * 12825.40).toLocaleString()} UZS
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/40">
                <span className="text-[11px] text-teal-300 block">Rentabellik (ROI)</span>
                <span className="text-base font-extrabold text-teal-300 font-mono">
                  {roi.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Cost Breakdown Details */}
            <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between">
                <span>Mahsulot xarid xarajati:</span>
                <strong className="text-slate-200">${purchaseCost.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Qadoqlash (Gofrokarton, burchakliklar):</span>
                <strong className="text-slate-200">${packagingCost.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Xalqaro transport (Refrijerator):</span>
                <strong className="text-slate-200">${transportCost.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Tabiiy yo‘qotish va sifat xatari ({lossRiskPercent}%):</span>
                <strong className="text-slate-200">${Math.round(lossCost).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-emerald-400 font-semibold">
                <span>Zararsizlik narxi (Break-even):</span>
                <span>${breakEvenPerKg.toFixed(2)} / kg</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
          >
            Yopish
          </button>

          <button
            onClick={handleConsultWithAI}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-900/40 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Konsultantidan Chuqur Tahlil So‘rash</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
