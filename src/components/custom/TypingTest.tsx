import React from "react";
import Key from "./Key";
import { motion } from "framer-motion";

export default function TypingTest({
    words,
    userTyped,
    carrot,
    error,
}: {
    words: string;
    error: { when: number; letter: string } | null;
    userTyped: string;
    carrot: any;
}) {
    return (
        <section className="h-[50svh] overflow-y-scroll py-16">
            <div className="mx-auto max-w-[80ch]">
                <div className="relative">
                    <p className="flex flex-wrap font-mono text-3xl opacity-50">
                        {words.split("").map((key, index) => (
                            <Key key={index} code={key.charCodeAt(0)} />
                        ))}
                    </p>
                    <p className="absolute inset-0 flex h-fit flex-wrap font-mono text-3xl text-white">
                        {userTyped.split("").map((key, index) => (
                            <Key key={index} code={key.charCodeAt(0)} />
                        ))}
                        <div className="flex">
                            <span
                                ref={carrot}
                                className="duration-400 -ms-2 animate-pulse">
                                |
                            </span>
                            {!!error && (
                                <Key
                                    variant="error"
                                    key={error.when.toString()}
                                    code={error.letter.charCodeAt(0)}
                                />
                            )}
                        </div>
                    </p>
                </div>
            </div>
        </section>
    );
}
