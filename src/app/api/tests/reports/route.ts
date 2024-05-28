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
        charactersReport,
    }: {
        charactersReport: {
            letter: string;
            typedCount: number;
            missedCount: number;
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

    if (!report) report = await Report.create({ user, lettersReport: [] });

    report.lettersReport as { typedCount: number; missedCount: number }[];
    let newLettersReport: { typedCount: number; missedCount: number }[] = [
        ...report.lettersReport,
    ];
    charactersReport.forEach((d) => {
        const charCode = d.letter.charCodeAt(0);
        const current = newLettersReport[charCode];
        newLettersReport[charCode] = {
            typedCount: (current?.typedCount || 0) + d.typedCount,
            missedCount: (current?.missedCount || 0) + d.missedCount,
        };
    });

    await Report.updateOne(
        { user: user._id },
        {
            lettersReport: newLettersReport,
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
