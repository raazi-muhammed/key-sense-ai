"use client";

import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/custom/TopBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Key from "@/components/custom/Key";
import { TestGenerator } from "@/services/testGenerator";

export default function Home() {
    const [words, setWords] = useState("");
    const [userTyped, setUserTyped] = useState("");
    const isRunning = useRef(false);
    const timerInterval = useRef<any>(null);
    const [missedLetters, setMissedLetters] = useState<string[]>([]);
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    const carrot = useRef<any>();

    function scrollIntoView() {
        const { current } = carrot;
        if (current !== null) {
            current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

    function generateTestFromTopic({ topic }: { topic: string }) {
        if (loading) {
            toast("Already generating content");
            return;
        }
        setLoading(true);

        const generator = new TestGenerator();
        generator
            .topicTest(topic)
            .then((words) => {
                setWords(words);
                setUserTyped("");
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        generateWords();
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [words]);

    function handleKeyDown(s: any) {
        if (!isRunning.current) {
            toast("test started");
            setTimer(0);
            isRunning.current = true;
            timerInterval.current = setInterval(
                () => setTimer((t) => t + 100),
                100
            );
        }
        const characterTyped = s.key;
        const characterTypedCode = characterTyped.charCodeAt(0);

        scrollIntoView();
        setUserTyped((ut) => {
            const lastLetterCode = words.charCodeAt(ut.length);

            if (characterTyped == "Backspace") {
                return ut.substring(0, ut.length - 1);
            }

            if (characterTyped == "Enter" && lastLetterCode == 10) {
                return ut + String.fromCharCode(10);
            }

            if (characterTyped.length > 1) return ut;

            if (characterTypedCode != lastLetterCode) {
                toast("not same");
                setMissedLetters((ml) => [...ml, words.charAt(ut.length)]);
                return ut;
            }
            if (ut.length + 1 === words.length) {
                isRunning.current = false;

                if (timerInterval.current) clearInterval(timerInterval.current);
            }
            return ut + characterTyped;
        });
    }

    function generateWords() {
        const generator = new TestGenerator();
        setWords(generator.normalTest());
    }

    return (
        <main>
            <TopBar
                generateTestFromTopic={generateTestFromTopic}
                timer={timer}
            />
            <section>
                <div className="relative mx-auto max-w-[80ch]">
                    {words.length === userTyped.length ? (
                        <section>
                            <div className="grid grid-cols-3 gap-4">
                                <section className="rounded border bg-card p-4">
                                    <p className="">Characters typed</p>
                                    <p className="text-lg">
                                        {userTyped.length}
                                    </p>
                                </section>
                                <section className="rounded border bg-card p-4">
                                    <p className="">Number of missed letters</p>
                                    <p className="text-lg">
                                        {missedLetters.length}
                                    </p>
                                </section>
                                <section className="rounded border bg-card p-4">
                                    <p className="">Missed letters</p>
                                    <p className="text-lg">
                                        {...[new Set(missedLetters)]}
                                    </p>
                                </section>
                            </div>
                            <section className="mx-auto mt-4 w-fit">
                                <Button
                                    onClick={() => {
                                        setUserTyped("");
                                        generateWords();
                                    }}>
                                    Restart
                                </Button>
                            </section>
                        </section>
                    ) : loading ? (
                        <div className="flex flex-col space-y-3 py-16">
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
                        </div>
                    ) : (
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
                    )}
                </div>
            </section>
        </main>
    );
}
