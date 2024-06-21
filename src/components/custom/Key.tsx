import { CornerDownLeft } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const key = {
    hidden: { scale: 0.5, x: -3 },
    show: {
        scale: 1,
        x: 0,
    },
};

export default function Key({ code }: { code: number }) {
    return code == 10 ? (
        <>
            <motion.span
                variants={key}
                initial="hidden"
                animate="show"
                className="mx-[1px] my-1 grid h-10 w-8 max-w-full rounded-[.25em]">
                <CornerDownLeft className="m-auto" />
            </motion.span>
            <div className="w-full"></div>
        </>
    ) : (
        <motion.span
            variants={key}
            initial="hidden"
            animate="show"
            className="mx-[1px] my-1 h-10 w-6 rounded-[.25em] bg-secondary">
            {String.fromCharCode(code)}
        </motion.span>
    );
}
