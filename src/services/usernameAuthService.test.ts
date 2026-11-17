import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getDoc: vi.fn(),
  setDoc: vi.fn(),
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn((_db: unknown, ...path: string[]) => ({ path: path.join("/") })),
  getDoc: mocks.getDoc,
  serverTimestamp: vi.fn(() => "SERVER_TS"),
  setDoc: mocks.setDoc,
}));
vi.mock("../firebase/firestore", () => ({ db: {} }));

import {
  getUsernameAuthGatewayConfig,
  getUsernameAuthGatewayUrl,
  saveUsernameAuthGatewayUrl,
} from "./usernameAuthService";

const snapshot = (data?: Record<string, unknown>) => ({
  exists: () => Boolean(data),
  data: () => data ?? {},
});

beforeEach(() => {
  mocks.getDoc.mockReset();
  mocks.setDoc.mockReset();
});

describe("usernameAuthService", () => {
  it("prefers the dedicated username sign-in URL over image hosting", async () => {
    mocks.getDoc
      .mockResolvedValueOnce(snapshot({ workerUrl: "https://auth.example.workers.dev" }))
      .mockResolvedValueOnce(snapshot({ workerUrl: "https://images.example.workers.dev" }));

    await expect(getUsernameAuthGatewayConfig()).resolves.toEqual({
      workerUrl: "https://auth.example.workers.dev",
      source: "dedicated",
    });
    expect(mocks.getDoc).toHaveBeenCalledTimes(1);
  });

  it("uses the image-hosting URL only as a migration fallback", async () => {
    mocks.getDoc
      .mockResolvedValueOnce(snapshot())
      .mockResolvedValueOnce(snapshot({ workerUrl: "https://legacy.example.workers.dev" }));

    await expect(getUsernameAuthGatewayUrl()).resolves.toBe("https://legacy.example.workers.dev");
  });

  it("returns null when neither configuration exists", async () => {
    mocks.getDoc.mockResolvedValue(snapshot());
    await expect(getUsernameAuthGatewayUrl()).resolves.toBeNull();
  });

  it("rejects non-HTTPS URLs and saves a normalized dedicated setting", async () => {
    await expect(saveUsernameAuthGatewayUrl("http://gateway.example")).rejects.toThrow(/HTTPS/);
    await saveUsernameAuthGatewayUrl(" https://gateway.example.workers.dev/// ");
    expect(mocks.setDoc).toHaveBeenCalledWith(
      { path: "settings/usernameSignIn" },
      { workerUrl: "https://gateway.example.workers.dev", updatedAt: "SERVER_TS" },
    );
  });

  it("does not expose an image-hosting configuration read error as a valid URL", async () => {
    mocks.getDoc.mockRejectedValue(new Error("permission-denied"));
    await expect(getUsernameAuthGatewayConfig()).resolves.toEqual({
      workerUrl: "",
      source: "missing",
    });
  });
});
