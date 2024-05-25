import { SignupForm } from "@/components/forms/SignupForm";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sing up</CardTitle>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
        </Card>
    );
}
