import { describe, test, expect } from 'vitest';
import { chatCompletion } from '../../../src/openai/chatCompletion';
import dotenv from "dotenv";
dotenv.config();

describe('chatCompletion (Integration Test)',{timeout: 15_000}, () => {
  test('fetches real response from OpenAI', async () => {
    const response = await chatCompletion({
      apiKey: process.env.OPENAI_API_KEY!,
      model: 'gpt-4',
      systemMessage: 'You are a helpful assistant.',
      userMessages: ['Hello, how can I improve my JavaScript skills? Answer in single lineq'],
      temperature: 0.7,
    });

    expect(response).toHaveProperty('choices');
  });
});
