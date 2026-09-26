import React from 'react';

interface TradeBackgroundProps {
  activeTab: 'export' | 'import' | 'logistics';
  bgStyle?: 'palace' | 'routes' | 'grid';
}

export const TradeBackground: React.FC<TradeBackgroundProps> = ({
  activeTab,
  bgStyle = 'palace',
}) => {
  const isExport = activeTab === 'export';
  const isLogistics = activeTab === 'logistics';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Deep Base Canvas */}
      <div className="absolute inset-0 bg-[#070b14]" />

      {/* 2. The User's Classical Grand Stock Exchange & Hologram Trading Hall Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img
          src="/trade_bg.jpg"
          alt="Trade Exchange Background"
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            bgStyle === 'palace'
              ? 'opacity-65 scale-100 filter brightness-90 contrast-110'
              : bgStyle === 'routes'
              ? 'opacity-35 scale-102 filter brightness-75'
              : 'opacity-20 scale-100 filter brightness-50'
          }`}
        />
        {/* Subtle golden ambient accent light echoing the chandelier and chart lines */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80 mix-blend-multiply" />
      </div>

      {/* 3. Dynamic Ambient Glow Gradients (Adapts to Export vs Import Tab) */}
      <div
        className={`absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000 ${
          isExport
            ? 'bg-gradient-to-tr from-emerald-600/35 via-teal-500/25 to-transparent opacity-75'
            : isLogistics
            ? 'bg-gradient-to-tr from-indigo-600/40 via-blue-500/30 to-transparent opacity-80'
            : 'bg-gradient-to-tr from-rose-600/40 via-amber-500/30 to-transparent opacity-80'
        }`}
      />
      <div
        className={`absolute top-1/4 -right-32 w-[550px] h-[550px] rounded-full blur-[150px] transition-all duration-1000 ${
          isExport
            ? 'bg-gradient-to-bl from-teal-500/25 via-emerald-500/15 to-transparent opacity-65'
            : isLogistics
            ? 'bg-gradient-to-bl from-blue-600/35 via-indigo-600/20 to-transparent opacity-70'
            : 'bg-gradient-to-bl from-rose-600/35 via-red-600/20 to-transparent opacity-70'
        }`}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-[650px] h-[650px] rounded-full blur-[170px] bg-gradient-to-t from-amber-500/10 via-yellow-600/10 to-transparent opacity-50"
      />

      {/* 4. Subtle Technical Dot Matrix & Coordinates Grid */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.5) 1px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px, 144px 144px, 144px 144px',
        }}
      />

      {/* 5. Additional Global Logistics Arcs when 'routes' mode is active */}
      {bgStyle === 'routes' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-45 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="exportRouteGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="importRouteGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Logistics Corridors */}
          <path
            d="M 680 340 Q 420 180 180 220"
            fill="none"
            stroke={isExport ? "url(#exportRouteGrad2)" : "url(#importRouteGrad2)"}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="animate-pulse"
          />
          <path
            d="M 680 340 Q 520 120 380 90"
            fill="none"
            stroke={isExport ? "url(#exportRouteGrad2)" : "url(#importRouteGrad2)"}
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <path
            d="M 680 340 Q 940 260 1180 360"
            fill="none"
            stroke={isExport ? "url(#exportRouteGrad2)" : "url(#importRouteGrad2)"}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          <path
            d="M 680 340 Q 640 520 590 680"
            fill="none"
            stroke={isExport ? "url(#exportRouteGrad2)" : "url(#importRouteGrad2)"}
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />

          {/* Tashkent Central Hub */}
          <g transform="translate(680, 340)">
            <circle r="12" fill={isExport ? "#10b981" : "#f43f5e"} opacity="0.2" />
            <circle r="6" fill={isExport ? "#10b981" : "#f43f5e"} opacity="0.5" />
            <circle r="2.5" fill="#ffffff" />
            <text x="10" y="4" fill="#cbd5e1" fontSize="10" fontFamily="monospace" fontWeight="600">
              HUB: TAS (41°N, 69°E)
            </text>
          </g>
        </svg>
      )}

      {/* 6. Precision Edge Vignette for Top Notch UI Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70 pointer-events-none" />
    </div>
  );
};
