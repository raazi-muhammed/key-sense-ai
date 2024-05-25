"use client";

import { Test } from "@/types/entities";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function TestAPI() {
    const [data, setData] = useState<Test[]>([]);

    useEffect(() => {
        axios.get("/api/tests/reports").then((res) => {
            setData(res.data.tests);
        });
    }, []);

    return (
        <>
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
                    {data.map((test) => (
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
