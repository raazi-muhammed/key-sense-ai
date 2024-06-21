import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileDropDown() {
    const session = useSession();
    const router = useRouter();

    if (!session.data?.user) {
        return (
            <Link href="/api/auth/signin" legacyBehavior>
                <Button>Login</Button>
            </Link>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon">
                    {!!session?.data?.user?.image ? (
                        <Image
                            alt="profile image"
                            width={40}
                            height={40}
                            className="w-full rounded p-[0.1rem]"
                            src={session.data.user.image}
                        />
                    ) : (
                        <CircleUserRound size={"1.5em"} />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        signOut({ redirect: false, callbackUrl: "/signin" })
                    }>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
