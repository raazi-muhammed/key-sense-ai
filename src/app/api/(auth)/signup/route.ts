import { connectDB } from "@/lib/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json();
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await connectDB();

        const alreadyUser = await User.findOne({ email: userData.email });

        if (alreadyUser) {
            return NextResponse.json(
                {
                    message: "User already exits",
                },
                { status: 401 }
            );
        }
        await User.create({ ...userData, password: hashedPassword });

        return NextResponse.json(
            {
                message: "User created",
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}
