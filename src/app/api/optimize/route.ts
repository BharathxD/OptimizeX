import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import pollOptimizedImageFromS3 from "@/handlers/pollOptimizedImageFromS3";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ message: "User is not authenticated to perform this operation." }, { status: StatusCodes.UNAUTHORIZED });
        }
        const { key } = await req.json();
        const isAuthorized = await prisma.optimizedImage.findFirst({
            where: {
                objectKey: key,
                userId: currentUser.id
            },
        })
        if (!isAuthorized) {
            return NextResponse.json({ message: "User is not authorized to perform this operation." })
        }
        // TODO: Fetch Image from S3
        // return new NextResponse(foundImageBuffer as Buffer, { status: StatusCodes.OK });
    } catch (error: any) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
}

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ message: "User is not authenticated to perform this operation." }, { status: StatusCodes.UNAUTHORIZED });
        }
        const { key, file } = await req.json();
        const responseBuffer: Buffer | null = await pollOptimizedImageFromS3(key, file);
        if (!responseBuffer) {
            return NextResponse.json({ message: "Sorry, it's taking too long to process. You can check your profile later to download it." }, { status: StatusCodes.NOT_FOUND });
        }
        return new NextResponse(responseBuffer, {
            status: StatusCodes.OK,
            headers: { "Content-Type": file.type, "Content-Disposition": `attachment; filename=${file.name}` },
        });
    } catch (error) {
        return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
}