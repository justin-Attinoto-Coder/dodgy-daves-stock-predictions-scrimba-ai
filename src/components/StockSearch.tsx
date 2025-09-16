import { useState } from 'react';
import { normalizeStockSymbol, isValidStockSymbol } from '@/utils/helpers';

interface StockSearchProps {
  onSearch: (symbol: string) => void;
  loading?: boolean;
  className?: string;
}

export function StockSearch({ onSearch, loading = false, className = '' }: StockSearchProps) {
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedSymbol = normalizeStockSymbol(symbol);
    
    if (!normalizedSymbol) {
      setError('Please enter a stock symbol');
      return;
    }

    if (!isValidStockSymbol(normalizedSymbol)) {
      setError('Please enter a valid stock symbol (1-5 letters)');
      return;
    }

    setError('');
    onSearch(normalizedSymbol);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value);
    if (error) setError('');
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
            Stock Symbol
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                id="symbol"
                value={symbol}
                onChange={handleInputChange}
                placeholder="Enter symbol (e.g., AAPL, TSLA, MSFT)"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={loading}
                maxLength={5}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !symbol.trim()}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                  <span>Searching...</span>
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Popular symbols:</strong>{' '}
          {['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'].map((popularSymbol, index) => (
            <span key={popularSymbol}>
              <button
                onClick={() => {
                  setSymbol(popularSymbol);
                  onSearch(popularSymbol);
                }}
                className="text-blue-600 hover:text-blue-800 underline"
                disabled={loading}
              >
                {popularSymbol}
              </button>
              {index < 5 && ', '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}