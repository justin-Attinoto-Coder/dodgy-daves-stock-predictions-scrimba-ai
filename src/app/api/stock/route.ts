import { NextRequest, NextResponse } from 'next/server';
import { polygonClient } from '@/lib/polygon';
import { isValidStockSymbol, normalizeStockSymbol } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbol parameter is required' },
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

    const stockData = await polygonClient.getPreviousClose(normalizedSymbol);

    if (!stockData) {
      return NextResponse.json(
        { error: `No data found for symbol: ${normalizedSymbol}` },
        { status: 404 }
      );
    }

    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Stock API error:', error);
    
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}