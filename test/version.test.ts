import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("VERSION file", () => {
  it("holds a semantic version", () => {
    const version = readFileSync(resolve(process.cwd(), "VERSION"), "utf8").trim();
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
