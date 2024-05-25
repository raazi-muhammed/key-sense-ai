import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TypingMode, useStore } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <section className="h-[30svh] bg-secondary flex flex-col justify-between py-8">
            <section className="flex justify-center">
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
            </section>
            <section className="flex justify-between mt-auto  max-w-[80ch] mx-auto w-full">
                <section>
                    <small className="text-base bg-card block w-fit px-3 py-1 rounded-full border">
                        Topic
                    </small>
                    <div className="flex">
                        <Input
                            className="text-xl underline font-mono w-fit bg-secondary border-none focus-visible:ring-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-2-none"
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
                    <small className="text-base bg-card block w-fit px-3 py-1 rounded-full border ms-auto">
                        Time
                    </small>
                    <p className="text-xl underline font-mono ms-auto text-end">
                        {msToTime(timer)}
                    </p>
                    <span>{timer}</span>
                </section>
            </section>
        </section>
    );
}
