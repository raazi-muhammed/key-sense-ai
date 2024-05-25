import { TypingMode } from "@/store/store";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("type");

    console.log({ query });

    const genAI = new GoogleGenerativeAI(
        process.env.GOOGLE_GEMINI_API_KEY || ""
    );

    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
    });
    let prompt = "no test found";
    if (query == TypingMode.AI_MISSED_LETTER_GENERATION) {
        prompt = `create a dummy paragraph, add a lot of words with these letters ${data.letters.join(
            ","
        )}, there should not be any formatting, and it should about 50 words, use simple english`;
    } else {
        prompt = `tell me about ${data.topic}, there should not be any formatting, and it should about 50 words, use simple english`;
    }

    console.log({ prompt });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ response: text }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 201,
    });
}
