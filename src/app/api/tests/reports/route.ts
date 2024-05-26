import { connectDB } from "@/lib/database";
import Test from "@/models/test";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Report from "@/models/report";
import { AsyncCallback } from "@/lib/errorHandler";

export const POST = AsyncCallback(async (request: NextRequest) => {
    const {
        numberOfCharactersMissed,
        typingAccuracy,
        typingSpeed,
        timeTakenInSeconds,
        numberOfCharactersTyped,
        missedCharacters,
    }: {
        missedCharacters: {
            letter: string;
            count: number;
        }[];
        numberOfCharactersMissed: number;
        typingAccuracy: number;
        typingSpeed: number;
        timeTakenInSeconds: number;
        numberOfCharactersTyped: number;
    } = await request.json();

    await connectDB();

    const token = await getToken({ req: request });
    if (!token?.email) throw new Error("Invalid token");

    const user = await User.findOne({ email: token.email });
    if (!user) throw new Error("no usr found");

    let report = await Report.findOne({ user: user._id });
    if (!report) report = await Report.create({ user });

    report.missedLetters as number[];
    let newMissedLetters: number[] = [...report.missedLetters];
    missedCharacters.forEach((d) => {
        const charCode = d.letter.charCodeAt(0);

        console.log(
            newMissedLetters[charCode],
            d.count,
            newMissedLetters[charCode] || 0 + d.count
        );

        newMissedLetters[charCode] =
            newMissedLetters[charCode] + d.count || d.count;
    });

    console.log({
        missedCharacters,
        newMissedLetters,
    });

    await Report.updateOne(
        { user: user._id },
        {
            missedLetters: newMissedLetters,
        }
    );

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
});
