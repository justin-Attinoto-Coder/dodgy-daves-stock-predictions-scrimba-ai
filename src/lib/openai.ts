import { OpenAIMessage, OpenAIResponse } from '@/types';
import { getEnvConfig } from '@/utils/config';

class OpenAIClient {
  private apiKey?: string;
  private baseUrl = 'https://api.openai.com/v1';

  private getApiKey(): string {
    if (!this.apiKey) {
      const config = getEnvConfig();
      this.apiKey = config.OPENAI_API_KEY;
    }
    return this.apiKey;
  }

  /**
   * Makes a chat completion request to OpenAI
   */
  async createChatCompletion(
    messages: OpenAIMessage[],
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    } = {}
  ): Promise<OpenAIResponse> {
    const {
      model = 'gpt-3.5-turbo',
      temperature = 0.8,
      maxTokens = 150,
    } = options;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getApiKey()}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `OpenAI API error: ${response.status} - ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      return data as OpenAIResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create chat completion: ${error.message}`);
      }
      throw new Error('Failed to create chat completion: Unknown error');
    }
  }

  /**
   * Generates a humorous stock prediction using OpenAI
   */
  async generateStockPrediction(
    symbol: string,
    stockData?: {
      price: number;
      change: number;
      volume: number;
    }
  ): Promise<string> {
    const stockInfo = stockData
      ? `Current price: $${stockData.price}, Change: ${stockData.change}%, Volume: ${stockData.volume}`
      : 'No current data available';

    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `You are "Dodgy Dave", a hilariously unreliable stock market predictor. Your predictions are creative, funny, and obviously not real financial advice. You use questionable logic, random events, and absurd reasoning to make your predictions. Always include a humorous disclaimer that your advice should not be taken seriously.`,
      },
      {
        role: 'user',
        content: `Give me a funny, obviously fake stock prediction for ${symbol}. ${stockInfo}. Keep it entertaining but clearly mark it as humor, not real financial advice.`,
      },
    ];

    const response = await this.createChatCompletion(messages, {
      temperature: 0.9,
      maxTokens: 200,
    });

    const prediction = response.choices[0]?.message?.content;
    if (!prediction) {
      throw new Error('No prediction generated');
    }

    return prediction;
  }
}

// Export singleton instance
export const openaiClient = new OpenAIClient();