import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <main className="container mx-auto space-y-12 py-12">
            <Skeleton className="h-12 w-36" />
            <section className="flex w-full gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </section>
            <Skeleton className="h-12 w-36" />
            <section>
                <Skeleton className="h-16 w-full" />
            </section>
            <Skeleton className="h-12 w-36" />
            <section className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </section>
        </main>
    );
}
