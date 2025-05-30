import { describe, test, expect, vi } from "vitest";
import { chatWithAssistant } from "../../../src/openai/assistant";

describe("chatWithAssistant", () => {
  test("returns a valid response on successful API call", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "Hello, how can I help you?" }),
    });

    const response = await chatWithAssistant("Hello");
    expect(response).toBe("Hello, how can I help you?");
  });

  test("returns an error message when the API response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "API error" }),
    });

    const response = await chatWithAssistant("Hello");
    expect(response).toBe("Failed to chat with assistant.");
  });

  test("returns an error message when a network error occurs", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const response = await chatWithAssistant("Hello");
    expect(response).toBe("Sorry, something went wrong.");
  });
});
