/**
 * Currency and Country Data
 * Comprehensive list of currencies with their symbols and countries
 */

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  country: string;
  flag: string; // Emoji flag
}

export const currencies: Currency[] = [
  // Major Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China', flag: '🇨🇳' },
  
  // Popular Currencies
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India', flag: '🇮🇳' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs', country: 'Pakistan', flag: '🇵🇰' },
  
  // Middle East & Africa
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', country: 'UAE', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa', flag: '🇿🇦' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', country: 'Egypt', flag: '🇪🇬' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria', flag: '🇳🇬' },
  
  // Asia Pacific
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', country: 'South Korea', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', country: 'Hong Kong', flag: '🇭🇰' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', country: 'Thailand', flag: '🇹🇭' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', country: 'Philippines', flag: '🇵🇭' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', country: 'Vietnam', flag: '🇻🇳' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh', flag: '🇧🇩' },
  
  // Europe
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', country: 'Sweden', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', country: 'Norway', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', country: 'Denmark', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', country: 'Poland', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', country: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', country: 'Hungary', flag: '🇭🇺' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', country: 'Romania', flag: '🇷🇴' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', country: 'Turkey', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', country: 'Russia', flag: '🇷🇺' },
  
  // Americas
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', country: 'Mexico', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil', flag: '🇧🇷' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', country: 'Argentina', flag: '🇦🇷' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', country: 'Chile', flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', country: 'Colombia', flag: '🇨🇴' },
  
  // Oceania & Others
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', country: 'Israel', flag: '🇮🇱' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', country: 'Kuwait', flag: '🇰🇼' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', country: 'Qatar', flag: '🇶🇦' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب', country: 'Bahrain', flag: '🇧🇭' },
];

/**
 * Get currency by code
 */
export const getCurrency = (code: string): Currency | undefined => {
  return currencies.find(c => c.code === code);
};

/**
 * Get currency symbol by code
 */
export const getCurrencySymbol = (code: string): string => {
  const currency = getCurrency(code);
  return currency ? currency.symbol : code;
};

/**
 * Format number with currency symbol
 */
export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = getCurrency(currencyCode);
  if (!currency) return `${amount.toFixed(2)} ${currencyCode}`;
  
  // For currencies with symbols that go before the amount
  const symbolFirst = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'NZD', 'CHF', 'SGD', 'HKD'];
  
  if (symbolFirst.includes(currencyCode)) {
    return `${currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency.symbol}`;
  }
};

/**
 * Default currency based on user locale (fallback to USD)
 */
export const getDefaultCurrency = (): string => {
  try {
    const locale = navigator.language;
    const currencyMap: { [key: string]: string } = {
      'en-US': 'USD',
      'en-GB': 'GBP',
      'en-AU': 'AUD',
      'en-CA': 'CAD',
      'en-NZ': 'NZD',
      'en-IN': 'INR',
      'de': 'EUR',
      'fr': 'EUR',
      'es': 'EUR',
      'it': 'EUR',
      'pt-BR': 'BRL',
      'es-MX': 'MXN',
      'ja': 'JPY',
      'ko': 'KRW',
      'zh-CN': 'CNY',
      'ar-SA': 'SAR',
      'ar-AE': 'AED',
      'ru': 'RUB',
      'tr': 'TRY',
      'pl': 'PLN',
      'cs': 'CZK',
      'hu': 'HUF',
      'ro': 'RON',
      'th': 'THB',
      'vi': 'VND',
      'id': 'IDR',
      'ms': 'MYR',
      'tl': 'PHP',
    };
    
    // Try exact match first
    if (currencyMap[locale]) {
      return currencyMap[locale];
    }
    
    // Try language code match
    const langCode = locale.split('-')[0];
    const matchingCurrency = Object.keys(currencyMap).find(key => 
      key.startsWith(langCode)
    );
    
    if (matchingCurrency) {
      return currencyMap[matchingCurrency];
    }
  } catch (error) {
    // Fallback to USD if any error occurs
  }
  
  return 'USD';
};

export default currencies;
