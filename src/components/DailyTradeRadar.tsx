import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Clock, 
  DollarSign, 
  Truck, 
  Globe2, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Building,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { 
  INITIAL_CURRENCY_RATES, 
  INITIAL_SPOT_PRICES, 
  INITIAL_BORDER_QUEUES, 
  INITIAL_DAILY_SIGNALS, 
  INITIAL_DAILY_STATS 
} from '../data/dailyTradeData';
import { 
  CurrencyRate, 
  CommoditySpotPrice, 
  DailyBorderQueue, 
  DailyTradeSignal, 
  DailyTradeStats 
} from '../types/trade';

interface DailyTradeRadarProps {
  onAskAI: (prompt: string, mode?: string) => void;
  onOpenCalculatorWithName?: (productName: string) => void;
}

// Visual high-definition SVG flag badge to prevent text fallbacks ("US", "EU", "RU", "CN") on certain browsers
const renderMiniFlag = (code: 'USD' | 'EUR' | 'RUB' | 'CNY', className = "w-5 h-3.5") => {
  switch (code) {
    case 'USD':
      return (
        <svg className={`${className} rounded-[3px] shadow-sm overflow-hidden flex-shrink-0`} viewBox="0 0 190 100" fill="none">
          <rect width="190" height="100" fill="#dc2626" />
          <rect y="7.69" width="190" height="7.69" fill="#ffffff" />
          <rect y="23.07" width="190" height="7.69" fill="#ffffff" />
          <rect y="38.45" width="190" height="7.69" fill="#ffffff" />
          <rect y="53.83" width="190" height="7.69" fill="#ffffff" />
          <rect y="69.21" width="190" height="7.69" fill="#ffffff" />
          <rect y="84.59" width="190" height="7.69" fill="#ffffff" />
          <rect width="76" height="53.83" fill="#1e3a8a" />
          <circle cx="15" cy="13" r="3.2" fill="#ffffff" />
          <circle cx="38" cy="13" r="3.2" fill="#ffffff" />
          <circle cx="61" cy="13" r="3.2" fill="#ffffff" />
          <circle cx="26" cy="27" r="3.2" fill="#ffffff" />
          <circle cx="49" cy="27" r="3.2" fill="#ffffff" />
          <circle cx="15" cy="40" r="3.2" fill="#ffffff" />
          <circle cx="38" cy="40" r="3.2" fill="#ffffff" />
          <circle cx="61" cy="40" r="3.2" fill="#ffffff" />
        </svg>
      );
    case 'EUR':
      return (
        <svg className={`${className} rounded-[3px] shadow-sm overflow-hidden flex-shrink-0`} viewBox="0 0 100 70" fill="none">
          <rect width="100" height="70" fill="#003399" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const cx = 50 + 22 * Math.sin(angle);
            const cy = 35 - 22 * Math.cos(angle);
            return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#ffcc00" />;
          })}
        </svg>
      );
    case 'RUB':
      return (
        <svg className={`${className} rounded-[3px] shadow-sm overflow-hidden flex-shrink-0 border border-slate-700/60`} viewBox="0 0 90 60" fill="none">
          <rect width="90" height="20" fill="#ffffff" />
          <rect y="20" width="90" height="20" fill="#0039a6" />
          <rect y="40" width="90" height="20" fill="#d52b1e" />
        </svg>
      );
    case 'CNY':
      return (
        <svg className={`${className} rounded-[3px] shadow-sm overflow-hidden flex-shrink-0`} viewBox="0 0 90 60" fill="none">
          <rect width="90" height="60" fill="#de2910" />
          <polygon points="18,10 20.5,17 28,17 22,21.5 24.5,28.5 18,24 11.5,28.5 14,21.5 8,17 15.5,17" fill="#ffde00" />
          <circle cx="36" cy="11" r="2.2" fill="#ffde00" />
          <circle cx="42" cy="18" r="2.2" fill="#ffde00" />
          <circle cx="42" cy="27" r="2.2" fill="#ffde00" />
          <circle cx="36" cy="34" r="2.2" fill="#ffde00" />
        </svg>
      );
  }
};

