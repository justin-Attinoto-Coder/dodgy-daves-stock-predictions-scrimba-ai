import { useState, useCallback } from 'react';
import { StockData } from '@/types';
import { polygonClient } from '@/lib/polygon';
import { normalizeStockSymbol, isValidStockSymbol } from '@/utils/helpers';

interface UseStockDataReturn {
  stockData: StockData | null;
  loading: boolean;
  error: string | null;
  fetchStockData: (symbol: string) => Promise<void>;
  clearError: () => void;
}

export function useStockData(): UseStockDataReturn {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = useCallback(async (symbol: string) => {
    const normalizedSymbol = normalizeStockSymbol(symbol);
    
    if (!isValidStockSymbol(normalizedSymbol)) {
      setError('Please enter a valid stock symbol (1-5 letters)');
      return;
    }

    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const data = await polygonClient.getPreviousClose(normalizedSymbol);
      
      if (!data) {
        setError(`No data found for symbol: ${normalizedSymbol}`);
      } else {
        setStockData(data);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch stock data';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    stockData,
    loading,
    error,
    fetchStockData,
    clearError,
  };
}