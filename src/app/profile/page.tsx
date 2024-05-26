import React, { ReactNode } from "react";
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

const ITEMS_PER_PAGE = 10;

async function getReports(
    userEmail: string | undefined,
    pagination: { page: number }
) {
    connectDB();
    const user = await User.findOne({ email: userEmail });
    if (!user) throw new Error("no usr found");

    const tests = await Test.find({ user: user._id })
        .sort({
            createdAt: -1,
        })
        .skip(pagination.page * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);

    const totalCount = await Test.estimatedDocumentCount({ user: user._id });

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
        pagination: {
            noOfPages: Math.ceil(totalCount / ITEMS_PER_PAGE) - 1,
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
        <main className="container space-y-4">
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
            <section className="container mx-auto flex w-fit flex-wrap justify-center gap-1">
                {report.map((letter) => (
                    <Card className="relative aspect-square w-14 place-items-center p-2 font-mono">
                        <p className="m-0 ms-1 text-lg">
                            {letter.letter.toUpperCase()}
                        </p>
                        <small className="absolute bottom-2 right-2">
                            {letter.count}
                        </small>
                    </Card>
                ))}
            </section>
            <Header>Tests</Header>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Speed</TableHead>
                        <TableHead>Accuracy</TableHead>
                        <TableHead>Time taken</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tests.map((test) => (
                        <TableRow>
                            <TableCell>
                                {moment(test.createdAt).format("LLL")}
                            </TableCell>
                            <TableCell>{test.typingSpeed} WPM</TableCell>
                            <TableCell>{test.typingAccuracy}%</TableCell>
                            <TableCell>{test.timeTakenInSeconds}s</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={`profile?page=${
                                pageNumber - 1 > 0 ? pageNumber - 1 : pageNumber
                            }`}
                        />
                    </PaginationItem>
                    {Array(pagination.noOfPages)
                        .fill(0)
                        .map((i, index) => (
                            <PaginationItem>
                                <PaginationLink
                                    className={
                                        index + 1 === pageNumber
                                            ? "bg-muted"
                                            : ""
                                    }
                                    href={`profile?page=${index + 1}`}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    <PaginationItem>
                        <PaginationNext
                            href={`profile?page=${
                                pageNumber + 1 < pagination.noOfPages
                                    ? pageNumber + 1
                                    : pageNumber
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}

function Header({ children }: { children: string }) {
    return <h3 className="font-mono text-2xl font-bold">{children}</h3>;
}
