import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import React from "react";

export default function Spinner({ isLoading }: { isLoading: boolean }) {
    if (isLoading)
        return (
            <motion.div initial={{ width: 0 }} animate={{ width: "1rem" }}>
                <Loader size="1.3em" className="animate-spin" />
            </motion.div>
        );
    else null;
}
