"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LoginForm() {
    const router = useRouter();

    async function handleGoogleSignIn() {
        try {
            const response = await signIn("google", {
                redirect: false,
                callbackUrl: "/",
            });
            if (!response?.ok) {
                toast(response?.error);
                return;
            }
            router.push("/");
        } catch (error) {
            toast("An error occurred");
        }
    }
    async function handleGitHubSignIn() {
        try {
            const response = await signIn("github", {
                redirect: false,
                callbackUrl: "/",
            });
            if (!response?.ok) {
                toast(response?.error);
                return;
            }
            router.push("/");
        } catch (error) {
            toast("An error occurred");
        }
    }

    return (
        <Tabs defaultValue="google" className="w-[400px]">
            <TabsList className="gird grid-cols-full h-auto w-full">
                <TabsTrigger
                    value="google"
                    className="flex h-24 w-full gap-3 border">
                    <GoogleIcon />
                    <p className="text-lg">Google</p>
                </TabsTrigger>
                <TabsTrigger
                    value="github"
                    className="flex h-24 w-full gap-3 border">
                    <GitHubIcon />
                    <p className="text-lg">GitHub</p>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="google">
                <Button
                    type="button"
                    className="w-full gap-2"
                    onClick={handleGoogleSignIn}>
                    Continue
                </Button>
            </TabsContent>
            <TabsContent value="github">
                <Button
                    type="button"
                    className="w-full gap-2"
                    onClick={handleGitHubSignIn}>
                    Continue
                </Button>
            </TabsContent>
        </Tabs>
    );
}

import React from "react";

export function GitHubIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35%"
            height="35%"
            fill="currentColor"
            className="bi bi-github w-fit"
            viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
    );
}
export function GoogleIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35%"
            height="35%"
            fill="currentColor"
            className="bi bi-google w-fit"
            viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
        </svg>
    );
}
