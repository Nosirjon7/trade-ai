import React, { useState } from 'react';

interface Particle {
  id: number;
  label: string;
  dx: string;
  dy: string;
  rot: string;
  color: string;
}

interface CurrencyVideoCardProps {
  id: number;
  title: string;
  amount: string;
  badgeText: string;
  badgeColorClass: string;
  subLabel: string;
  subValue: string;
  subValueColorClass: string;
  theme: 'USD' | 'IMPORT' | 'RED_ZONE' | 'GSP_EUR';
  icon: React.ReactNode;
  onClick: () => void;
}

export const CurrencyVideoCard: React.FC<CurrencyVideoCardProps> = ({
  id,
  title,
  amount,
  badgeText,
  badgeColorClass,
  subLabel,
  subValue,
  subValueColorClass,
  theme,
  icon,
  onClick,
}) => {
  const [isVFXActive, setIsVFXActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Theme-specific styles & colors
  const themeConfig = {
    USD: {
      cardGradient: 'from-emerald-950/60 via-slate-900/90 to-teal-950/40 border-emerald-500/30 hover:border-emerald-400',
      auraColor: 'bg-emerald-500/15',
      scanBeamColor: 'from-transparent via-emerald-400/25 to-transparent',
      flareColor: 'from-transparent via-emerald-300/40 to-transparent',
      shockwaveColor: 'border-emerald-400',
      symbol: '$',
      currencyGlyphs: ['$', 'USD', '💵', '🪙', '✨', '$'],
      waveStroke: '#10b981',
      iconBox: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      activeIconBox: 'bg-emerald-500 text-white shadow-emerald-500/50',
    },
    IMPORT: {
      cardGradient: 'from-rose-950/50 via-slate-900/90 to-amber-950/30 border-rose-500/30 hover:border-rose-400',
      auraColor: 'bg-rose-500/15',
      scanBeamColor: 'from-transparent via-rose-400/25 to-transparent',
      flareColor: 'from-transparent via-rose-300/40 to-transparent',
      shockwaveColor: 'border-rose-400',
      symbol: '📉',
      currencyGlyphs: ['-$', '€', '¥', '🪙', '📉', '¥'],
      waveStroke: '#f43f5e',
      iconBox: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
      activeIconBox: 'bg-rose-500 text-white shadow-rose-500/50',
    },
    RED_ZONE: {
      cardGradient: 'from-rose-950/60 via-slate-900/90 to-red-950/50 border-rose-500/40 hover:border-rose-400',
      auraColor: 'bg-red-500/20',
      scanBeamColor: 'from-transparent via-red-500/30 to-transparent',
      flareColor: 'from-transparent via-red-400/45 to-transparent',
      shockwaveColor: 'border-red-500',
      symbol: '🚨',
      currencyGlyphs: ['⚠️', '🛡️', '⚡', '🔥', '🚨', '💰'],
      waveStroke: '#ef4444',
      iconBox: 'bg-rose-500/20 border-rose-500/40 text-rose-300',
      activeIconBox: 'bg-rose-600 text-white shadow-red-500/50',
    },
    GSP_EUR: {
      cardGradient: 'from-teal-950/50 via-slate-900/90 to-blue-950/40 border-teal-500/30 hover:border-teal-400',
      auraColor: 'bg-teal-500/15',
      scanBeamColor: 'from-transparent via-teal-400/25 to-transparent',
      flareColor: 'from-transparent via-teal-300/40 to-transparent',
      shockwaveColor: 'border-teal-400',
      symbol: '€',
      currencyGlyphs: ['€', 'EUR', '0%', '🇪🇺', '✨', '💎'],
      waveStroke: '#14b8a6',
      iconBox: 'bg-teal-500/15 border-teal-500/30 text-teal-400',
      activeIconBox: 'bg-teal-500 text-white shadow-teal-500/50',
    },
  }[theme];

  // Trigger Video VFX explosion on click
  const triggerVFX = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();

    setIsVFXActive(true);

    // Generate bursting currency particles flying in 360 degrees
    const burstItems = themeConfig.currencyGlyphs;
    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 + Math.random() * 20) * (Math.PI / 180);
      const distance = 45 + Math.random() * 55;
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;
      const rot = `${(Math.random() - 0.5) * 180}deg`;
      return {
        id: Date.now() + i,
        label: burstItems[i % burstItems.length],
        dx,
        dy,
        rot,
        color: i % 2 === 0 ? '#34d399' : '#fbbf24',
      };
    });

    setParticles(newParticles);

    // Reset VFX state after animation completes
    setTimeout(() => {
      setIsVFXActive(false);
      setParticles([]);
    }, 750);
  };

  return (
    <div
      onClick={triggerVFX}
      className={`relative p-4 sm:p-5 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden group shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-[0.97] ${themeConfig.cardGradient} ${
        isVFXActive ? 'ring-2 ring-white/50 scale-[1.01]' : ''
      }`}
    >
      {/* 1. CONTINUOUS VIDEO EFFECT: Flowing Laser Scanbeam */}
      <div 
        className={`absolute inset-x-0 h-16 bg-gradient-to-b ${themeConfig.scanBeamColor} pointer-events-none select-none`}
        style={{
          animation: 'scanbeam 4.5s ease-in-out infinite',
        }}
      />

      {/* 2. CONTINUOUS VIDEO EFFECT: Pulsing Neon Video Aura */}
      <div 
        className={`absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl ${themeConfig.auraColor} pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60`}
      />

      {/* 3. CONTINUOUS VIDEO EFFECT: Waveform Video Line & Floating Currency Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Animated oscilloscope currency wave */}
        <svg className="absolute bottom-1 right-0 w-48 h-20 opacity-20 group-hover:opacity-35 transition-opacity" viewBox="0 0 200 80" fill="none">
          <path
            d="M 0,55 Q 30,20 60,50 T 120,40 T 170,20 T 200,35"
            stroke={themeConfig.waveStroke}
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="150"
            style={{
              animation: 'currencyFlowLine 6s linear infinite',
            }}
          />
          <path
            d="M 0,65 Q 40,35 80,60 T 150,45 T 200,50"
            stroke={themeConfig.waveStroke}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
        </svg>

        {/* Floating 3D currency glyph in background */}
        <div 
          className="absolute right-5 top-3 text-5xl font-black text-white/[0.06] font-mono select-none"
          style={{
            animation: 'currencyFloat 4s ease-in-out infinite',
          }}
        >
          {themeConfig.symbol}
        </div>
      </div>

      {/* 4. ON-CLICK VIDEO VFX: Cinematic Light Flare Beam */}
      {isVFXActive && (
        <div
          className={`absolute inset-y-0 w-32 bg-gradient-to-r ${themeConfig.flareColor} pointer-events-none`}
          style={{
            animation: 'lightBeamFlare 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />
      )}

      {/* 5. ON-CLICK VIDEO VFX: Shockwave Ring radiating from Icon */}
      {isVFXActive && (
        <div 
          className={`absolute right-4 top-4 w-10 h-10 rounded-full border-2 ${themeConfig.shockwaveColor} pointer-events-none`}
          style={{
            animation: 'shockwaveRing 0.7s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
          }}
        />
      )}

      {/* 6. ON-CLICK VIDEO VFX: Bursting Currency Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute right-6 top-6 text-xs sm:text-sm font-black pointer-events-none select-none z-30 drop-shadow-md"
          style={{
            '--dx': p.dx,
            '--dy': p.dy,
            '--rot': p.rot,
            animation: 'coinBurst 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            color: p.color,
          } as React.CSSProperties}
        >
          {p.label}
        </span>
      ))}

      {/* FOREGROUND CARD CONTENT */}
      <div className="relative z-10">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-semibold text-slate-300 drop-shadow-sm flex items-center gap-1.5">
            {title}
          </span>

          {/* Interactive Clickable Video Icon Button */}
          <button
            type="button"
            onClick={triggerVFX}
            className={`relative p-2 rounded-xl border transition-all duration-300 shadow-md ${
              isVFXActive
                ? `${themeConfig.activeIconBox} scale-125 rotate-[360deg]`
                : `${themeConfig.iconBox} group-hover:scale-110 group-hover:rotate-6`
            }`}
            title="Video effekt bilan bosish"
          >
            {icon}
          </button>
        </div>

        <div className="flex items-baseline gap-2 mt-1.5">
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight drop-shadow-md">
            {amount}
          </div>
          <span className={`font-bold text-xs font-mono drop-shadow-sm ${badgeColorClass}`}>
            {badgeText}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 border-t border-slate-800/80 pt-2">
          <span className="text-slate-400">{subLabel}</span>
          <span className={`font-semibold font-mono ${subValueColorClass}`}>
            {subValue}
          </span>
        </div>
      </div>
    </div>
  );
};
