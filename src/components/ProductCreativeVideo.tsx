import React, { useState } from 'react';
import { ExportProduct } from '../types/trade';
import { Play, Pause, Maximize2, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

interface ProductCreativeVideoProps {
  product: ExportProduct;
  index: number;
  onOpenVideoModal?: (product: ExportProduct) => void;
  isSectionActive?: boolean;
  videoCycleResetKey?: number;
}

export const ProductCreativeVideo: React.FC<ProductCreativeVideoProps> = ({
  product,
  index,
  onOpenVideoModal,
  isSectionActive = true,
  videoCycleResetKey = 0,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Sync play state with section activation & reset key
  React.useEffect(() => {
    if (isSectionActive) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isSectionActive, videoCycleResetKey]);

  // Category identification
  const isTextile = product.category === 'TEXTILE' || product.name.toLowerCase().includes('ip') || product.name.toLowerCase().includes('paxta');
  const isFood = product.category === 'FOOD_PROCESSING' || product.name.toLowerCase().includes('mayiz') || product.name.toLowerCase().includes('kishmish');
  const isAgri = product.category === 'AGRICULTURE' || product.name.toLowerCase().includes('gilos') || product.name.toLowerCase().includes('pomidor') || product.name.toLowerCase().includes('qovun');
  const isChemical = product.category === 'CHEMICALS' || product.name.toLowerCase().includes('polietilen');
  const isMetallurgy = product.category === 'INDUSTRIAL' || product.name.toLowerCase().includes('mis');
  const isBuilding = product.category === 'CONSTRUCTION' || product.name.toLowerCase().includes('keramik');

  // Category-specific video badge text & theme colors
  const videoDetails = (() => {
    if (isTextile) {
      return {
        label: 'To‘quv & Ip yigirish video sexi',
        badge: '🧵 To‘quv Jarayoni (1200 rpm)',
        accent: 'from-blue-500/20 via-cyan-500/10 to-transparent',
        tagColor: 'bg-cyan-500/90 text-slate-950',
      };
    }
    if (isFood) {
      return {
        label: 'Quyoshda quritish & optik saralash',
        badge: '🍇 Quyoshda Quritish & Saralash',
        accent: 'from-amber-500/25 via-yellow-500/10 to-transparent',
        tagColor: 'bg-amber-400 text-slate-950',
      };
    }
    if (isAgri) {
      return {
        label: 'Bog‘ terimi & Gidro-sovutish (+2°C)',
        badge: '🍒 Terim & Gidro-Sovutish (+2°C)',
        accent: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        tagColor: 'bg-emerald-400 text-slate-950',
      };
    }
    if (isChemical) {
      return {
        label: 'HDPE Granula ekstruziyasi',
        badge: '🔬 Polimer Granula Oqimi',
        accent: 'from-indigo-500/25 via-blue-500/10 to-transparent',
        tagColor: 'bg-indigo-400 text-slate-950',
      };
    }
    if (isMetallurgy) {
      return {
        label: '1085°C Mis eritish & elektroliz',
        badge: '⚡ 1085°C Mis Eritish Sexi',
        accent: 'from-orange-500/30 via-red-500/10 to-transparent',
        tagColor: 'bg-orange-500 text-white',
      };
    }
    return {
      label: '1200°C Keramika pishirish konveyeri',
      badge: '🧱 1200°C Pishirish & Sirlash',
      accent: 'from-amber-600/20 via-slate-600/10 to-transparent',
      tagColor: 'bg-amber-500 text-slate-950',
    };
  })();

  const animationDelay = `${(index % 3) * 1.8}s`;

  return (
    <div
      className="relative h-52 w-full overflow-hidden bg-slate-950 select-none cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenVideoModal && onOpenVideoModal(product)}
      title="8-10 soniyalik kreativ video prevyuni to‘liq ochish"
    >
      {/* 1. BASE MEDIA: 9.5s Cinematic Camera Motion */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isPlaying ? 'opacity-90' : 'opacity-70 grayscale-[20%]'
        }`}
        style={{
          animation: isPlaying ? 'cinematicVideoMotion 9.5s ease-in-out infinite' : 'none',
          animationDelay,
        }}
      />

      {/* 2. CATEGORY-SPECIFIC CREATIVE VIDEO OVERLAYS */}

      {/* A. TO'QIMACHILIK (TEXTILE): WEAVING LOOM THREADS & SHUTTLE */}
      {isTextile && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Vertical Loom Warp Threads */}
          <div className="absolute inset-0 flex justify-between px-3 opacity-25">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="w-[1px] h-full bg-cyan-200"
                style={{
                  opacity: (i % 2 === 0 ? 0.35 : 0.65),
                }}
              />
            ))}
          </div>

          {/* Horizontal Flying Loom Shuttle carrying yarn */}
          <div
            className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]"
            style={{
              animation: 'loomShuttle 2.4s ease-in-out infinite',
              animationDelay,
            }}
          />

          {/* Spinning Spindle Cotton Fiber Particles */}
          <div className="absolute top-4 right-1/3 flex gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.5px] animate-ping" />
            <span className="w-1 h-1 rounded-full bg-cyan-200/80 blur-[0.5px] animate-pulse" />
          </div>
        </div>
      )}

      {/* B. OZIQ-OVQAT (FOOD_PROCESSING - MAYIZ / KISHMISH): WARM SUNSET & GLISTENING DRIED FRUITS */}
      {isFood && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Golden Solar Glare Sweep */}
          <div 
            className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-br from-amber-400/35 via-yellow-500/10 to-transparent blur-2xl pointer-events-none"
            style={{ animation: 'currencyFloat 6s ease-in-out infinite' }}
          />

          {/* Golden Honey / Sugar crystals floating */}
          <div className="absolute inset-0 flex items-center justify-around opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 drop-shadow-[0_0_6px_#f59e0b] animate-bounce" style={{ animationDelay: '0.4s' }} />
            <span className="w-2 h-2 rounded-full bg-yellow-200 drop-shadow-[0_0_8px_#fbbf24] animate-ping" style={{ animationDelay: '1.2s' }} />
            <span className="w-1 h-1 rounded-full bg-amber-400 drop-shadow-[0_0_4px_#f59e0b] animate-pulse" style={{ animationDelay: '0.8s' }} />
          </div>
        </div>
      )}

      {/* C. QISHLOQ XO'JALIGI (AGRICULTURE - GILOS / POMIDOR / QOVUN): DEWDROPS & HYDROCOOLING MIST (+2°C) */}
      {isAgri && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Condensing Fresh Water Droplets */}
          <div className="absolute top-6 left-1/4 w-1.5 h-3 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            style={{ animation: 'dewDropFall 3.2s ease-in infinite', animationDelay: '0.2s' }}
          />
          <div className="absolute top-10 right-1/3 w-2 h-3.5 rounded-full bg-cyan-100/90 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
            style={{ animation: 'dewDropFall 3.8s ease-in infinite', animationDelay: '1.5s' }}
          />

          {/* Hydrocooling Cold Vapor Mist (+2°C) swirling at the bottom */}
          <div
            className="absolute -bottom-4 inset-x-0 h-16 bg-gradient-to-t from-teal-400/25 via-cyan-300/10 to-transparent blur-md"
            style={{ animation: 'mistFlow 5s ease-in-out infinite' }}
          />
        </div>
      )}

      {/* D. KIMYO & POLIMER (CHEMICAL): GRANULES & POLYMER CHAINS */}
      {isChemical && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          <div className="absolute bottom-6 right-6 flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-300/80 drop-shadow-[0_0_8px_#6366f1] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-blue-300/80 drop-shadow-[0_0_6px_#3b82f6] animate-pulse" />
          </div>
        </div>
      )}

      {/* E. METALLURGIYA (METALLURGY - MIS KATOD): MOLTEN COPPER & SPARKS */}
      {isMetallurgy && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Molten Glow */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-orange-600/40 via-red-600/20 to-transparent blur-md" />

          {/* Floating Smelting Sparks */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-8 rounded-full bg-amber-300 drop-shadow-[0_0_6px_#f97316]"
              style={{
                left: `${20 + i * 16}%`,
                width: `${i % 2 === 0 ? 3 : 2}px`,
                height: `${i % 2 === 0 ? 3 : 2}px`,
                '--sx': `${(i - 2) * 15}px`,
                animation: 'sparkRise 2.5s ease-out infinite',
                animationDelay: `${i * 0.5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* 3. CINEMATIC STUDIO LIGHT SWEEP (8-10s video flare) */}
      {isPlaying && (
        <div 
          className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          style={{
            animation: 'videoLightSweep 9.5s ease-in-out infinite',
            animationDelay: `${(index % 3) * 1.8 + 1.2}s`,
          }}
        />
      )}

      {/* Ambient gradient shading for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40 pointer-events-none" />

      {/* 4. TOP HUD BAR: Category Video Badge & REC 4K status */}
      <div className="absolute top-3 inset-x-3 flex items-start justify-between z-20 pointer-events-none">
        
        {/* Creative Video Mode Pill with Category Name */}
        <div className="flex flex-col gap-1">
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-md border border-white/20 tracking-tight flex items-center gap-1.5 ${videoDetails.tagColor}`}>
            <span>{videoDetails.badge}</span>
          </span>
          <span className="text-[9px] font-medium text-slate-300/90 pl-1 drop-shadow-md">
            {videoDetails.label}
          </span>
        </div>

        {/* 4K REC Video Indicator & Equalizer */}
        <div className="flex items-center gap-2">
          {/* Audio / Rhythm Equalizer bars */}
          <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800" title="Zavod / Dala video ritmi">
            <span className="w-0.5 bg-emerald-400 rounded-full" style={{ animation: 'eqBarPulse 0.8s ease-in-out infinite' }} />
            <span className="w-0.5 bg-emerald-400 rounded-full" style={{ animation: 'eqBarPulse 1.1s ease-in-out infinite', animationDelay: '0.2s' }} />
            <span className="w-0.5 bg-emerald-400 rounded-full" style={{ animation: 'eqBarPulse 0.9s ease-in-out infinite', animationDelay: '0.4s' }} />
            <span className="w-0.5 bg-emerald-400 rounded-full" style={{ animation: 'eqBarPulse 0.7s ease-in-out infinite', animationDelay: '0.1s' }} />
          </div>

          {/* REC Badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md text-[9px] font-mono font-bold text-white border border-slate-700 shadow-md">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" style={{ animation: 'videoRecPulse 1.2s infinite' }} />
            <span>4K REEL</span>
          </div>
        </div>
      </div>

      {/* 5. CENTER PLAY / HOVER EXPAND BUTTON */}
      <div className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="px-3.5 py-2 rounded-2xl bg-slate-950/90 border border-emerald-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md transform group-hover:scale-105 transition-transform pointer-events-auto">
          <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          <span>Kreativ Video (8-10s Reel)</span>
          <Maximize2 className="w-3.5 h-3.5 text-slate-400 ml-1" />
        </div>
      </div>

      {/* 6. BOTTOM HUD: Price & 8-10s Video Loop Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none">
        
        {/* Prices Row */}
        <div className="px-3.5 pb-2.5 flex items-center justify-between text-xs pointer-events-auto">
          <div className="bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300 text-[11px] shadow-sm">
            Ichki: <strong className="text-white font-mono">${product.avgDomesticPrice}</strong>/{product.unit}
          </div>
          <div className="bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/50 text-emerald-300 text-[11px] shadow-sm font-semibold">
            Eksport: <strong className="text-white font-mono">${product.avgExportPrice}</strong>/{product.unit}
          </div>
        </div>

        {/* 8-10 Second Video Progress Loop Bar */}
        <div className="w-full h-1 bg-slate-800/80 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
            style={{
              animation: isPlaying ? 'videoProgressBar 9.5s linear infinite' : 'none',
              animationDelay,
            }}
          />
        </div>
      </div>

    </div>
  );
};
