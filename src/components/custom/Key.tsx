import { CornerDownLeft } from "lucide-react";
import React from "react";

export default function Key({ code }: { code: number }) {
    return code == 10 ? (
        <>
            <span className="border rounded-[.25em] my-1 mx-[1px] border-slate-700 w-8 max-w-full h-10 grid">
                <CornerDownLeft className="m-auto " />
            </span>
            <div className="w-full"></div>
        </>
    ) : (
        <span className="border rounded-[.25em] my-1 mx-[1px] border-slate-700 w-6 h-10">
            {String.fromCharCode(code)}
        </span>
    );
}
