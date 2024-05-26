import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { connectDB } from "@/lib/database";
import { getServerSession } from "next-auth/next";
import Test from "@/models/test";
import Report from "@/models/report";
import User from "@/models/user";
import ReportSection from "./Report";

async function getReports(userEmail: string | undefined) {
    connectDB();
    const user = await User.findOne({ email: userEmail });
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

    return {
        tests,
        report: formattedReport,
    };
}

export default async function Profile() {
    const session = await getServerSession(options);
    if (!session?.user?.email) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const data = await getReports(session.user.email);

    return (
        <main className="container space-y-4">
            <section className="mt-8 flex gap-4">
                <Link href="/">
                    <Button variant="secondary">
                        <ChevronLeft />
                    </Button>
                </Link>
                <p className="mt-auto text-3xl font-semibold">Profile</p>
            </section>
            <section className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                    <small>Name</small>
                    <p>{session?.user?.name}</p>
                </Card>
                <Card className="p-4">
                    <small>Email</small>
                    <p>{session?.user?.email}</p>
                </Card>
            </section>
            <ReportSection report={data.report} tests={data.tests} />
        </main>
    );
}
