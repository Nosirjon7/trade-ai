import React from 'react';
import { 
  TrendingUp, 
  Globe2, 
  ArrowUpRight, 
  ShieldCheck, 
  UserCircle2, 
  Building2, 
  Sparkles,
  Calculator,
  Menu,
  FileText,
  Landmark,
  Truck,
  Compass
} from 'lucide-react';
import { UserProfile, UserRole } from '../types/trade';

interface HeaderProps {
  userProfile: UserProfile;
  onOpenOnboarding: () => void;
  onOpenCalculator: () => void;
  onOpenMenu: () => void;
  onOpenDocuments?: () => void;
  onOpenSubsidies?: () => void;
  onOpenLogistics?: () => void;
  activeTab: 'export' | 'import';
  setActiveTab: (tab: 'export' | 'import') => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onOpenOnboarding,
  onOpenCalculator,
  onOpenMenu,
  onOpenDocuments,
  onOpenSubsidies,
  activeTab,
  setActiveTab,
}) => {
  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'TADBIRKOR': return 'Tadbirkor / Ishlab chiqaruvchi';
      case 'FERMER': return 'Fermer / Agro-eksportchi';
      case 'LOGISTIKA_AGENTI': return 'Logistika agenti / Broker';
      default: return 'Foydalanuvchi';
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'TADBIRKOR': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'FERMER': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'LOGISTIKA_AGENTI': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 shadow-md shadow-emerald-500/20 ring-1 ring-white/20 flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  TradeSmart <span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  B2B OS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block leading-none mt-0.5">Eksport-Import Balansi</p>
            </div>
          </div>

          {/* Navigation Module Switcher: 2 Main Sections (Eksport va Import) */}
          <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === 'export'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>1: Eksport Katalogi</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-emerald-400/20 text-emerald-300">
                GSP+
              </span>
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === 'import'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md shadow-rose-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>2: Import & Qizil Hudud</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 animate-pulse">
                Signal
              </span>
            </button>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2">
            {onOpenDocuments && (
              <button
                onClick={onOpenDocuments}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Eksport hujjatlari va sertifikatlar"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Hujjatlar</span>
              </button>
            )}

            {onOpenSubsidies && (
              <button
                onClick={onOpenSubsidies}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Davlat subsidiyalari va imtiyozlar"
              >
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Subsidiyalar</span>
              </button>
            )}

            <button
              onClick={onOpenCalculator}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kalkulyator</span>
            </button>

            {/* Profile badge with click to change role */}
            <button
              onClick={onOpenOnboarding}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all text-left group"
              title="Profil va rolni o‘zgartirish"
            >
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform flex-shrink-0">
                <UserCircle2 className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                  {userProfile.name}
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-[9px] font-medium px-1 rounded border ${getRoleColor(userProfile.role)}`}>
                    {getRoleLabel(userProfile.role).split('/')[0]}
                  </span>
                </div>
              </div>
            </button>

            {/* All-in-one Menyu Button */}
            <button
              onClick={onOpenMenu}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-slate-900 hover:from-emerald-600/30 hover:to-slate-800 border border-emerald-500/40 text-emerald-300 hover:text-white shadow-sm transition-all cursor-pointer group"
              title="Barcha bo‘limlar va menyuni ochish"
            >
              <Menu className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Menyu</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar (Faqat 2 Asosiy Savdo Bo'limi) */}
        <div className="md:hidden flex items-center justify-center pb-2 gap-2">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'export'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>1: Eksport</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'import'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>2: Import & Qizil Hudud</span>
          </button>
        </div>

      </div>
    </header>
  );
};
