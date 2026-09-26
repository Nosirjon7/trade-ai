import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  Truck,
  Building,
  Scale
} from 'lucide-react';

interface TradeDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAIAboutDoc?: (docName: string) => void;
}

export const TradeDocumentsModal: React.FC<TradeDocumentsModalProps> = ({
  isOpen,
  onClose,
  onAskAIAboutDoc,
}) => {
  if (!isOpen) return null;

  const exportDocs = [
    {
      title: 'Tashqi Savdo Shartnomasi (Kontrakt)',
      org: 'E-Kontrakt (Bojxona YaAT)',
      timing: '1-3 kun',
      desc: 'Inkoterms 2020 (FCA, DAP, CIF) shartlarida tuziladigan rasmiy xalqaro oldi-sotdi shartnomasi.',
      requiredFor: 'Barcha turdagi eksport tovarlari uchun majburiy',
      badge: 'Baza hujjat',
      color: 'blue'
    },
    {
      title: 'ST-1 Ishlab Chiqarilgan Mamlakat Sertifikati',
      org: 'O‘zbekiston Savdo-sanoat palatasi (SSP)',
      timing: '1 ish kuni',
      desc: 'MDH davlatlariga tovar yuborilganda 0% stavkali bojxona boji olish huquqini beruvchi sertifikat.',
      requiredFor: 'Rossiya, Qozog‘iston, Belarus, Ozarbayjon yo‘nalishlari',
      badge: '0% Boj',
      color: 'emerald'
    },
    {
      title: 'Fitosanitariya Sertifikati',
      org: 'O‘simliklar karantini va himoyasi agentligi',
      timing: '24 soat ichida',
      desc: 'Meva-sabzavot, dukkakli ekinlar, yong‘oq va quritilgan mevalar xavfsizligini tasdiqlovchi xalqaro hujjat.',
      requiredFor: 'Barcha qishloq xo‘jaligi mahsulotlari',
      badge: 'Agro majburiy',
      color: 'amber'
    },
    {
      title: 'Tijoriy Invoys (Commercial Invoice) & Packing List',
      org: 'Eksportchi korxona',
      timing: 'Yuklash kuni',
      desc: 'Yukning aniq narxi, TIF TN kodi, sof va brutto og‘irligi, o‘rinlar soni ko‘rsatilgan tovar-hamrohlik hujjati.',
      requiredFor: 'Barcha jo‘natmalar',
      badge: 'Moliyaviy',
      color: 'purple'
    },
    {
      title: 'CMR / Xalqaro Avtomobil Tovar-Transport Yukxati',
      org: 'Xalqaro yuk tashuvchi transport kompaniyasi',
      timing: 'Transport kelganida',
      desc: 'Yuk mashinasi orqali chegaradan o‘tishda haydovchi nomiga rasmiylashtiriladigan transport hujjati.',
      requiredFor: 'Avto-fura orqali eksportda',
      badge: 'Logistika',
      color: 'sky'
    },
    {
      title: 'GlobalG.A.P. & Organic Sertifikati',
      org: 'Xalqaro sertifikatlashtirish idoralari (SGS, TUV)',
      timing: '2-4 hafta',
      desc: 'Yevropa Ittifoqi (Germaniya, Polsha, Latviya) va Buyuk Britaniya yirik supermarketlariga kirish ruxsatnomasi.',
      requiredFor: 'EI bozoriga yuqori narxda sotish uchun',
      badge: 'GSP+ imtiyozi',
      color: 'emerald'
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
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Eksport Hujjatlari va Sertifikatlar Ro‘yxati
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              O‘zbekistondan tovar olib chiqish uchun talab qilinadigan barcha ruxsatnomalar va rasmiy hujjatlar
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3 mb-6">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-200 leading-relaxed">
            <span className="font-semibold text-white">Eslatma:</span> O‘zbekiston Respublikasi Prezidentining Farmoniga muvofiq, 
            qishloq xo‘jaligi va to‘qimachilik mahsulotlarini eksport qilishda <strong>100% oldindan to‘lov talabi bekor qilingan</strong>, 
            shuningdek eksport qiluvchilarga xalqaro sertifikat olish xarajatlarining <strong>100% davlat tomonidan qoplab beriladi</strong>.
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportDocs.map((doc, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-white leading-snug">
                    {doc.title}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                    {doc.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  {doc.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  <span className="text-slate-500 block">Beruvchi organ:</span>
                  <span className="text-slate-300 font-medium">{doc.org}</span>
                </div>
                {onAskAIAboutDoc && (
                  <button
                    onClick={() => {
                      onAskAIAboutDoc(doc.title);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors font-medium flex items-center gap-1"
                  >
                    <span>AI dan so‘rash</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Savdo-sanoat palatasi va Bojxona qo‘mitasi standartlari asosida
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
