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
import moment from "moment";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import KeyReport from "@/components/custom/KeyReport";
import { Header } from "@/components/custom/Header";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const ITEMS_PER_PAGE = 10;

async function getReports(
    userEmail: string | undefined,
    pagination: { page: number }
) {
    connectDB();
    console.log({ userEmail });
    const user = await User.findOne({ email: userEmail });

    if (!user) throw new Error("no usr found");

    const tests = await Test.find({ user: user._id })
        .sort({
            createdAt: -1,
        })
        .skip((pagination.page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);

    const totalCount = await Test.countDocuments({ user: user._id });

    const report = await Report.findOne({ user: user._id });

    const formattedReport = [];
    for (let i = 0; i < report?.lettersReport?.length; i++) {
        const current = report.lettersReport[i];
        if (current && current.missedCount > 0)
            formattedReport.push({
                letter: String.fromCharCode(i),
                typedCount: current.typedCount,
                missedCount: current.missedCount,
            });
    }

    return {
        tests,
        report: formattedReport,
        pagination: {
            noOfPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
        },
    };
}

export default async function Profile({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const session = await getServerSession(options);
    if (!session?.user?.email) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const params = searchParams;
    const pageNumber = Number(params?.page) || 1;

    const { report, tests, pagination } = await getReports(session.user.email, {
        page: pageNumber,
    });

    return (
        <main className="container space-y-4 pb-24">
            <section className="mt-8 flex gap-4">
                <Link href="/">
                    <Button variant="secondary">
                        <ChevronLeft />
                    </Button>
                </Link>
                <Header>Profile</Header>
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

            <Header>Missed</Header>
            <KeyReport report={report} />
            <Header>Tests</Header>
            <DataTable
                columns={columns}
                data={tests}
                pageCount={pagination.noOfPages}
                pageIndex={pageNumber}
            />
        </main>
    );
}
