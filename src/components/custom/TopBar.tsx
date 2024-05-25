import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TypingMode, useStore } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileDropDown from "./ProfileDropDown";

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
}: {
    timer: number;
    generateTestFromTopic: (params: { topic: string }) => void;
}) {
    const [topic, setTopic] = useState("Roman empire");
    const { typingMode, setTypingMode } = useStore();

    return (
        <section className="flex h-[30svh] flex-col justify-between bg-secondary py-8">
            <section className="container flex justify-between gap-4">
                <div className="opacity-0">|</div>
                <Tabs
                    defaultValue={typingMode}
                    onValueChange={(mode) => setTypingMode(mode as TypingMode)}>
                    <TabsList>
                        <TabsTrigger value={TypingMode.NORMAL}>
                            Normal
                        </TabsTrigger>
                        <TabsTrigger value={TypingMode.AI_TOPIC_GENERATION}>
                            Knowledge Keys
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        Make changes to your account here.
                    </TabsContent>
                    <TabsContent value="password">
                        Change your password here.
                    </TabsContent>
                </Tabs>
                <ProfileDropDown />
            </section>
            <section className="mx-auto mt-auto flex w-full max-w-[80ch] justify-between">
                <section>
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
                            onClick={() => generateTestFromTopic({ topic })}>
                            Generate
                        </Button>
                    </div>
                </section>
                <section>
                    <small className="ms-auto block w-fit rounded-full border bg-card px-3 py-1 text-base">
                        Time
                    </small>
                    <p className="ms-auto text-end font-mono text-xl underline">
                        {msToTime(timer)}
                    </p>
                    <span>{timer}</span>
                </section>
            </section>
        </section>
    );
}
