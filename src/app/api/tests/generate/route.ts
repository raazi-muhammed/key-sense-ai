import User from "@/models/user";
import { TypingMode } from "@/store/store";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const token = await getToken({ req: request });
        if (!token?.email)
            return NextResponse.json(
                {
                    message: "Please sign in",
                },
                { status: 401 }
            );

        const user = await User.findOne({ email: token.email });
        if (!user)
            return NextResponse.json(
                {
                    message: "Please sign in",
                },
                { status: 401 }
            );

        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get("type");

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

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return new Response(JSON.stringify({ response: text }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}
