import React, { useState, useEffect } from 'react';
import { ExportProduct } from '../types/trade';
import { X, Play, Pause, RotateCcw, ShieldCheck, CheckCircle2, Factory, Sparkles, Truck, Globe2, Award } from 'lucide-react';

interface CreativeVideoModalProps {
  product: ExportProduct | null;
  onClose: () => void;
  onAskAIAboutProduct?: (product: ExportProduct) => void;
}

export const CreativeVideoModal: React.FC<CreativeVideoModalProps> = ({
  product,
  onClose,
  onAskAIAboutProduct,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 10 seconds
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!product) return;
    setCurrentTime(0);
    setIsPlaying(true);
  }, [product]);

  useEffect(() => {
    if (!isPlaying || !product) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev >= 9.8 ? 0 : Number((prev + 0.1).toFixed(1));
        // calculate step: 0-2.5s (Step 0), 2.5-5s (Step 1), 5-7.5s (Step 2), 7.5-10s (Step 3)
        if (next < 2.5) setCurrentStep(0);
        else if (next < 5.0) setCurrentStep(1);
        else if (next < 7.5) setCurrentStep(2);
        else setCurrentStep(3);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, product]);

  if (!product) return null;

  const isTextile = product.category === 'TEXTILE' || product.name.toLowerCase().includes('ip') || product.name.toLowerCase().includes('paxta');
  const isFood = product.category === 'FOOD_PROCESSING' || product.name.toLowerCase().includes('mayiz') || product.name.toLowerCase().includes('kishmish');
  const isAgri = product.category === 'AGRICULTURE' || product.name.toLowerCase().includes('gilos') || product.name.toLowerCase().includes('pomidor') || product.name.toLowerCase().includes('qovun');
  const isMetallurgy = product.category === 'INDUSTRIAL' || product.name.toLowerCase().includes('mis');
  const isChemical = product.category === 'CHEMICALS' || product.name.toLowerCase().includes('polietilen');

  // Category-specific production story & telemetry
  const story = (() => {
    if (isTextile) {
      return {
        categoryTitle: 'To‘qimachilik & Yengil Sanoat',
        badge: '🧵 To‘quv Dastgohi & Ip Yigirish 4K',
        videoName: 'Paxtadan Premium Ip-kalava To‘qilishi (Ne 30/1 Ring-Spun)',
        ambientColor: 'from-blue-600/30 via-cyan-600/20 to-slate-950',
        steps: [
          { title: '1. Oliy Navli Paxta Tolasi', desc: 'O‘zbekiston dalalaridan 1-navli uzun tolali paxta qabuli va tarash sexiga uzatish.', time: '0:00 - 0:02' },
          { title: '2. Ring-Spun Ip Yigirish', desc: '1200 rpm tezlikdagi Shveysariya texnologiyasi asosida nozik ip-kalava hosil qilish.', time: '0:03 - 0:05' },
          { title: '3. Elektron Sifat & Tukdorlik', desc: 'Uster Tester orqali ipning mustahkamligi va bir xillik tekshiruvi (OEKO-TEX Standard 100).', time: '0:05 - 0:07' },
          { title: '4. Yevropa va Turkiyaga Yuklash', desc: 'GSP+ 0% boj sertifikati bilan Germaniya va Turkiya to‘qimachilik fabrikalariga eksport.', time: '0:07 - 0:10' },
        ],
        telemetry: [
          { label: 'Uskuna', val: 'Rieter / Schlafhorst' },
          { label: 'Tezlik', val: '1,200 rpm' },
          { label: 'Sertifikat', val: 'OEKO-TEX 100 / ISO 9001' },
          { label: 'Standart', val: 'GSP+ 0% Boj' }
        ]
      };
    }
    if (isFood) {
      return {
        categoryTitle: 'Oziq-ovqat Sanoati & Qayta Ishlash',
        badge: '🍇 Quyoshda Quritish & Optik Saralash',
        videoName: 'Samarqand Qora Kishmish va Mayizini Tabiiy Saralash Jarayoni',
        ambientColor: 'from-amber-600/30 via-yellow-600/20 to-slate-950',
        steps: [
          { title: '1. Oltin Uzumzorlar Hosili', desc: 'Samarqand va Farg‘ona vodiysi quyoshida yetilgan shirin qora kishmish terimi.', time: '0:00 - 0:02' },
          { title: '2. Tabiiy Quyoshda Quritish', desc: 'Hech qanday oltingugurtsiz (SO2 free) tabiiy quyosh nurida quritish maydonlari.', time: '0:03 - 0:05' },
          { title: '3. Lazerli Optik Saralash', desc: 'Bühler Sortex optik saralagichi orqali 12mm+ kalibrdagi Jumbo mayizlarni ajratish.', time: '0:05 - 0:07' },
          { title: '4. Yevropa Ittifoqiga Eksport', desc: 'Organik ekologik qadoqda Niderlandiya va Germaniya qandolatchilariga yetkazish.', time: '0:07 - 0:10' },
        ],
        telemetry: [
          { label: 'Namlik', val: '14.0% Optimal' },
          { label: 'Kalibr', val: 'Jumbo 12mm+' },
          { label: 'Sertifikat', val: 'HACCP / ISO 22000' },
          { label: 'Boj stavkasi', val: 'EI 0% (GSP+)' }
        ]
      };
    }
    if (isAgri) {
      return {
        categoryTitle: 'Qishloq Xo‘jaligi & Meva-Sabzavot',
        badge: '🍒 Bog‘ Terimi & Gidro-Sovutish (+2°C)',
        videoName: 'Eksportbop Yangi Gilos (28+ mm) va Pushti Pomidor Sovuq Zanjiri',
        ambientColor: 'from-emerald-600/30 via-teal-600/20 to-slate-950',
        steps: [
          { title: '1. Tonggi Bog‘ Terimi', desc: 'Tong soat 05:00 da mevaning shirinlik va tarovatini saqlagan holda qo‘lda terish.', time: '0:00 - 0:02' },
          { title: '2. Hydrocooling Shok Sovutish', desc: '+1°C muzdek suvli dush orqali mevaning ichki haroratini 8 daqiqada +2°C ga tushirish.', time: '0:03 - 0:05' },
          { title: '3. Optik Hajm Saralash (28+ mm)', desc: 'Kompyuterlashtirilgan saralash liniyasi orqali diametri 28+ mm premium giloslarni ajratish.', time: '0:05 - 0:07' },
          { title: '4. Xitoy & Dubayga Avia Charter', desc: 'Refrijerator konteynerlar va avia kargo orqali 24 soat ichida jahon peshtaxtalariga.', time: '0:07 - 0:10' },
        ],
        telemetry: [
          { label: 'Sovuq zanjir', val: '+2°C Gidro-dush' },
          { label: 'Diametr', val: '28+ mm Premium' },
          { label: 'Sertifikat', val: 'GlobalG.A.P. / Fitonazorat' },
          { label: 'Eksport tezligi', val: 'Avia Charter 24-48 soat' }
        ]
      };
    }
    if (isMetallurgy) {
      return {
        categoryTitle: 'Og‘ir Sanoat & Metallurgiya',
        badge: '⚡ 1085°C Mis Eritish & Katod Sexi',
        videoName: 'OKMK 99.99% Sof Mis Katodi (LME Grade A) Ishlab Chiqarish',
        ambientColor: 'from-orange-600/30 via-red-600/20 to-slate-950',
        steps: [
          { title: '1. Qalmoqqir Koni Ruda Boyitish', desc: 'Mis rudasini maydalash va flotatsiya orqali konsentrat olish.', time: '0:00 - 0:02' },
          { title: '2. Kislorodli Qaynoq Pech (1085°C)', desc: 'Piro-metallurgik eritish orqali xom anoddar quyish jarayoni.', time: '0:03 - 0:05' },
          { title: '3. Elektrolitik Tozalash Sexi', desc: 'Elektroliz vannalarida 99.99% lik sof Cu katodlarni hosil qilish.', time: '0:05 - 0:07' },
          { title: '4. London Birjasiga (LME) Chiqish', desc: 'Turkiya, Xitoy va Sharqiy Yevropa elektrotexnika gigantlariga jo‘natish.', time: '0:07 - 0:10' },
        ],
        telemetry: [
          { label: 'Soflik', val: '99.99% Cu' },
          { label: 'Standart', val: 'LME Grade A (London)' },
          { label: 'Harorat', val: '1,085°C' },
          { label: 'Boj', val: '0% MDH & Turkiya' }
        ]
      };
    }
    return {
      categoryTitle: 'Kimyo & Polimer Sanoati',
      badge: '🔬 Polimer Ekstruziyasi & Granulalar',
      videoName: 'Sho‘rtan / Ustyurt GKM Polietilen Granulasi (HDPE) Sexi',
      ambientColor: 'from-indigo-600/30 via-blue-600/20 to-slate-950',
      steps: [
        { title: '1. Tabiiy Gaz Polimerizatsiyasi', desc: 'Etan gazini piroliz qilib etilen monomerlarini ajratish.', time: '0:00 - 0:02' },
        { title: '2. Yuqori Zichlikli Ekstruziya', desc: 'Katalizator yordamida HDPE zanjirlarini polimerlash va issiq qoliplash.', time: '0:03 - 0:05' },
        { title: '3. Granulyatsiya va Sovutish', desc: 'Suv osti aylanma pichoqlari orqali bir xil o‘lchamdagi granulalarni kesish.', time: '0:05 - 0:07' },
        { title: '4. Eksport Big-Bag Qadoqlash', desc: '1000 kg lik namlik o‘tkazmaydigan qadoqlarda MDH va Turkiyaga jo‘natish.', time: '0:07 - 0:10' },
      ],
      telemetry: [
        { label: 'Marka', val: 'HDPE F-0120' },
        { label: 'Zichlik', val: '0.952 g/cm³' },
        { label: 'Sertifikat', val: 'ISO 9001 / REACH' },
        { label: 'Boj imtiyozi', val: '0% MDH FTA' }
      ]
    };
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Factory className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  {story.categoryTitle}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  LIVE 4K REEL
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                {product.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas & Reel Area */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          
          {/* Main Cinematic Visual */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover select-none"
            style={{
              animation: isPlaying ? 'cinematicVideoMotion 9.5s ease-in-out infinite' : 'none',
            }}
          />

          {/* Category Accent Aura */}
          <div className={`absolute inset-0 bg-gradient-to-t ${story.ambientColor} pointer-events-none`} />

          {/* Cinematic Scanning Flare */}
          <div
            className="absolute inset-y-0 w-44 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            style={{ animation: isPlaying ? 'videoLightSweep 9.5s ease-in-out infinite' : 'none' }}
          />

          {/* Current Step Overlay Card */}
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 shadow-2xl z-20">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {story.steps[currentStep].title}
              </span>
              <span className="font-mono text-slate-400">{story.steps[currentStep].time}</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {story.steps[currentStep].desc}
            </p>
          </div>

          {/* Live Video Telemetry HUD (Right Side) */}
          <div className="hidden sm:flex flex-col gap-2 absolute top-4 right-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-xs shadow-xl z-20">
            <span className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider border-b border-slate-800 pb-1">
              Texnik Parametrlar
            </span>
            {story.telemetry.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 text-[11px]">
                <span className="text-slate-400">{t.label}:</span>
                <span className="font-mono font-bold text-white">{t.val}</span>
              </div>
            ))}
          </div>

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20 flex flex-col gap-2">
            
            {/* Progress Bar (0 to 10s) */}
            <div className="relative w-full h-1.5 rounded-full bg-slate-800 overflow-hidden cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-100"
                style={{ width: `${(currentTime / 10) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentTime(0);
                    setCurrentStep(0);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Qaytadan boshlash"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-emerald-400">
                  0:0{Math.floor(currentTime)} / 0:10
                </span>
                <span className="hidden sm:inline-block text-[11px] text-slate-400">
                  {story.badge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  TIF TN: {product.hsCode}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Production Milestones Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/60 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {story.steps.map((st, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentStep(i);
                setCurrentTime(i * 2.5);
              }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                currentStep === i
                  ? 'bg-emerald-950/50 border-emerald-500/60 ring-1 ring-emerald-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-white truncate">{st.title.split('.')[1] || st.title}</span>
                {currentStep > i ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">{st.time}</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Xalqaro sertifikatlar: {product.requiredCerts.slice(0, 2).join(', ')}</span>
          </div>

          <div className="flex items-center gap-2">
            {onAskAIAboutProduct && (
              <button
                onClick={() => {
                  onClose();
                  onAskAIAboutProduct(product);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
              >
                AI Tahlilini olish
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-950/30"
            >
              Yopish
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
