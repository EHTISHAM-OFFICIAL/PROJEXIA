import { afterEach, describe, expect, it, vi } from "vitest";
import { lookupGeneralKnowledge } from "./helpOnlineKnowledge";
import type { HelpResponse } from "./helpBot";

const FALLBACK: HelpResponse = {
  answer:
    "I don't have a specific answer for that yet. You can use the Project Request form or contact ProjexiaHub directly for a real reply.",
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("online general knowledge fallback", () => {
  it("keeps a confident local answer and does not make a network request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const localAnswer: HelpResponse = { answer: "Arduino is an open-source electronics platform." };
    const result = await lookupGeneralKnowledge("What is Arduino?", localAnswer);

    expect(result).toBe(localAnswer);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("never sends ProjexiaHub business questions to public sources", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await lookupGeneralKnowledge(
      "What is the project request price?",
      FALLBACK,
    );

    expect(result).toBe(FALLBACK);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("looks up an unfamiliar general concept and returns a cited answer", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          query: {
            search: [{ pageid: 123, title: "Human interface device" }],
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          query: {
            pages: {
              "123": {
                pageid: 123,
                title: "Human interface device",
                extract:
                  "A human interface device is a type of computer device that interacts directly with humans and takes input from or provides output to humans.",
              },
            },
          },
        }),
      });

    vi.stubGlobal("fetch", fetchMock);

    const result = await lookupGeneralKnowledge("What is USB HID?", FALLBACK);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.answer).toContain("Human interface device");
    expect(result.answer).toContain("general reference information");
    expect(result.source?.label).toContain("Wikipedia");
    expect(result.source?.url).toBe("https://en.wikipedia.org/?curid=123");
  });

  it("falls back safely when the public source is unavailable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network unavailable")),
    );

    const result = await lookupGeneralKnowledge("What is UART?", FALLBACK);

    expect(result).toBe(FALLBACK);
  });
});