// High-visibility, prominent and vibrant background flag collage
const renderCardBackgroundFlag = (code: 'USD' | 'EUR' | 'RUB' | 'CNY') => {
  switch (code) {
    case 'USD':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* US Flag waving on the right side with vivid colors */}
          <div className="absolute -right-1 -top-1 -bottom-1 w-[72%] sm:w-[68%] opacity-45 sm:opacity-50 group-hover:opacity-65 transition-opacity duration-300">
            <svg className="w-full h-full object-cover" viewBox="0 0 280 160" preserveAspectRatio="none" fill="none">
              {/* 13 Crisp Stripes */}
              <rect y="0" width="280" height="12.3" fill="#dc2626" />
              <rect y="12.3" width="280" height="12.3" fill="#ffffff" />
              <rect y="24.6" width="280" height="12.3" fill="#dc2626" />
              <rect y="36.9" width="280" height="12.3" fill="#ffffff" />
              <rect y="49.2" width="280" height="12.3" fill="#dc2626" />
              <rect y="61.5" width="280" height="12.3" fill="#ffffff" />
              <rect y="73.8" width="280" height="12.3" fill="#dc2626" />
              <rect y="86.1" width="280" height="12.3" fill="#ffffff" />
              <rect y="98.4" width="280" height="12.3" fill="#dc2626" />
              <rect y="110.7" width="280" height="12.3" fill="#ffffff" />
              <rect y="123" width="280" height="12.3" fill="#dc2626" />
              <rect y="135.3" width="280" height="12.3" fill="#ffffff" />
              <rect y="147.6" width="280" height="12.4" fill="#dc2626" />
              {/* Deep Blue Canton */}
              <rect x="0" y="0" width="118" height="86.1" fill="#1e3a8a" />
              {/* Bright White Stars */}
              {[
                [16, 14], [38, 14], [60, 14], [82, 14], [104, 14],
                [27, 28], [49, 28], [71, 28], [93, 28],
                [16, 42], [38, 42], [60, 42], [82, 42], [104, 42],
                [27, 56], [49, 56], [71, 56], [93, 56],
                [16, 70], [38, 70], [60, 70], [82, 70], [104, 70],
              ].map(([cx, cy], idx) => (
                <circle key={idx} cx={cx} cy={cy} r="3.2" fill="#ffffff" />
              ))}
            </svg>
          </div>
          {/* Subtle horizontal gradient to ensure foreground text is crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>
      );

    case 'EUR':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* EU Flag on right with rich Royal Azure Blue & Golden Stars */}
          <div className="absolute -right-1 -top-1 -bottom-1 w-[72%] sm:w-[68%] opacity-50 sm:opacity-55 group-hover:opacity-70 transition-opacity duration-300">
            <svg className="w-full h-full object-cover" viewBox="0 0 280 160" preserveAspectRatio="none" fill="none">
              <rect width="280" height="160" fill="#003399" />
              <g transform="translate(180, 80)">
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const cx = 52 * Math.sin(angle);
                  const cy = -52 * Math.cos(angle);
                  return (
                    <polygon
                      key={i}
                      points={`${cx},${cy - 7} ${cx + 2.2},${cy - 2.2} ${cx + 7},${cy - 2.2} ${cx + 3.2},${cy + 1.2} ${cx + 4.8},${cy + 6.5} ${cx},${cy + 3.2} ${cx - 4.8},${cy + 6.5} ${cx - 3.2},${cy + 1.2} ${cx - 7},${cy - 2.2} ${cx - 2.2},${cy - 2.2}`}
                      fill="#ffcc00"
                    />
                  );
                })}
              </g>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>
      );

    case 'RUB':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Russian Tricolor Bands: White, Blue, Red */}
          <div className="absolute -right-1 -top-1 -bottom-1 w-[72%] sm:w-[68%] opacity-45 sm:opacity-50 group-hover:opacity-65 transition-opacity duration-300">
            <svg className="w-full h-full object-cover" viewBox="0 0 280 160" preserveAspectRatio="none" fill="none">
              <rect y="0" width="280" height="53.33" fill="#ffffff" />
              <rect y="53.33" width="280" height="53.33" fill="#0039a6" />
              <rect y="106.66" width="280" height="53.34" fill="#d52b1e" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>
      );

    case 'CNY':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* China Flag on right with rich Crimson Red & Golden Stars */}
          <div className="absolute -right-1 -top-1 -bottom-1 w-[72%] sm:w-[68%] opacity-50 sm:opacity-55 group-hover:opacity-70 transition-opacity duration-300">
            <svg className="w-full h-full object-cover" viewBox="0 0 280 160" preserveAspectRatio="none" fill="none">
              <rect width="280" height="160" fill="#de2910" />
              {/* Big Golden Star */}
              <polygon points="120,40 126,58 145,58 130,70 135,88 120,76 105,88 110,70 95,58 114,58" fill="#ffde00" />
              {/* 4 Small Golden Stars */}
              <polygon points="160,32 162,37 167,37 163,40 165,45 160,42 155,45 157,40 153,37 158,37" fill="#ffde00" />
              <polygon points="172,48 174,53 179,53 175,56 177,61 172,58 167,61 169,56 165,53 170,53" fill="#ffde00" />
              <polygon points="172,68 174,73 179,73 175,76 177,81 172,78 167,81 169,76 165,73 170,73" fill="#ffde00" />
              <polygon points="160,84 162,89 167,89 163,92 165,97 160,94 155,97 157,92 153,89 158,89" fill="#ffde00" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>
      );
  }
};

