import { TypingMode } from "@/store/store";
import { faker } from "@faker-js/faker";
import axios from "axios";

export class TestGenerator {
    numberOfWords: number;
    constructor(numberOfWords: number) {
        this.numberOfWords = numberOfWords;
    }

    async topicTest(topic: string): Promise<string> {
        return axios
            .post(
                `/api/tests/generate?type=${TypingMode.AI_TOPIC_GENERATION}&noOfWords=${this.numberOfWords}`,
                { topic }
            )
            .then((res) => res.data.response);
    }
    async missedTest(letters: string[]): Promise<string> {
        return axios
            .post(
                `/api/tests/generate?type=${TypingMode.AI_MISSED_LETTER_GENERATION}&noOfWords=${this.numberOfWords}`,
                { letters }
            )
            .then((res) => res.data.response);
    }

    async normalTest(): Promise<string> {
        const words = faker.lorem.words(this.numberOfWords);
        return words;
    }
}
