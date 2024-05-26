import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { TypingMode, useStore } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileDropDown from "./ProfileDropDown";
import axios from "axios";
import { Crosshair, GraduationCap, Keyboard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MotionButton, normal } from "../animated/button";

function msToTime(milliseconds: number) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}

export default function TopBar({
    timer,
    generateTestFromTopic,
    generateTestFromMissed,
    generateNormalTest,
}: {
    timer: number;
    generateTestFromTopic: (params: { topic: string }) => void;
    generateTestFromMissed: (params: { letters: string[] }) => void;
    generateNormalTest: (params: { numberOfWords: number }) => void;
}) {
    const [topic, setTopic] = useState("Touch typing");
    const [numberOfWords, setNumberOfWords] = useState<number>(50);
    const { typingMode, setTypingMode } = useStore();
    const [missedLetters, setMissedLetters] = useState<{ letter: string }[]>(
        []
    );
    useEffect(() => {
        axios.get("/api/tests/reports/missed").then((res) => {
            console.log(res);

            setMissedLetters(res.data.report);
        });
    }, []);

    return (
        <section className="flex h-[30svh] flex-col justify-between bg-secondary py-8">
            <header className="container flex justify-end">
                <ProfileDropDown />
            </header>
            <Tabs
                className="flex h-full flex-col justify-between pb-4"
                defaultValue={typingMode}
                onValueChange={(mode) => setTypingMode(mode as TypingMode)}>
                <TabsList className="mx-auto flex w-fit">
                    <TabsTrigger value={TypingMode.NORMAL}>
                        <Keyboard size="1.2em" className="me-2" />
                        Normal
                    </TabsTrigger>
                    <TabsTrigger value={TypingMode.AI_TOPIC_GENERATION}>
                        <GraduationCap size="1.2em" className="me-2" />
                        Knowledge Keys
                    </TabsTrigger>
                    <TabsTrigger value={TypingMode.AI_MISSED_LETTER_GENERATION}>
                        <Crosshair size="1.2em" className="me-2" />
                        Precision Practice
                    </TabsTrigger>
                </TabsList>
                <section className="mx-auto mt-auto flex w-full max-w-[80ch] justify-between">
                    <TabsContent value={TypingMode.NORMAL}>
                        <small className="block w-fit rounded-full border bg-card px-3 py-1 text-base">
                            No of words
                        </small>
                        <div className="flex">
                            <Input
                                className="focus-visible:ring-none focus-visible:ring-2-none w-fit border-none bg-secondary font-mono text-xl underline focus-visible:border-none focus-visible:outline-none"
                                value={numberOfWords}
                                onChange={(e) => {
                                    if (isNaN(Number(e.target.value))) return;
                                    setNumberOfWords(Number(e.target.value));
                                }}
                            />
                            <GenerateButton
                                onClick={() =>
                                    generateNormalTest({ numberOfWords })
                                }
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value={TypingMode.AI_TOPIC_GENERATION}>
                        <small className="block w-fit rounded-full border bg-card px-3 py-1 text-base">
                            Topic
                        </small>
                        <div className="flex">
                            <Input
                                className="focus-visible:ring-none focus-visible:ring-2-none w-fit border-none bg-secondary font-mono text-xl underline focus-visible:border-none focus-visible:outline-none"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                            <GenerateButton
                                onClick={() => generateTestFromTopic({ topic })}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value={TypingMode.AI_MISSED_LETTER_GENERATION}>
                        <small className="block w-fit rounded-full border bg-card px-3 py-1 text-base">
                            Top missed
                        </small>
                        <div className="flex">
                            <Input
                                className="focus-visible:ring-none focus-visible:ring-2-none w-fit border-none bg-secondary font-mono text-xl underline focus-visible:border-none focus-visible:outline-none"
                                value={missedLetters
                                    .map((letter) => letter.letter)
                                    .join(",")}
                            />
                            <GenerateButton
                                onClick={() =>
                                    generateTestFromMissed({
                                        letters: missedLetters.map(
                                            (a) => a.letter
                                        ),
                                    })
                                }
                            />
                        </div>
                    </TabsContent>
                    <Timer timer={timer} />
                </section>
            </Tabs>
        </section>
    );
}

function Timer({ timer }: { timer: number }) {
    return (
        <section className="mt-auto">
            <small className="ms-auto block w-fit rounded-full border bg-card px-3 py-1 text-base">
                Time
            </small>
            <div className="ms-auto flex overflow-hidden text-end font-mono text-xl underline">
                {msToTime(timer)
                    .split("")
                    .map((letter, index) => (
                        <motion.p
                            key={`${letter}-${index}`}
                            initial={{ y: -12 }}
                            animate={{ y: 0 }}>
                            {letter}
                        </motion.p>
                    ))}
            </div>
        </section>
    );
}

function GenerateButton({
    onClick,
    className = "",
}: {
    onClick: Function;
    className?: string;
}) {
    return (
        <MotionButton
            variants={normal}
            whileTap="tap"
            animate="show"
            whileHover="hover"
            className={className}
            size="sm"
            onClick={(e) => {
                e.currentTarget.blur();
                onClick();
            }}>
            <Sparkles className="me-2" size="1.4em" />
            Generate
        </MotionButton>
    );
}
