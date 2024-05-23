import React from "react";
import { Button } from "../ui/button";

function msToTime(milliseconds: number) {
    // Calculate minutes and seconds from milliseconds
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    // Ensure double-digit formatting for minutes and seconds (leading zero if necessary)
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}

export default function TopBar({ timer }: { timer: number }) {
    return (
        <section className="min-h-72 bg-muted/50 flex flex-col justify-between py-8">
            <section className="flex justify-center">
                <Button>mode</Button>
            </section>
            <section className="flex justify-between mt-auto  max-w-[80ch] mx-auto w-full">
                <section>
                    <small className="text-base bg-card block w-fit px-3 py-1 rounded-full border">
                        Topic
                    </small>
                    <p className="text-xl underline font-mono">Roman empire</p>
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
