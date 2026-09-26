import React, { useState } from 'react';
import { 
  Building2, 
  UserCircle2, 
  Sparkles, 
  X, 
  Check, 
  Sprout, 
  Briefcase, 
  Truck, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserProfile, UserRole, ProductCategory } from '../types/trade';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<UserProfile>({ ...userProfile });

  const roleOptions: { role: UserRole; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      role: 'TADBIRKOR',
      title: 'Tadbirkor / Ishlab chiqaruvchi',
      desc: 'Mahalliy mahsulotlarni eksportga chiqarish yoki import o‘rnini bosuvchi yangi ishlab chiqarish ochish.',
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
    },
    {
      role: 'FERMER',
      title: 'Fermer / Agro-eksportchi',
      desc: 'Meva-sabzavot, gilos, olma, uzum yetishtiruvchi, sovuq ombor egalari va qishloq xo‘jaligi eksportchilari.',
      icon: <Sprout className="w-5 h-5 text-emerald-400" />,
    },
    {
      role: 'LOGISTIKA_AGENTI',
      title: 'Logistika agenti / Bojxona brokeri',
      desc: 'Refrijerator yuk mashinalari, temir yo‘l, ST-1 va Fitosanitariya rasmiylashtiruvi bo‘yicha xizmatlar.',
      icon: <Truck className="w-5 h-5 text-amber-400" />,
    },
  ];

  const categoryOptions: { key: ProductCategory; label: string }[] = [
    { key: 'AGRICULTURE', label: '🌾 Qishloq xo‘jaligi (Ho‘l meva-sabzavot)' },
    { key: 'TEXTILE', label: '🧵 To‘qimachilik va tayyor kiyim-kechak' },
    { key: 'FOOD_PROCESSING', label: '🥫 Oziq-ovqat va qayta ishlash sanoati' },
    { key: 'INDUSTRIAL', label: '⚙️ Sanoat, qadoqlash va metallurgiya' },
    { key: 'CHEMICALS', label: '🧪 Kimyo, polimer va o‘g‘itlar' },
    { key: 'PHARMACEUTICAL', label: '💊 Farmatsevtika va tibbiyot vositalari' },
  ];

  const regions = [
    'Toshkent shahri',
    'Toshkent viloyati',
    'Farg‘ona viloyati',
    'Andijon viloyati',
    'Namangan viloyati',
    'Samarqand viloyati',
    'Buxoro viloyati',
    'Qashqadaryo viloyati',
    'Surxondaryo viloyati',
    'Xorazm viloyati',
    'Navoiy viloyati',
    'Jizzax viloyati',
    'Sirdaryo viloyati',
    'Qoraqalpog‘iston Respublikasi',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header decoration */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <UserCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Foydalanuvchi Profili va Rol Tanlash
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  Onboarding
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                O‘z biznes profilingizni belgilang, AI sizga mos eksport va import takliflarini saralaydi.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Role Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Platformadagi asosiy rolingizni tanlang:
            </label>
            <div className="grid grid-cols-1 gap-3">
              {roleOptions.map((opt) => {
                const isSelected = formData.role === opt.role;
                return (
                  <div
                    key={opt.role}
                    onClick={() => setFormData({ ...formData, role: opt.role })}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-950/50 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 mt-0.5">
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {opt.title}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: User and Company Details */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              2. Shaxsiy va korxona ma'lumotlari:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">To‘liq ismingiz</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masalan: Alisher Qodirov"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Elektron pochta</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.uz"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Korxona nomi (MChJ / XK / Fermer xo‘jaligi)</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder='"Global Agro Export" MChJ'
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Joylashgan viloyatingiz</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Priority Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              3. Asosiy qiziqish yo‘nalishingiz:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categoryOptions.map((cat) => {
                const isSelected = formData.focusArea === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setFormData({ ...formData, focusArea: cat.key })}
                    className={`px-3.5 py-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
            >
              <span>Saqlash va Boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
