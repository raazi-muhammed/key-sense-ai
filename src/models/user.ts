import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        account: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
