import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import pollOptimizedImageFromS3 from "@/handlers/pollOptimizedImageFromS3";
import prisma from "@/libs/prismadb";
import s3 from "../../../../aws/s3";

export async function GET(req: NextRequest) {
    try {
        const key = req.nextUrl.searchParams.get("key");
        if (!key) {
            return NextResponse.json({ message: "Invalid Key" }, { status: StatusCodes.BAD_REQUEST });
        }
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json(
                { message: "User is not authenticated to perform this operation." },
                { status: StatusCodes.UNAUTHORIZED }
            );
        };
        const isAuthorized = await prisma.optimizedImage.findFirst
            ({ where: { objectKey: key, userId: currentUser.id } });
        if (!isAuthorized) {
            return NextResponse.json({
                message: "User is not authorized to perform this operation.",
            }, { status: StatusCodes.UNAUTHORIZED });
        };
        const getObjectParams = {
            Bucket: process.env.NEXT_AWS_S3_DESTINATION_BUCKET_NAME!,
            Key: key,
        };
        const response = await s3.getObject(getObjectParams).promise();
        if (!(response.Body instanceof Buffer)) {
            throw new Error("Something went wrong.")
        }
        return new NextResponse(response.Body, { status: StatusCodes.OK });
    } catch (error: any) {
        console.log(error.message)
        if (error.code === "NoSuchKey") {
            return NextResponse.json(
                { message: "Image not found" },
                { status: StatusCodes.NOT_FOUND }
            );
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json(
                { message: "User is not authenticated to perform this operation." },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }
        const { key, file } = await req.json();
        const responseBuffer: Buffer | null = await pollOptimizedImageFromS3(
            key,
            file
        );
        if (!responseBuffer) {
            return NextResponse.json(
                {
                    message:
                        "Sorry, it's taking too long to process. You can check your profile later to download it.",
                },
                { status: StatusCodes.NOT_FOUND }
            );
        }
        return new NextResponse(responseBuffer, {
            status: StatusCodes.OK,
            headers: {
                "Content-Type": file.type,
                "Content-Disposition": `attachment; filename=${file.name}`,
            },
        });
    } catch (error) {
        return new NextResponse(null, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}
