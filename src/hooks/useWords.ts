import { TestGenerator } from "@/services/testGenerator";
import { useState } from "react";

export function useWords(
    setTestWords: (test: Promise<string>) => Promise<undefined | string>
) {
    const [words, setWords] = useState("");

    async function generateNormalTest({
        numberOfWords,
    }: {
        numberOfWords: number;
    }) {
        const generator = new TestGenerator();
        setWords("");
        const generatedWords = await setTestWords(
            generator.normalTest(numberOfWords)
        );
        if (generatedWords) setWords(generatedWords);
    }

    async function generateTestFromTopic({ topic }: { topic: string }) {
        const generator = new TestGenerator();
        setWords("");
        const generatedWords = await setTestWords(generator.topicTest(topic));
        if (generatedWords) setWords(generatedWords);
    }

    async function generateTestFromMissed({ letters }: { letters: string[] }) {
        const generator = new TestGenerator();
        setWords("");
        const generatedWords = await setTestWords(
            generator.missedTest(letters)
        );
        if (generatedWords) setWords(generatedWords);
    }

    return {
        words,
        generateNormalTest,
        generateTestFromTopic,
        generateTestFromMissed,
    };
}
