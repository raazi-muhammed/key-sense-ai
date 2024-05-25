import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function ProfileDropDown() {
    const session = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                        {session?.data?.user?.name
                            ?.split("")
                            .splice(0, 2)
                            .join("")
                            .toUpperCase() || "PR"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href="/api/auth/signin">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/signup">Sing up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
