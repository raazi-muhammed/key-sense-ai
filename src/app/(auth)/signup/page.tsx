import { SignupForm } from "@/components/forms/SignupForm";
import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function page() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sing up</CardTitle>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link className="text-xs underline" href="/login">
                    Login
                </Link>
            </CardFooter>
        </Card>
    );
}
