import { create } from "zustand";

export enum TypingMode {
    NORMAL = "NORMAL",
    AI_TOPIC_GENERATION = "AI_TOPIC_GENERATION",
    AI_MISSED_LETTER_GENERATION = "AI_MISSED_LETTER_GENERATION",
}

type Store = {
    typingMode: TypingMode;
    isRunning: boolean;
    setTypingMode: (topic: TypingMode) => void;
    setIsRunning: (running: boolean) => void;
    settings: {
        noOfWords: number;
    };
    setNoOfWords: (noOfWords: number) => void;
};

export const useStore = create<Store>()((set) => ({
    typingMode: TypingMode.NORMAL,
    isRunning: false,
    setTypingMode: (topic: TypingMode) => set({ typingMode: topic }),
    setIsRunning: (running: boolean) => set({ isRunning: running }),
    settings: {
        noOfWords: 15,
    },
    setNoOfWords: (noOfWords: number) => set({ settings: { noOfWords } }),
}));
