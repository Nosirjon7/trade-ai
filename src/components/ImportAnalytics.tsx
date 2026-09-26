import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Factory, 
  Sparkles, 
  Layers, 
  Clock, 
  Coins, 
  ShieldAlert, 
  Search, 
  CheckCircle, 
  ArrowRight,
  Flame,
  Wrench,
  Percent,
  Info,
  Cpu,
  Smartphone,
  Laptop
} from 'lucide-react';
import { ImportProduct } from '../types/trade';

interface ImportAnalyticsProps {
  importProducts: ImportProduct[];
  onRequestSubstitutionPlan: (product: ImportProduct) => void;
}

export const ImportAnalytics: React.FC<ImportAnalyticsProps> = ({
  importProducts,
  onRequestSubstitutionPlan,
}) => {
  const [filterRedZoneOnly, setFilterRedZoneOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductDetail, setActiveProductDetail] = useState<ImportProduct | null>(null);

  const categories = [
    { key: 'ALL', label: 'Barchasi' },
    { key: 'ELECTRONICS', label: '📱 Elektronika & Chiplar' },
    { key: 'INDUSTRIAL', label: '⚙️ Sanoat & Avto' },
    { key: 'PHARMACEUTICAL', label: '💊 Farmatsevtika' },
    { key: 'TEXTILE', label: '🧵 To‘qimachilik' },
    { key: 'AGRICULTURE', label: '🌾 Qishloq xo‘jaligi' },
  ];

  const filtered = importProducts.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hsCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRedZone = !filterRedZoneOnly || item.alertStatus === 'CRITICAL_RED_ZONE';
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesSearch && matchesRedZone && matchesCategory;
  });

  const totalImportSum = importProducts.reduce((acc, curr) => acc + curr.importVolumeUsd, 0);
  const redZoneProducts = importProducts.filter((i) => i.alertStatus === 'CRITICAL_RED_ZONE');

  return (
    <div className="space-y-8">
      {/* Top Banner: Red Zone Strategic Alert */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/40 border border-rose-500/30 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span>2-BO‘LIM: IMPORT TAHLILI & MAHALLIYLASHTIRISH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>"Qizil Hudud" va Import O‘rnini Bosish</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
                Yuqori Talab
              </span>
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Mamlakatga kirib kelishi keskin oshayotgan elektronika (smartfon, noutbuk, mikrochiplar, PCB), sanoat va xom-ashyo tovarlari tahlili. Ushbu tovarlarni O‘zbekistonda yig‘ish va mahalliylashtirish eng yuqori daromadli yo‘nalishdir!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-rose-500/30 shadow-lg shadow-rose-950/20">
              <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                Qizil Hudud
              </span>
              <div className="text-lg font-bold text-white mt-0.5">{redZoneProducts.length} ta Tovar</div>
              <span className="text-[10px] text-slate-400">Importi keskin oshgan</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Jami Import Hajmi</span>
              <div className="text-lg font-bold text-amber-400 mt-0.5">${(totalImportSum / 1_000_000).toFixed(0)} Mln</div>
              <span className="text-[10px] text-slate-500">Yillik aylanma</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400 font-medium">Mahalliy Salohiyat</span>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">35% - 85%</div>
              <span className="text-[10px] text-slate-500">Xom-ashyo & Yig‘uv</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Switch controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Import tovarini qidirish (Smartfon, noutbuk, chip, 8542)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/70 transition-colors shadow-inner"
          />
        </div>

        {/* Category Pills & Red Zone Toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFilterRedZoneOnly(!filterRedZoneOnly)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterRedZoneOnly
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Faqat "Qizil Hudud"</span>
          </button>
        </div>
      </div>

      {/* Import Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => {
          const isRedZone = item.alertStatus === 'CRITICAL_RED_ZONE';

          return (
            <div
              key={item.id}
              className={`relative rounded-3xl bg-slate-900/90 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isRedZone
                  ? 'border-rose-500/40 hover:border-rose-400 shadow-xl shadow-rose-950/20 hover:shadow-rose-950/40'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header & Status Banner */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          TIF TN: {item.hsCode}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {item.categoryNameUz}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Red Zone Badge */}
                  {isRedZone && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs font-bold shrink-0 animate-pulse">
                      <Flame className="w-4 h-4 text-rose-500" />
                      <span>Qizil Hudud</span>
                    </div>
                  )}
                </div>

                {/* Import Statistics Metrics */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Yillik Import</span>
                    <strong className="text-sm font-bold text-white">
                      ${(item.importVolumeUsd / 1_000_000).toFixed(1)} Mln
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">O‘sish Sur'ati</span>
                    <strong className="text-sm font-bold text-rose-400 flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{item.changePercentYear}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Import Hajmi</span>
                    <strong className="text-sm font-bold text-teal-400">
                      {item.importVolumeTons.toLocaleString()} t.
                    </strong>
                  </div>
                </div>

                {/* Why it is imported */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  <strong className="text-slate-200">Bozor sababi: </strong>
                  {item.reasonForImport}
                </p>

                {/* Red Zone Recommendation Box */}
                {isRedZone && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-950 border border-rose-500/20 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-300 mb-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Tavsiya: Buni o‘zimizda ishlab chiqarish imkoniyati bor!</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                      <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Xom-ashyo bazasi</span>
                        <span className="font-bold text-emerald-400">{item.localRawMaterialScore}% yetarli</span>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Taxminiy CAPEX</span>
                        <span className="font-bold text-white">${(item.estimatedSetupCapEx / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Qoplanish</span>
                        <span className="font-bold text-amber-400">~{item.estPaybackMonths} oy</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Origin Countries */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 text-[11px]">Asosiy importyorlar:</span>
                  <div className="flex items-center gap-2">
                    {item.originCountries.map((org, oIdx) => (
                      <span key={oIdx} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        <span>{org.flag}</span>
                        <span>{org.name} ({org.sharePercent}%)</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveProductDetail(item)}
                  className="text-xs text-slate-400 hover:text-white transition-colors font-medium"
                >
                  Texnik tafsilotlar
                </button>

                <button
                  onClick={() => onRequestSubstitutionPlan(item)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-950/40 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Biznes-reja tuzish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Detail Modal */}
      {activeProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-rose-950/40 to-slate-900">
              <div>
                <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  TIF TN: {activeProductDetail.hsCode}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeProductDetail.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveProductDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tavsiya etiladigan texnologik uskunalar (Stanoklar)
                </h4>
                <div className="space-y-2">
                  {activeProductDetail.recommendedEquipment.map((eq, eIdx) => (
                    <div
                      key={eIdx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Davlat tomonidan berilayotgan imtiyozlar va subsidiyalar
                </h4>
                <div className="space-y-2">
                  {activeProductDetail.stateIncentives.map((inc, iIdx) => (
                    <div
                      key={iIdx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <button
                onClick={() => setActiveProductDetail(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Yopish
              </button>
              <button
                onClick={() => {
                  const p = activeProductDetail;
                  setActiveProductDetail(null);
                  onRequestSubstitutionPlan(p);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-950/50"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI bilan Mahalliylashtirish Rejasini Tuzish</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
