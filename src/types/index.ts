// API Response Types
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
}

export interface PolygonTickerResponse {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik?: string;
  composite_figi?: string;
  share_class_figi?: string;
  last_updated_utc: string;
}

export interface PolygonAggregateResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: Array<{
    v: number; // volume
    vw: number; // volume weighted average price
    o: number; // open
    c: number; // close
    h: number; // high
    l: number; // low
    t: number; // timestamp
    n: number; // number of transactions
  }>;
  status: string;
  request_id: string;
  count: number;
}

// OpenAI Types
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: OpenAIMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Application Types
export interface StockPrediction {
  symbol: string;
  prediction: string;
  confidence: 'low' | 'medium' | 'high';
  humorRating: number; // 1-10 scale for how funny the prediction is
  timestamp: Date;
}

export interface PredictionRequest {
  symbol: string;
  timeframe?: '1D' | '1W' | '1M' | '3M' | '1Y';
  style?: 'conservative' | 'aggressive' | 'humorous';
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Environment Variables
export interface EnvConfig {
  OPENAI_API_KEY: string;
  POLYGON_API_KEY: string;
}