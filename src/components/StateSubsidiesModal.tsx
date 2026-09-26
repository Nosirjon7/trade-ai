import React from 'react';
import { 
  X, 
  Landmark, 
  Percent, 
  Truck, 
  Award, 
  Coins, 
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface StateSubsidiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAIAboutSubsidy?: (subsidyTitle: string) => void;
}

export const StateSubsidiesModal: React.FC<StateSubsidiesModalProps> = ({
  isOpen,
  onClose,
  onAskAIAboutSubsidy,
}) => {
  if (!isOpen) return null;

  const subsidies = [
    {
      title: 'Transport Xarajatlarining 50% gacha Kompensatsiyasi',
      agency: 'Eksportni rag‘batlantirish agentligi (EPA)',
      benefit: '50% gacha qaytarib beriladi',
      desc: 'Yangi meva-sabzavot, to‘qimachilik va tayyor sanoat mahsulotlarini temir yo‘l va avtotransportda eksport qilish xarajatlari subsidiya qilinadi.',
      conditions: 'Eksport shartnomasi va bojxona yuk deklaratsiyasi (BYuD) asosida'
    },
    {
      title: 'Xalqaro Sertifikatlashtirish (GlobalG.A.P, ISO, CE) 100% Qoplanishi',
      agency: 'O‘zbekiston Texnik jihatdan tartibga solish agentligi',
      benefit: '100% to‘liq qoplanadi',
      desc: 'Mahalliy mahsulotlarni Yevropa va AQSh bozorlariga chiqarish uchun olingan xalqaro sifat sertifikatlari xarajatlari to‘liq davlat hisobidan to‘lanadi.',
      conditions: 'Sertifikat akkreditatsiyadan o‘tgan xalqaro auditor (SGS, TUV) tomonidan berilgan bo‘lishi lozim'
    },
    {
      title: 'Xorijiy Ko‘rgazma va Yarmarka Stendlari Xarajati',
      agency: 'Savdo-sanoat palatasi va EPA',
      benefit: '100% stend ijarasi',
      desc: 'Germaniya (Fruit Logistica), Dubay (Gulfood), Moskva (WorldFood) kabi xalqaro ko‘rgazmalarda O‘zbekiston milliy stendida bepul ishtirok.',
      conditions: 'Oldindan ariza topshirish va tayyor mahsulot eksportchisi bo‘lish'
    },
    {
      title: 'Elektronika va Texnika Mahalliylashtirish Imtiyozlari',
      agency: 'O‘zeltexsanoat va Iqtisodiyot vazirligi',
      benefit: '0% boj va soliq imtiyozi',
      desc: 'Smartfon, noutbuk, chip va PCB platalari yig‘uvchi korxonalarga butlovchi xom-ashyolar importida bojxona boji 0%, texnopark hududida daromad solig‘i 0%.',
      conditions: 'O‘zeltexsanoat klasteriga a’zolik yoki maxsus iqtisodiy zona rezidentligi'
    },
    {
      title: 'Yevropa Ittifoqining GSP+ Maxsus Preferensiyalar Tizimi',
      agency: 'Yevropa Komissiyasi & Investitsiyalar vazirligi',
      benefit: '6,200 turdagi tovar 0% boj',
      desc: 'O‘zbekiston to‘qimachilik, meva-sabzavot, kimyo va elektrotexnika mahsulotlarini Yevropa Ittifoqi davlatlariga 0% bojxona boji bilan kiritish imkoniyati.',
      conditions: 'EUR.1 yoki REX tizimida kelib chiqish sertifikatini rasmiylashtirish'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Davlat Subsidiyalari va Imtiyozlari Dasturi
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Eksport qiluvchi va import o‘rnini bosuvchi ishlab chiqaruvchilar uchun davlat yordami
            </p>
          </div>
        </div>

        {/* Subsidies list */}
        <div className="space-y-4">
          {subsidies.map((sub, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white">
                    {sub.title}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                    {sub.benefit}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                  {sub.desc}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="text-slate-500">
                    Mas’ul: <strong className="text-slate-300 font-semibold">{sub.agency}</strong>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 italic">
                    Sharti: {sub.conditions}
                  </span>
                </div>
              </div>

              {onAskAIAboutSubsidy && (
                <button
                  onClick={() => {
                    onAskAIAboutSubsidy(sub.title);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 self-start md:self-center whitespace-nowrap"
                >
                  <span>Qo‘llash bo‘yicha AI</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            O‘zbekiston Respublikasi Investitsiyalar va Savdo Vazirligi ma’lumotlari asosida
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Tushundim
          </button>
        </div>
      </div>
    </div>
  );
};
