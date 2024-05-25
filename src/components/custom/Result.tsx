import { findTypingAccuracy, findTypingSpeed } from "@/lib/typing";
import React from "react";
import { Separator } from "@/components/ui/separator";

type Report = {
    typingSpeed: number;
    typingAccuracy: number;
    numberOfCharactersTyped: number;
    numberOfCharactersMissed: number;
    timeTakenInSeconds: number;
    missedCharacters: {
        letter: string;
        count: number;
    }[];
};

function generateMissedLetterArray(missedLetters: string[]) {
    const missedEvaluation = new Map();
    missedLetters.forEach((letter) => {
        if (missedEvaluation.has(letter)) {
            const current = missedEvaluation.get(letter);
            missedEvaluation.set(letter, current + 0.5);
        } else {
            missedEvaluation.set(letter, 0.5);
        }
    });

    const items: { letter: string; count: number }[] = [];
    missedEvaluation.forEach((val, key) => {
        items.push({ letter: key, count: val });
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
        missedCharacters: generateMissedLetterArray(missedLetters),
    };

    return (
        <section className="grid gap-4">
            <section className="grid grid-cols-3 gap-4">
                <Card
                    heading="Typing speed"
                    content={numberOfCharactersTyped}
                />
                <Card heading="Typing accuracy" content={report.typingSpeed} />
                <Card
                    heading="Time taken"
                    content={report.timeTakenInSeconds}
                />
            </section>
            <Separator />
            <section className="grid grid-cols-2 gap-4">
                <LongCard
                    heading="Time taken"
                    content={report.timeTakenInSeconds}
                />
                <LongCard
                    heading="Time taken"
                    content={report.timeTakenInSeconds}
                />
            </section>
            <Separator />
            <p>Missed letters</p>
            <section className="grid grid-cols-3 gap-4 rounded bg-secondary p-4">
                {report.missedCharacters.map((letter) => (
                    <LongCard heading={letter.letter} content={letter.count} />
                ))}
            </section>
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
