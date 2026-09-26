import React from 'react';
import { 
  X, 
  Globe2, 
  ArrowUpRight, 
  Calculator, 
  Sparkles, 
  FileText, 
  Landmark, 
  BarChart3, 
  UserCircle2, 
  Share2, 
  Check, 
  Palette, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  HelpCircle,
  Truck,
  Compass
} from 'lucide-react';
import { UserProfile, UserRole } from '../types/trade';

interface NavigationMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  activeTab: 'export' | 'import';
  setActiveTab: (tab: 'export' | 'import') => void;
  onOpenCalculator: () => void;
  onOpenOnboarding: () => void;
  onOpenDocuments: () => void;
  onOpenSubsidies: () => void;
  onOpenLogistics: () => void;
  onTriggerAIChat: (prompt: string, mode: string) => void;
  bgStyle: 'palace' | 'routes' | 'grid';
  setBgStyle: (style: 'palace' | 'routes' | 'grid') => void;
}

export const NavigationMenuDrawer: React.FC<NavigationMenuDrawerProps> = ({
  isOpen,
  onClose,
  userProfile,
  activeTab,
  setActiveTab,
  onOpenCalculator,
  onOpenOnboarding,
  onOpenDocuments,
  onOpenSubsidies,
  onOpenLogistics,
  onTriggerAIChat,
  bgStyle,
  setBgStyle,
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'TADBIRKOR': return 'Tadbirkor / Ishlab chiqaruvchi';
      case 'FERMER': return 'Fermer / Agro-eksportchi';
      case 'LOGISTIKA_AGENTI': return 'Logistika agenti / Broker';
      default: return 'Foydalanuvchi';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content panel */}
      <div 
        className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full z-10 overflow-hidden transform transition-transform ease-out duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-1.5">
                TradeSmart <span className="text-emerald-400">AI</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
                  Menyu
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Tashqi Savdo & Mahalliylashtirish OS</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Profile Card */}
        <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              <UserCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{userProfile.name}</div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {getRoleLabel(userProfile.role).split('/')[0]} • {userProfile.companyName}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              onOpenOnboarding();
              onClose();
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all"
          >
            O‘zgartirish
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* 1. Asosiy Savdo Bo‘limlari (Faqat Eksport va Import) */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Asosiy Savdo Bo‘limlari
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('export');
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
                  activeTab === 'export'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">1-Bo‘lim: Eksport Katalogi</div>
                    <div className="text-[10px] text-slate-400">GSP+ imtiyozlari va xalqaro bozorlar</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('import');
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
                  activeTab === 'import'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>2-Bo‘lim: Import & "Qizil Hudud"</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/30 text-rose-300">
                        Top
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">Smartfon, noutbuk, chiplar & mahalliylashtirish</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* 2. Xalqaro Logistika & Tranzit Yo‘laklari (Menyuda alohida bo'lim) */}
          <div>
            <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Xalqaro Logistika & Tranzit</span>
            </div>
            <button
              onClick={() => {
                onOpenLogistics();
                onClose();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/40 hover:from-indigo-900/60 border border-indigo-500/40 text-slate-200 hover:text-white transition-all text-left shadow-lg group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center group-hover:scale-105 transition-transform border border-indigo-500/30">
                  <Compass className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Yo‘l Xaritasi & Masofalar</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300 font-mono">
                      Xarita
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Moskva, Xitoy, Turkiya, Karachi tranzit yo‘llari & EPA 50% subsidiyasi
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 2. Tahlil va Moliyaviy Asboblar */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Tahlil & Hisob-kitob Asboblari
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  onOpenCalculator();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-slate-300 hover:bg-slate-800/60 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Bojxona & Marja Kalkulyatori</div>
                    <div className="text-[10px] text-slate-400">Boj, QQS, transport va sof foyda hisobi</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => {
                  onTriggerAIChat('Menga O‘zbekiston tashqi savdo tahlili va eng yuqori daromadli eksport/import imkoniyatlari haqida to‘liq ma’lumot ber.', 'general');
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-slate-300 hover:bg-slate-800/60 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Smart AI Tahlilchi va Chatbot</div>
                    <div className="text-[10px] text-slate-400">Biznes-reja tuzish va savol-javob</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* 3. Rasmiy Hujjatlar va Davlat Yordami */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Hujjatlar & Davlat Dasturlari
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  onOpenDocuments();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-slate-300 hover:bg-slate-800/60 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Eksport Hujjatlari & Sertifikatlar</div>
                    <div className="text-[10px] text-slate-400">ST-1, Fitosanitariya, Kontrakt, CMR</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => {
                  onOpenSubsidies();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-slate-300 hover:bg-slate-800/60 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>Davlat Subsidiyalari & Imtiyozlar</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300">
                        50%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">EPA transport subsidiyasi, soliq imtiyozlari</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* 4. Fon ko'rinishi sozlamasi */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Orqa Fon Ko‘rinishi</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setBgStyle('palace')}
                className={`p-2 rounded-xl text-center transition-all ${
                  bgStyle === 'palace'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'bg-slate-950/50 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <div className="text-base mb-0.5">🏛️</div>
                <div className="text-[10px] font-semibold">Birja Saroyi</div>
              </button>

              <button
                onClick={() => setBgStyle('routes')}
                className={`p-2 rounded-xl text-center transition-all ${
                  bgStyle === 'routes'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                    : 'bg-slate-950/50 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <div className="text-base mb-0.5">🌐</div>
                <div className="text-[10px] font-semibold">Logistika</div>
              </button>

              <button
                onClick={() => setBgStyle('grid')}
                className={`p-2 rounded-xl text-center transition-all ${
                  bgStyle === 'grid'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm'
                    : 'bg-slate-950/50 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <div className="text-base mb-0.5">📐</div>
                <div className="text-[10px] font-semibold">Texnik Grid</div>
              </button>
            </div>
          </div>

          {/* 5. Ommaviy Havola Ulashish (Share Public App) */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ommaviy Havola (Share)</span>
              </div>
              <div className="text-[10px] text-slate-400">Hamkorlar va investorlar bilan ulashing</div>
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Nusxalandi!</span>
                </>
              ) : (
                <span>Havolani olish</span>
              )}
            </button>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 text-center">
          <div className="text-[11px] text-slate-400 font-medium">
            TradeSmart AI • O‘zbekiston Tashqi Savdo Platformasi
          </div>
          <div className="text-[10px] text-slate-600 mt-0.5">
            Versiya 2.5 Pro • Barcha ma’lumotlar davlat bojxona standartida
          </div>
        </div>

      </div>
    </div>
  );
};
