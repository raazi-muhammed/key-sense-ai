"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const words = faker.lorem.lines(10);

export default function Home() {
    const [userTyped, setUserTyped] = useState("");

    function handleSpecialChar(s: any) {
        console.log(s);
        if (s.code == "Backspace") {
            setUserTyped((ut) => ut.substring(0, ut.length - 1));
        }
    }
    function handleKeyDown(s: any) {
        console.log(s);
        const characterTyped = s.key;

        setUserTyped((ut) => {
            if (characterTyped.charCodeAt(0) != words.charCodeAt(ut.length)) {
                if (
                    characterTyped.charCodeAt(0) == 32 &&
                    words.charCodeAt(ut.length) == 10
                )
                    return ut + characterTyped;
                console.log(
                    characterTyped.charCodeAt(0),
                    words.charCodeAt(ut.length)
                );

                toast("not same");
                return ut;
            }
            return ut + characterTyped;
        });
    }

    useEffect(() => {
        window.addEventListener("keypress", handleKeyDown);
        window.addEventListener("keydown", handleSpecialChar);
        return () => {
            window.removeEventListener("keypress", handleKeyDown);
            window.removeEventListener("keydown", handleSpecialChar);
        };
    }, []);

    return (
        <main>
            <Button>hlo</Button>
            <div className="relative">
                <p className="text-2xl max-w-[60ch] font-mono opacity-10">
                    {words}
                </p>
                <p className="text-2xl text-blue-500 max-w-[60ch] font-mono absolute inset-0">
                    {userTyped}
                </p>
            </div>
        </main>
    );
}
