import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function explain(topic, complexity = '10-year-old', length = 'short') {
  const prompt = `Explain ${topic} to a ${complexity}. Make it ${length}.`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: length === 'long' ? 500 : 150,
  });
  console.log(completion.choices[0]?.message?.content || '');
}

explain('Quantum Computing', '10-year-old', 'short');
