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
                                <motion.span
                                    key={`${error.when.toString()}-${
                                        error.letter
                                    }`}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: [0, 0, 20],
                                        scale: [0.5, 1, 1],
                                    }}
                                    transition={{
                                        duration: 0.7,
                                    }}
                                    className="my-1 -ms-2 block h-10 w-6 rounded-[.25em] border border-red-700 bg-red-950 text-red-500">
                                    {error?.letter}
                                </motion.span>
                            )}
                        </div>
                    </p>
                </div>
            </div>
        </section>
    );
}
