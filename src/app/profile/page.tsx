import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Test from "./Test";
import { ChevronLeft } from "lucide-react";

export default async function Profile() {
    const session = await getServerSession(options);

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
            <Test />
        </main>
    );
}
