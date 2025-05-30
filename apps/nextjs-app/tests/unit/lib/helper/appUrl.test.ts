import { describe, test, expect, vi } from 'vitest';
import { getAppUrl } from '../../../../lib/helper/appUrl';

describe('getAppUrl', () => {
  test('returns correct URL when NEXT_PUBLIC_URL is set', () => {
    vi.stubEnv('NEXT_PUBLIC_URL', 'https://example.com');

    const url = getAppUrl('dashboard');
    expect(url).toBe('https://example.com/dashboard');

    vi.unstubAllEnvs(); // Cleanup after test
  });

  test('returns undefined path if NEXT_PUBLIC_URL is missing', () => {
    vi.stubEnv('NEXT_PUBLIC_URL', ''); // Simulating missing env variable

    const url = getAppUrl('dashboard');
    expect(url).toBe('/dashboard');

    vi.unstubAllEnvs();
  });

  test('handles empty path correctly', () => {
    vi.stubEnv('NEXT_PUBLIC_URL', 'https://example.com');

    const url = getAppUrl('');
    expect(url).toBe('https://example.com/');

    vi.unstubAllEnvs();
  });
});
