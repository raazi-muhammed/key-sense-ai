import { connectDB } from "@/lib/database";
import Test from "@/models/test";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
    try {
        const {
            numberOfCharactersMissed,
            typingAccuracy,
            typingSpeed,
            timeTakenInSeconds,
            numberOfCharactersTyped,
        } = await request.json();

        await connectDB();

        const token = await getToken({ req: request });
        if (!token?.email) throw new Error("Invalid token");

        const user = await User.findOne({ email: token.email });
        if (!user) throw new Error("no usr found");

        await Test.create({
            user,
            numberOfCharactersMissed,
            typingAccuracy,
            typingSpeed,
            timeTakenInSeconds,
            numberOfCharactersTyped,
        });

        return NextResponse.json({
            message: "saved",
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        connectDB();
        const token = await getToken({ req: request });
        if (!token?.email) throw new Error("Invalid token");

        const user = await User.findOne({ email: token.email });
        if (!user) throw new Error("no usr found");

        const tests = await Test.find({ user: user._id }).sort({
            createdAt: -1,
        });
        return NextResponse.json({
            tests,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}
