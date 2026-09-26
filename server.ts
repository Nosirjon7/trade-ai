import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { EXPORT_PRODUCTS, IMPORT_PRODUCTS } from './src/data/tradeData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `
Sen "TradeSmart AI" platformasining bosh B2B Eksport-Import maslahatchisi, xalqaro savdo iqtisodchisi va bojxona ekspertisan.
Sening asosiy vazifang:
1. O'zbekiston va Markaziy Osiyo tadbirkorlari, fermerlari va logistika agentlariga eksport bozorlarini ochish va import o'rnini bosuvchi ishlab chiqarishlarni rag'batlantirish.
2. Aniq faktlar, TIF TN (HS) kodlari, real bojxona stavkalari (GSP+, MDH erkin savdo shartnomasi, nol stavkali kvotalar) bilan javob berish.
3. 4 ta asosiy yo'nalishda chuqur yordam berish:
   - Mavsumiy tahlil: Hozirgi oy va mavsumga qarab qaysi davlatga (Rossiya, Xitoy, Germaniya/EI, BAA, Turkiya, Qozog'iston) qanday tovar eksport qilish eng yuqori marja beradi.
   - Qadam-baqadam sertifikatlar va hujjatlar: ST-1 kelib chiqish sertifikati, O'zbekiston O'simliklar karantini va himoyasi agentligidan Fitosanitariya, GlobalG.A.P., Halal, ISO 22000, Yevropa uchun GSP+ REX tizimi ro'yxati, Bojxona yuk deklaratsiyasi (BYuD/GTD), CMR va TIR Carnet.
   - Moliyaviy Kalkulyator: Masalan "10 tonna olma Rossiyaga" yoki "50 tonna pomidor BAAga" so'ralganda aniq xarajatlar strukturasi (xarid, saralash, qadoqlash/gofrotara, refrijerator fura transporti, bojxona va yo'qotish xatari) va sof foyda hisobi.
   - Importni pasaytirish bo'yicha konsalting (Qizil Hudud tovarlari): Keskin oshayotgan import mahsulotlarini (masalan gofrokarton, avto filtrlari, polimer blister, sintetik ip) O'zbekistonda ishlab chiqarish uchun: zarur xom-ashyo manbalari, zarur stanoklar (Xitoy/Turkiya uskunalarining narxi), investitsiya hajmi, o'zini qoplash muddati va davlat berayotgan soliq imtiyozlari.

Muloqot tili: O'zbek tili (lotin alifbosida). Uslub: professional, ishonchli, raqamlar va aniq formulalar bilan boyitilgan, biznesga yo'naltirilgan. Javoblarni chiroyli formatlash (bullet points, jadvallar, qalin sarlavhalar) bilan taqdim et.
`;

// Helper fallback generator if GEMINI_API_KEY is not configured
function generateRuleBasedConsultation(query: string, mode?: string, activeProduct?: any): string {
  const q = query.toLowerCase();

  if (mode === 'calculator' || q.includes('tonna') || q.includes('hisob') || q.includes('kalkulyator')) {
    const tons = q.match(/\d+/)?.[0] || '10';
    const volume = parseInt(tons, 10);
    const costPerKg = 0.50;
    const sellPerKg = 1.25;
    const gross = volume * 1000 * sellPerKg;
    const purchase = volume * 1000 * costPerKg;
    const packaging = volume * 1000 * 0.08;
    const transport = volume * 1000 * 0.22; // ~2200$ for 10t
    const customs = 250;
    const loss = gross * 0.03;
    const totalCost = purchase + packaging + transport + customs + loss;
    const netProfit = gross - totalCost;
    const roi = ((netProfit / totalCost) * 100).toFixed(1);

    return `### 📊 TradeSmart AI: Eksport Moliyaviy Tahlili (${volume} tonna)

**1. Daromad Prognozi:**
* Eksport hajmi: **${volume} tonna** (${volume * 1000} kg)
* O'rtacha sotish narxi (Tashqi bozor): **$${sellPerKg.toFixed(2)} / kg**
* **Kutilayotgan yalpi tushum:** **$${gross.toLocaleString()}**

