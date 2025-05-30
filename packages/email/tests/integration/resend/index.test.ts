import { test, expect } from 'vitest';
import { sendVerificationEmail, sendResetEmail, createContact } from '@repo/email/resend/index';

import dotenv from "dotenv";
dotenv.config();

test('sendVerificationEmail sends an email successfully', {timeout:15_000}, async () => {
  const response = await sendVerificationEmail('support@bayesian-labs.com', 'test-token');
  expect(response.data).toHaveProperty('id');
});

test('sendResetEmail sends an email successfully', async () => {
  const response = await sendResetEmail('support@bayesian-labs.com', 'test-token');
  expect(response.data).toHaveProperty('id');
});

test('createContact adds a contact successfully', async () => {
  const response = await createContact('support@bayesian-labs.com');
  expect(response.data).toHaveProperty('id');
});
