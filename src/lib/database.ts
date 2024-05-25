import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log("Mongodb connected");
    } catch (error) {
        console.log("Error connecting mongodb", error);
    }
};
