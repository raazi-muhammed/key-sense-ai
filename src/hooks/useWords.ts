import { TestGenerator } from "@/services/testGenerator";
import { MutableRefObject, useState } from "react";
import { AppState } from "./useEngine";
import { toast } from "sonner";
import { faker } from "@faker-js/faker";
import { useStore } from "@/store/store";

export function useWords({
    appState,
}: {
    appState: MutableRefObject<AppState>;
}) {
    const { settings } = useStore();
    const [words, setWords] = useState(faker.lorem.words(settings.noOfWords));

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
        })
            .catch((err) => {
                setWords(words);
                toast(err?.response?.data?.message || "An error occurred");
            })
            .finally(() => {
                appState.current = AppState.READY;
            });
    }

    function generateNormalTest() {
        const generator = new TestGenerator(settings.noOfWords);
        setTestWords(generator.normalTest());
    }

    function generateTestFromTopic({ topic }: { topic: string }) {
        const generator = new TestGenerator(settings.noOfWords);
        setTestWords(generator.topicTest(topic));
    }

    function generateTestFromMissed({ letters }: { letters: string[] }) {
        const generator = new TestGenerator(settings.noOfWords);
        setTestWords(generator.missedTest(letters));
    }

    return {
        words,
        generateNormalTest,
        generateTestFromTopic,
        generateTestFromMissed,
    };
}
