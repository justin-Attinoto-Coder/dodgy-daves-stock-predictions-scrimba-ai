'use client';

import { useState } from 'react';
import * as React from 'react';
import { StockSearch } from '@/components/StockSearch';
import { StockCard } from '@/components/StockCard';
import { PredictionCard } from '@/components/PredictionCard';
import { useStockData } from '@/hooks/useStockData';
import { usePrediction } from '@/hooks/usePrediction';
import ExplainForm from '@/components/ExplainForm';

export default function Home() {
  const { stockData, loading: stockLoading, error: stockError, fetchStockData } = useStockData();
  const { prediction, loading: predictionLoading, error: predictionError, generatePrediction } = usePrediction();
  const [currentSymbol, setCurrentSymbol] = useState('');

  const handleSearch = async (symbol: string) => {
    setCurrentSymbol(symbol);
    await fetchStockData(symbol);
  };

  const handleGeneratePrediction = async () => {
    if (currentSymbol) {
      await generatePrediction(currentSymbol, stockData || undefined);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Dodgy Dave&apos;s Stock Predictions
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Hilariously unreliable stock market predictions powered by AI
          </p>
          <p className="text-sm text-gray-500">
            ⚠️ For entertainment purposes only - not actual financial advice!
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Search for a Stock
            </h2>
            <StockSearch 
              onSearch={handleSearch} 
              loading={stockLoading}
            />
          </div>
        </div>

        {/* Error Messages */}
        {stockError && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">
                <strong>Error:</strong> {stockError}
              </p>
            </div>
          </div>
        )}

        {predictionError && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">
                <strong>Prediction Error:</strong> {predictionError}
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stock Data */}
            {stockData && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Stock Information
                </h3>
                <StockCard stockData={stockData} />
                
                {/* Generate Prediction Button */}
                <div className="mt-4">
                  <button
                    onClick={handleGeneratePrediction}
                    disabled={predictionLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {predictionLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Consulting the Crystal Ball...</span>
                      </div>
                    ) : (
                      '🔮 Get Dodgy Dave&apos;s Prediction'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Prediction */}
            {prediction && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Prediction Results
                </h3>
                <PredictionCard prediction={prediction} />
              </div>
            )}
          </div>
        </div>

        {/* OpenAI Explain Challenge Section */}
        <div className="max-w-2xl mx-auto mt-12">
          <ExplainForm />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Built with Next.js, TypeScript, OpenAI API, and Polygon.io API
          </p>
          <p className="mt-2">
            Remember: These predictions are completely fictional and for entertainment only!
          </p>
        </footer>
      </div>
    </div>
  );
}
