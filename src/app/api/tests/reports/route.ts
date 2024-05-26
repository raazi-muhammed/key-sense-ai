import { connectDB } from "@/lib/database";
import Test from "@/models/test";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Report from "@/models/report";

export async function POST(request: NextRequest) {
    try {
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

        const report = await Report.findOne({ user: user._id });

        const formattedReport = [];
        for (let i = 0; i < report?.missedLetters?.length; i++) {
            const current = report.missedLetters[i];
            if (typeof current == "number" && current > 0)
                formattedReport.push({
                    letter: String.fromCharCode(i),
                    count: current,
                });
        }

        return NextResponse.json({
            tests,
            report: formattedReport,
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
