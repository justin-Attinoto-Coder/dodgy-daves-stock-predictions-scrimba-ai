/**
 * Formats a number as currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

/**
 * Formats a percentage change
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Formats large numbers (e.g., market cap, volume)
 */
export function formatLargeNumber(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(1)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/**
 * Validates stock symbol format
 */
export function isValidStockSymbol(symbol: string): boolean {
  // Basic validation: 1-5 uppercase letters
  const regex = /^[A-Z]{1,5}$/;
  return regex.test(symbol);
}

/**
 * Normalizes stock symbol (converts to uppercase, trims whitespace)
 */
export function normalizeStockSymbol(symbol: string): string {
  return symbol.trim().toUpperCase();
}

/**
 * Creates a delay for rate limiting
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safely parses JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Generates a random humor rating between 1-10
 */
export function generateHumorRating(): number {
  return Math.floor(Math.random() * 10) + 1;
}