import { useState, useCallback } from 'react';
import { StockPrediction, StockData } from '@/types';
import { openaiClient } from '@/lib/openai';
import { generateHumorRating } from '@/utils/helpers';

interface UsePredictionReturn {
  prediction: StockPrediction | null;
  loading: boolean;
  error: string | null;
  generatePrediction: (symbol: string, stockData?: StockData) => Promise<void>;
  clearPrediction: () => void;
  clearError: () => void;
}

export function usePrediction(): UsePredictionReturn {
  const [prediction, setPrediction] = useState<StockPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePrediction = useCallback(async (symbol: string, stockData?: StockData) => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const stockInfo = stockData ? {
        price: stockData.price,
        change: stockData.changePercent,
        volume: stockData.volume,
      } : undefined;

      const predictionText = await openaiClient.generateStockPrediction(symbol, stockInfo);
      
      // Determine confidence based on humor rating (inverse relationship for fun)
      const humorRating = generateHumorRating();
      let confidence: 'low' | 'medium' | 'high';
      
      if (humorRating >= 8) {
        confidence = 'low'; // Very funny = very unreliable
      } else if (humorRating >= 5) {
        confidence = 'medium';
      } else {
        confidence = 'high'; // Less funny = more "reliable" (still not real advice!)
      }

      const newPrediction: StockPrediction = {
        symbol: symbol.toUpperCase(),
        prediction: predictionText,
        confidence,
        humorRating,
        timestamp: new Date(),
      };

      setPrediction(newPrediction);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate prediction';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearPrediction = useCallback(() => {
    setPrediction(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    prediction,
    loading,
    error,
    generatePrediction,
    clearPrediction,
    clearError,
  };
}