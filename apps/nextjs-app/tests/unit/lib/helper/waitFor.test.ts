import { describe, test, expect, vi } from 'vitest';
import { waitFor } from '../../../../lib/helper/waitFor';

describe('waitFor', () => {
  test('resolves after the specified time', async () => {
    vi.useFakeTimers(); // Mock timers

    const promise = waitFor(1000);
    vi.advanceTimersByTime(1000); // Fast-forward time by 1s
    await expect(promise).resolves.toBeUndefined();

    vi.useRealTimers(); // Restore real timers after test
  });

  test('resolves immediately for 0ms delay', async () => {
    await expect(waitFor(0)).resolves.toBeUndefined();
  });
});
