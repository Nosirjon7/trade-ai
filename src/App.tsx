import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Calculator, 
  Layers, 
  Briefcase,
  Sprout,
  Truck,
  ArrowRight,
  Flame,
  CheckCircle2,
  CircleDollarSign,
  Coins,
  DollarSign,
  ArrowDownRight,
  BadgePercent
} from 'lucide-react';
import { Header } from './components/Header';
import { ExportCatalog } from './components/ExportCatalog';
import { ImportAnalytics } from './components/ImportAnalytics';
import { SmartAIChat } from './components/SmartAIChat';
import { OnboardingModal } from './components/OnboardingModal';
import { FinancialCalculatorModal } from './components/FinancialCalculatorModal';
import { TradeBackground } from './components/TradeBackground';
import { NavigationMenuDrawer } from './components/NavigationMenuDrawer';
import { TradeDocumentsModal } from './components/TradeDocumentsModal';
import { StateSubsidiesModal } from './components/StateSubsidiesModal';
import { LogisticsRoadmapModal } from './components/LogisticsRoadmapModal';
import { DailyTradeRadar } from './components/DailyTradeRadar';
import { CurrencyVideoCard } from './components/CurrencyVideoCard';
import { 
  EXPORT_PRODUCTS, 
  IMPORT_PRODUCTS, 
  INITIAL_USER_PROFILE, 
  TRADE_STATISTICS 
} from './data/tradeData';
import { UserProfile, ExportProduct, ImportProduct } from './types/trade';

