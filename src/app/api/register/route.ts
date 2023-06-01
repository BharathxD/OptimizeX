import argon2 from "argon2";

import prisma from "@/libs/prismadb";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await argon2.hash(password);
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                name,
                hashedPassword
            }
        });
        const safeUser = omit(user, "hashedPassword");
        return NextResponse.json(safeUser, {
            status: StatusCodes.CREATED
        })
    } catch (error: any) {
        if (error.code === "P2002") {
            return NextResponse.json({ message: "User already exists" }, { status: StatusCodes.CONFLICT })
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
}