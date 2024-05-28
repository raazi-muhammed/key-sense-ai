import mongoose, { Schema, models } from "mongoose";

const reportSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        lettersReport: [
            {
                typedCount: String,
                missedCount: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Report = models.Report || mongoose.model("Report", reportSchema);
export default Report;
