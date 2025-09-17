import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import config from '@/utils/config';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export async function POST(req: NextRequest) {
  const { topic, complexity = '10-year-old', length = 'short' } = await req.json();

  const prompt = `Explain ${topic} to a ${complexity}. Make it ${length}.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: length === 'long' ? 500 : 150,
    });
    const explanation = completion.choices[0]?.message?.content || '';
    return NextResponse.json({ explanation });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