**2. Xarajatlar Strukturasi:**
* Mahsulot xarid qiymati ($${costPerKg}/kg): **$${purchase.toLocaleString()}**
* Eksport qadoqlash (5 qatlamli gofrotara, burchakliklar): **$${packaging.toLocaleString()}**
* Xalqaro logistika (Refrijerator fura, harorat nazorati): **$${transport.toLocaleString()}**
* Bojxona rasmiylashtiruvi va sertifikatlar (ST-1, Fito): **$${customs.toLocaleString()}**
* Tranzit davridagi tabiiy yo'qotish xatari (3%): **$${loss.toLocaleString()}**
* **Jami operatsion xarajat:** **$${Math.round(totalCost).toLocaleString()}**

---
### 💰 Kutilayotgan Sof Foyda: **$${Math.round(netProfit).toLocaleString()}**
📈 **Rentabellik (ROI):** **${roi}%**
⚖️ **Zararsizlik narxi (Break-even):** **$${(totalCost / (volume * 1000)).toFixed(2)} / kg**

> **Tavsiya:** MDH davlatlariga erkin savdo shartnomasi bo'yicha 0% boj bilan kiring. Transportni oldindan bron qiling (mavsumda fura narxi 15-20% ga oshadi).`;
  }

  if (q.includes('kurs') || q.includes('valyuta') || q.includes('dollar') || q.includes('spot') || q.includes('birja') || q.includes('radar') || q.includes('navbat')) {
    return `### 💱 Kunlik Savdo Radari & Spot Tahlili

**1. Markaziy Bankning Rasmiy Valyuta Kurslari:**
* 🇺🇸 **1 USD = 12,825.40 UZS** (+14.80 so'm, ▲ +0.12%)
* 🇪🇺 **1 EUR = 13,945.20 UZS** (-21.40 so'm, ▼ -0.15%)
* 🇷🇺 **1 RUB = 135.20 UZS** (+0.95 so'm, ▲ +0.71%)
* 🇨🇳 **1 CNY = 1,798.60 UZS** (+4.20 so'm, ▲ +0.23%)

**2. Asosiy Bozorlardagi Spot Narxlar:**
* 🍅 **Moskva (Food City) Issiqxona Pomidori:** **$1.48 / kg** (+4.2% o'sish) — talab yuqori, refrijerator jo'natish uchun eng qulay payt!
* 🍇 **Yekaterinburg (Raduga) Uzumi:** **$2.25 / kg** (+2.7%)
* 🍒 **Dubay (Al Aweer) Premium Gilos:** **$5.80 / kg** (Aviayuk)
* ⚙️ **Shanxay/LME Mis Katodi:** **$9,480 / tonna**
* 📱 **Shenchjen AMOLED Displey:** **$17.80 / dona** (-3.2% arzonlashdi, mahalliy ishlab chiqarish uchun tejamkor)

**3. Bojxona Postlaridagi Holat:**
* **Do'stlik (Andijon/Xitoy):** 1.5 soat (Tezkor yashil koridor)
* **Yallama (Shimol/Rossiya):** 3.5 soat (O'rtacha navbat, ~85 fura)
* **G'ishtko'prik:** 5.2 soat (Tirband, yuk furalari Yallamaga yo'naltirilmoqda)

💡 **Eksportchi uchun tavsiya:** Agar Rossiyaga meva-sabzavot jo'natayotgan bo'lsangiz, ST-1 sertifikatini SSP orqali 1 kunda rasmiylashtirib, EPA transport subsidiyasidan 50% gacha mablag'ni qaytarib oling.`;
  }

  if (q.includes('logistika') || q.includes('yo‘l') || q.includes('yol') || q.includes('masofa') || q.includes('fura') || q.includes('marshrut') || q.includes('tranzit')) {
    return `### 🚛 Xalqaro Tranzit Yo‘laklari va Masofalar Tahlili (O‘zbekiston)

**Asosiy Eksport-Import Yo‘nalishlari & Masofalari:**
1. **🇷🇺 Toshkent ➔ Moskva (Food City):** **3,380 km** | ⏱️ 5-7 kun | Refrijerator fura: ~$4,500 (1 kg ga ~$0.22). Meva-sabzavot va trikotaj eksportining asosiy arteriyasi.
2. **🇨🇳 Andijon/Toshkent ➔ Qashg‘ar / Shenchjen:** **1,420 - 5,650 km** | ⏱️ 3-6 kun (Qashg‘ar) / 14-16 kun (Shenchjen). Smartfon, noutbuk, mikrosxema va stanoklar importining 85% i shu yo‘ldan keladi.
3. **🇹🇷 Toshkent ➔ Istanbul (O‘rta Yo‘lak):** **4,120 km** | ⏱️ 9-12 kun | Kaspiy dengizi paromi orqali. To‘qimachilik eksporti va polimer/furnitura importi.
4. **🇪🇺 Toshkent ➔ Varshava / Frankfurt:** **4,850 - 5,420 km** | ⏱️ 11-15 kun | GSP+ 0% boj tizimi.
5. **🇵🇰 Termez ➔ Peshovar / Karachi dengiz porti:** **2,450 km** | ⏱️ 4-6 kun | Dengizga chiqishning eng qisqa va arzon tranzit yo‘li (Fura: ~$2,600).

💡 **Davlat Subsidiyasi:** Eksportni rag‘batlantirish agentligi (EPA) orqali transport xarajatlarining **50% gacha miqdori** tadbirkorga qaytarib to‘lab beriladi!`;
  }

  if (mode === 'certs' || q.includes('sertifikat') || q.includes('st-1') || q.includes('hujjat') || q.includes('bojxona')) {
    return `### 📜 Qadam-baqadam Eksport Hujjatlari va Sertifikatlar Yo'riqnomasi

Mahsulotni xalqaro bozorga muvaffaqiyatli chiqarish uchun quyidagi hujjatlar paketi talab etiladi:

**1-Bosqich: Mahsulotning kelib chiqishi va xavfsizligi:**
* **ST-1 Sertifikati:** Savdo-sanoat palatasi (SSP) yoki uning mintaqaviy bo'linmalari orqali rasmiylashtiriladi. MDH davlatlarida **0% bojxona boji** imtiyozini beradi.
* **Fitosanitariya sertifikati:** O'simliklar karantini va himoyasi agentligi tomonidan tekshirilib beriladi.
* **GSP+ REX Ro'yxati:** Yevropa Ittifoqiga 0% boj bilan eksport qilish uchun eksportchi tizimda ro'yxatdan o'tadi (Declaration on Origin).
* **GlobalG.A.P. / ISO 22000:** Premium supermarketlar (EI, BAA) uchun talab qilinadigan xalqaro audit sertifikati.

**2-Bosqich: Tijoriy va Transport Hujjatlari:**
* **Tashqi savdo shartnomasi (Kontrakt):** "Yagona darcha" (singlewindow.uz) tizimiga kiritiladi.
* **Invoys (Hisob-faktura):** TIF TN kodi, narx va Inkoterms (FCA, CPT, DAP) ko'rsatiladi.
* **CMR (Xalqaro tovar-transport yuk xati) va TIR Carnet:** Yuk tashuvchi haydovchi tomonidan to'ldiriladi.

**3-Bosqich: Bojxona Rasmiylashtiruvi:**
* **Bojxona yuk deklaratsiyasi (BYuD):** Bojxona brokeri orqali "E-Bojxona" tizimida "Eksport 10" rejimida ochiladi.`;
  }

  if (mode === 'substitution' || q.includes('import') || q.includes('ishlab chiqarish') || q.includes('biznes-reja') || q.includes('qizil') || q.includes('telefon') || q.includes('noutbuk') || q.includes('chip') || q.includes('mikrosxema')) {
    if (q.includes('telefon') || q.includes('smartfon')) {
      return `### 📱 Import O‘rnini Bosish: Smartfon va Aloqa Qurilmalari Yig‘uv Klasteri

**Mahsulot:** Smartfonlar (TIF TN: 8517 13 000 0)
Mamlakat yillik importi: **$780.0 Mln** (4.2+ mln dona telefon, o‘sish: **+25.4%** — Qizil Hudud!)
Asosiy import davlatlari: **Xitoy (77%)**, **Vyetnam (20%)**, **Hindiston (1.7%)**, **Janubiy Koreya (1.3%)**.

**1. Mahalliylashtirish Yo‘li (SKD / CKD Yig‘ish):**
* Korpus qoliplari (plastik/alyuminiy), qadoqlash qutilari va himoya oynalarini mahalliy ishlab chiqarish.
* Ekran, batareya va prosessor modullarini 0% boj bilan keltirib, toza xona (Cleanroom Class 10000) sharoitida yig‘ish.

**2. Kerakli Uskunalar va Investitsiya:**
* **Avtomatlashtirilgan SKD/CKD yig‘uv liniyasi:** $800,000 - $1,100,000
* **RF/5G va GSM signal testlash stansiyasi (Rohde & Schwarz):** $350,000
* **Lazer gravirovka va avtomat qadoqlash apparati:** $180,000
* **Jami kutilayotgan CAPEX:** **~$1,800,000** (quvvati: 50,000 dona/oy).

**3. Iqtisodiy Samaradorlik:**
* Import qilingan analogiga nisbatan **18-22% arzonroq** tannarx.
* **O‘zini qoplash muddati:** **16-18 oy**.
* **Davlat imtiyozi:** Butlovchi qismlarga 0% boj, IMEI ro‘yxatga olishda mahalliy ishlab chiqaruvchiga preferensiya va Texnopark soliq imtiyozlari.`;
    }

    if (q.includes('noutbuk') || q.includes('kompyuter')) {
      return `### 💻 Import O‘rnini Bosish: Noutbuklar va Shaxsiy Kompyuterlar Ishlab Chiqarish

**Mahsulot:** Portativ noutbuklar (TIF TN: 8471 30 000 0)
Mamlakat yillik importi: **$336.0 Mln** (O‘zbekiston dunyoda 64-o‘rinda, o‘sish: **+31.8%**)
Asosiy importyorlar: **Xitoy ($144M, 43%)**, **Yaponiya ($30.7M)**, **Chexiya ($29M)**, **BAA ($27M)**, **AQSh ($25.8M)**.

**1. Ishlab chiqarish Model (OEM / ODM Assembler):**
* Korpus shtamplash va klaviatura bosmasini mahalliylashtirish.
* SSD, RAM va CPU chiplarini 0% bojxona boji bilan olib kelish.

**2. Uskunalar va Investitsiya:**
* **Robotlashtirilgan ESD noutbuk montaj konveyeri:** $650,000
* **Termal kamera va stress-test stendi (Burn-in Chamber):** $220,000
* **Avtomatik BIOS va OT yozish uskunalari:** $120,000
* **Jami kutilayotgan CAPEX:** **~$1,200,000**.

**3. Bozor Imkoniyati va Imtiyozlar:**
* Davlat xaridlarida mahalliy mahsulotga **15% narx preferensiyasi**.
* Maktablar va OTMlar uchun kafolatlangan davlat buyurtmalari.
* **Qoplanish:** **14-16 oy**.`;
    }

    if (q.includes('chip') || q.includes('mikrosxema') || q.includes('plata') || q.includes('pcb')) {
      return `### 🔬 Import O‘rnini Bosish: Mikrosxemalar, Chiplar va PCB Platalari

**Mahsulot:** Integral mikrosxemalar va chiplar (TIF TN: 8542 31) & PCB (8534 00)
Mamlakat yillik importi: **$340.0 Mln** (Chiplar) + **$125.0 Mln** (Platalar)
Asosiy davlatlar: **Xitoy (98% chiplar, 82% platalar)**, **AQSh ($2.1M)**, **Janubiy Koreya (11%)**, **Turkiya**.

**1. Nega talab o‘ta yuqori:**
* UzAuto Motors (Onix, Tracker) avtomobillarining ECU va datchiklari.
* ASKUE aqlli elektr va gaz hisoblagichlari.
* Humo, Uzcard bank kartalari va SIM-kartalar (Ohangaron Infineon loyihasi).

**2. SMT Liniyasi va PCB Ishlab Chiqarish Investitsiyasi:**
* **Panasonic / Fuji yuqori tezlikdagi SMT montaj liniyasi:** $1,200,000 - $1,500,000
* **AOI optik va rentgen (X-Ray) sifat nazorati:** $280,000
* **Ko‘p qatlamli PCB platalari lazer burg‘ulash kompleksi:** $450,000
* **Jami CAPEX:** **~$2,400,000**.

**3. Davlat Dasturi:**
* Ohangarondagi mikroelektronika klasterida 10 yilga soliqdan ozodlik.
* O‘zeltexsanoat jamg‘armasidan subsidiyalar va mahalliy avtozavodlarga to‘g‘ridan-to‘g‘ri ofset shartnomalar.`;
    }

    return `### 🏭 Import O'rnini Bosish: Mahalliy Ishlab Chiqarish Mini Biznes-Rejasi

**Tanlangan yo'nalish:** Gofrokarton va eksport qadoqlash idishlari (TIF TN: 4819 10)
Mamlakat yillik importi: **$94.5 Mln** (O'sish: **+48.6%** — Qizil Hudud)

**1. Xom-ashyo Bazasi (Mahalliy mavjudlik: 85%):**
* Ikkilamchi qog'oz chiqindilari (makulatura) va Angren/Toshkent qog'oz kombinatlari xom-ashyosi.
* Kraxmal yelimi va suvli bo'yoqlar mahalliy kimyo zavodlarida mavjud.

**2. Kerakli Uskunalar va Investitsiya:**
* **5 qatlamli avtomatlashtirilgan gofroliniya:** $180,000 - $220,000 (Xitoy/Turkiya)
* **4 rangli flekso-bosma va kesish stanoqi (Slotter):** $75,000 - $90,000
* **Avtomatik yelimlash-qadoqlash stansiyasi:** $40,000
* **Boshlang'ich aylanma mablag' va bino tayyorlash:** $60,000
* **Jami kutilayotgan CAPEX:** **~$370,000**

**3. Iqtisodiy Samaradorlik:**
* Ishlab chiqarish tannarxi: import qilingan qutiga qaraganda **28-35% arzon**.
* Kutilayotgan oylik sof tushum: **$25,000 - $35,000**.
* **Loyihaning o'zini qoplash muddati:** **14-16 oy**.

**4. Davlat Imtiyozlari va Subsidiyalar:**
* Uskunalar keltirishda bojxona boji va QQS to'lovlariga imtiyozlar mavjud.
* Yangi ishlab chiqaruvchilarga 3 yilgacha yer va mulk solig'i imtiyozi beriladi.`;
  }

  return `### 🌍 TradeSmart AI Savdo Tahlili

Savolingiz bo'yicha tavsiyalar:
* **Hozirgi mavsum imkoniyatlari:** Qishloq xo'jaligi mahsulotlari (olma, uzum, issiqxona sabzavotlari) bo'yicha Rossiya va Qozog'istonda talab juda yuqori.
* **Yevropa Ittifoqiga eksport (GSP+):** To'qimachilik (trikotaj kiyimlari, ip-kalava) va quritilgan mevalarga (mayiz, yong'oq) **0% stavkali bojxona rejimi** amal qilmoqda.
* **Import tahlili:** Qadoqlash idishlari, avtomobil filtrlari va blister plyonkalari mamlakatga juda katta hajmda import bo'lmoqda. Bularni o'zimizda ishlab chiqarish yuqori rentabellikka ega.

Menga to'g'ridan-to'g'ri:
1. *"15 tonna gilos Xitoyga qancha sof foyda keltiradi?"*
2. *"GSP+ sertifikatini qanday olaman?"*
3. *"Gofrokarton ishlab chiqarish rejasini ber"*
deb yozishingiz mumkin!`;
}

