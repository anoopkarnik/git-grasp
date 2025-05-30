import { describe, test, expect, vi } from 'vitest';
import OpenAI from 'openai';
import { chatCompletion } from '../../../src/openai/chatCompletion';

// Mock OpenAI API
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn().mockResolvedValue({ choices: [{ message: { content: 'Mocked response' } }] }),
      },
    },
  })),
}));

describe('chatCompletion', () => {
  test('constructs messages correctly', async () => {
    const response = await chatCompletion({
      apiKey: 'mock-api-key',
      model: 'gpt-4',
      systemMessage: 'You are a helpful assistant.',
      userMessages: ['Hello', 'How are you?'],
      temperature: 0.7,
    });

    expect(response).toEqual({ choices: [{ message: { content: 'Mocked response' } }] });
  });

  test('throws an error when API key is missing', async () => {
    await expect(
      chatCompletion({
        apiKey: '',
        model: 'gpt-4',
        systemMessage: 'You are a helpful assistant.',
        userMessages: ['Hello'],
        temperature: 0.7,
      })
    ).rejects.toThrow();
  });

  test('handles OpenAI API failures gracefully', async () => {
    vi.mocked(OpenAI).mockImplementationOnce(() => {
      throw new Error('OpenAI API error');
    });

    await expect(
      chatCompletion({
        apiKey: 'mock-api-key',
        model: 'gpt-4',
        systemMessage: 'You are a helpful assistant.',
        userMessages: ['Hello'],
        temperature: 0.7,
      })
    ).rejects.toThrow('OpenAI API error');
  });
});
