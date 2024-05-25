import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <main className="grid min-h-screen w-full place-items-center">
            {children}
        </main>
    );
}
