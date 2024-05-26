import { Test } from "@/types/entities";
import React from "react";
import moment from "moment";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function ReportSection({
    tests,
    report,
}: {
    tests: Test[];
    report: { letter: string; count: number }[];
}) {
    return (
        <>
            <section className="flex gap-1">
                {report.map((letter) => (
                    <Card className="w-fit p-2">
                        <p>{letter.letter}</p>
                        <p>{letter.count}</p>
                    </Card>
                ))}
            </section>
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
        </>
    );
}
