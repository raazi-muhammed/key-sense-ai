import { isAlphanumerical } from "@/lib/typing";
import { MutableRefObject, useRef, useState } from "react";
import { toast as sonner } from "sonner";

export enum AppState {
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    LOADING = "LOADING",
    READY = "READY",
    ERROR = "ERROR",
}

export function useEngine({
    words,
    appState,
}: {
    words: string;
    appState: MutableRefObject<AppState>;
}) {
    const [userTyped, setUserTyped] = useState("");
    const [error, setError] = useState<{ letter: string; when: number } | null>(
        null
    );

    const timerInterval = useRef<any>(null);
    const [missedLetters, setMissedLetters] = useState<string[]>([]);
    const [timer, setTimer] = useState(0);
    const carrot = useRef<any>();

    function scrollIntoView() {
        const { current } = carrot;
        if (current !== null) {
            current?.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

    function handleKeyDown(event: any) {
        const characterTyped: string = event.key;
        const characterTypedCode = characterTyped.charCodeAt(0);

        // Start the test if it isn't already running
        if (appState.current === AppState.READY) {
            sonner("test started");
            setTimer(0);
            setUserTyped("");
            setMissedLetters([]);
            appState.current = AppState.RUNNING;
            timerInterval.current = setInterval(
                () => setTimer((t) => t + 100),
                100
            );
        }

        if (appState.current !== AppState.RUNNING) {
            if (appState.current !== AppState.LOADING) {
                sonner("Test not ready");
            }
            return;
        }

        setUserTyped((prevUserTyped) => {
            const lastLetter = words.charAt(prevUserTyped.length);
            const lastLetterCode = words.charCodeAt(prevUserTyped.length);

            if (characterTyped === "Backspace") {
                return prevUserTyped.substring(0, prevUserTyped.length - 1);
            }

            if (characterTyped === "Enter" && lastLetterCode === 10) {
                return prevUserTyped + String.fromCharCode(10);
            }

            if (characterTyped.length > 1) return prevUserTyped;

            if (characterTypedCode !== lastLetterCode) {
                if (isAlphanumerical(lastLetter)) {
                    setMissedLetters((prevMissedLetters) => [
                        ...prevMissedLetters,
                        lastLetter,
                    ]);
                    const current = new Date();

                    setError({
                        letter: characterTyped,
                        when: current.getMilliseconds(),
                    });
                }
                return prevUserTyped;
            }

            if (prevUserTyped.length + 1 === words.length) {
                appState.current = AppState.COMPLETED;
                sonner("Test finished");
                if (timerInterval.current) clearInterval(timerInterval.current);
            }

            return prevUserTyped + characterTyped;
        });

        scrollIntoView();
    }

    function resetTest() {
        setTimer(0);
        clearInterval(timerInterval.current);
        setUserTyped("");
    }

    return {
        userTyped,
        appState,
        timer,
        handleKeyDown,
        timerInterval,
        carrot,
        missedLetters,
        resetTest,
        error,
    };
}
