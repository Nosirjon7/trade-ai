import { TradeCorridor } from '../types/trade';

export interface BorderCrossingPost {
  id: string;
  name: string;
  country: string;
  flag: string;
  type: 'AUTO' | 'RAIL' | 'MIXED';
  location: string;
  dailyCapacityTrucks: number;
  avgWaitHours: number;
  status: 'OPEN_FAST' | 'MODERATE' | 'CONGESTED';
  operatingHours: string;
  keyRoutes: string;
}

export const TRADE_CORRIDORS: TradeCorridor[] = [
  {
    id: 'corridor-north-moscow',
    name: 'Shimoliy Yo‘lak: Toshkent ➔ Moskva (Food City)',
    direction: 'BOTH',
    corridorType: 'NORTH',
    originCity: 'Toshkent / Samarqand',
    originCountry: 'O‘zbekiston',
    originFlag: '🇺🇿',
    destCity: 'Moskva (Raduga / Food City)',
    destCountry: 'Rossiya',
    destFlag: '🇷🇺',
    distanceKm: 3380,
    transitDaysMin: 5,
    transitDaysMax: 7,
    borderPoints: ['Yallama (UZB/KAZ)', 'Jibek Joly', 'Oral / Mashtakovo (KAZ/RUS)'],
    transportModes: ['TRUCK', 'TRAIN'],
    avgCostPerTruckUsd: 4500,
    avgCostPerKgUsd: 0.22,
    stateSubsidyPercent: 50,
    primaryGoods: [
      'Eksport: Yangi gilos, uzum, pomidor, to‘qimachilik trikotaji',
      'Import: Kungaboqar moyi, avtomobil ehtiyot qismlari, metall'
    ],
    keyRisks: ['Qish mavsumida Qozog‘iston dashtlarida qor bo‘ronlari', 'Mashtakovo postida navbatlar'],
    description: 'O‘zbekiston meva-sabzavot va trikotajining eng asosiy va eng katta hajmdagi an’anaviy eksport yo‘li. Yil davomida 25,000+ fura qatnaydi.'
  },
  {
    id: 'corridor-east-china',
    name: 'Sharqiy Yo‘lak: Andijon / Toshkent ➔ Qashg‘ar / Shenchjen',
    direction: 'BOTH',
    corridorType: 'EAST',
    originCity: 'Andijon / Toshkent',
    originCountry: 'O‘zbekiston',
    originFlag: '🇺🇿',
    destCity: 'Qashg‘ar (1,420 km) / Shenchjen (5,650 km)',
    destCountry: 'Xitoy',
    destFlag: '🇨🇳',
    distanceKm: 1420,
    transitDaysMin: 3,
    transitDaysMax: 6,
    borderPoints: ['Do‘stlik (UZB/KGZ)', 'Irkeshtom (KGZ/CHN)', 'Torugart (KGZ/CHN)'],
    transportModes: ['TRUCK', 'TRAIN', 'MULTIMODAL'],
    avgCostPerTruckUsd: 3800,
    avgCostPerKgUsd: 0.25,
    stateSubsidyPercent: 30,
    primaryGoods: [
      'Import: Smartfonlar, noutbuklar, mikrosxemalar, stanoklar, kimyo xom-ashyosi',
      'Eksport: Mis katodlari, paxta ip-kalavasi, quritilgan mevalar'
    ],
    keyRisks: ['Tog‘ dovonlarida balandlik va ob-havo o‘zgaruvchanligi', 'Xitoy bojxona terminallarida tekshiruv'],
    description: 'Xitoy-Qirg‘iziston-O‘zbekiston multimodal tranzit yo‘lagi. Yuqori texnologiya, mikrosxemalar va elektronika importining 85% aynan shu yo‘lak orqali keladi.'
  },
  {
    id: 'corridor-west-turkey',
    name: 'O‘rta Yo‘lak (Middle Corridor): Toshkent ➔ Boku ➔ Istanbul',
    direction: 'BOTH',
    corridorType: 'WEST',
    originCity: 'Toshkent / Buxoro',
    originCountry: 'O‘zbekiston',
    originFlag: '🇺🇿',
    destCity: 'Istanbul / Mersin Porti',
    destCountry: 'Turkiya',
    destFlag: '🇹🇷',
    distanceKm: 4120,
    transitDaysMin: 9,
    transitDaysMax: 12,
    borderPoints: ['Farab (UZB/TKM)', 'Turkmanboshi porti (Kaspiy paromi)', 'Alat (AZE)', 'Sarpi (GEO/TUR)'],
    transportModes: ['TRUCK', 'TRAIN', 'MULTIMODAL'],
    avgCostPerTruckUsd: 5200,
    avgCostPerKgUsd: 0.28,
    stateSubsidyPercent: 50,
    primaryGoods: [
      'Eksport: To‘qimachilik iplari, xurmo, mis simlar, charm',
      'Import: Mebel furnituralari, tomchilatib sug‘orish uskunalar, polimerlar'
    ],
    keyRisks: ['Kaspiy dengizida shamolli mavsumda parom kechikishi (1-2 kun)'],
    description: 'Kaspiy dengizi orqali Yevropa va Turkiyani bog‘lovchi eng istiqbolli xalqaro yo‘lak. "Transkaspiy" xalqaro transport marshruti.'
  },
  {
    id: 'corridor-west-europe',
    name: 'GSP+ Yevropa Yo‘lagi: Toshkent ➔ Varshava / Frankfurt',
    direction: 'EXPORT',
    corridorType: 'WEST',
    originCity: 'Toshkent / Farg‘ona',
    originCountry: 'O‘zbekiston',
    originFlag: '🇺🇿',
    destCity: 'Varshava (Polsha) / Frankfurt (Germaniya)',
    destCountry: 'Yevropa Ittifoqi',
    destFlag: '🇪🇺',
    distanceKm: 4850,
    transitDaysMin: 11,
    transitDaysMax: 15,
    borderPoints: ['Yallama (UZB/KAZ)', 'Brest / Koroszczyn (BLR/POL) yoki Turkiya-Bolgariya'],
    transportModes: ['TRUCK', 'MULTIMODAL'],
    avgCostPerTruckUsd: 6400,
    avgCostPerKgUsd: 0.34,
    stateSubsidyPercent: 50,
    primaryGoods: [
      'Eksport: GSP+ 0% boj bilan organik yong‘oq, mayiz, quritilgan pomidor, ip-gazlama',
      'Import: Yuqori texnologik laboratoriya apparatlari, dori-darmonlar'
    ],
    keyRisks: ['Polsha-Belarus chegarasida ruxsatnoma (Do‘zvol) kvotalari'],
    description: 'Yevropa Ittifoqining 6,200 turdagi mahsulotlariga 0% bojxona boji beruvchi GSP+ dasturidan to‘liq foydalanish yo‘lagi. EPA 50% gacha transport subsidiyasini to‘lab beradi.'
  },
  {
    id: 'corridor-south-pakistan',
    name: 'Transafg‘on Yo‘lagi: Termez ➔ Kobul ➔ Peshovar / Karachi',
    direction: 'BOTH',
    corridorType: 'SOUTH',
    originCity: 'Termez / Toshkent',
    originCountry: 'O‘zbekiston',
    originFlag: '🇺🇿',
    destCity: 'Peshovar (1,820 km) / Karachi Dengiz Porti (2,450 km)',
    destCountry: 'Pokiston / Hind Okeani',
    destFlag: '🇵🇰',
    distanceKm: 2450,
    transitDaysMin: 4,
    transitDaysMax: 7,
    borderPoints: ['Ayritom / Hayraton (UZB/AFG)', 'Torxam (AFG/PAK)'],
    transportModes: ['TRUCK', 'TRAIN'],
    avgCostPerTruckUsd: 2600,
    avgCostPerKgUsd: 0.14,
    stateSubsidyPercent: 50,
    primaryGoods: [
      'Eksport: Dukkakli ekinlar (mosh, no‘xat, loviya), quritilgan mevalar, o‘g‘itlar',
      'Import: Sitrus (mandarin/apelsin), dori-darmonlar, Hindiston tovarlari'
    ],
    keyRisks: ['Afg‘oniston tranzit to‘lovlari va tog‘ yo‘llaridagi xavfsizlik qoidalari'],
    description: 'O‘zbekistonning Hind okeani portlariga (Karachi va Gvadar) chiquvchi eng qisqa va arzon yo‘li. Dengizga chiqish masofasini 3 barobarga qisqartiradi.'
  },
  {
    id: 'corridor-south-gulf',
    name: 'Fors Ko‘rfazi Yo‘lagi: Toshkent ➔ Bandar-Abbos ➔ Dubay (Jebel Ali)',
    direction: 'BOTH',
    corridorType: 'SOUTH',
    originCity: 'Toshkent / Samarqand',
    originCountry: 'O‘zbekiston',
    originFlag: '🇺🇿',
    destCity: 'Bandar-Abbos (Eron) ➔ Dubay (BAA)',
    destCountry: 'BAA / Fors ko‘rfazi',
    destFlag: '🇦🇪',
    distanceKm: 2750,
    transitDaysMin: 6,
    transitDaysMax: 8,
    borderPoints: ['Sarakhs (TKM/IRN)', 'Bandar-Abbos dengiz porti (Fider parom)'],
    transportModes: ['TRUCK', 'MULTIMODAL'],
    avgCostPerTruckUsd: 3400,
    avgCostPerKgUsd: 0.18,
    stateSubsidyPercent: 50,
    primaryGoods: [
      'Eksport: Premium gilos, qovun, to‘qimachilik, shirinliklar',
      'Import: Elektronika, qayta ishlangan oziq-ovqat, polimer blister plyonkalar'
    ],
    keyRisks: ['Eron orqali tranzitda bank to‘lovlari va sug‘urta talablari'],
    description: 'Dubayning ulkan Jebel Ali erkin zonasiga to‘g‘ridan-to‘g‘ri chiqish yo‘li. Yaqin Sharq bozorlariga yuqori narxda sotish imkoniyati.'
  }
];

