import React from "react";
import { Card } from "../ui/card";

export default function KeyReport({
    report,
}: {
    report: { typedCount: number; letter: string; missedCount: number }[];
}) {
    return (
        <>
            {report.length > 0 ? (
                <section className="container mx-auto flex w-fit flex-wrap justify-center gap-1">
                    {report.map((letter) => (
                        <Card
                            key={letter.letter}
                            className="relative aspect-square w-14 place-items-center p-2 font-mono">
                            <p className="m-0 ms-1 text-lg">
                                {letter.letter.toUpperCase()}
                            </p>
                            <small className="absolute bottom-2 right-2">
                                {Math.floor(
                                    (letter.missedCount / letter.typedCount) *
                                        100
                                )}
                                %
                            </small>
                        </Card>
                    ))}
                </section>
            ) : (
                <p className="text-white/50">
                    Not enough tests to generate report
                </p>
            )}
        </>
    );
}
