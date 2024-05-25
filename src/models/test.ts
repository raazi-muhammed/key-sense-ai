import mongoose, { Schema, models } from "mongoose";

const testSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        typingSpeed: {
            type: Number,
            required: true,
        },
        typingAccuracy: {
            type: Number,
            required: true,
        },
        timeTakenInSeconds: {
            type: Number,
            required: true,
        },
        numberOfCharactersTyped: {
            type: Number,
            required: true,
        },
        numberOfCharactersMissed: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Test = models.Test || mongoose.model("Test", testSchema);
export default Test;
