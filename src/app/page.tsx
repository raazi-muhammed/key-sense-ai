"use client";

import { useEffect, useRef } from "react";
import TopBar from "@/components/custom/TopBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Key from "@/components/custom/Key";
import Result from "@/components/custom/Result";
import { useWords } from "@/hooks/useWords";
import { AppState, useEngine } from "@/hooks/useEngine";

export default function Home() {
    const appState = useRef(AppState.LOADING);

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
    } = useEngine({ words, appState });

    useEffect(() => {
        generateNormalTest({ numberOfWords: 50 });
        appState.current = AppState.READY;
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
                generateTestFromTopic={generateTestFromTopic}
                generateTestFromMissed={generateTestFromMissed}
                generateNormalTest={generateNormalTest}
                timer={timer}
            />
            <section>
                <div className="relative mx-auto py-8">
                    {appState.current === AppState.COMPLETED ? (
                        <section className="mx-auto max-w-[80ch]">
                            <Result
                                typedLetters={userTyped}
                                missedLetters={missedLetters}
                                timeTaken={timer}
                            />
                            <section className="mx-auto mt-4 w-fit">
                                <Button
                                    onClick={() => {
                                        generateNormalTest({
                                            numberOfWords: 50,
                                        });
                                    }}>
                                    Restart
                                </Button>
                            </section>
                        </section>
                    ) : appState.current === AppState.LOADING ? (
                        <div className="mx-auto flex max-w-[80ch] flex-col space-y-3 py-16">
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                        </div>
                    ) : appState.current === AppState.READY ||
                      appState.current === AppState.RUNNING ? (
                        <section className="h-[50svh] overflow-y-scroll py-16">
                            <div className="mx-auto max-w-[80ch]">
                                <div className="relative">
                                    <p className="flex flex-wrap font-mono text-3xl opacity-50">
                                        {words.split("").map((key, index) => (
                                            <Key
                                                key={index}
                                                code={key.charCodeAt(0)}
                                            />
                                        ))}
                                    </p>
                                    <p className="absolute inset-0 flex h-fit flex-wrap font-mono text-3xl text-white">
                                        {userTyped
                                            .split("")
                                            .map((key, index) => (
                                                <Key
                                                    key={index}
                                                    code={key.charCodeAt(0)}
                                                />
                                            ))}
                                        <span
                                            ref={carrot}
                                            className="duration-400 -ms-2 animate-pulse">
                                            |
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <p>An error occurred</p>
                    )}
                </div>
            </section>
        </main>
    );
}
