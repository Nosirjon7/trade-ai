import { ExportProduct, ImportProduct, UserProfile } from '../types/trade';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-901',
  name: 'Alisher Qodirov',
  email: 'alisher@agro-export.uz',
  companyName: '"Tashkent Agro Global" MChJ',
  role: 'TADBIRKOR',
  focusArea: 'AGRICULTURE',
  region: 'Toshkent viloyati',
};

export const EXPORT_PRODUCTS: ExportProduct[] = [
  {
    id: 'exp-1',
    hsCode: '0808 10',
    name: 'Yangi saralangan olma (Golden & Gala)',
    nameEn: 'Fresh Apples (Golden & Gala)',
    category: 'AGRICULTURE',
    categoryNameUz: 'Qishloq xo‘jaligi',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    description: 'Zamonaviy refrijerator omborlarida saqlangan, kalibrlangan va eksport sifatiga mos 1-navli olma.',
    unit: 'kg',
    avgDomesticPrice: 0.45,
    avgExportPrice: 1.15,
    annualVolumeTons: 145000,
    growthRatePercent: 24.5,
    isSeasonal: true,
    peakMonths: ['Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr', 'Yanvar', 'Fevral'],
    gspPlusEligible: true,
    cisFtaEligible: true,
    requiredCerts: ['ST-1 Sertifikati', 'Fitosanitariya sertifikati', 'GlobalG.A.P.', 'Muvofiqlik sertifikati'],
    targetMarkets: [
      {
        countryName: 'Rossiya Federatsiyasi',
        countryCode: 'RU',
        flag: '🇷🇺',
        importTariffDuty: 0,
        marketDemandLevel: 'Juda Yuqori',
        avgPriceInCountry: 1.25,
        logisticsDays: 5,
        optimalTransport: 'Refrijerator avto (TIR)',
        gspPlusValid: false,
      },
      {
        countryName: 'Qozog‘iston',
        countryCode: 'KZ',
        flag: '🇰🇿',
        importTariffDuty: 0,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 0.95,
        logisticsDays: 2,
        optimalTransport: 'Avto yuk mashinasi',
        gspPlusValid: false,
      },
      {
        countryName: 'Birlashgan Arab Amirliklari',
        countryCode: 'AE',
        flag: '🇦🇪',
        importTariffDuty: 5,
        marketDemandLevel: 'O‘sib boruvchi',
        avgPriceInCountry: 1.85,
        logisticsDays: 7,
        optimalTransport: 'Kombinatsiyalangan (Bandar Abbos orqali)',
        gspPlusValid: false,
      },
      {
        countryName: 'Germaniya (EI)',
        countryCode: 'DE',
        flag: '🇩🇪',
        importTariffDuty: 0,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 2.10,
        logisticsDays: 10,
        optimalTransport: 'Avto TIR / Polsha tranzit',
        gspPlusValid: true,
      }
    ]
  },
  {
    id: 'exp-2',
    hsCode: '0809 29',
    name: 'Eksportbop yangi gilos (Sweet Cherry 28+ mm)',
    nameEn: 'Fresh Sweet Cherries',
    category: 'AGRICULTURE',
    categoryNameUz: 'Qishloq xo‘jaligi',
    imageUrl: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=600&auto=format&fit=crop&q=80',
    description: 'Gidro-sovutilgan (Hydrocooling), qattiq po‘stli, shirin va hajm 28+ mm bo‘lgan premium eksport gilosi.',
    unit: 'kg',
    avgDomesticPrice: 1.80,
    avgExportPrice: 4.50,
    annualVolumeTons: 62000,
    growthRatePercent: 32.1,
    isSeasonal: true,
    peakMonths: ['May', 'Iyun'],
    gspPlusEligible: true,
    cisFtaEligible: true,
    requiredCerts: ['Fitosanitariya sertifikati', 'ST-1', 'GlobalG.A.P.', 'Fumigatsiya dalolatnomasi'],
    targetMarkets: [
      {
        countryName: 'Xitoy Xalq Respublikasi',
        countryCode: 'CN',
        flag: '🇨🇳',
        importTariffDuty: 0,
        marketDemandLevel: 'Juda Yuqori',
        avgPriceInCountry: 6.20,
        logisticsDays: 4,
        optimalTransport: 'Avia Kargo (Charter) / Qirg‘iziston yo‘li',
        gspPlusValid: false,
      },
      {
        countryName: 'Rossiya Federatsiyasi',
        countryCode: 'RU',
        flag: '🇷🇺',
        importTariffDuty: 0,
        marketDemandLevel: 'Juda Yuqori',
        avgPriceInCountry: 4.80,
        logisticsDays: 4,
        optimalTransport: 'Ekspress Refrijerator TIR',
        gspPlusValid: false,
      },
      {
        countryName: 'Janubiy Koreya',
        countryCode: 'KR',
        flag: '🇰🇷',
        importTariffDuty: 4,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 7.50,
        logisticsDays: 3,
        optimalTransport: 'Avia Kargo (Toshkent-Incheon)',
        gspPlusValid: false,
      }
    ]
  },
  {
    id: 'exp-3',
    hsCode: '6109 10',
    name: '100% paxtali trikotaj kiyimlari (T-shirts & Polo)',
    nameEn: 'Knitted Cotton Garments',
    category: 'TEXTILE',
    categoryNameUz: 'To‘qimachilik',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: 'Yuqori sifatli taroqlangan (combed) paxta ipidan tikilgan, Oeko-Tex sertifikatiga ega erkaklar va ayollar liboslari.',
    unit: 'dona',
    avgDomesticPrice: 1.90,
    avgExportPrice: 4.20,
    annualVolumeTons: 89000,
    growthRatePercent: 41.0,
    isSeasonal: false,
    peakMonths: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    gspPlusEligible: true,
    cisFtaEligible: true,
    requiredCerts: ['OEKO-TEX Standard 100', 'ST-1', 'GSP+ REX ro‘yxati', 'ISO 9001'],
    targetMarkets: [
      {
        countryName: 'Germaniya (Yevropa Ittifoqi)',
        countryCode: 'DE',
        flag: '🇩🇪',
        importTariffDuty: 0,
        marketDemandLevel: 'Juda Yuqori',
        avgPriceInCountry: 5.50,
        logisticsDays: 12,
        optimalTransport: 'TIR Avto / Temir yo‘l multimodal',
        gspPlusValid: true,
      },
      {
        countryName: 'Polsha',
        countryCode: 'PL',
        flag: '🇵🇱',
        importTariffDuty: 0,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 4.80,
        logisticsDays: 10,
        optimalTransport: 'TIR Avto',
        gspPlusValid: true,
      },
      {
        countryName: 'Rossiya Federatsiyasi',
        countryCode: 'RU',
        flag: '🇷🇺',
        importTariffDuty: 0,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 4.10,
        logisticsDays: 5,
        optimalTransport: 'Temir yo‘l / Fura',
        gspPlusValid: false,
      }
    ]
  },
  {
    id: 'exp-4',
    hsCode: '0702 00',
    name: 'Gidroponika issiqxona pomidori (Pushti va Qizil)',
    nameEn: 'Fresh Greenhouse Tomatoes',
    category: 'AGRICULTURE',
    categoryNameUz: 'Qishloq xo‘jaligi',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Qishki-bahorgi mavsumda yetishtirilgan, yuqori BRIX shirinlik darajasiga ega pushti pomidor.',
    unit: 'kg',
    avgDomesticPrice: 0.85,
    avgExportPrice: 1.95,
    annualVolumeTons: 110000,
    growthRatePercent: 18.4,
    isSeasonal: true,
    peakMonths: ['Noyabr', 'Dekabr', 'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May'],
    gspPlusEligible: true,
    cisFtaEligible: true,
    requiredCerts: ['Fitosanitariya sertifikati', 'ST-1', 'Pestitsid qoldig‘i laboratoriya tahlili'],
    targetMarkets: [
      {
        countryName: 'Rossiya Federatsiyasi',
        countryCode: 'RU',
        flag: '🇷🇺',
        importTariffDuty: 0,
        marketDemandLevel: 'Juda Yuqori',
        avgPriceInCountry: 2.20,
        logisticsDays: 4,
        optimalTransport: 'Refrijerator fura (Yashil koridor)',
        gspPlusValid: false,
      },
      {
        countryName: 'Qozog‘iston',
        countryCode: 'KZ',
        flag: '🇰🇿',
        importTariffDuty: 0,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 1.70,
        logisticsDays: 2,
        optimalTransport: 'Avto yuk',
        gspPlusValid: false,
      }
    ]
  },
  {
    id: 'exp-5',
    hsCode: '0806 20',
    name: 'Quritilgan uzum va mayiz (Soyaki, Mayiz)',
    nameEn: 'Dried Grapes & Raisins',
    category: 'FOOD_PROCESSING',
    categoryNameUz: 'Oziq-ovqat sanoati',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop&q=80',
    description: 'Tabiiy quyoshda va soyada quritilgan, optik saralangan (laser sort), tosh va ifloslanishlardan tozalangan eksportbop mayiz.',
    unit: 'kg',
    avgDomesticPrice: 1.40,
    avgExportPrice: 2.80,
    annualVolumeTons: 75000,
    growthRatePercent: 29.8,
    isSeasonal: false,
    peakMonths: ['Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr', 'Yanvar', 'Fevral', 'Mart'],
    gspPlusEligible: true,
    cisFtaEligible: true,
    requiredCerts: ['HACCP / ISO 22000', 'ST-1', 'GSP+ REX', 'Halol sertifikati'],
    targetMarkets: [
      {
        countryName: 'Turkiya',
        countryCode: 'TR',
        flag: '🇹🇷',
        importTariffDuty: 0,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 2.90,
        logisticsDays: 7,
        optimalTransport: 'Avto TIR / Eron-Turkiya koridori',
        gspPlusValid: false,
      },
      {
        countryName: 'Niderlandiya (EI)',
        countryCode: 'NL',
        flag: '🇳🇱',
        importTariffDuty: 0,
        marketDemandLevel: 'O‘sib boruvchi',
        avgPriceInCountry: 3.60,
        logisticsDays: 14,
        optimalTransport: 'Konteyner poyezd / Avto',
        gspPlusValid: true,
      },
      {
        countryName: 'Hindiston',
        countryCode: 'IN',
        flag: '🇮🇳',
        importTariffDuty: 8,
        marketDemandLevel: 'Juda Yuqori',
        avgPriceInCountry: 3.10,
        logisticsDays: 12,
        optimalTransport: 'Chobahor / Bandar Abbos porti orqali dengiz',
        gspPlusValid: false,
      }
    ]
  },
  {
    id: 'exp-6',
    hsCode: '3901 10',
    name: 'Polietilen granulalari (HDPE & LDPE)',
    nameEn: 'Polyethylene Granules',
    category: 'CHEMICALS',
    categoryNameUz: 'Kimyo va plastmassa',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    description: 'Sho‘rtan va Ustyurt gaz-kimyo majmualarida ishlab chiqarilgan polimer xom-ashyosi.',
    unit: 'tonna',
    avgDomesticPrice: 980,
    avgExportPrice: 1280,
    annualVolumeTons: 320000,
    growthRatePercent: 15.2,
    isSeasonal: false,
    peakMonths: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    gspPlusEligible: true,
    cisFtaEligible: true,
    requiredCerts: ['Muvofiqlik sertifikati', 'ST-1', 'REACH (EI talabi)'],
    targetMarkets: [
      {
        countryName: 'Turkiya',
        countryCode: 'TR',
        flag: '🇹🇷',
        importTariffDuty: 3,
        marketDemandLevel: 'Juda Yuqori',
        avgPriceInCountry: 1320,
        logisticsDays: 8,
        optimalTransport: 'Temir yo‘l vagonlari',
        gspPlusValid: false,
      },
      {
        countryName: 'Polsha / Ruminiya',
        countryCode: 'PL',
        flag: '🇵🇱',
        importTariffDuty: 0,
        marketDemandLevel: 'Yuqori',
        avgPriceInCountry: 1450,
        logisticsDays: 15,
        optimalTransport: 'Temir yo‘l multimodal',
        gspPlusValid: true,
      }
    ]
  }
];

