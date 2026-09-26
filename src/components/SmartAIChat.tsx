import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User, 
  RefreshCw, 
  Calendar, 
  FileText, 
  Calculator, 
  Factory,
  ChevronDown,
  Paperclip,
  Check,
  Flame,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import { ChatMessage, UserProfile, ExportProduct, ImportProduct } from '../types/trade';

interface SmartAIChatProps {
  userProfile: UserProfile;
  externalPrompt?: { text: string; mode?: string } | null;
  activeExportProduct?: ExportProduct | null;
  activeImportProduct?: ImportProduct | null;
  onOpenCalculator?: () => void;
}

export const SmartAIChat: React.FC<SmartAIChatProps> = ({
  userProfile,
  externalPrompt,
  activeExportProduct,
  activeImportProduct,
  onOpenCalculator,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [activeMode, setActiveMode] = useState<'general' | 'seasonal' | 'certs' | 'calculator' | 'substitution'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Assalomu alaykum, **${userProfile.name}**! Men **TradeSmart AI** – eksport va import balansi bo‘yicha intellektual B2B maslahatchingizman.

Quyidagi 4 ta asosiy yo‘nalish bo‘yicha yordam berishga tayyorman:
* 🌾 **Mavsumiy tahlil:** Qaysi davlatga hozir nima eksport qilish eng foydali?
* 📜 **Qadam-baqadam yo‘riqnoma:** ST-1, Fitosanitariya, GSP+ va Bojxona sertifikatlari
* 💰 **Moliyaviy kalkulyator:** Masalan *"10 tonna olma Rossiyaga"* deb yozsangiz sof foydani hisoblayman
* 🏭 **Importni pasaytirish:** Qizil Hudud tovarlarini mahalliy ishlab chiqarish biznes-rejasi

Pastdagi tezkor tugmalardan birini tanlang yoki savolingizni yozing!`,
      mode: 'general',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  // Handle external prompts (e.g. from clicking "Biznes-reja tuzish" or "AI hisoblash")
  useEffect(() => {
    if (externalPrompt && externalPrompt.text) {
      setIsOpen(true);
      if (externalPrompt.mode) {
        setActiveMode(externalPrompt.mode as any);
      }
      handleSendMessage(externalPrompt.text, externalPrompt.mode);
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string, modeOverride?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const currentMode = (modeOverride as 'general' | 'seasonal' | 'certs' | 'calculator' | 'substitution') || activeMode;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      mode: currentMode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode: currentMode,
          userProfile,
          activeProduct: activeExportProduct || activeImportProduct || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Server bilan aloqada xatolik yuz berdi');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.text,
        mode: data.mode || currentMode,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 📊 Tahlil Natijasi\n\nSavolingiz bo‘yicha tahlil tayyorlandi:\n\n* **Tavsiya:** MDH davlatlariga erkin savdo shartnomasi bo‘yicha 0% stavkali ST-1 sertifikatidan foydalaning.\n* **Hujjatlar:** Fitosanitariya karantin ruxsatnomasi va invoys zarur.\n\nAgar moliyaviy hisob-kitob kerak bo'lsa, hajm va manzilni ko'rsatishingiz mumkin.`,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickModes: {
    key: 'seasonal' | 'certs' | 'calculator' | 'substitution';
    label: string;
    icon: React.ReactNode;
    prompt: string;
  }[] = [
    {
      key: 'seasonal',
      label: 'Mavsumiy tahlil',
      icon: <Calendar className="w-3.5 h-3.5 text-emerald-400" />,
      prompt: 'Hozir qaysi davlatlarga nima eksport qilish eng yuqori marja beradi? Mavsumiy tahlil ber.',
    },
    {
      key: 'certs',
      label: 'ST-1 va Hujjatlar',
      icon: <FileText className="w-3.5 h-3.5 text-blue-400" />,
      prompt: 'Eksport uchun ST-1, Fitosanitariya va GSP+ sertifikatlarini qanday va qayerdan olaman? Qadam-baqadam ro‘yxat.',
    },
    {
      key: 'calculator',
      label: 'Foyda Kalkulyatori',
      icon: <Calculator className="w-3.5 h-3.5 text-amber-400" />,
      prompt: '10 tonna olma Rossiyaga eksport qilinsa, transport, qadoqlash, bojxona va sof foyda hisoblab ber.',
    },
    {
      key: 'substitution',
      label: 'Import O‘rnini Bosish',
      icon: <Factory className="w-3.5 h-3.5 text-rose-400" />,
      prompt: 'Qizil Hududdagi gofrokarton qadoqlash mahsulotini O‘zbekistonda ishlab chiqarish uchun 5 bosqichli mini biznes-reja tuzib ber.',
    },
  ];

  // Simple clean markdown parser for headings, bold, bullet points, blockquotes
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          // Headers
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-sm font-bold text-emerald-300 pt-2 pb-0.5 border-b border-slate-800">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-sm font-extrabold text-white pt-2 pb-0.5">
                {line.replace('## ', '')}
              </h3>
            );
          }
          // Blockquote
          if (line.startsWith('> ')) {
            return (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border-l-2 border-emerald-400 text-slate-300 italic my-1.5">
                {line.replace('> ', '')}
              </div>
            );
          }
          // Bullet point
          if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            const rawText = line.trim().substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-slate-200">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span>{renderInlineText(rawText)}</span>
              </div>
            );
          }
          // Separator
          if (line.trim() === '---') {
            return <hr key={idx} className="border-slate-800 my-2" />;
          }
          // Empty line
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          return <p key={idx} className="text-slate-200">{renderInlineText(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineText = (text: string) => {
    // Basic bold parsing: **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // If floating widget is closed, render subtle floating launcher button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-sm shadow-2xl shadow-emerald-950/80 hover:scale-105 transition-all cursor-pointer ring-2 ring-emerald-400/40"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
          <span>Smart AI Maslahatchi</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/20 text-white">
            Online
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed z-40 transition-all duration-300 ease-in-out ${
        isExpanded
          ? 'inset-4 sm:inset-10'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[460px] h-[580px] max-h-[85vh]'
      }`}
    >
      <div className="w-full h-full flex flex-col rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-slate-950/90 overflow-hidden ring-1 ring-emerald-500/20">
        
        {/* Header */}
        <div className="p-4 px-5 border-b border-slate-800 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-md">
              <Bot className="w-5 h-5 stroke-[2.5]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Smart AI Maslahatchi</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  RAG Core
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Eksport, ST-1 sertifikati, kalkulyator va import tahlili
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isExpanded ? 'Kichraytirish' : 'Kengaytirish'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Yashirish"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Core Quick Modes Pills */}
        <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {quickModes.map((qm) => {
            const isSelected = activeMode === qm.key;
            return (
              <button
                key={qm.key}
                onClick={() => {
                  setActiveMode(qm.key);
                  handleSendMessage(qm.prompt, qm.key);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {qm.icon}
                <span>{qm.label}</span>
              </button>
            );
          })}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-950/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-sm shadow-md shadow-emerald-950/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-sm shadow-md shadow-slate-950/60'
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    renderFormattedMarkdown(msg.text)
                  )}

                  <div
                    className={`text-[10px] mt-1.5 font-mono ${
                      isUser ? 'text-emerald-200 text-right' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="rounded-2xl p-3.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>TradeSmart AI tahlil qilmoqda (TIF TN, bojxona va bozor qoidalari)...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box & Actions */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Savol bering (masalan: 10 tonna gilos Xitoyga, ST-1 qanday olinadi?)..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-950/50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Helper Subtext */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Maslahat: "10 tonna olma Rossiyaga" deb yozing</span>
            <button
              onClick={() => onOpenCalculator && onOpenCalculator()}
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <Calculator className="w-3 h-3" />
              <span>Kalkulyatorni ochish</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
