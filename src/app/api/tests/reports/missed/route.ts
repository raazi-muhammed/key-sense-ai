import { connectDB } from "@/lib/database";
import { AsyncCallback } from "@/lib/errorHandler";
import Report from "@/models/report";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = AsyncCallback(async (request: NextRequest) => {
    connectDB();
    const token = await getToken({ req: request });
    if (!token?.email) throw new Error("Invalid token");

    const user = await User.findOne({ email: token.email });
    if (!user) throw new Error("no usr found");

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

    const top5 = formattedReport.sort((a, b) => b.count - a.count).splice(0, 5);

    return NextResponse.json({
        report: top5,
    });
});
