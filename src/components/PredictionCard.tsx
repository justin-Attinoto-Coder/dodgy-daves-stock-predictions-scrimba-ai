import { StockPrediction } from '@/types';

interface PredictionCardProps {
  prediction: StockPrediction;
  className?: string;
}

export function PredictionCard({ prediction, className = '' }: PredictionCardProps) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHumorBadgeColor = (rating: number) => {
    if (rating >= 8) return 'bg-purple-100 text-purple-800';
    if (rating >= 6) return 'bg-blue-100 text-blue-800';
    if (rating >= 4) return 'bg-indigo-100 text-indigo-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Dodgy Dave&apos;s Prediction for {prediction.symbol}
          </h3>
          <p className="text-gray-500 text-sm">
            {prediction.timestamp.toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(
              prediction.confidence
            )}`}
          >
            {prediction.confidence} confidence
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getHumorBadgeColor(
              prediction.humorRating
            )}`}
          >
            😂 {prediction.humorRating}/10
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {prediction.prediction}
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Disclaimer:</strong> This is entertainment only! Dodgy Dave&apos;s predictions
              are completely fictional and should never be used for actual investment decisions.
              Always consult with qualified financial advisors for real investment advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}