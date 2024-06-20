import { describe, expect, it } from "@jest/globals";

import {
    findTypingSpeed,
    findTypingAccuracy,
    isAlphanumerical,
} from "../typing";

describe("Typing speed and accuracy functions", () => {
    describe("findTypingSpeed", () => {
        it("should calculate WPM correctly for valid inputs", () => {
            expect(findTypingSpeed(60, 60000)).toBe(12);
            expect(findTypingSpeed(120, 120000)).toBe(12);
        });

        it("should handle edge cases", () => {
            expect(findTypingSpeed(0, 60000)).toBe(0);
            expect(findTypingSpeed(10, 0)).toBe(Infinity);
        });

        it("should round down the WPM value", () => {
            expect(findTypingSpeed(59, 60000)).toBe(11);
        });
    });

    describe("findTypingAccuracy", () => {
        it("should calculate accuracy correctly for valid inputs", () => {
            expect(findTypingAccuracy(60, 0)).toBe(100);
            expect(findTypingAccuracy(100, 10)).toBe(90);
        });

        it("should handle edge cases", () => {
            expect(findTypingAccuracy(0, 0)).toBe(100);
            expect(findTypingAccuracy(10, 15)).toBe(0);
        });

        it("should round down the accuracy value to one decimal place", () => {
            expect(findTypingAccuracy(80, 8)).toBe(90);
        });
    });

    describe("isAlphanumerical", () => {
        it("should identify alphanumeric strings correctly", () => {
            expect(isAlphanumerical("hello123")).toBe(true);
            expect(isAlphanumerical("JavaScript")).toBe(true);
            expect(isAlphanumerical("404NotFound")).toBe(true);
        });

        it("should reject non-alphanumeric strings", () => {
            expect(isAlphanumerical("hello world!")).toBe(false);
            expect(isAlphanumerical("specialChars#")).toBe(false);
            expect(isAlphanumerical("")).toBe(false);
        });
    });
});
