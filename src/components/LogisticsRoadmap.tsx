import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Compass, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Coins, 
  Globe2, 
  Navigation, 
  Layers, 
  AlertCircle,
  Building,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { TRADE_CORRIDORS, BORDER_POSTS, BorderCrossingPost } from '../data/logisticsData';
import { TradeCorridor } from '../types/trade';

interface LogisticsRoadmapProps {
  onAskAIAboutLogistics: (prompt: string) => void;
}

export const LogisticsRoadmap: React.FC<LogisticsRoadmapProps> = ({
  onAskAIAboutLogistics,
}) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>(TRADE_CORRIDORS[0].id);
  const [filterDirection, setFilterDirection] = useState<'ALL' | 'EXPORT' | 'IMPORT'>('ALL');
  const [filterRegion, setFilterRegion] = useState<'ALL' | 'NORTH' | 'EAST' | 'WEST' | 'SOUTH'>('ALL');

  // Route Calculator States
  const [calcCorridorId, setCalcCorridorId] = useState<string>(TRADE_CORRIDORS[0].id);
  const [cargoWeightTons, setCargoWeightTons] = useState<number>(20);
  const [transportType, setTransportType] = useState<'TRUCK_REF' | 'TRUCK_TENT' | 'TRAIN_CONTAINER'>('TRUCK_REF');

  const selectedCorridor = TRADE_CORRIDORS.find((c) => c.id === selectedCorridorId) || TRADE_CORRIDORS[0];

  const filteredCorridors = TRADE_CORRIDORS.filter((corridor) => {
    const matchesDirection = 
      filterDirection === 'ALL' || 
      corridor.direction === 'BOTH' || 
      corridor.direction === filterDirection;

    const matchesRegion = 
      filterRegion === 'ALL' || 
      corridor.corridorType === filterRegion;

    return matchesDirection && matchesRegion;
  });

  // Calculate customized route cost
  const calcCorridor = TRADE_CORRIDORS.find((c) => c.id === calcCorridorId) || TRADE_CORRIDORS[0];
  let multiplier = 1.0;
  if (transportType === 'TRUCK_TENT') multiplier = 0.85;
  if (transportType === 'TRAIN_CONTAINER') multiplier = 0.75;

  const totalBaseCost = Math.round((calcCorridor.avgCostPerTruckUsd * (cargoWeightTons / 20)) * multiplier);
  const subsidyAmount = Math.round(totalBaseCost * (calcCorridor.stateSubsidyPercent / 100));
  const finalCostWithSubsidy = totalBaseCost - subsidyAmount;
  const costPerKg = (finalCostWithSubsidy / (cargoWeightTons * 1000)).toFixed(3);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>3-Bo‘lim: Xalqaro Savdo Yo‘laklari & Masofalar Xaritasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Eksport va Import Yo‘l Xaritasi: Tranzit & Masofalar
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              O‘zbekistondan dunyoning asosiy bozorlariga (Rossiya, Xitoy, Turkiya, Yevropa, Fors ko‘rfazi, Pokiston) 
              olib boruvchi va import keltiruvchi tranzit magistrallari, chegara postlari, aniq kilometrlar hamda davlat subsidiyalari.
            </p>
          </div>

          {/* Quick macro highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">Asosiy Yo‘laklar</span>
              <div className="text-lg font-bold text-white mt-0.5">6 ta Magistral</div>
              <span className="text-[10px] text-emerald-400">Shimol, Sharq, G‘arb, Janub</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">EPA Subsidiyasi</span>
              <div className="text-lg font-bold text-amber-400 mt-0.5">50% gacha</div>
              <span className="text-[10px] text-slate-400">Davlat tomonidan qoplanadi</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 font-medium">Eng Qisqa Dengiz Yo‘li</span>
              <div className="text-lg font-bold text-sky-400 mt-0.5">2,450 km</div>
              <span className="text-[10px] text-slate-400">Karachi dengiz porti (4-6 kun)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Vector / Interactive Transit Hub Map */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-indigo-400" />
              <span>Evrosiyo Bo‘ylab Tranzit Yo‘laklari Gologrammasi</span>
            </h2>
            <p className="text-xs text-slate-400">
              Marshrutni xaritadan tanlang va uning batafsil texnik-iqtisodiy ko‘rsatkichlarini ko‘ring
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Markaz: O‘zbekiston (Toshkent)
            </span>
          </div>
        </div>

        {/* Interactive Stylized Route Map Node Grid */}
        <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
          {/* Grid lines background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* SVG Animated Connecting Routes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="corridorGlowNorth" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="corridorGlowEast" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="corridorGlowWest" x1="50%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="corridorGlowSouth" x1="50%" y1="50%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting lines from Central Tashkent to Hubs */}
            {/* North: Moscow */}
            <path d="M 50% 50% Q 35% 30% 28% 18%" fill="none" stroke="url(#corridorGlowNorth)" strokeWidth="3" strokeDasharray="6,4" className="animate-pulse" />
            
            {/* East: Kashgar & Shenzhen */}
            <path d="M 50% 50% Q 65% 45% 78% 38%" fill="none" stroke="url(#corridorGlowEast)" strokeWidth="3" strokeDasharray="6,4" className="animate-pulse" />
            <path d="M 78% 38% Q 86% 50% 88% 68%" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />

            {/* West: Turkey & Europe */}
            <path d="M 50% 50% Q 35% 55% 18% 52%" fill="none" stroke="url(#corridorGlowWest)" strokeWidth="3" strokeDasharray="6,4" className="animate-pulse" />
            <path d="M 18% 52% Q 12% 40% 12% 26%" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />

            {/* South: Karachi & Persian Gulf */}
            <path d="M 50% 50% Q 54% 70% 58% 85%" fill="none" stroke="url(#corridorGlowSouth)" strokeWidth="3" strokeDasharray="6,4" className="animate-pulse" />
            <path d="M 50% 50% Q 40% 70% 32% 82%" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="5,4" className="animate-pulse" />
          </svg>

          {/* Central Hub: O‘zbekiston (Toshkent / Samarqand) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-xl shadow-emerald-500/40 border-2 border-white ring-4 ring-emerald-500/30 animate-bounce-slow">
              <Globe2 className="w-7 h-7" />
            </div>
            <div className="mt-1 px-3 py-1 rounded-xl bg-slate-950/90 border border-emerald-500/50 text-white font-bold text-xs shadow-md whitespace-nowrap">
              🇺🇿 O‘ZBEKISTON (Toshkent)
            </div>
            <span className="text-[10px] text-emerald-300 font-mono">Bosh Logistika Markazi</span>
          </div>

          {/* Hub: Moscow (North) */}
          <button
            onClick={() => setSelectedCorridorId('corridor-north-moscow')}
            className={`absolute top-[12%] left-[24%] sm:left-[26%] z-20 flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
              selectedCorridorId === 'corridor-north-moscow'
                ? 'bg-sky-500/20 border-2 border-sky-400 scale-110 shadow-lg shadow-sky-500/30'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">🇷🇺</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">Moskva (Food City)</span>
            <span className="text-[10px] text-sky-400 font-mono">3,380 km • 5-7 kun</span>
          </button>

          {/* Hub: Kashgar / China (East) */}
          <button
            onClick={() => setSelectedCorridorId('corridor-east-china')}
            className={`absolute top-[32%] right-[16%] sm:right-[18%] z-20 flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
              selectedCorridorId === 'corridor-east-china'
                ? 'bg-rose-500/20 border-2 border-rose-400 scale-110 shadow-lg shadow-rose-500/30'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">🇨🇳</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">Xitoy (Qashg‘ar / Shenchjen)</span>
            <span className="text-[10px] text-rose-400 font-mono">1,420 - 5,650 km</span>
          </button>

          {/* Hub: Istanbul & Turkey (West) */}
          <button
            onClick={() => setSelectedCorridorId('corridor-west-turkey')}
            className={`absolute top-[48%] left-[12%] sm:left-[14%] z-20 flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
              selectedCorridorId === 'corridor-west-turkey'
                ? 'bg-amber-500/20 border-2 border-amber-400 scale-110 shadow-lg shadow-amber-500/30'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">🇹🇷</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">Turkiya (Istanbul)</span>
            <span className="text-[10px] text-amber-400 font-mono">4,120 km • O‘rta yo‘lak</span>
          </button>

          {/* Hub: Europe / Warsaw (North-West) */}
          <button
            onClick={() => setSelectedCorridorId('corridor-west-europe')}
            className={`absolute top-[20%] left-[8%] z-20 hidden sm:flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
              selectedCorridorId === 'corridor-west-europe'
                ? 'bg-emerald-500/20 border-2 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/30'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">🇪🇺</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">Yevropa (Varshava)</span>
            <span className="text-[10px] text-emerald-400 font-mono">4,850 km • GSP+</span>
          </button>

          {/* Hub: Karachi / Pakistan (South) */}
          <button
            onClick={() => setSelectedCorridorId('corridor-south-pakistan')}
            className={`absolute bottom-[10%] right-[32%] sm:right-[36%] z-20 flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
              selectedCorridorId === 'corridor-south-pakistan'
                ? 'bg-purple-500/20 border-2 border-purple-400 scale-110 shadow-lg shadow-purple-500/30'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">🇵🇰</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">Karachi Dengiz Porti</span>
            <span className="text-[10px] text-purple-400 font-mono">2,450 km • 4-6 kun</span>
          </button>

          {/* Hub: Dubai / Persian Gulf (South-West) */}
          <button
            onClick={() => setSelectedCorridorId('corridor-south-gulf')}
            className={`absolute bottom-[12%] left-[24%] sm:left-[28%] z-20 flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
              selectedCorridorId === 'corridor-south-gulf'
                ? 'bg-cyan-500/20 border-2 border-cyan-400 scale-110 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">🇦🇪</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">Dubay (Jebel Ali)</span>
            <span className="text-[10px] text-cyan-400 font-mono">2,750 km • Fors ko‘rfazi</span>
          </button>
        </div>
      </div>

      {/* Selected Corridor Technical Spec Sheet */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
              <span>Tanlangan Yo‘lak Tahlili</span>
              <span className="px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300">
                {selectedCorridor.corridorType} Yo‘lak
              </span>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{selectedCorridor.originFlag} {selectedCorridor.originCity}</span>
              <ArrowRight className="w-5 h-5 text-slate-500" />
              <span>{selectedCorridor.destFlag} {selectedCorridor.destCity}</span>
            </h3>
          </div>

          <button
            onClick={() => onAskAIAboutLogistics(`Menga "${selectedCorridor.name}" yo‘lagi bo‘yicha to‘liq logistika hisob-kitobini qilib ber: hozirgi fura narxlari, chegara navbatlari, zaruriy hujjatlar (CMR, TIR, Do'zvol) va 50% davlat transport subsidiyasini olish tartibi.`)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold transition-all shadow-md shadow-indigo-950/40 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI dan Logistika Rejasini Olish</span>
          </button>
        </div>

        {/* 4 Core Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Aniq Masofa</span>
            <div className="text-xl font-black text-white">{selectedCorridor.distanceKm.toLocaleString()} km</div>
            <span className="text-[11px] text-slate-500">Avto / Temir yo‘l marshruti</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Tranzit Vaqti</span>
            <div className="text-xl font-black text-emerald-400">
              {selectedCorridor.transitDaysMin} - {selectedCorridor.transitDaysMax} kun
            </div>
            <span className="text-[11px] text-slate-500">Chegara rasmiylashtiruvi bilan</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">O‘rtacha Fura Narxi</span>
            <div className="text-xl font-black text-amber-400">
              ${selectedCorridor.avgCostPerTruckUsd.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500">~${selectedCorridor.avgCostPerKgUsd}/kg yuk uchun</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30">
            <span className="text-xs text-emerald-300 block mb-1">Davlat Subsidiyasi</span>
            <div className="text-xl font-black text-emerald-400">
              {selectedCorridor.stateSubsidyPercent}% gacha
            </div>
            <span className="text-[11px] text-emerald-400/80">EPA transport kompensatsiyasi</span>
          </div>
        </div>

        {/* Details: Border checkpoints, primary goods, risks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Chegara O‘tkazish Punktlari
            </span>
            <ul className="space-y-1 text-slate-400">
              {selectedCorridor.borderPoints.map((bp, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Asosiy Tashiladigan Yuklar
            </span>
            <div className="space-y-1 text-slate-400 leading-relaxed">
              {selectedCorridor.primaryGoods.map((g, idx) => (
                <div key={idx}>{g}</div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              E’tibor Beriladigan Risklar
            </span>
            <ul className="space-y-1 text-slate-400">
              {selectedCorridor.keyRisks.map((risk, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Distance & Transport Cost Calculator */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>Interaktiv Masofa va Transport Xarajatlari Kalkulyatori</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Marshrut, yuk og‘irligi va transport turini tanlab, transport xarajati va 50% gacha davlat subsidiyasini real vaqtda hisoblang
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select Corridor */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Marshrut / Savdo Yo‘lagi
              </label>
              <select
                value={calcCorridorId}
                onChange={(e) => setCalcCorridorId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {TRADE_CORRIDORS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.originFlag} {c.originCity} ➔ {c.destFlag} {c.destCity} ({c.distanceKm} km, {c.transitDaysMin}-{c.transitDaysMax} kun)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cargo Weight */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Yuk Miqdori: <span className="text-emerald-400 font-bold">{cargoWeightTons} tonna</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={60}
                  step={1}
                  value={cargoWeightTons}
                  onChange={(e) => setCargoWeightTons(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 t (Kichik partiya)</span>
                  <span>20 t (1 Fura)</span>
                  <span>60 t (Temir yo‘l vagoni)</span>
                </div>
              </div>

              {/* Transport Mode */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Transport Turi
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTransportType('TRUCK_REF')}
                    className={`py-2 px-2 rounded-xl text-center text-xs font-medium transition-all ${
                      transportType === 'TRUCK_REF'
                        ? 'bg-emerald-600 text-white font-bold shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    Refrijerator
                  </button>
                  <button
                    onClick={() => setTransportType('TRUCK_TENT')}
                    className={`py-2 px-2 rounded-xl text-center text-xs font-medium transition-all ${
                      transportType === 'TRUCK_TENT'
                        ? 'bg-emerald-600 text-white font-bold shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    Tentli fura
                  </button>
                  <button
                    onClick={() => setTransportType('TRAIN_CONTAINER')}
                    className={`py-2 px-2 rounded-xl text-center text-xs font-medium transition-all ${
                      transportType === 'TRAIN_CONTAINER'
                        ? 'bg-emerald-600 text-white font-bold shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    Konteyner
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Tranzit Masofasi:</span>
                <span className="font-bold text-white font-mono">{calcCorridor.distanceKm} km</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Yetkazish Vaqti:</span>
                <span className="font-bold text-emerald-400 font-mono">{calcCorridor.transitDaysMin}-{calcCorridor.transitDaysMax} kun</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-3 border-b border-slate-800">
                <span>Dastlabki Transport Xarajati:</span>
                <span className="font-medium text-slate-300 font-mono">${totalBaseCost.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 mb-3">
                <div className="flex items-center justify-between text-xs text-emerald-300">
                  <span className="font-semibold">Davlat Subsidiyasi (EPA):</span>
                  <span className="font-bold text-emerald-400 font-mono">-${subsidyAmount.toLocaleString()} ({calcCorridor.stateSubsidyPercent}%)</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Tadbirkor hisobiga qaytariladi</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Tadbirkor To‘laydigan Xarajat:</span>
                  <div className="text-2xl font-black text-white">
                    ${finalCostWithSubsidy.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">1 kg ga tushishi:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">${costPerKg}/kg</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 text-[11px] text-slate-500">
              Inkoterms 2020: FCA / DAP qoidalariga muvofiq
            </div>
          </div>
        </div>
      </div>

      {/* Chegara O‘tkazish Punktlari Monitoringi */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Asosiy Chegara Bojxona O‘tkazish Punktlari Holati</span>
            </h2>
            <p className="text-xs text-slate-400">
              O‘zbekiston bojxona postlari orqali xalqaro tranzit o‘tish sig‘imi va tirbandlik indikatori
            </p>
          </div>
          <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Jonli monitoring
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BORDER_POSTS.map((bp) => (
            <div 
              key={bp.id}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="font-bold text-white text-sm">
                    {bp.flag} {bp.name}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    bp.status === 'OPEN_FAST'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {bp.status === 'OPEN_FAST' ? 'Tezkor o‘tuv' : 'O‘rtacha navbat'}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mb-2 font-medium">
                  {bp.country} • {bp.location}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {bp.keyRoutes}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Kutish: <strong className="text-white">{bp.avgWaitHours} soat</strong></span>
                <span>Sig‘im: <strong className="text-white">{bp.dailyCapacityTrucks} fura/kun</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
