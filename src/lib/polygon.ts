import { PolygonTickerResponse, PolygonAggregateResponse, StockData } from '@/types';
import { getEnvConfig } from '@/utils/config';
import { delay } from '@/utils/helpers';

class PolygonClient {
  private apiKey?: string;
  private baseUrl = 'https://api.polygon.io';
  private rateLimitDelay = 12000; // 12 seconds for free tier (5 requests per minute)

  private getApiKey(): string {
    if (!this.apiKey) {
      const config = getEnvConfig();
      this.apiKey = config.POLYGON_API_KEY;
    }
    return this.apiKey;
  }

  /**
   * Makes a request to the Polygon API with rate limiting
   */
  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}?apikey=${this.getApiKey()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited, wait and retry
          await delay(this.rateLimitDelay);
          return this.makeRequest<T>(endpoint);
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Polygon API error: ${response.status} - ${
            errorData.error || response.statusText
          }`
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Polygon API request failed: ${error.message}`);
      }
      throw new Error('Polygon API request failed: Unknown error');
    }
  }

  /**
   * Gets ticker information
   */
  async getTicker(symbol: string): Promise<PolygonTickerResponse> {
    const endpoint = `/v3/reference/tickers/${symbol.toUpperCase()}`;
    const response = await this.makeRequest<{ results: PolygonTickerResponse }>(endpoint);
    return response.results;
  }

  /**
   * Gets aggregate data for a stock (price, volume, etc.)
   */
  async getAggregates(
    symbol: string,
    timespan: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' = 'day',
    multiplier: number = 1,
    from: string = '2024-01-01',
    to: string = '2024-12-31'
  ): Promise<PolygonAggregateResponse> {
    const endpoint = `/v2/aggs/ticker/${symbol.toUpperCase()}/range/${multiplier}/${timespan}/${from}/${to}`;
    return this.makeRequest<PolygonAggregateResponse>(endpoint);
  }

  /**
   * Gets the previous day's data for a stock
   */
  async getPreviousClose(symbol: string): Promise<StockData | null> {
    try {
      const endpoint = `/v2/aggs/ticker/${symbol.toUpperCase()}/prev`;
      const response = await this.makeRequest<{
        ticker: string;
        queryCount: number;
        resultsCount: number;
        adjusted: boolean;
        results: Array<{
          T: string; // ticker
          v: number; // volume
          vw: number; // volume weighted average price
          o: number; // open
          c: number; // close
          h: number; // high
          l: number; // low
          t: number; // timestamp
        }>;
      }>(endpoint);

      if (!response.results || response.results.length === 0) {
        return null;
      }

      const result = response.results[0];
      const tickerInfo = await this.getTicker(symbol).catch(() => null);

      return {
        symbol: symbol.toUpperCase(),
        name: tickerInfo?.name || symbol,
        price: result.c,
        change: result.c - result.o,
        changePercent: ((result.c - result.o) / result.o) * 100,
        volume: result.v,
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return null;
    }
  }

  /**
   * Searches for tickers by name or symbol
   */
  async searchTickers(query: string, limit: number = 10): Promise<PolygonTickerResponse[]> {
    const endpoint = `/v3/reference/tickers?search=${encodeURIComponent(query)}&limit=${limit}&active=true`;
    const response = await this.makeRequest<{ results: PolygonTickerResponse[] }>(endpoint);
    return response.results || [];
  }

  /**
   * Gets market status
   */
  async getMarketStatus(): Promise<{
    market: string;
    serverTime: string;
    exchanges: {
      nasdaq: string;
      nyse: string;
      otc: string;
    };
    currencies: {
      fx: string;
      crypto: string;
    };
  }> {
    const endpoint = '/v1/marketstatus/now';
    return this.makeRequest(endpoint);
  }
}

// Export singleton instance
export const polygonClient = new PolygonClient();