import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="mx-auto flex max-w-[80ch] flex-col space-y-3 py-16">
            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
            <Skeleton className="mx-[1px] my-1 h-10 w-full rounded-[.25em]" />
        </div>
    );
}
