import { AsyncCallback, ErrorHandler } from "@/lib/errorHandler";
import User from "@/models/user";
import { TypingMode } from "@/store/store";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = AsyncCallback(async (request: NextRequest) => {
    const data = await request.json();

    const token = await getToken({ req: request });
    if (!token?.email) throw new ErrorHandler("Please sign in", 401);

    const user = await User.findOne({ email: token.email });
    if (!user) throw new ErrorHandler("Please sign in", 401);

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

    return NextResponse.json({
        response: text,
    });
});
