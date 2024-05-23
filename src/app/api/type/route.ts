import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
    return Response.json({ Ho: "Hello world" });
}
export async function POST(request: Request) {
    const data = await request.json();

    const genAI = new GoogleGenerativeAI(
        process.env.GOOGLE_GEMINI_API_KEY || ""
    );

    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
    });

    const prompt = `tell me about ${data.topic}, there should not be any formatting`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ response: text }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 201,
    });
}
