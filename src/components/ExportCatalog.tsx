import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Globe, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  Calculator, 
  Calendar, 
  Tag, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  Copy,
  Check,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';
import { ExportProduct, ProductCategory } from '../types/trade';
import { ProductCreativeVideo } from './ProductCreativeVideo';
import { CreativeVideoModal } from './CreativeVideoModal';

interface ExportCatalogProps {
  products: ExportProduct[];
  onSelectForCalculator: (product: ExportProduct) => void;
  onAskAIAboutProduct: (product: ExportProduct, mode?: string) => void;
}

export const ExportCatalog: React.FC<ExportCatalogProps> = ({
  products,
  onSelectForCalculator,
  onAskAIAboutProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedProductDetails, setSelectedProductDetails] = useState<ExportProduct | null>(null);
  const [selectedVideoProduct, setSelectedVideoProduct] = useState<ExportProduct | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Section Video Control: 8-10 second sequence on section/category entry & reset on exit
  const [videoCountdown, setVideoCountdown] = useState<number>(10);
  const [isVideoActive, setIsVideoActive] = useState<boolean>(true);
  const [videoResetKey, setVideoResetKey] = useState<number>(0);

  // When category changes or user re-enters section, start 8-10s video cycle
  useEffect(() => {
    setIsVideoActive(true);
    setVideoCountdown(10);
    setVideoResetKey((k) => k + 1);

    const interval = setInterval(() => {
      setVideoCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCategory]);

  const handleResetToInitial = () => {
    setIsVideoActive(false);
    setVideoCountdown(0);
    setVideoResetKey((k) => k + 1);
  };

  const handleRestartVideo = () => {
    setIsVideoActive(true);
    setVideoCountdown(10);
    setVideoResetKey((k) => k + 1);
  };

  const categories = [
    { key: 'ALL', label: 'Barchasi' },
    { key: 'AGRICULTURE', label: '🌾 Qishloq xo‘jaligi' },
    { key: 'TEXTILE', label: '🧵 To‘qimachilik' },
    { key: 'FOOD_PROCESSING', label: '🥫 Oziq-ovqat' },
    { key: 'CHEMICALS', label: '🧪 Kimyo & Polimer' },
  ];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nameEn && item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code.replace(/\s+/g, ''));
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Strategy Summary */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/40 border border-emerald-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>1-BO‘LIM: TASHQI BOZORLAR VA EKSPORT IMKONIYATLARI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Eksport Katalogi va Bozor Imtiyozlari
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              O‘zbekiston mahsulotlari uchun MDH (0% Boj), Yevropa Ittifoqi (GSP+ 6,200 turdagi tovarga 0% boj), Xitoy va Fors ko‘rfazi davlatlariga eksport qilish bo‘yicha tahliliy katalog.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">GSP+ Imtiyozi</span>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">6,200+</div>
              <span className="text-[10px] text-slate-500">EI ga 0% stavkali boj</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">MDH Erkin Savdo</span>
              <div className="text-lg font-bold text-teal-400 mt-0.5">ST-1 Bilan 0%</div>
              <span className="text-[10px] text-slate-500">Rossiya, Qozog‘iston</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400 font-medium">O‘rtacha Marja</span>
              <div className="text-lg font-bold text-amber-400 mt-0.5">38% - 75%</div>
              <span className="text-[10px] text-slate-500">Tashqi bozor ustamasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mahsulot nomi yoki TIF TN (masalan: 0808, Olma)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/70 transition-colors shadow-inner"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 8-10s Interactive Section Video Session HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                8-10s Sanoat Video Tahlili
              </span>
              {videoCountdown > 0 && isVideoActive ? (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                  0:0{videoCountdown}s qoldi
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Avvalgi tinch holat
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Bo‘limga kirganda 8-10s video avtomatik boshlanadi, boshqa bo‘limga o‘tganda avvalgi holatga qaytadi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {videoCountdown > 0 && isVideoActive ? (
            <button
              onClick={handleResetToInitial}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              title="Avvalgi tinch holatga qaytish"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Avvalgi holatga qaytish</span>
            </button>
          ) : (
            <button
              onClick={handleRestartVideo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/30 cursor-pointer"
              title="8-10s video effektini qaytadan boshlash"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Videoni qayta boshlash</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid with Entry Shutter animation */}
      <div 
        key={videoResetKey}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{
          animation: 'sectionEntryShutter 0.6s ease-out',
        }}
      >
        {filteredProducts.map((product, idx) => {
          return (
            <div
              key={product.id}
              className="group relative flex flex-col rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-emerald-950/30"
            >
              {/* Category-Tailored Creative Video (Textile loom, Food drying, Orchard harvest, Molten copper) */}
              <ProductCreativeVideo
                product={product}
                index={idx}
                isSectionActive={isVideoActive}
                videoCycleResetKey={videoResetKey}
                onOpenVideoModal={(p) => setSelectedVideoProduct(p)}
              />

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* HS Code */}
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={(e) => handleCopyCode(product.hsCode, e)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-emerald-400 text-xs font-mono transition-colors"
                      title="TIF TN kodini nusxalash"
                    >
                      <Tag className="w-3 h-3 text-emerald-400" />
                      <span>TIF TN: {product.hsCode}</span>
                      {copiedCode === product.hsCode ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500" />
                      )}
                    </button>

                    {product.isSeasonal && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                        <Calendar className="w-3 h-3" />
                        <span>Mavsumiy</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Target Markets */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="block text-[11px] font-semibold text-slate-400 mb-2">
                      Asosiy eksport yo‘nalishlari va talab:
                    </span>
                    <div className="space-y-1.5">
                      {product.targetMarkets.slice(0, 3).map((market, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-950/60 border border-slate-800/50"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{market.flag}</span>
                            <span className="text-slate-200 font-medium">{market.countryName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-emerald-400">
                              {market.importTariffDuty === 0 ? 'Boj: 0%' : `Boj: ${market.importTariffDuty}%`}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                              ${market.avgPriceInCountry}/{product.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Certificates Pills */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.requiredCerts.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800/80"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => onSelectForCalculator(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Foydani hisoblash</span>
                  </button>
                  <button
                    onClick={() => setSelectedProductDetails(product)}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    title="Batafsil bozor tahlili"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAskAIAboutProduct(product, 'certs')}
                    className="p-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 transition-colors"
                    title="AI dan hujjat va yo'riqnoma so'rash"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-950/40 to-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-700">
                  <img
                    src={selectedProductDetails.imageUrl}
                    alt={selectedProductDetails.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      TIF TN: {selectedProductDetails.hsCode}
                    </span>
                    <span className="text-xs text-slate-400">{selectedProductDetails.categoryNameUz}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {selectedProductDetails.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tavsif</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  {selectedProductDetails.description}
                </p>
              </div>

              {/* Price Arbitrage Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Ichki xarid narxi</span>
                  <div className="text-base font-bold text-white mt-1">
                    ${selectedProductDetails.avgDomesticPrice} /{selectedProductDetails.unit}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400">O‘rtacha eksport</span>
                  <div className="text-base font-bold text-emerald-400 mt-1">
                    ${selectedProductDetails.avgExportPrice} /{selectedProductDetails.unit}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Yillik eksport hajmi</span>
                  <div className="text-base font-bold text-teal-400 mt-1">
                    {selectedProductDetails.annualVolumeTons.toLocaleString()} tonna
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Yillik o‘sish</span>
                  <div className="text-base font-bold text-emerald-400 mt-1">
                    +{selectedProductDetails.growthRatePercent}%
                  </div>
                </div>
              </div>

              {/* Target Countries Deep Dive */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Xalqaro Bozorlar va Bojxona Stavkalari
                </h4>
                <div className="space-y-2">
                  {selectedProductDetails.targetMarkets.map((market, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{market.flag}</span>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            {market.countryName}
                            {market.gspPlusValid && (
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                GSP+ 0% Boj
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400">
                            Logistika: {market.optimalTransport} (~{market.logisticsDays} kun)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="text-right">
                          <span className="text-slate-400 block text-[10px]">Kutilayotgan narx</span>
                          <strong className="text-emerald-400">${market.avgPriceInCountry}/{selectedProductDetails.unit}</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 block text-[10px]">Talab darajasi</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-medium">
                            {market.marketDemandLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Talab qilinadigan eksport hujjatlari
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProductDetails.requiredCerts.map((cert, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-slate-800 flex items-center justify-between gap-3 bg-slate-950">
              <button
                onClick={() => {
                  const p = selectedProductDetails;
                  setSelectedProductDetails(null);
                  onAskAIAboutProduct(p, 'certs');
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold hover:bg-teal-500/30 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Hujjatlar yo‘riqnomasini olish</span>
              </button>

              <button
                onClick={() => {
                  const p = selectedProductDetails;
                  setSelectedProductDetails(null);
                  onSelectForCalculator(p);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-lg shadow-emerald-900/40"
              >
                <Calculator className="w-4 h-4" />
                <span>Kalkulyatorda hisoblash</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 8-10s Industry Creative Video Modal */}
      {selectedVideoProduct && (
        <CreativeVideoModal
          product={selectedVideoProduct}
          onClose={() => setSelectedVideoProduct(null)}
          onAskAIAboutProduct={(p) => onAskAIAboutProduct(p, 'general')}
        />
      )}
    </div>
  );
};
