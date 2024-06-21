import { connectDB } from "@/lib/database";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        }),
        GitHubProvider({
            clientId: String(process.env.GITHUB_ID),
            clientSecret: String(process.env.GITHUB_SECRET),
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            await connectDB();

            const alreadyUser = await User.findOne({ email: user.email });

            if (alreadyUser) {
                return true;
            }
            await User.create({ ...user, account: account?.provider });
            return true;
        },
    },
    pages: {
        signIn: "/sign-in",
    },
};
