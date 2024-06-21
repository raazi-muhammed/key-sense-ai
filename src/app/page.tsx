"use client";

import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/custom/TopBar";
import Result from "@/components/custom/Result";
import { useWords } from "@/hooks/useWords";
import { AppState, useEngine } from "@/hooks/useEngine";
import Loading from "./loading";
import React from "react";
import TypingTest from "@/components/custom/TypingTest";
import ErrorState from "./error";

export default function Home() {
    const appState = useRef(AppState.LOADING);
    const [refresh, setRefresh] = useState(false);

    const {
        words,
        generateNormalTest,
        generateTestFromTopic,
        generateTestFromMissed,
    } = useWords({ appState });

    const {
        handleKeyDown,
        userTyped,
        resetTest,
        timer,
        carrot,
        missedLetters,
        error,
    } = useEngine({ words, appState });

    useEffect(() => {
        generateNormalTest();
        appState.current = AppState.READY;
        setRefresh((r) => !r);
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            resetTest();
        };
    }, [words]);

    return (
        <main>
            <TopBar
                appState={appState}
                generateTestFromTopic={generateTestFromTopic}
                generateTestFromMissed={generateTestFromMissed}
                generateNormalTest={generateNormalTest}
                timer={timer}
            />
            <section key={String(refresh)}>
                <div className="relative mx-auto py-8">
                    {appState.current === AppState.COMPLETED ? (
                        <Result
                            typedLetters={userTyped}
                            missedLetters={missedLetters}
                            timeTaken={timer}
                            generateNormalTest={generateNormalTest}
                        />
                    ) : appState.current === AppState.LOADING ? (
                        <Loading />
                    ) : appState.current === AppState.READY ||
                      appState.current === AppState.RUNNING ? (
                        <TypingTest
                            words={words}
                            userTyped={userTyped}
                            error={error}
                            carrot={carrot}
                        />
                    ) : (
                        <ErrorState />
                    )}
                </div>
            </section>
        </main>
    );
}
