"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type Payment = {
    date: string;
    speed: number;
    accuracy: number;
    timeTaken: number;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => moment(row.getValue("createdAt")).format("LLL"),
    },
    {
        accessorKey: "typingSpeed",
        header: "Speed",
        cell: ({ row }) => `${row.getValue("typingAccuracy")} WPM`,
    },
    {
        accessorKey: "typingAccuracy",
        header: "Accuracy",
        cell: ({ row }) => `${row.getValue("typingAccuracy")}%`,
    },
    {
        accessorKey: "timeTakenInSeconds",
        header: "Time Taken",
        cell: ({ row }) => `${row.getValue("timeTakenInSeconds")}s`,
    },
];
