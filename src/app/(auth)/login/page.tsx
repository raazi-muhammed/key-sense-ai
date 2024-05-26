import { LoginForm } from "@/components/forms/LoginForm";
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
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link className="text-xs underline" href="/signup">
                    Singin
                </Link>
            </CardFooter>
        </Card>
    );
}
