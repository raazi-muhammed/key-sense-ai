import { faker } from "@faker-js/faker";
import axios from "axios";

export class TestGenerator {
    constructor() {}

    async topicTest(topic: string) {
        return axios
            .post("/api/tests/generate", { topic })
            .then((res) => res.data.response);
    }

    normalTest() {
        const words = faker.lorem.lines(5);
        return words;
    }
}