export const DailyTradeRadar: React.FC<DailyTradeRadarProps> = ({
  onAskAI,
  onOpenCalculatorWithName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'FX' | 'SPOT' | 'QUEUES' | 'SIGNALS' | 'STATS'>('FX');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Hozir');
  
  // Data states with capability to simulate live ticks
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>(INITIAL_CURRENCY_RATES);
  const [spotPrices, setSpotPrices] = useState<CommoditySpotPrice[]>(INITIAL_SPOT_PRICES);
  const [borderQueues, setBorderQueues] = useState<DailyBorderQueue[]>(INITIAL_BORDER_QUEUES);
  const [dailySignals, setDailySignals] = useState<DailyTradeSignal[]>(INITIAL_DAILY_SIGNALS);
  const [dailyStats, setDailyStats] = useState<DailyTradeStats>(INITIAL_DAILY_STATS);

  // Spot filter
  const [spotCategory, setSpotCategory] = useState<'ALL' | 'AGRO' | 'INDUSTRY' | 'TECH'>('ALL');

  // Mini FX converter
  const [converterAmount, setConverterAmount] = useState<number>(1000);
  const [converterCurrency, setConverterCurrency] = useState<'USD' | 'EUR' | 'RUB' | 'CNY'>('USD');

  // Live Refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Slightly fluctuate rates to reflect dynamic live updates
      setCurrencyRates((prev) =>
        prev.map((c) => {
          const delta = (Math.random() - 0.48) * (c.code === 'USD' ? 6 : c.code === 'EUR' ? 8 : 1);
          const newRate = Number((c.rate + delta).toFixed(2));
          return {
            ...c,
            rate: newRate,
            diff: Number((c.diff + delta * 0.1).toFixed(2)),
            trend: delta >= 0 ? 'UP' : 'DOWN',
          };
        })
      );

      // Fluctuate some border queues
      setBorderQueues((prev) =>
        prev.map((b) => {
          const change = Math.floor((Math.random() - 0.45) * 6);
          const newTrucks = Math.max(10, b.queueTrucks + change);
          return {
            ...b,
            queueTrucks: newTrucks,
            status: newTrucks > 100 ? 'BUSY' : newTrucks > 50 ? 'MODERATE' : 'FAST',
          };
        })
      );

      const now = new Date();
      setLastRefreshedTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
      setIsRefreshing(false);
    }, 700);
  };

  const selectedCurrencyRate = currencyRates.find((c) => c.code === converterCurrency)?.rate || 12825;
  const convertedUzSum = Math.round(converterAmount * selectedCurrencyRate);

  const filteredSpotPrices = spotCategory === 'ALL' 
    ? spotPrices 
    : spotPrices.filter((p) => p.category === spotCategory);

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300">
      
      {/* 1. Top Strip Ticker (Compact & Always Visible) */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border-b border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Live status badge & title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Kunlik Savdo Radari
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-500">• Jonli Narxlar & Kurslar</span>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title="Yangilash"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            >
              <span>{isExpanded ? 'Yopish' : 'Barchasi'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Center: Live Currency Rates Scrolling/Horizontal Ticker */}
        <div className="w-full md:w-auto overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center gap-2.5 min-w-max text-xs">
            {currencyRates.map((cr) => {
              // Custom subtle background tint and border according to flag
              const chipTheme = 
                cr.code === 'USD'
                  ? 'bg-gradient-to-r from-blue-950/80 via-slate-950/90 to-red-950/40 border-blue-600/30 hover:border-blue-400'
                  : cr.code === 'EUR'
                  ? 'bg-gradient-to-r from-blue-950/90 via-slate-950/90 to-amber-950/30 border-blue-500/30 hover:border-amber-400'
                  : cr.code === 'RUB'
                  ? 'bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-red-950/40 border-red-500/30 hover:border-red-400'
                  : 'bg-gradient-to-r from-red-950/80 via-slate-950/90 to-amber-950/40 border-red-600/30 hover:border-yellow-400';

              return (
                <div 
                  key={cr.code}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm group overflow-hidden ${chipTheme}`}
                  onClick={() => {
                    setConverterCurrency(cr.code);
                    setIsExpanded(true);
                    setActiveTab('FX');
                  }}
                  title={`${cr.name} batafsil tahlili`}
                >
                  <span className="drop-shadow-md group-hover:scale-110 transition-transform">{renderMiniFlag(cr.code, "w-4.5 h-3.5")}</span>
                  <span className="font-extrabold text-white font-mono tracking-tight">{cr.code}</span>
                  <span className="font-bold text-slate-100 font-mono">{cr.rate.toLocaleString()}</span>
                  <span className={`flex items-center text-[10px] font-bold font-mono ${
                    cr.trend === 'UP' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {cr.trend === 'UP' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {cr.diff > 0 ? `+${cr.diff}` : cr.diff}
                  </span>
                </div>
              );
            })}

            {/* Quick highlight: Moscow Tomato spot */}
            <div 
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 cursor-pointer hover:bg-amber-500/20 transition-all"
              onClick={() => {
                setIsExpanded(true);
                setActiveTab('SPOT');
              }}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-medium text-[11px]">Moskva Pomidor:</span>
              <span className="font-bold font-mono text-white">$1.48/kg (+4.2%)</span>
            </div>
          </div>
        </div>

        {/* Right: Refresh button & Expand toggler for Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Kurs va narxlarni jonli qayta yuklash"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
            <span className="text-[11px] font-mono">{lastRefreshedTime}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <span>{isExpanded ? 'Tahlilni Yig‘ish' : 'To‘liq Kunlik Tahlil'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* 2. Expanded In-Depth Dashboard (When Opened) */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6 animate-fadeIn bg-slate-900/60">
          
          {/* Module Sub-tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('FX')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'FX'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>1. Valyuta Kurslari & Konverter</span>
              </button>

              <button
                onClick={() => setActiveTab('SPOT')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'SPOT'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>2. Birja Spot Narxlari</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300">
                  Agro & Tech
                </span>
              </button>

              <button
                onClick={() => setActiveTab('QUEUES')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'QUEUES'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>3. Chegara Navbatlari (Jonli)</span>
              </button>

              <button
                onClick={() => setActiveTab('SIGNALS')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'SIGNALS'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>4. Kunlik Signallar</span>
              </button>

              <button
                onClick={() => setActiveTab('STATS')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'STATS'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-sky-300" />
                <span>5. Bugungi Aylanma</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Har kuni soat 09:00 va 14:00 da yangilanadi</span>
            </div>
          </div>

          {/* TAB 1: VALYUTA KURSLARI & MINI-KONVERTER */}
          {activeTab === 'FX' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currencyRates.map((cr) => {
                  // Thematic card style for each country's flag collage
                  const cardTheme = 
                    cr.code === 'USD'
                      ? 'bg-gradient-to-br from-slate-950 via-[#0b1429] to-[#181026] border-blue-900/60 hover:border-blue-400/80 shadow-blue-950/20'
                      : cr.code === 'EUR'
                      ? 'bg-gradient-to-br from-slate-950 via-[#081536] to-[#1c1a0e] border-blue-800/60 hover:border-amber-400/80 shadow-blue-950/20'
                      : cr.code === 'RUB'
                      ? 'bg-gradient-to-br from-slate-950 via-[#10172c] to-[#261017] border-slate-700/60 hover:border-red-400/80 shadow-red-950/20'
                      : 'bg-gradient-to-br from-slate-950 via-[#250d14] to-[#211608] border-red-900/60 hover:border-yellow-400/80 shadow-red-950/20';

                  return (
                    <div 
                      key={cr.code}
                      className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg cursor-pointer ${cardTheme}`}
                      onClick={() => {
                        setConverterCurrency(cr.code);
                      }}
                      title={`${cr.name} konverterga tanlash`}
                    >
                      {/* Prominent High-Visibility Flag Background */}
                      {renderCardBackgroundFlag(cr.code)}

                      {/* Foreground Card Content with High-Contrast Typography */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-7 rounded-md overflow-hidden border border-white/25 shadow-md flex items-center justify-center bg-slate-900 group-hover:scale-110 transition-transform flex-shrink-0">
                              {renderMiniFlag(cr.code, "w-full h-full")}
                            </div>
                            <div>
                              <span className="font-extrabold text-white text-sm tracking-tight block drop-shadow-md">{cr.name}</span>
                              <span className="text-[10px] text-slate-300/90 block font-mono font-semibold drop-shadow-sm">1 {cr.code} kursi</span>
                            </div>
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono shadow-md backdrop-blur-sm ${
                            cr.trend === 'UP' 
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50' 
                              : 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                          }`}>
                            {cr.trend === 'UP' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {cr.diffPercent > 0 ? `+${cr.diffPercent}%` : `${cr.diffPercent}%`}
                          </span>
                        </div>

                        <div className="mt-3">
                          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                            <span>{cr.rate.toLocaleString()}</span>
                            <span className="text-xs font-semibold text-slate-300">UZS</span>
                          </div>
                          <div className="text-[11px] text-slate-300 mt-1.5 flex items-center justify-between border-t border-slate-700/60 pt-2 drop-shadow-sm">
                            <span className="text-slate-400">O‘tgan kunga nisbatan:</span>
                            <span className={`font-mono font-bold ${cr.diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {cr.diff >= 0 ? `+${cr.diff}` : cr.diff} so‘m
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live FX Converter for Trade Contracts */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="max-w-md">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Tezkor Bojxona & Shartnoma Valyuta Konverteri</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bojxona to‘lovlari va chet el xaridori bilan hisob-kitob qilish uchun rasmiy MB kursi asosida avtomatik hisoblash
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 overflow-hidden w-full sm:w-auto shadow-inner">
                    <span className="pl-3 flex items-center select-none">
                      {renderMiniFlag(converterCurrency, "w-5 h-3.5")}
                    </span>
                    <input
                      type="number"
                      value={converterAmount}
                      onChange={(e) => setConverterAmount(Number(e.target.value))}
                      className="px-2.5 py-2 bg-transparent text-white font-mono font-bold text-sm w-28 sm:w-32 focus:outline-none"
                      placeholder="Miqdor"
                    />
                    <select
                      value={converterCurrency}
                      onChange={(e) => setConverterCurrency(e.target.value as any)}
                      className="px-2.5 py-2 bg-slate-800 text-white text-xs font-bold border-l border-slate-700 focus:outline-none cursor-pointer"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="RUB">RUB (₽)</option>
                      <option value="CNY">CNY (¥)</option>
                    </select>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />

                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-sm text-center w-full sm:w-auto">
                    = {convertedUzSum.toLocaleString()} UZS
                  </div>

                  <button
                    onClick={() => onAskAI(`Hozirgi ${converterCurrency} kursi (${selectedCurrencyRate} UZS) bo'yicha ${converterAmount} ${converterCurrency} lik eksport/import bitimining bojxona to'lovlari (boj va QQS) qancha bo'ladi?`)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all whitespace-nowrap shadow-md cursor-pointer"
                  >
                    AI Hisobini Olish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIRJA SPOT NARXLARI */}
          {activeTab === 'SPOT' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-medium">Kategoriya:</span>
                  <button
                    onClick={() => setSpotCategory('ALL')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      spotCategory === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    Barchasi ({spotPrices.length})
                  </button>
                  <button
                    onClick={() => setSpotCategory('AGRO')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      spotCategory === 'AGRO' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    🍇 Qishloq xo‘jaligi
                  </button>
                  <button
                    onClick={() => setSpotCategory('INDUSTRY')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      spotCategory === 'INDUSTRY' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    ⚙️ Sanoat & Metall
                  </button>
                  <button
                    onClick={() => setSpotCategory('TECH')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      spotCategory === 'TECH' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    📱 Elektronika & Chiplar
                  </button>
                </div>

                <span className="text-xs text-slate-500">
                  Moskva (Food City), Dubay (Al Aweer), Shanxay (LME) birjalari spot narxlari
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredSpotPrices.map((spot) => (
                  <div
                    key={spot.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-bold text-white text-sm">{spot.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center font-mono ${
                          spot.diffPercent > 0 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : spot.diffPercent < 0 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {spot.diffPercent > 0 ? `+${spot.diffPercent}%` : `${spot.diffPercent}%`}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-2 font-medium">
                        <Building className="w-3 h-3 text-slate-500" />
                        <span>{spot.market}</span>
                      </div>

                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                        {spot.note}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Spot narxi:</span>
                        <span className="text-lg font-black text-white font-mono">
                          {spot.currency}{spot.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">/{spot.unit}</span>
                        </span>
                      </div>

                      <button
                        onClick={() => onAskAI(`Menga "${spot.name}" bo‘yicha bugungi birja konyunkturasi (${spot.market} dagi narx ${spot.currency}${spot.price}/${spot.unit}) tahlilini ber: eksport qilish hozir foydalimi, qanday foyda marjasi qoladi?`)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-950/50 hover:text-emerald-300 border border-slate-800 text-[11px] font-semibold text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>AI Tahlili</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHEGARA POSTLARIDAGI JONLI NAVBAT */}
          {activeTab === 'QUEUES' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>Bojxona Chegara Postlaridagi Bugungi Jonli Holat</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Yuk mashinalari uchun kutish vaqti va eng maqbul o‘tish marshrutlari tavsiyasi
                  </p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                  GPS & Bojxona E-navbat ma’lumoti
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {borderQueues.map((bq) => (
                  <div
                    key={bq.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg">{bq.flag}</span>
                          <span className="font-bold text-white text-sm">{bq.postName}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          bq.status === 'FAST'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : bq.status === 'MODERATE'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {bq.status === 'FAST' ? '🟢 Tezkor (<2 soat)' : bq.status === 'MODERATE' ? '🟡 O‘rtacha (2-4 soat)' : '🔴 Tirband (>4 soat)'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 font-medium mb-2">
                        {bq.direction}
                      </div>

                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Kutish vaqti:</span>
                          <span className="font-bold text-white font-mono">{bq.avgWaitHours} soat</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Navbatdagi furalar:</span>
                          <span className="font-bold text-amber-400 font-mono">~{bq.queueTrucks} ta</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Tavsiya:</strong> {bq.recommendation}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Ish tartibi: {bq.operatingHours}</span>
                      <button
                        onClick={() => onAskAI(`"${bq.postName}" chegara posti orqali o'tish sharoitlari, zaruriy hujjatlar va tirbandlikni chetlab o'tish bo'yicha amaliy maslahat ber.`)}
                        className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                      >
                        Batafsil ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KUNLIK SIGNALLAR VA IMKONIYATLAR */}
          {activeTab === 'SIGNALS' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Bugungi Tashqi Savdo Signallari va Tezkor Imkoniyatlar</span>
                </h4>
                <span className="text-xs text-slate-500">Tahlilchilarimiz va AI tahlili</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {dailySignals.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          sig.category === 'PRICE_SPIKE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : sig.category === 'OPPORTUNITY'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : sig.category === 'SUBSIDY'
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {sig.category === 'PRICE_SPIKE' ? '🔥 Narx Oshishi' : sig.category === 'OPPORTUNITY' ? '⚡ Qulay Oynalik' : sig.category === 'SUBSIDY' ? '💰 Davlat Subsidiyasi' : '⚠️ Bojxona Ogohlantirishi'}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">{sig.timestamp}</span>
                      </div>

                      <h5 className="font-bold text-white text-sm mb-1.5">{sig.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{sig.summary}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-[11px] text-emerald-400 font-semibold block mb-0.5">Amaliy tavsiya:</span>
                      <span className="text-slate-300">{sig.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BUGUNGI AYLANMA & BOJXONA STATISTIKASI */}
          {activeTab === 'STATS' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Bugungi BYuD Deklaratsiyalari</span>
                  <div className="text-2xl font-black text-white font-mono">{dailyStats.todayDeclarationsCount.toLocaleString()} ta</div>
                  <span className="text-[10px] text-emerald-400 mt-1 block">94.8% avtomatlashgan rasmiylashtiruv</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Bugun Chiqqan Eksport Furalari</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">{dailyStats.todayExportTrucks} fura</div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Rossiya, Qozog‘iston, Yevropa</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Bugungi Savdo Aylanmasi</span>
                  <div className="text-2xl font-black text-amber-400 font-mono">{dailyStats.todayTurnoverUsd}</div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Tashqi savdo barcha yo‘nalishlari</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">O‘rtacha Rasmiylashtirish</span>
                  <div className="text-2xl font-black text-sky-400 font-mono">{dailyStats.customsProcessingSpeedMin} daqiqa</div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Yashil koridor orqali</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>Ma’lumotlar O‘zbekiston Respublikasi Markaziy Banki, Bojxona qo‘mitasi va xalqaro birjalar asosida real vaqtda yangilanadi.</span>
                </div>
                <button
                  onClick={() => onAskAI("Bugungi O'zbekiston tashqi savdo ko'rsatkichlari bo'yicha to'liq kunlik brifing ber: qaysi tovarlar ko'proq eksport qilindi, qaysi yo'nalishlar tirband?")}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all whitespace-nowrap cursor-pointer"
                >
                  Kunlik AI Brifingi
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
