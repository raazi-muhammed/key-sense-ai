import { motion } from "framer-motion";
import { Button } from "../ui/button";

export const MotionButton = motion(Button);

export const normal = {
    tap: { scale: 0.95 },
    show: { scale: 1 },
    hover: { scale: 1.05 },
    hidden: { scale: 1.05 },
};
