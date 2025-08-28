import { describe, it, expect } from "vitest";

describe("Example test suite", () => {
  it("should pass basic arithmetic", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string operations", () => {
    expect("Event".concat("Konnect")).toBe("EventKonnect");
  });

  it("should work with arrays", () => {
    const features = ["responsive", "modern", "accessible"];
    expect(features).toHaveLength(3);
    expect(features).toContain("modern");
  });
});
