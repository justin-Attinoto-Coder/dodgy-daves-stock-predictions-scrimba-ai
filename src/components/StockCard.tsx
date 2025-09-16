import { StockData } from '@/types';
import { formatCurrency, formatPercentage, formatLargeNumber } from '@/utils/helpers';

interface StockCardProps {
  stockData: StockData;
  className?: string;
}

export function StockCard({ stockData, className = '' }: StockCardProps) {
  const isPositive = stockData.change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeBg = isPositive ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{stockData.symbol}</h2>
          <p className="text-gray-600 text-sm">{stockData.name}</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${changeBg}`}>
          <span className={`text-sm font-medium ${changeColor}`}>
            {formatPercentage(stockData.changePercent)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(stockData.price)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Change</span>
          <span className={`font-medium ${changeColor}`}>
            {formatCurrency(stockData.change)} ({formatPercentage(stockData.changePercent)})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Volume</span>
          <span className="font-medium text-gray-900">
            {formatLargeNumber(stockData.volume)}
          </span>
        </div>

        {stockData.marketCap && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Market Cap</span>
            <span className="font-medium text-gray-900">
              {formatLargeNumber(stockData.marketCap)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}