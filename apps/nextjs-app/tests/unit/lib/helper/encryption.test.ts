import { describe, test, expect, vi } from 'vitest';
import { symmetricDecrypt, symmetricEncrypt } from '../../../../lib/helper/encryption';


describe('symmetric encryption', () => {

    const encryptionKey = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  test('encrypts and decrypts correctly', () => {
    vi.stubEnv('ENCRYPTION_KEY', encryptionKey); // 32-byte hex key

    const originalText = "Hello World";
    const encryptedText = symmetricEncrypt(originalText);
    const decryptedText = symmetricDecrypt(encryptedText);

    expect(decryptedText).toBe(originalText);

    vi.unstubAllEnvs(); // Cleanup mock
  });

  test('throws error when ENCRYPTION_KEY is missing', () => {
    vi.stubEnv('ENCRYPTION_KEY', ''); // Simulate missing key

    expect(() => symmetricEncrypt("test")).toThrowError("ENCRYPTION_KEY not found");
    expect(() => symmetricDecrypt("someencrypteddata")).toThrowError("ENCRYPTION_KEY not found");

    vi.unstubAllEnvs();
  });

  test('produces different encrypted values for same input', () => {
    vi.stubEnv('ENCRYPTION_KEY', encryptionKey);

    const text = "Sensitive Data";
    const encrypted1 = symmetricEncrypt(text);
    const encrypted2 = symmetricEncrypt(text);

    expect(encrypted1).not.toBe(encrypted2); // Should be different due to random IV

    vi.unstubAllEnvs();
  });
});