export const BORDER_POSTS: BorderCrossingPost[] = [
  {
    id: 'bp-yallama',
    name: 'Yallama (Toshkent viloyati)',
    country: 'Qozog‘iston bilan chegara',
    flag: '🇰🇿',
    type: 'AUTO',
    location: 'Toshkent viloyati, Chinoz tumani',
    dailyCapacityTrucks: 800,
    avgWaitHours: 4,
    status: 'OPEN_FAST',
    operatingHours: '24/7 uzluksiz',
    keyRoutes: 'Rossiya, Yevropa, Qozog‘istonga chiqish asosiy magistral posti'
  },
  {
    id: 'bp-dostlik',
    name: 'Do‘stlik (Andijon)',
    country: 'Qirg‘iziston orqali Xitoyga',
    flag: '🇰🇬',
    type: 'MIXED',
    location: 'Andijon viloyati, Xo‘jaobod tumani',
    dailyCapacityTrucks: 550,
    avgWaitHours: 3,
    status: 'OPEN_FAST',
    operatingHours: '24/7 uzluksiz',
    keyRoutes: 'Xitoy (Irkeshtom/Qashg‘ar) yo‘lagi uchun asosiy o‘tish darvozasi'
  },
  {
    id: 'bp-gishtkoprik',
    name: 'G‘ishtko‘prik / Chernyayevka',
    country: 'Qozog‘iston bilan chegara',
    flag: '🇰🇿',
    type: 'AUTO',
    location: 'Toshkent viloyati, Toshkent tumani',
    dailyCapacityTrucks: 400,
    avgWaitHours: 6,
    status: 'MODERATE',
    operatingHours: '24/7 uzluksiz',
    keyRoutes: 'Tezkor yengil tijoriy yuklar va yo‘lovchi tashish'
  },
  {
    id: 'bp-ayritom',
    name: 'Ayritom / Hayraton',
    country: 'Afg‘oniston orqali Pokiston/Hindistonga',
    flag: '🇦🇫',
    type: 'MIXED',
    location: 'Surxondaryo viloyati, Termez shahri',
    dailyCapacityTrucks: 350,
    avgWaitHours: 3,
    status: 'OPEN_FAST',
    operatingHours: '24/7 uzluksiz',
    keyRoutes: 'Transafg‘on xalqaro temir yo‘li va Karachi dengiz portiga chiqish'
  },
  {
    id: 'bp-alat',
    name: 'Olot (Buxoro viloyati)',
    country: 'Turkmaniston orqali Eron/Turkiyaga',
    flag: '🇹🇲',
    type: 'MIXED',
    location: 'Buxoro viloyati, Olot tumani',
    dailyCapacityTrucks: 450,
    avgWaitHours: 5,
    status: 'MODERATE',
    operatingHours: '24/7 uzluksiz',
    keyRoutes: 'O‘rta yo‘lak, Kaspiy portlari, Eron va Turkiyaga yuk tashish'
  }
];
