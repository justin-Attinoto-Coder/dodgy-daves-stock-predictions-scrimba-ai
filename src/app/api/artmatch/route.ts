import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { config } from '@/utils/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }
    const openai = new OpenAI({ apiKey: config.openaiApiKey });
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '256x256',
      response_format: 'b64_json'
    });
    const image = response.data[0]?.b64_json || null;
    return NextResponse.json({ image });
  } catch (error) {
    console.error('ArtMatch API error:', error);
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }
}
