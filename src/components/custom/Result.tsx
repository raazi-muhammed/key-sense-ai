import { findTypingAccuracy, findTypingSpeed } from "@/lib/typing";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

type Report = {
    typingSpeed: number;
    typingAccuracy: number;
    numberOfCharactersTyped: number;
    numberOfCharactersMissed: number;
    timeTakenInSeconds: number;
    charactersReport: {
        letter: string;
        typedCount: number;
        missedCount: number;
    }[];
};

function generateLettersReport({
    missedLetters,
    typedLetters,
}: {
    missedLetters: string[];
    typedLetters: string[];
}) {
    const lettersEvaluation = new Map();
    typedLetters.forEach((letter) => {
        if (lettersEvaluation.has(letter)) {
            const current = lettersEvaluation.get(letter);
            lettersEvaluation.set(letter, {
                ...current,
                typedCount: current.typedCount + 1,
            });
        } else {
            lettersEvaluation.set(letter, {
                typedCount: 1,
                missedCount: 0,
            });
        }
    });

    missedLetters.forEach((letter) => {
        if (lettersEvaluation.has(letter)) {
            const current = lettersEvaluation.get(letter);
            lettersEvaluation.set(letter, {
                ...current,
                missedCount: current.missedCount + 1,
            });
        } else {
            lettersEvaluation.set(letter, {
                typedCount: 1,
                missedCount: 1,
            });
        }
    });

    const items: { letter: string; typedCount: number; missedCount: number }[] =
        [];
    lettersEvaluation.forEach((val, key) => {
        items.push({ letter: key, ...val });
    });
    return items;
}

export default function Result({
    typedLetters,
    missedLetters,
    timeTaken,
}: {
    typedLetters: string;
    missedLetters: string[];
    timeTaken: number;
}) {
    const numberOfCharactersTyped = typedLetters.length;
    const numberOfCharactersMissed = missedLetters.length / 2;

    const report: Report = {
        numberOfCharactersTyped,
        numberOfCharactersMissed,
        timeTakenInSeconds: timeTaken / 1000,
        typingAccuracy: findTypingAccuracy(
            numberOfCharactersTyped,
            numberOfCharactersMissed
        ),
        typingSpeed: findTypingSpeed(numberOfCharactersTyped, timeTaken),
        charactersReport: generateLettersReport({
            missedLetters,
            typedLetters: typedLetters.split(""),
        }),
    };

    useEffect(() => {
        const data = generateLettersReport({
            missedLetters,
            typedLetters: typedLetters.split(""),
        });
        console.log({ data });

        axios
            .post("/api/tests/reports", report)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section className="grid gap-4">
            <section className="grid grid-cols-3 gap-4">
                <Card heading="Typing speed" content={report.typingSpeed} />
                <Card
                    heading="Typing accuracy"
                    content={report.typingAccuracy}
                />
                <Card
                    heading="Time taken"
                    content={report.timeTakenInSeconds}
                />
            </section>
            <Separator />
            <section className="grid grid-cols-2 gap-4">
                <LongCard
                    heading="Characters typed"
                    content={report.numberOfCharactersTyped}
                />
                <LongCard
                    heading="Characters missed"
                    content={report.numberOfCharactersMissed}
                />
            </section>
            {report.numberOfCharactersMissed > 0 ? (
                <>
                    <Separator />
                    <p>Missed letters</p>
                    <section className="grid grid-cols-3 gap-4 rounded bg-secondary p-4">
                        {report.charactersReport.map((letter) => (
                            <LongCard
                                key={letter.letter}
                                heading={letter.letter}
                                content={letter.missedCount}
                            />
                        ))}
                    </section>
                </>
            ) : null}
        </section>
    );
}

function Card({
    heading,
    content,
}: {
    heading: string;
    content: string | number;
}) {
    return (
        <section className="rounded border bg-card p-4">
            <p className="">{heading}</p>
            <p className="text-lg">{content}</p>
        </section>
    );
}
function LongCard({
    heading,
    content,
}: {
    heading: string;
    content: string | number;
}) {
    return (
        <section className="flex justify-between rounded border bg-card p-4">
            <p className="">{heading}</p>
            <p className="text-lg">{content}</p>
        </section>
    );
}
