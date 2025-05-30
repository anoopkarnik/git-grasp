import { describe, it, expect, vi,beforeEach } from 'vitest';
import { sendVerificationEmail, sendResetEmail, createContact } from '@repo/email/resend/index';

// Create a global mock instance
const mockSend = vi.fn();
const mockCreate = vi.fn();
const mockResend = {
  emails: { send: mockSend },
  contacts: { create: mockCreate }
};

// Mock the Resend class globally
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => mockResend),
}));

describe('resend Unit Tests', () => {

  beforeEach(() => {
      // Reset mocks before each test to avoid conflicts
      mockSend.mockClear();
      mockCreate.mockClear();

      // Set environment variables
      process.env.NEXT_PUBLIC_URL = 'https://example.com';
      process.env.RESEND_API_KEY = 'test-api-key';
      process.env.NEXT_PUBLIC_SUPPORT_MAIL = 'support@example.com';
      process.env.RESEND_AUDIENCE_ID = 'test-audience-id';
  });

  // Unit test: Verify function calls and parameters
  it('should send verification email with correct parameters', async () => {
    const testEmail = 'user@example.com';
    const testToken = 'test-verification-token';
    await sendVerificationEmail(testEmail, testToken);

    // Verify Resend was called with correct parameters
    expect(mockSend).toHaveBeenCalledWith({
      from: process.env.NEXT_PUBLIC_SUPPORT_MAIL,
      to: testEmail,
      subject: 'Verify Your Email Address',
      react: expect.any(Object) // Checking the React component
    });
  });

  // Unit test: Verify function calls and parameters
  it('should send reset email with correct parameters', async () => {

    const testEmail = 'user@example.com';
    const testToken = 'test-verification-token';
    await sendResetEmail(testEmail, testToken);

    // Verify Resend was called with correct parameters
    expect(mockSend).toHaveBeenCalledWith({
      from: process.env.NEXT_PUBLIC_SUPPORT_MAIL,
      to: testEmail,
      subject: 'Verify Your Email Address',
      react: expect.any(Object) // Checking the React component
    });
  });

  // Unit test: Verify function calls and parameters
  it('should add contact ', async () => {

    const testEmail = 'user@example.com';
    await createContact(testEmail);

    // Verify Resend was called with correct parameters
    expect(mockCreate).toHaveBeenCalledWith({
      email: testEmail,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
  });
});