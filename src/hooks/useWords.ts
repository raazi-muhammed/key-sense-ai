import { TestGenerator } from "@/services/testGenerator";
import { MutableRefObject, useState } from "react";
import { AppState } from "./useEngine";
import { toast } from "sonner";

export function useWords({
    appState,
}: {
    appState: MutableRefObject<AppState>;
}) {
    const [words, setWords] = useState("");

    function setTestWords(test: Promise<string>) {
        if (appState.current === AppState.LOADING) {
            toast("Already generating content");
            return;
        }
        setWords("");
        appState.current = AppState.LOADING;

        test.then((words) => {
            appState.current = AppState.READY;
            setWords(words);
        });
    }

    function generateNormalTest({ numberOfWords }: { numberOfWords: number }) {
        const generator = new TestGenerator();
        setTestWords(generator.normalTest(numberOfWords));
    }

    function generateTestFromTopic({ topic }: { topic: string }) {
        const generator = new TestGenerator();
        setTestWords(generator.topicTest(topic));
    }

    function generateTestFromMissed({ letters }: { letters: string[] }) {
        const generator = new TestGenerator();
        setTestWords(generator.missedTest(letters));
    }

    return {
        words,
        generateNormalTest,
        generateTestFromTopic,
        generateTestFromMissed,
    };
}