// POST /api/chat - AI Consultant with RAG Context & Gemini Flash
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], mode = 'general', userProfile, activeProduct } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Xabar matni talab qilinadi.' });
    }

    // Context augmentation (RAG)
    let contextPrompt = `Foydalanuvchi profili:
Ism: ${userProfile?.name || 'Tadbirkor'}
Kompaniya: ${userProfile?.companyName || 'Eksport korxonasi'}
Rol: ${userProfile?.role || 'TADBIRKOR'}
Yo'nalish: ${userProfile?.focusArea || 'Qishloq xo‘jaligi'}
Tanlangan rejim: ${mode}
`;

    if (activeProduct) {
      contextPrompt += `\nAktiv ko'rilayotgan mahsulot:
Nomi: ${activeProduct.name}
TIF TN (HS) kodi: ${activeProduct.hsCode}
Kategoriya: ${activeProduct.categoryNameUz || activeProduct.category}
Xarid/Ichki narx: $${activeProduct.avgDomesticPrice || 0}
Sotish/Tashqi narx: $${activeProduct.avgExportPrice || activeProduct.importVolumeUsd || 0}
`;
    }

    if (ai) {
      const chatContents = [
        {
          role: 'user',
          parts: [
            {
              text: `${contextPrompt}\n\nFoydalanuvchi savoli: ${message}`,
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: chatContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || generateRuleBasedConsultation(message, mode, activeProduct);
      return res.json({ text: replyText, mode });
    } else {
      // Offline / fallback response
      const replyText = generateRuleBasedConsultation(message, mode, activeProduct);
      return res.json({ text: replyText, mode });
    }
  } catch (error: any) {
    console.error('Chat error:', error);
    const fallbackText = generateRuleBasedConsultation(req.body.message || '', req.body.mode, req.body.activeProduct);
    return res.json({ text: fallbackText, mode: req.body.mode || 'general' });
  }
});

// POST /api/calculator - Dynamic Export Profit Calculation
app.post('/api/calculator', (req, res) => {
  try {
    const {
      productName = 'Eksport tovari',
      destinationCountry = 'Rossiya',
      volumeTons = 10,
      purchasePricePerKg = 0.50,
      sellingPricePerKg = 1.25,
      packagingCostPerKg = 0.08,
      transportTotal = 2200,
      customsAndDocsCost = 300,
      lossPercent = 3,
    } = req.body;

    const totalWeightKg = volumeTons * 1000;
    const grossRevenue = totalWeightKg * sellingPricePerKg;
    const purchaseCostTotal = totalWeightKg * purchasePricePerKg;
    const packagingCostTotal = totalWeightKg * packagingCostPerKg;
    const lossRiskCostTotal = grossRevenue * (lossPercent / 100);
    const transportCostTotal = Number(transportTotal);
    const customsCostTotal = Number(customsAndDocsCost);

    const totalInvestment = purchaseCostTotal + packagingCostTotal + transportCostTotal + customsCostTotal + lossRiskCostTotal;
    const netProfit = grossRevenue - totalInvestment;
    const profitMarginPercent = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;
    const breakevenPricePerKg = totalWeightKg > 0 ? totalInvestment / totalWeightKg : 0;

    const recommendations = [];
    if (profitMarginPercent > 30) {
      recommendations.push('Juda yuqori marja! Yuklash grafigini tezlashtirish tavsiya etiladi.');
    } else if (profitMarginPercent > 15) {
      recommendations.push('Barqaror sog‘lom marja. Qadoqlash sifatini nazorat qiling.');
    } else {
      recommendations.push('Xatarli marja. Transport yoki xarid narxini 10% tushirish choralarini ko‘ring.');
    }

    if (destinationCountry.toLowerCase().includes('rossiya') || destinationCountry.toLowerCase().includes('qozog')) {
      recommendations.push('MDH Erkin Savdo shartnomasi bo‘yicha ST-1 sertifikatini oling (Boj 0%).');
    }

    return res.json({
      productName,
      destinationCountry,
      volumeTons,
      purchaseCostTotal,
      packagingCostTotal,
      transportCostTotal,
      customsCostTotal,
      lossRiskCostTotal,
      totalInvestment,
      grossRevenue,
      netProfit,
      profitMarginPercent: Number(profitMarginPercent.toFixed(1)),
      breakevenPricePerKg: Number(breakevenPricePerKg.toFixed(2)),
      recommendations,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/export-products
app.get('/api/export-products', (req, res) => {
  res.json({ products: EXPORT_PRODUCTS });
});

// GET /api/import-products
app.get('/api/import-products', (req, res) => {
  res.json({ products: IMPORT_PRODUCTS });
});

// Development vs Production serving
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`TradeSmart AI Server running on port ${port}`);
});
