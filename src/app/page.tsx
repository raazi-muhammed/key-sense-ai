"use client";

import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/custom/TopBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Key from "@/components/custom/Key";
import Result from "@/components/custom/Result";
import { useWords } from "@/hooks/useWords";

enum AppState {
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    LOADING = "LOADING",
    READY = "READY",
}

export default function Home() {
    const appState = useRef(AppState.READY);
    const {
        words,
        generateNormalTest,
        generateTestFromTopic,
        generateTestFromMissed,
    } = useWords(setTestWords);
    const [userTyped, setUserTyped] = useState("");
    const timerInterval = useRef<any>(null);
    const [missedLetters, setMissedLetters] = useState<string[]>([]);
    const [timer, setTimer] = useState(0);
    const carrot = useRef<any>();

    function scrollIntoView() {
        const { current } = carrot;
        if (current !== null) {
            current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

    async function setTestWords(
        test: Promise<string>
    ): Promise<undefined | string> {
        if (appState.current === AppState.LOADING) {
            toast("Already generating content");
            return;
        }

        appState.current = AppState.LOADING;

        return test
            .then((words) => {
                setUserTyped("");
                return words;
            })
            .finally(() => {
                appState.current = AppState.READY;
                setTimer(0);
            });
    }

    useEffect(() => {
        generateNormalTest({ numberOfWords: 50 });
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(timerInterval.current);
        };
    }, [words]);

    function handleKeyDown(event: any) {
        const characterTyped = event.key;
        const characterTypedCode = characterTyped.charCodeAt(0);

        // Start the test if it isn't already running
        if (appState.current === AppState.READY) {
            toast("test started");
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
            toast("Test not ready");
            return;
        }

        setUserTyped((prevUserTyped) => {
            const lastLetterCode = words.charCodeAt(prevUserTyped.length);

            if (characterTyped === "Backspace") {
                return prevUserTyped.substring(0, prevUserTyped.length - 1);
            }

            if (characterTyped === "Enter" && lastLetterCode === 10) {
                return prevUserTyped + String.fromCharCode(10);
            }

            if (characterTyped.length > 1) return prevUserTyped;

            if (characterTypedCode !== lastLetterCode) {
                toast("not same");
                setMissedLetters((prevMissedLetters) => [
                    ...prevMissedLetters,
                    words.charAt(prevUserTyped.length),
                ]);
                return prevUserTyped;
            }

            if (prevUserTyped.length + 1 === words.length) {
                appState.current = AppState.COMPLETED;
                toast("Test finished");
                if (timerInterval.current) clearInterval(timerInterval.current);
            }

            return prevUserTyped + characterTyped;
        });

        scrollIntoView();
    }

    return (
        <main>
            <TopBar
                generateTestFromTopic={generateTestFromTopic}
                generateTestFromMissed={generateTestFromMissed}
                generateNormalTest={generateNormalTest}
                timer={timer}
            />
            <section>
                <div className="relative mx-auto max-w-[80ch] py-8">
                    {appState.current === AppState.COMPLETED ? (
                        <section>
                            <Result
                                typedLetters={userTyped}
                                missedLetters={missedLetters}
                                timeTaken={timer}
                            />
                            <section className="mx-auto mt-4 w-fit">
                                <Button
                                    onClick={() => {
                                        setUserTyped("");
                                        generateNormalTest({
                                            numberOfWords: 50,
                                        });
                                    }}>
                                    Restart
                                </Button>
                            </section>
                        </section>
                    ) : appState.current === AppState.LOADING ? (
                        <div className="flex flex-col space-y-3 py-16">
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                        </div>
                    ) : appState.current === AppState.READY ||
                      appState.current === AppState.RUNNING ? (
                        <section className="h-[50svh] overflow-y-scroll py-16">
                            <div className="relative">
                                <p className="flex flex-wrap font-mono text-3xl opacity-50">
                                    {words.split("").map((key) => (
                                        <Key code={key.charCodeAt(0)} />
                                    ))}
                                </p>
                                <p className="absolute inset-0 flex h-fit flex-wrap font-mono text-3xl text-white">
                                    {userTyped.split("").map((key) => (
                                        <Key code={key.charCodeAt(0)} />
                                    ))}
                                    <span
                                        ref={carrot}
                                        className="duration-400 -ms-2 animate-pulse">
                                        |
                                    </span>
                                </p>
                            </div>
                        </section>
                    ) : (
                        <p>Null</p>
                    )}
                </div>
            </section>
        </main>
    );
}
