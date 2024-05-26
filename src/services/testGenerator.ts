import { TypingMode } from "@/store/store";
import { faker } from "@faker-js/faker";
import axios from "axios";

export class TestGenerator {
    constructor() {}

    async topicTest(topic: string): Promise<string> {
        return axios
            .post(
                `/api/tests/generate?type=${TypingMode.AI_TOPIC_GENERATION}`,
                { topic }
            )
            .then((res) => res.data.response);
    }
    async missedTest(letters: string[]): Promise<string> {
        return axios
            .post(
                `/api/tests/generate?type=${TypingMode.AI_MISSED_LETTER_GENERATION}`,
                { letters }
            )
            .then((res) => res.data.response);
    }

    async normalTest(numberOfWords: number): Promise<string> {
        const words = faker.lorem.words(numberOfWords);
        return words;
    }
}
