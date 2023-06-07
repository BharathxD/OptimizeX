import { Data } from "aws-sdk/clients/firehose";
import s3 from "../../../../aws/s3";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { v4 as uuidv4 } from 'uuid';
import prisma from "@/libs/prismadb";
import { utcToZonedTime } from "date-fns-tz";

export async function POST(req: NextRequest) {
    try {
        const { fileType, fileName, uploadDate } = await req.json();

        // Check authorization
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: StatusCodes.OK }
            );
        }

        // Validate params
        if (!fileType || !fileName) {
            return NextResponse.json(
                { message: "Invalid params" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        const extension = fileType.replace("image/", "");
        const key = `optimize/picture_${uuidv4()}.${extension}`;

        // Generate signed URL for S3 upload
        const s3Params = {
            Bucket: process.env.NEXT_AWS_S3_SOURCE_BUCKET_NAME,
            Key: key,
            Expires: 60,
            ContentType: fileType,
        };
        const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);

        // Prepare optimized image URL
        let updatedKey = key.replace("optimize/", "optimized/");
        updatedKey = `https://${process.env.NEXT_AWS_S3_DESTINATION_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${updatedKey}`;

        // Set expiration date
        const oneDay = 24 * 60 * 60 * 1000;
        const expiredAt = new Date(new Date().getTime() + oneDay);

        // Create optimized image record in the database
        const createdImage = await prisma.optimizedImage.create({
            data: {
                userId: currentUser.id,
                fileName,
                extension,
                expiresAt: expiredAt,
                url: updatedKey,
            },
        });

        // Update user's optimizedImages array
        await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                optimizedImages: {
                    push: createdImage.id,
                },
            },
        });


        const data: Data = { s3UploadUrl, key: updatedKey };
        const responseBody = JSON.stringify(data);

        return NextResponse.json(responseBody, {
            status: StatusCodes.OK,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        console.error(`Failed to generate presigned URL: ${(error as Error).message}`);
        return NextResponse.json(
            { message: "Failed to generate the signed URL" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
