import { renderHook, act } from "@testing-library/react";
import { describe, expect, beforeEach, test, jest } from "@jest/globals";
import { AppState, useEngine } from "../useEngine";

jest.mock("sonner", () => jest.fn());

describe("useEngine", () => {
    const words = "hello world";
    let appState: { current: AppState };

    beforeEach(() => {
        appState = { current: AppState.READY };
    });

    test("should initialize with correct default values", () => {
        const { result } = renderHook(() => useEngine({ words, appState }));

        expect(result.current.userTyped).toBe("");
        expect(result.current.timer).toBe(0);
        expect(result.current.missedLetters).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    test("should start test on key down when app state is READY", () => {
        const { result } = renderHook(() => useEngine({ words, appState }));

        act(() => {
            result.current.handleKeyDown({ key: "h" });
        });

        expect(appState.current).toBe(AppState.RUNNING);
        expect(result.current.timer).toBeGreaterThanOrEqual(0);
        expect(result.current.userTyped).toBe("h");
    });

    test("should handle correct key presses", () => {
        appState.current = AppState.RUNNING;
        const { result } = renderHook(() => useEngine({ words, appState }));

        act(() => {
            result.current.handleKeyDown({ key: "h" });
            result.current.handleKeyDown({ key: "e" });
        });

        expect(result.current.userTyped).toBe("he");
        expect(result.current.missedLetters).toEqual([]);
        expect(result.current.error).toBeNull();
    });
});
