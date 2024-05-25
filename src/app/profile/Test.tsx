"use client";

import { Test } from "@/types/entities";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

export default function TestAPI() {
    const [tests, setTests] = useState<Test[]>([]);
    const [report, setReport] = useState<{ letter: string; count: number }[]>(
        []
    );

    useEffect(() => {
        axios.get("/api/tests/reports").then((res) => {
            setTests(res.data.tests);
            setReport(res.data.report);
        });
    }, []);

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

            <section></section>
        </>
    );
}
