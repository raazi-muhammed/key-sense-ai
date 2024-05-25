import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Profile() {
    const session = await getServerSession(options);
    return (
        <div>
            Profile
            <pre>{JSON.stringify(session)}</pre>
        </div>
    );
}
