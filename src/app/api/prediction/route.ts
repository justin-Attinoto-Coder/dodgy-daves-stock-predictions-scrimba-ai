import { NextRequest, NextResponse } from 'next/server';
import { openaiClient } from '@/lib/openai';
import { polygonClient } from '@/lib/polygon';
import { isValidStockSymbol, normalizeStockSymbol, generateHumorRating } from '@/utils/helpers';
import { StockPrediction } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Support both symbol-based and stockData-based requests
    if (body.stockData) {
      // New report generation logic for challenge
      const openai = await import('openai');
      const client = new openai.default({ apiKey: process.env.OPENAI_API_KEY });
      try {
        const completion = await client.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a financial advisor. Advise whether to buy or sell based on the following stock data.' },
            { role: 'user', content: body.stockData }
          ],
          max_tokens: 300,
        });
        const report = completion.choices[0]?.message?.content || '';
        return NextResponse.json({ report });
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

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