export const IMPORT_PRODUCTS: ImportProduct[] = [
  {
    id: 'imp-1',
    hsCode: '4819 10',
    name: 'Gofrirlangan karton qutilar va eksport qadoqlash idishlari',
    category: 'INDUSTRIAL',
    categoryNameUz: 'Sanoat va qadoqlash',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 94500000,
    importVolumeTons: 82000,
    changePercentYear: 48.6,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Rossiya', sharePercent: 52, flag: '🇷🇺' },
      { name: 'Xitoy', sharePercent: 28, flag: '🇨🇳' },
      { name: 'Qozog‘iston', sharePercent: 14, flag: '🇰🇿' }
    ],
    reasonForImport: 'Mahalliy meva-sabzavot va to‘qimachilik eksportining keskin ortishi sababli 5 qatlamli mustahkam namlikka chidamli karton qutilarga talab portladi.',
    localSubstitutable: true,
    localRawMaterialScore: 85,
    estimatedSetupCapEx: 350000,
    estPaybackMonths: 14,
    stateIncentives: [
      'Xorijiy texnologik uskunalarni olib kirishda bojxona to‘lovlaridan 100% ozod qilish',
      'Yangi ishlab chiqarish korxonalariga 3 yil muddatga mulk solig‘i 50% kamaytirilgan',
      'Eksportchi korxonalarga qadoqlash xarajatlarining 50% gacha davlat subsidiyasi'
    ],
    recommendedEquipment: [
      '5 qatlamli avtomatlashtirilgan gofroliniya (Corrugated Cardboard Production Line)',
      'Yuqori aniqlikdagi 4 rangli Flekso-bosma (Flexo Printing & Slotter Machine)',
      'Avtomatik yelimlash va tikish stanoqi (Automatic Folder Gluer)'
    ]
  },
  {
    id: 'imp-2',
    hsCode: '3920 49',
    name: 'Farmatsevtika va oziq-ovqat uchun PVX / Blister polimer plyonkalar',
    category: 'PHARMACEUTICAL',
    categoryNameUz: 'Farmatsevtika va kimyo',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 68200000,
    importVolumeTons: 34000,
    changePercentYear: 54.2,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Hindiston', sharePercent: 44, flag: '🇮🇳' },
      { name: 'Xitoy', sharePercent: 36, flag: '🇨🇳' },
      { name: 'Turkiya', sharePercent: 12, flag: '🇹🇷' }
    ],
    reasonForImport: 'Mahalliy farmatsevtika zavodlari tabletkalar va kapsulalarni qadoqlash uchun qattiq blister plyonkalarini 100% chetdan xarid qilmoqda.',
    localSubstitutable: true,
    localRawMaterialScore: 70,
    estimatedSetupCapEx: 520000,
    estPaybackMonths: 18,
    stateIncentives: [
      'Farmatsevtika sohasini qo‘llab-quvvatlash jamg‘armasidan imtiyozli 8% li kredit',
      'Xom-ashyo (PVX granula) importiga 0% bojxona boji'
    ],
    recommendedEquipment: [
      'Qattiq PVX plyonka ekstruziya liniyasi (Rigid PVC Calendar Extrusion)',
      'Aluminiy folga bilan laminatsiya uskunasi'
    ]
  },
  {
    id: 'imp-3',
    hsCode: '8708 29',
    name: 'Avtomobil filtr elementlari, havo va moy filtrlari',
    category: 'INDUSTRIAL',
    categoryNameUz: 'Mashinasozlik va avto ehtiyot qismlari',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 112000000,
    importVolumeTons: 19500,
    changePercentYear: 39.8,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Xitoy', sharePercent: 61, flag: '🇨🇳' },
      { name: 'Janubiy Koreya', sharePercent: 22, flag: '🇰🇷' },
      { name: 'Rossiya', sharePercent: 11, flag: '🇷🇺' }
    ],
    reasonForImport: 'Mamlakatdagi 4 milliondan ortiq avtomobillar parki har 7,000-10,000 km da muntazam almashtiradigan asosiy xarajat moddasi.',
    localSubstitutable: true,
    localRawMaterialScore: 65,
    estimatedSetupCapEx: 280000,
    estPaybackMonths: 12,
    stateIncentives: [
      'Avtosanoat lokallashtirish dasturi doirasida 5 yilga foyda solig‘idan to‘liq ozod qilish',
      'Mahalliy avtozavodlar xaridiga ustuvor kiritish (Ofset shartnomalar)'
    ],
    recommendedEquipment: [
      'Gofrirovka qog‘ozini qatlash avtomati (Filter Paper Pleating Machine)',
      'Poliuretan quyish stansiyasi (PU Dispensing Machine)',
      'Metall korpus shtamplash pressi'
    ]
  },
  {
    id: 'imp-4',
    hsCode: '5402 33',
    name: 'Sintetik poliester tekstil iplari (Polyester DTY / FDY)',
    category: 'TEXTILE',
    categoryNameUz: 'To‘qimachilik xom-ashyosi',
    imageUrl: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 87400000,
    importVolumeTons: 58000,
    changePercentYear: 42.0,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Xitoy', sharePercent: 74, flag: '🇨🇳' },
      { name: 'Hindiston', sharePercent: 15, flag: '🇮🇳' },
      { name: 'Turkiya', sharePercent: 8, flag: '🇹🇷' }
    ],
    reasonForImport: 'O‘zbekiston paxta ipida yetakchi bo‘lsa-da, sport kiyimlari, paypoq va aralash matolar uchun poliester iplari deyarli to‘liq chetdan keladi.',
    localSubstitutable: true,
    localRawMaterialScore: 78,
    estimatedSetupCapEx: 850000,
    estPaybackMonths: 20,
    stateIncentives: [
      'To‘qimachilik texnoparklarida yer va muhandislik tarmoqlari tekinga ulab beriladi',
      'Eksport qilingan tayyor mahsulot uchun 10% gacha keshbek'
    ],
    recommendedEquipment: [
      'Poliester chipslaridan ip yigiruvchi POY/FDY ekstruziya uskunasi',
      'DTY Teksturlash mashinasi (High Speed Draw Texturing Machine)'
    ]
  },
  {
    id: 'imp-5',
    hsCode: '0803 90',
    name: 'Yangi tropik banan',
    category: 'AGRICULTURE',
    categoryNameUz: 'Qishloq xo‘jaligi',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 79000000,
    importVolumeTons: 142000,
    changePercentYear: 14.2,
    alertStatus: 'NORMAL',
    originCountries: [
      { name: 'Ekvador', sharePercent: 88, flag: '🇪🇨' },
      { name: 'Turkiya', sharePercent: 7, flag: '🇹🇷' }
    ],
    reasonForImport: 'Tropik iqlim mevasi bo‘lgani uchun ichki isteʼmol asosan import orqali qoplanadi. Janubiy viloyatlarda tajriba issiqxonalari yo‘lga qo‘yilmoqda.',
    localSubstitutable: false,
    localRawMaterialScore: 20,
    estimatedSetupCapEx: 1200000,
    estPaybackMonths: 36,
    stateIncentives: ['Banan importiga nol stavkali bojxona boji uzaytirildi'],
    recommendedEquipment: ['Iqlim nazoratli tropik geotermal issiqxonalar']
  },
  {
    id: 'imp-tech-1',
    hsCode: '8517 13 000 0',
    name: 'Smartfonlar va mobil aloqa telefonlari',
    category: 'ELECTRONICS',
    categoryNameUz: 'Elektronika va IT',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 780000000,
    importVolumeTons: 2850,
    changePercentYear: 25.4,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Xitoy', sharePercent: 77, flag: '🇨🇳' },
      { name: 'Vyetnam', sharePercent: 20, flag: '🇻🇳' },
      { name: 'Hindiston', sharePercent: 1.7, flag: '🇮🇳' },
      { name: 'Janubiy Koreya', sharePercent: 1.3, flag: '🇰🇷' }
    ],
    reasonForImport: 'Yiliga 4.2 milliondan ortiq smartfon (Xiaomi, Samsung, Apple, Honor, Tecno) import qilinadi. Aholining raqamli xizmatlarga talabi yiliga $780M valyuta chiqib ketishiga sabab bo‘lmoqda.',
    localSubstitutable: true,
    localRawMaterialScore: 40,
    estimatedSetupCapEx: 1800000,
    estPaybackMonths: 16,
    stateIncentives: [
      'IMEI ro‘yxatga olishda mahalliy ishlab chiqaruvchilarga maxsus imtiyoz',
      'Yig‘uvchi korxonalarga butlovchi qismlar (SKD/CKD) importida bojxona boji 0%',
      'IT Park va Texnopark rezidentlariga 10 yil muddatga barcha soliqlardan ozodlik'
    ],
    recommendedEquipment: [
      'Avtomatlashtirilgan SKD/CKD toza xona (Cleanroom Class 10000) yig‘uv liniyasi',
      'RF va 5G signal kalibrlash hamda testlash stansiyasi (Rohde & Schwarz)',
      'Lazer markirovka va avtomatik qadoqlash liniyasi'
    ]
  },
  {
    id: 'imp-tech-2',
    hsCode: '8471 30 000 0',
    name: 'Noutbuklar va portativ shaxsiy kompyuterlar',
    category: 'ELECTRONICS',
    categoryNameUz: 'Elektronika va IT',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 336000000,
    importVolumeTons: 1650,
    changePercentYear: 31.8,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Xitoy', sharePercent: 43, flag: '🇨🇳' },
      { name: 'Yaponiya', sharePercent: 9.1, flag: '🇯🇵' },
      { name: 'Chexiya', sharePercent: 8.6, flag: '🇨🇿' },
      { name: 'BAA', sharePercent: 8.1, flag: '🇦🇪' },
      { name: 'AQSh', sharePercent: 7.7, flag: '🇺🇸' }
    ],
    reasonForImport: 'O‘zbekiston dunyo bo‘yicha kompyuter import qiluvchi 64-yirik davlatga aylandi ($336M). Ta’lim, davlat tashkilotlari va IT Park dasturchilari ehtiyoji uchun 350,000+ noutbuk chetdan keltiriladi.',
    localSubstitutable: true,
    localRawMaterialScore: 45,
    estimatedSetupCapEx: 1200000,
    estPaybackMonths: 15,
    stateIncentives: [
      'Davlat xaridlarida mahalliy ishlab chiqarilgan texnikaga 15% gacha narx preferensiyasi',
      'Noutbuk displeylari va xotira modullari importiga 0% stavkali bojxona boji'
    ],
    recommendedEquipment: [
      'OEM/ODM robotlashtirilgan noutbuk montaj konveyeri',
      'Termal kamera va stress-test stendi (Thermal Cycling & Burn-in Chamber)',
      'Avtomatlashtirilgan BIOS va operatsion tizim proshivka dastgohi'
    ]
  },
  {
    id: 'imp-tech-3',
    hsCode: '8542 31 000 0',
    name: 'Integral mikrosxemalar, protsessorlar va chiplar (Semiconductors)',
    category: 'ELECTRONICS',
    categoryNameUz: 'Elektronika va IT',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 340000000,
    importVolumeTons: 420,
    changePercentYear: 46.5,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Xitoy', sharePercent: 98, flag: '🇨🇳' },
      { name: 'AQSh', sharePercent: 0.8, flag: '🇺🇸' },
      { name: 'Turkiya', sharePercent: 0.5, flag: '🇹🇷' },
      { name: 'Janubiy Koreya', sharePercent: 0.4, flag: '🇰🇷' }
    ],
    reasonForImport: 'Avtomobilsozlik (Tracker/Onix ECU bloklari), aqlli gaz/elektr ASKUE hisoblagichlari, Humo va Uzcard to‘lov kartalari, SIM-kartalar uchun barcha chiplar 100% xorijdan valyutaga sotib olinadi.',
    localSubstitutable: true,
    localRawMaterialScore: 35,
    estimatedSetupCapEx: 2400000,
    estPaybackMonths: 24,
    stateIncentives: [
      'Ohangaron mikroelektronika klasterida Infineon (Germaniya) bilan hamkorlik loyihasi',
      'Yarimo‘tkazgich texnologiyalari uchun 10 yilga foyda, yer va mulk solig‘idan to‘liq ozodlik',
      'R&D va ilmiy-tadqiqot xarajatlarining 50% ini davlat jamg‘armasi qoplaydi'
    ],
    recommendedEquipment: [
      'Avtomatlashtirilgan SMT (Surface Mount Technology) mikrosxema o‘rnatish liniyasi (Fuji/Panasonic)',
      'Die Bonding va Wire Bonding mikrotolali payvandlash apparati',
      'Optik AOI (Automated Optical Inspection) va rentgen (X-Ray) sifat nazorat tizimi'
    ]
  },
  {
    id: 'imp-tech-4',
    hsCode: '8534 00 110 0',
    name: 'Bosma elektron platalar (PCB) va elektron datchik modullari',
    category: 'ELECTRONICS',
    categoryNameUz: 'Elektronika va IT',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    importVolumeUsd: 125000000,
    importVolumeTons: 1100,
    changePercentYear: 52.0,
    alertStatus: 'CRITICAL_RED_ZONE',
    originCountries: [
      { name: 'Xitoy', sharePercent: 82, flag: '🇨🇳' },
      { name: 'Janubiy Koreya', sharePercent: 11, flag: '🇰🇷' },
      { name: 'Rossiya', sharePercent: 4, flag: '🇷🇺' }
    ],
    reasonForImport: 'Barcha mahalliy maishiy texnika (televizor, kir yuvish mashinasi), svetodiod yoritgichlar va lift datchiklari uchun ko‘p qatlamli yashil platalar deyarli to‘liq chetdan olib kiriladi.',
    localSubstitutable: true,
    localRawMaterialScore: 60,
    estimatedSetupCapEx: 750000,
    estPaybackMonths: 14,
    stateIncentives: [
      'Elektrotexnika sanoati assotsiatsiyasi (O‘zeltexsanoat) a’zolariga maxsus kompensatsiya',
      'Kimyoviy reagentlar va folgalangan dielektrik importiga nol stavka'
    ],
    recommendedEquipment: [
      'Ko‘p qatlamli PCB platalari lazer burg‘ulash va frezerlash stanoqi',
      'Fotorezist qoplash va kimyoviy mislash (Electroplating) liniyasi',
      'Solder Mask va Silk Screen avtomat bosma printeri'
    ]
  }
];

export const TRADE_STATISTICS = {
  totalExportUsd: '18.4 Mrd $',
  exportGrowthRate: '+14.8%',
  totalImportUsd: '26.2 Mrd $',
  tradeDeficitUsd: '-7.8 Mrd $',
  redZoneGoodsCount: 18,
  redZoneDrainUsd: '2.82 Mrd $',
  gspPlusVolumeUsd: '940 Mln $',
  topExportPartner: 'Rossiya, Xitoy, Turkiya, EI',
};
