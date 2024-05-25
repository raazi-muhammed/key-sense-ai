import { TypingMode } from "@/store/store";
import { faker } from "@faker-js/faker";
import axios from "axios";

export class TestGenerator {
    constructor() {}

    async topicTest(topic: string) {
        return axios
            .post(
                `/api/tests/generate?type=${TypingMode.AI_TOPIC_GENERATION}`,
                { topic }
            )
            .then((res) => res.data.response);
    }
    async missedTest(letters: string[]) {
        return axios
            .post(
                `/api/tests/generate?type=${TypingMode.AI_MISSED_LETTER_GENERATION}`,
                { letters }
            )
            .then((res) => res.data.response);
    }

    normalTest() {
        const words = faker.lorem.words(3);
        return words;
    }
}
