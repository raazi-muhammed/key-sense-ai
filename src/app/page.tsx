"use client";

import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/custom/TopBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Key from "@/components/custom/Key";
import Result from "@/components/custom/Result";
import { useWords } from "@/hooks/useWords";
import { AppState, useEngine } from "@/hooks/useEngine";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

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
                        <section className="mx-auto max-w-[80ch]">
                            <Result
                                typedLetters={userTyped}
                                missedLetters={missedLetters}
                                timeTaken={timer}
                            />
                            <section className="mx-auto mt-8 w-fit">
                                <Button
                                    onClick={() => {
                                        generateNormalTest();
                                    }}>
                                    <RotateCcw
                                        className="me-2"
                                        size={"1.3em"}
                                    />
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
                                        <div className="flex">
                                            <span
                                                ref={carrot}
                                                className="duration-400 -ms-2 animate-pulse">
                                                |
                                            </span>
                                            {!!error && (
                                                <motion.span
                                                    key={`${error.when.toString()}-${
                                                        error.letter
                                                    }`}
                                                    animate={{
                                                        opacity: [0, 1, 0],
                                                        y: [0, 0, 20],
                                                        scale: [0.5, 1, 1],
                                                    }}
                                                    transition={{
                                                        duration: 0.7,
                                                    }}
                                                    className="my-1 -ms-2 block h-10 w-6 rounded-[.25em] border border-red-700 bg-red-950 text-red-500">
                                                    {error?.letter}
                                                </motion.span>
                                            )}
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <p className="text-center text-muted-foreground">
                            An error occurred, try regenerating the test
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
