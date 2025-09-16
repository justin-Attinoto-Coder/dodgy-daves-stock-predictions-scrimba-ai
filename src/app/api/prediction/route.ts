import { NextRequest, NextResponse } from 'next/server';
import { openaiClient } from '@/lib/openai';
import { polygonClient } from '@/lib/polygon';
import { isValidStockSymbol, normalizeStockSymbol, generateHumorRating } from '@/utils/helpers';
import { StockPrediction } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol } = body;

    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbol is required' },
        { status: 400 }
      );
    }

    const normalizedSymbol = normalizeStockSymbol(symbol);

    if (!isValidStockSymbol(normalizedSymbol)) {
      return NextResponse.json(
        { error: 'Invalid stock symbol format' },
        { status: 400 }
      );
    }

    // Get stock data (optional - prediction will work without it)
    let stockData = null;
    try {
      stockData = await polygonClient.getPreviousClose(normalizedSymbol);
    } catch (error) {
      console.warn('Could not fetch stock data, proceeding without it:', error);
    }

    // Generate prediction
    const stockInfo = stockData ? {
      price: stockData.price,
      change: stockData.changePercent,
      volume: stockData.volume,
    } : undefined;

    const predictionText = await openaiClient.generateStockPrediction(normalizedSymbol, stockInfo);
    
    // Generate confidence and humor rating
    const humorRating = generateHumorRating();
    let confidence: 'low' | 'medium' | 'high';
    
    if (humorRating >= 8) {
      confidence = 'low'; // Very funny = very unreliable
    } else if (humorRating >= 5) {
      confidence = 'medium';
    } else {
      confidence = 'high'; // Less funny = more "reliable" (still not real advice!)
    }

    const prediction: StockPrediction = {
      symbol: normalizedSymbol,
      prediction: predictionText,
      confidence,
      humorRating,
      timestamp: new Date(),
    };

    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Prediction API error:', error);
    
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}