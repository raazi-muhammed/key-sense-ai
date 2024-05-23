"use client";

import { toast } from "sonner";
import { faker } from "@faker-js/faker";
import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/custom/TopBar";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Home() {
    const [words, setWords] = useState("");
    const [userTyped, setUserTyped] = useState("");
    const isRunning = useRef(false);
    const timerInterval = useRef<any>(null);
    const [missedLetters, setMissedLetters] = useState<string[]>([]);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        generateWords();
        /* axios.post("/api/type", { topic: "React" }).then((res) => {
            console.log(res.data);
            setWords(res.data.response);
        }); */
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [words]);

    function handleKeyDown(s: any) {
        let interval = null;
        if (!isRunning.current) {
            toast("test started");
            setTimer(0);
            isRunning.current = true;
            timerInterval.current = setInterval(
                () => setTimer((t) => t + 100),
                100
            );
        }
        console.log(s);
        const characterTyped = s.key;
        const characterTypedCode = characterTyped.charCodeAt(0);

        setUserTyped((ut) => {
            const lastLetterCode = words.charCodeAt(ut.length);

            if (characterTyped == "Backspace") {
                return ut.substring(0, ut.length - 1);
            }
            if (characterTyped.length > 1) return ut;

            if (characterTypedCode != lastLetterCode) {
                if (characterTypedCode == 32 && lastLetterCode == 10) {
                    return ut + characterTyped;
                }

                toast("not same");
                setMissedLetters((ml) => [...ml, words.charAt(ut.length)]);
                return ut;
            }
            if (ut.length + 1 === words.length) {
                console.log("inverval cleared");

                isRunning.current = false;
                console.log(interval);

                if (timerInterval.current) clearInterval(timerInterval.current);
            }
            return ut + characterTyped;
        });
    }

    function generateWords() {
        const words = faker.lorem.lines(1);
        setWords(words);
    }

    return (
        <main>
            <TopBar timer={timer} />

            <section>
                <div className="relative max-w-[80ch] mx-auto mt-16">
                    {words.length === userTyped.length ? (
                        <section>
                            <div className="grid gap-4 grid-cols-3">
                                <section className="bg-card border rounded p-4 ">
                                    <p className="">Characters typed</p>
                                    <p className="text-lg">
                                        {userTyped.length}
                                    </p>
                                </section>
                                <section className="bg-card border rounded p-4">
                                    <p className="">Number of missed letters</p>
                                    <p className="text-lg">
                                        {missedLetters.length}
                                    </p>
                                </section>
                                <section className="bg-card border rounded p-4">
                                    <p className="">Missed letters</p>
                                    <p className="text-lg">
                                        {...[new Set(missedLetters)]}
                                    </p>
                                </section>
                            </div>
                            <section className="mx-auto w-fit mt-4">
                                <Button
                                    onClick={() => {
                                        setUserTyped("");
                                        generateWords();
                                    }}>
                                    Restart
                                </Button>
                            </section>
                        </section>
                    ) : (
                        <>
                            <p className="text-3xl font-mono left-0 opacity-50 break-all leading-relaxed">
                                {words}
                            </p>
                            <p className="text-3xl text-white font-mono absolute inset-0 break-all leading-relaxed">
                                {userTyped}
                                <span className="-ms-2 animate-pulse duration-400">
                                    |
                                </span>
                            </p>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
