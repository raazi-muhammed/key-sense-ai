import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TypingMode, useStore } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileDropDown from "./ProfileDropDown";
import axios from "axios";

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
}: {
    timer: number;
    generateTestFromTopic: (params: { topic: string }) => void;
    generateTestFromMissed: (params: { letters: string[] }) => void;
}) {
    const [topic, setTopic] = useState("Roman empire");
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
        <section className="h-[30svh] bg-secondary py-8">
            <ProfileDropDown />
            <Tabs
                defaultValue={typingMode}
                onValueChange={(mode) => setTypingMode(mode as TypingMode)}>
                <TabsList className="mx-auto flex w-fit">
                    <TabsTrigger value={TypingMode.NORMAL}>Normal</TabsTrigger>
                    <TabsTrigger value={TypingMode.AI_TOPIC_GENERATION}>
                        Knowledge Keys
                    </TabsTrigger>
                    <TabsTrigger value={TypingMode.AI_MISSED_LETTER_GENERATION}>
                        Precision Practice
                    </TabsTrigger>
                </TabsList>
                <section className="mx-auto mt-auto flex w-full max-w-[80ch] justify-between">
                    <TabsContent value={TypingMode.NORMAL}></TabsContent>
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
                            <Button
                                onClick={() =>
                                    generateTestFromTopic({ topic })
                                }>
                                Generate
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value={TypingMode.AI_MISSED_LETTER_GENERATION}>
                        <small className="block w-fit rounded-full border bg-card px-3 py-1 text-base">
                            Top missed
                        </small>
                        <div className="flex">
                            <section className="flex gap-1">
                                {missedLetters.map((letter) => (
                                    <div className="rounded border bg-card p-1 px-3">
                                        <p className="m-auto">
                                            {letter.letter}
                                        </p>
                                    </div>
                                ))}
                            </section>
                            <Button
                                onClick={() =>
                                    generateTestFromMissed({
                                        letters: missedLetters.map(
                                            (a) => a.letter
                                        ),
                                    })
                                }>
                                Generate
                            </Button>
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
        <section>
            <small className="ms-auto block w-fit rounded-full border bg-card px-3 py-1 text-base">
                Time
            </small>
            <p className="ms-auto text-end font-mono text-xl underline">
                {msToTime(timer)}
            </p>
            <span>{timer}</span>
        </section>
    );
}
