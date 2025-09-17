import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import config from '@/utils/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, language } = body;
    if (!text || !language) {
      return NextResponse.json({ error: 'Missing text or language' }, { status: 400 });
    }
    const openai = new OpenAI({ apiKey: config.openaiApiKey });
    // Prompt for translation
    const prompt = `Translate the following text to ${language}:
"${text}"`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a perfect translation assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 100,
    });
    const translation = completion.choices[0]?.message?.content?.trim() || '';
    // Optionally generate image (disabled by default)
    // const imageResponse = await openai.images.generate({ prompt: `A cartoon bird speaking ${language}`, n: 1, size: '256x256', response_format: 'b64_json' });
    // const image = imageResponse.data[0]?.b64_json || null;
    return NextResponse.json({ translation });
  } catch (error) {
    // Log full error details for debugging
    console.error('Pollyglot API error:', error);
    let errorMessage = 'Translation failed';
    const err = error as any;
    if (err?.response?.data) {
      errorMessage += ': ' + JSON.stringify(err.response.data);
    } else if (err?.message) {
      errorMessage += ': ' + err.message;
    } else if (typeof err === 'string') {
      errorMessage += ': ' + err;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
