import { CornerDownLeft } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const key = {
    hidden: { scale: 0.5, x: -3 },
    show: {
        scale: 1,
        x: 0,
    },
};

export default function Key({
    code,
    variant = "default",
}: {
    code: number;
    variant?: "default" | "error";
}) {
    const baseClasses =
        "mx-[1px] my-1 rounded-[.25em] border border-muted-foreground/20 h-10 w-6";

    if (variant == "error") {
        return (
            <motion.span
                animate={{
                    opacity: [0, 1, 0],
                    y: [0, 0, 20],
                    scale: [0.5, 1, 1],
                }}
                transition={{
                    duration: 0.7,
                }}
                className={cn(
                    baseClasses,
                    "my-1 -ms-2 block border-red-700 bg-red-950 text-red-500"
                )}>
                {String.fromCharCode(code)}
            </motion.span>
        );
    }

    return code == 10 ? (
        <>
            <motion.span
                variants={key}
                initial="hidden"
                animate="show"
                className={cn(baseClasses, "grid h-10 w-8 max-w-full")}>
                <CornerDownLeft className="m-auto" />
            </motion.span>
            <div className="w-full"></div>
        </>
    ) : (
        <motion.span
            variants={key}
            initial="hidden"
            animate="show"
            className={cn(baseClasses, "bg-secondary")}>
            {String.fromCharCode(code)}
        </motion.span>
    );
}
