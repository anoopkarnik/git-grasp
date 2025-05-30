import { describe, test, expect } from "vitest";
import { chatWithAssistant } from "../../../src/openai/assistant";

import dotenv from "dotenv";
dotenv.config();

describe("chatWithAssistant (Integration Test)",{timeout: 15_000}, () => {
  test("fetches a real response from OpenAI API", async () => {
    const response = await chatWithAssistant("Tell me a joke.");
    expect(response).toBeDefined();
  });
});
