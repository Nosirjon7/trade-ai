export type UserRole = 'TADBIRKOR' | 'FERMER' | 'LOGISTIKA_AGENTI' | 'ADMIN';

export type ProductCategory = 
  | 'AGRICULTURE' 
  | 'TEXTILE' 
  | 'FOOD_PROCESSING' 
  | 'INDUSTRIAL' 
  | 'CHEMICALS' 
  | 'CONSTRUCTION' 
  | 'PHARMACEUTICAL'
  | 'ELECTRONICS';

export type AlertSeverity = 'NORMAL' | 'MEDIUM' | 'HIGH' | 'CRITICAL_RED_ZONE';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  companyName: string;
  role: UserRole;
  focusArea: ProductCategory;
  region: string;
}

export interface MarketTarget {
  countryName: string;
  countryCode: string;
  flag: string;
  importTariffDuty: number; // e.g., 0% or 10%
  marketDemandLevel: 'Juda Yuqori' | 'Yuqori' | 'O‘rtacha' | 'O‘sib boruvchi';
  avgPriceInCountry: number; // in USD per kg
  logisticsDays: number;
  optimalTransport: string;
  gspPlusValid?: boolean;
}

export interface ExportProduct {
  id: string;
  hsCode: string; // TIF TN Code
  name: string;
  nameEn?: string;
  category: ProductCategory;
  categoryNameUz: string;
  imageUrl: string;
  description: string;
  unit: string;
  avgDomesticPrice: number; // USD per unit
  avgExportPrice: number; // USD per unit
  annualVolumeTons: number;
  growthRatePercent: number;
  isSeasonal: boolean;
  peakMonths: string[];
  gspPlusEligible: boolean;
  cisFtaEligible: boolean;
  requiredCerts: string[];
  targetMarkets: MarketTarget[];
}

export interface ImportProduct {
  id: string;
  hsCode: string;
  name: string;
  category: ProductCategory;
  categoryNameUz: string;
  imageUrl: string;
  importVolumeUsd: number; // e.g. $84,500,000
  importVolumeTons: number;
  changePercentYear: number; // e.g. +48%
  alertStatus: AlertSeverity;
  originCountries: { name: string; sharePercent: number; flag: string }[];
  reasonForImport: string;
  localSubstitutable: boolean;
  localRawMaterialScore: number; // 0-100%
  estimatedSetupCapEx: number; // in USD
  estPaybackMonths: number;
  stateIncentives: string[];
  recommendedEquipment: string[];
}

export interface FinancialCalculationResult {
  productName: string;
  destinationCountry: string;
  volumeTons: number;
  purchaseCostTotal: number;
  packagingCostTotal: number;
  transportCostTotal: number;
  customsCostTotal: number;
  lossRiskCostTotal: number;
  totalInvestment: number;
  grossRevenue: number;
  netProfit: number;
  profitMarginPercent: number;
  breakevenPricePerKg: number;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  mode?: 'seasonal' | 'certs' | 'calculator' | 'substitution' | 'general';
  metadata?: {
    actionType?: 'open_calculator' | 'open_product' | 'view_substitution';
    targetId?: string;
    calculation?: Partial<FinancialCalculationResult>;
    quickActions?: string[];
  };
}

export interface CurrencyRate {
  code: 'USD' | 'EUR' | 'RUB' | 'CNY';
  name: string;
  flag: string;
  rate: number;
  diff: number;
  diffPercent: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export interface CommoditySpotPrice {
  id: string;
  name: string;
  market: string;
  price: number;
  currency: string;
  unit: string;
  diffPercent: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  category: 'AGRO' | 'INDUSTRY' | 'TECH';
  note: string;
}

export interface DailyBorderQueue {
  id: string;
  postName: string;
  direction: string;
  flag: string;
  avgWaitHours: number;
  queueTrucks: number;
  status: 'FAST' | 'MODERATE' | 'BUSY';
  operatingHours: string;
  recommendation: string;
}

export interface DailyTradeSignal {
  id: string;
  title: string;
  category: 'OPPORTUNITY' | 'ALERT' | 'SUBSIDY' | 'PRICE_SPIKE';
  summary: string;
  impact: string;
  region: string;
  timestamp: string;
}

export interface DailyTradeStats {
  todayDeclarationsCount: number;
  todayExportTrucks: number;
  todayTurnoverUsd: string;
  customsProcessingSpeedMin: number;
  lastUpdated: string;
}

export interface TradeCorridor {
  id: string;
  name: string;
  direction: 'EXPORT' | 'IMPORT' | 'BOTH';
  corridorType: 'NORTH' | 'EAST' | 'WEST' | 'SOUTH';
  originCity: string;
  originCountry: string;
  originFlag: string;
  destCity: string;
  destCountry: string;
  destFlag: string;
  distanceKm: number;
  transitDaysMin: number;
  transitDaysMax: number;
  borderPoints: string[];
  transportModes: ('TRUCK' | 'TRAIN' | 'MULTIMODAL' | 'AIR')[];
  avgCostPerTruckUsd: number;
  avgCostPerKgUsd: number;
  stateSubsidyPercent: number;
  primaryGoods: string[];
  keyRisks: string[];
  description: string;
}