export default function App() {
  const [bgStyle, setBgStyle] = useState<'palace' | 'routes' | 'grid'>('palace');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tradesmart_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_USER_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [exportProducts, setExportProducts] = useState<ExportProduct[]>(EXPORT_PRODUCTS);
  const [importProducts, setImportProducts] = useState<ImportProduct[]>(IMPORT_PRODUCTS);
  
  // Modals & Menu Drawer
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isSubsidiesOpen, setIsSubsidiesOpen] = useState(false);
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInitialProduct, setCalcInitialProduct] = useState<ExportProduct | null>(null);

  // External trigger for Floating Smart AI Chat
  const [externalAIPrompt, setExternalAIPrompt] = useState<{ text: string; mode?: string } | null>(null);
  const [activeExportProduct, setActiveExportProduct] = useState<ExportProduct | null>(null);
  const [activeImportProduct, setActiveImportProduct] = useState<ImportProduct | null>(null);

  // Interactive click handler and feedback banner for Macro Cards
  const [macroNotice, setMacroNotice] = useState<string | null>(null);

  const handleMacroCardClick = (_cardId: number, targetTab: 'export' | 'import', notice: string) => {
    setActiveTab(targetTab);
    setMacroNotice(notice);
    setTimeout(() => {
      setMacroNotice((curr) => (curr === notice ? null : curr));
    }, 2400);
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('tradesmart_profile', JSON.stringify(profile));
  };

  const handleSelectProductForCalculator = (product: ExportProduct) => {
    setCalcInitialProduct(product);
    setIsCalculatorOpen(true);
  };

  const handleOpenCalculatorWithName = (name: string) => {
    const found = exportProducts.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      setCalcInitialProduct(found);
    } else {
      setCalcInitialProduct(null);
    }
    setIsCalculatorOpen(true);
  };

  const handleAskAIAboutExportProduct = (product: ExportProduct, mode?: string) => {
    setActiveExportProduct(product);
    setActiveImportProduct(null);

    let prompt = '';
    if (mode === 'certs') {
      prompt = `Menga "${product.name}" (TIF TN: ${product.hsCode}) mahsulotini eksport qilish uchun kerakli sertifikatlar (ST-1, Fitosanitariya, GlobalG.A.P.) va qadam-baqadam hujjatlar ro‘yxatini tayyorlab ber.`;
    } else {
      prompt = `"${product.name}" (TIF TN: ${product.hsCode}) bo‘yicha hozirgi mavsumiy tashqi bozor talabi, narxlar va GSP+ imtiyozlari haqida to‘liq tahlil ber.`;
    }

    setExternalAIPrompt({ text: prompt, mode: mode || 'general' });
  };

  const handleRequestSubstitutionPlan = (product: ImportProduct) => {
    setActiveImportProduct(product);
    setActiveExportProduct(null);

    const prompt = `Qizil Hududdagi tovar: "${product.name}" (TIF TN: ${product.hsCode})
Yillik import: $${(product.importVolumeUsd / 1_000_000).toFixed(1)} Mln (O'sish: +${product.changePercentYear}%).
Menga ushbu mahsulotni O'zbekistonda ishlab chiqarish uchun 5 bosqichli mini biznes-reja tuzib ber:
1. Kerakli xom-ashyo manbalari (mahalliy ulush: ${product.localRawMaterialScore}%)
2. Texnologik uskunalar va stanoklar (Xitoy/Turkiya)
3. Investitsiya qiymati (~$${product.estimatedSetupCapEx}) va o'zini qoplash muddati (~${product.estPaybackMonths} oy)
4. Davlat imtiyozlari va subsidiyalari
5. Kutilayotgan rentabellik va foyda`;

    setExternalAIPrompt({ text: prompt, mode: 'substitution' });
  };

  const handleDirectSendToAIChat = (text: string, mode: string) => {
    setExternalAIPrompt({ text, mode });
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* Dynamic Global Logistics & Ambient Trade Background */}
      <TradeBackground activeTab={activeTab} bgStyle={bgStyle} />

      {/* Foreground Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* App Header */}
        <Header
          userProfile={userProfile}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenCalculator={() => {
            setCalcInitialProduct(null);
            setIsCalculatorOpen(true);
          }}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenDocuments={() => setIsDocumentsOpen(true)}
          onOpenSubsidies={() => setIsSubsidiesOpen(true)}
          onOpenLogistics={() => setIsLogisticsOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Daily Live Trade Radar (Har kunlik o'zgaruvchi valyuta, spot narxlar, navbatlar & signallar) */}
        <section className="animate-in fade-in duration-300">
          <DailyTradeRadar
            onAskAI={(prompt, mode) => handleDirectSendToAIChat(prompt, mode || 'general')}
            onOpenCalculatorWithName={handleOpenCalculatorWithName}
          />
        </section>

        {/* Interactive Floating Feedback Notice on Card Click */}
        {macroNotice && (
          <div className="flex items-center justify-center -mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-950/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>{macroNotice}</span>
            </div>
          </div>
        )}

        {/* Top Macro Trade Balance Banner (Valyutaga oid Video Effekt & Har bir ikonka bosganda VFX portlash effekti) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CurrencyVideoCard
            id={1}
            title="Eksport Valyutasi"
            amount={TRADE_STATISTICS.totalExportUsd}
            badgeText={TRADE_STATISTICS.exportGrowthRate}
            badgeColorClass="text-emerald-400"
            subLabel="Valyuta tushumi:"
            subValue="MDH, Xitoy, EI"
            subValueColorClass="text-emerald-400"
            theme="USD"
            icon={<CircleDollarSign className="w-4 h-4" />}
            onClick={() => handleMacroCardClick(1, 'export', '✨ 1-Bo‘lim: Eksport Katalogi faollashtirildi!')}
          />

          <CurrencyVideoCard
            id={2}
            title="Import Chiqimi"
            amount={TRADE_STATISTICS.totalImportUsd}
            badgeText="+18.2%"
            badgeColorClass="text-rose-400"
            subLabel="Salbiy saldo:"
            subValue={TRADE_STATISTICS.tradeDeficitUsd}
            subValueColorClass="text-rose-400"
            theme="IMPORT"
            icon={<Coins className="w-4 h-4" />}
            onClick={() => handleMacroCardClick(2, 'import', '📉 2-Bo‘lim: Import & Qizil Hudud tahlili faollashtirildi!')}
          />

          <CurrencyVideoCard
            id={3}
            title='"Qizil Hudud" Signallari'
            amount={`${TRADE_STATISTICS.redZoneGoodsCount} tovar`}
            badgeText="Kritik"
            badgeColorClass="text-rose-300"
            subLabel="Tejaladigan valyuta:"
            subValue={TRADE_STATISTICS.redZoneDrainUsd}
            subValueColorClass="text-rose-300"
            theme="RED_ZONE"
            icon={<Flame className="w-4 h-4 animate-pulse" />}
            onClick={() => handleMacroCardClick(3, 'import', '🚨 "Qizil Hudud" import tovarlari ro‘yxati ochildi!')}
          />

          <CurrencyVideoCard
            id={4}
            title="GSP+ 0% Boj Aylanmasi"
            amount={TRADE_STATISTICS.gspPlusVolumeUsd}
            badgeText="0% Tarif"
            badgeColorClass="text-teal-400"
            subLabel="EI bozoriga imtiyoz:"
            subValue="To‘qimachilik, agro"
            subValueColorClass="text-teal-300"
            theme="GSP_EUR"
            icon={<ShieldCheck className="w-4 h-4" />}
            onClick={() => handleMacroCardClick(4, 'export', '🇪🇺 GSP+ Yevropa Ittifoqiga 0% boj imtiyozi tanlandi!')}
          />
        </section>

        {/* Dynamic Section rendering based on activeTab: 1-Bo'lim vs 2-Bo'lim */}
        {activeTab === 'export' ? (
          <section className="animate-in fade-in duration-300">
            <ExportCatalog
              products={exportProducts}
              onSelectForCalculator={handleSelectProductForCalculator}
              onAskAIAboutProduct={handleAskAIAboutExportProduct}
            />
          </section>
        ) : (
          <section className="animate-in fade-in duration-300">
            <ImportAnalytics
              importProducts={importProducts}
              onRequestSubstitutionPlan={handleRequestSubstitutionPlan}
            />
          </section>
        )}

      </main>

      {/* Floating Smart AI Chatbot (Core Anchor at Bottom) */}
      <SmartAIChat
        userProfile={userProfile}
        externalPrompt={externalAIPrompt}
        activeExportProduct={activeExportProduct}
        activeImportProduct={activeImportProduct}
        onOpenCalculator={() => {
          setCalcInitialProduct(null);
          setIsCalculatorOpen(true);
        }}
      />

      {/* Onboarding & Profile Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Financial Net Profit Calculator Modal */}
      <FinancialCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialProduct={calcInitialProduct}
        onSendToAIChat={handleDirectSendToAIChat}
      />

      {/* Main Navigation Menu Drawer */}
      <NavigationMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        userProfile={userProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCalculator={() => {
          setCalcInitialProduct(null);
          setIsCalculatorOpen(true);
        }}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenDocuments={() => setIsDocumentsOpen(true)}
        onOpenSubsidies={() => setIsSubsidiesOpen(true)}
        onOpenLogistics={() => setIsLogisticsOpen(true)}
        onTriggerAIChat={handleDirectSendToAIChat}
        bgStyle={bgStyle}
        setBgStyle={setBgStyle}
      />

      {/* International Logistics & Transit Roadmap Modal */}
      <LogisticsRoadmapModal
        isOpen={isLogisticsOpen}
        onClose={() => setIsLogisticsOpen(false)}
        onAskAIAboutLogistics={(prompt) => handleDirectSendToAIChat(prompt, 'general')}
      />

      {/* Export Trade Documents & Standards Modal */}
      <TradeDocumentsModal
        isOpen={isDocumentsOpen}
        onClose={() => setIsDocumentsOpen(false)}
        onAskAIAboutDoc={(docName) => {
          handleDirectSendToAIChat(`Menga "${docName}" hujjati bo‘yicha to‘liq qo‘llanma ber: qaysi idoradan olinadi, qancha muddat va qancha to‘lov talab etiladi, qanday xatolarga yo‘l qo‘ymaslik kerak?`, 'certs');
        }}
      />

      {/* State Subsidies & Incentives Modal */}
      <StateSubsidiesModal
        isOpen={isSubsidiesOpen}
        onClose={() => setIsSubsidiesOpen(false)}
        onAskAIAboutSubsidy={(subsidyTitle) => {
          handleDirectSendToAIChat(`"${subsidyTitle}" bo‘yicha davlat subsidiya yoki imtiyozini olish shartlari, arizani qayerga topshirish va talab qilinadigan hujjatlar bo‘yicha batafsil yo‘riqnoma ber.`, 'general');
        }}
      />

      {/* Footer & Background Atmosphere Switcher */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TradeSmart AI</span>
            <span className="text-slate-500">— O‘zbekiston va Markaziy Osiyo Eksport-Import B2B Tahlil Platformasi</span>
          </div>

          {/* Background Atmosphere Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
            <span className="text-slate-500 px-2 font-medium">Fon ko‘rinishi:</span>
            <button
              onClick={() => setBgStyle('palace')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                bgStyle === 'palace'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏛️ Birja Saroyi & Gologramma
            </button>
            <button
              onClick={() => setBgStyle('routes')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                bgStyle === 'routes'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🌐 Logistika Yo‘laklari
            </button>
            <button
              onClick={() => setBgStyle('grid')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                bgStyle === 'grid'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📐 Texnik Grid
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>TIF TN / HS</span>
            <span>GSP+ Nizomi</span>
            <span>ST-1 SSP</span>
          </div>
        </div>
      </footer>

      </div>
    </div>
  );
}
