import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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

    return (
        <section className="h-[30svh] bg-accent flex flex-col justify-between py-8">
            <section className="flex justify-center">
                <Button>mode</Button>
            </section>
            <section className="flex justify-between mt-auto  max-w-[80ch] mx-auto w-full">
                <section>
                    <small className="text-base bg-card block w-fit px-3 py-1 rounded-full border">
                        Topic
                    </small>
                    <div className="flex">
                        <Input
                            className="text-xl underline font-mono w-fit bg-accent border-none focus-visible:ring-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-2-none"
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
