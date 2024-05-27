import { NextRequest, NextResponse } from "next/server";

export function AsyncCallback(controller: Function) {
    return async function Callback(request: NextRequest) {
        try {
            return await controller(request);
        } catch (error) {
            console.log(error);
            if (error instanceof ErrorHandler) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    {
                        status: error.statusCode,
                    }
                );
            }
            return NextResponse.json(
                {
                    success: false,
                    message: "An error occurred",
                },
                {
                    status: 500,
                }
            );
        }
    };
}

export class ErrorHandler extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
