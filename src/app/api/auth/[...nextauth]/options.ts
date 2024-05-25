import { connectDB } from "@/lib/database";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "email",
                },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials: any) {
                try {
                    await connectDB();
                    const user = await User.findOne({
                        email: credentials?.email,
                    });

                    if (!user) {
                        throw new Error("No user found");
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials?.password,
                        user.password
                    );
                    console.log({ user, isPasswordCorrect, credentials });

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid password");
                    }

                    return user;
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
};
