import mongoose, { Schema, models } from "mongoose";

const reportSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        missedLetters: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Report = models.Report || mongoose.model("Report", reportSchema);
export default Report;
